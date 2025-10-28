# Tor Integration Analysis: Unstoppable Wallet

## Executive Summary

This analysis examines Tor integration across the Unstoppable Wallet Android and iOS applications. The investigation reveals a significant disparity between platforms: the Android wallet implements comprehensive native Tor integration, while the iOS wallet lacks Tor functionality entirely.

---

## Platform Comparison

| Platform | Tor Implementation | Integration Type | Scope of Protection | Snowflake Support |
|----------|-------------------|------------------|---------------------|-------------------|
| **Android** | ✅ Full Implementation | Native Binary | **All Network Traffic** | ❌ No |
| **iOS** | ❌ Not Implemented | N/A | N/A | N/A |

---

## Android Wallet Analysis

### Tor Implementation Details

#### 1. Native Binary Integration
The Android wallet uses a **native Tor daemon** (`libtor.so`) embedded within the application bundle. Key implementation files:

- **`TorManager.kt`** - Main Tor lifecycle management
- **`TorOperator.kt`** - Tor process operations and control
- **`TorResourceManager.kt`** - Binary resource extraction and management
- **`TorControl.kt`** - Tor control port communication
- **`TorConstants.kt`** - Configuration constants
- **`TorConnectionManager.kt`** - System proxy configuration

#### 2. Architecture Overview

```kotlin
// Core Tor configuration
class Tor {
    class Connection {
        var proxyHost = "127.0.0.1"
        var proxySocksPort = "9050"
        var proxyHttpPort = "8118"
        var status: ConnectionStatus = ConnectionStatus.CLOSED
    }
}
```

#### 3. System-Wide Proxy Integration

Tor operates at the **system level** through Java system properties:

```kotlin
private fun enableProxy() {
    TorConnectionManager.setSystemProxy(
        true,
        TorConstants.IP_LOCALHOST,
        TorConstants.HTTP_PROXY_PORT_DEFAULT,
        TorConstants.SOCKS_PROXY_PORT_DEFAULT
    )
}
```

**System Properties Modified:**
- `http.proxyHost`, `http.proxyPort`
- `https.proxyHost`, `https.proxyPort`
- `socksProxyHost`, `socksProxyPort`

#### 4. Tor Configuration

The implementation uses custom `torrc` configuration with optimized settings:

```kotlin
extraLines.append("RunAsDaemon 1")
extraLines.append("AvoidDiskWrites 1")
extraLines.append("SOCKSPort 9050")
extraLines.append("HTTPTunnelPort 8118")
extraLines.append("DNSPort 5400")
extraLines.append("ReducedConnectionPadding 1")
extraLines.append("ReducedCircuitPadding 1")
```

#### 5. Control and Monitoring

- **Tor Control Port**: Dynamic port allocation with control file communication
- **Bootstrap Monitoring**: Real-time connection status tracking
- **Event Handling**: Comprehensive Tor event system for status updates
- **Process Management**: Native process lifecycle control

### Scope of Protection: Comprehensive

**All network traffic** from the Android application is routed through Tor when enabled:

1. **Blockchain Data Requests** ✅
   - RPC calls to blockchain nodes
   - Transaction history queries
   - Balance inquiries
   - Smart contract interactions

2. **Transaction Broadcasting** ✅
   - All transaction submissions to blockchain networks
   - EVM transaction broadcasts
   - UTXO-based transaction propagation

3. **Additional Network Traffic** ✅
   - Market data API calls
   - Fiat currency conversion requests
   - Application update checks
   - Analytics and telemetry

### User Control Features

- **Settings Integration**: Tor toggle in privacy settings
- **Status Monitoring**: Real-time connection status (Connected/Connecting/Failed/Closed)
- **Visual Indicators**: Tor status icons in UI
- **Persistence**: Tor preference saved in local storage

---

## iOS Wallet Analysis

### Tor Implementation: None Found

**Extensive investigation revealed:**

1. **No Native Tor Code**: No Tor management classes or implementation files
2. **No Tor Dependencies**: No Tor frameworks or libraries in project configuration
3. **No Proxy Configuration**: No URLSession proxy setup or network interception
4. **No Tor UI**: No Tor-related settings or status indicators

### Privacy Alternatives

The iOS wallet appears to rely on:
- iOS system-level privacy features
- Potential VPN integration (mentioned in future roadmap)
- No built-in Tor anonymity protection

---

## Security Architecture Comparison

### Android Security Model

```
[Application] → [System Proxy] → [Tor Daemon] → [Internet]
```

**Benefits:**
- Comprehensive traffic protection
- System-level integration
- Difficult to bypass accidentally
- All libraries inherit Tor protection

### iOS Security Model

```
[Application] → [Direct Network] → [Internet]
```

**Limitations:**
- No built-in anonymity
- Relies on external solutions
- Platform dependency for privacy features

---

## Technical Implementation Deep Dive

### Android Tor Resource Management

```kotlin
// Tor binary extraction and setup
fun installResources(): File? {
    // Extract libtor.so from APK assets
    fileTor = File(torSettings.appNativeDir, "libtor.so")
    
    // Set executable permissions
    FileUtils.setExecutable(fileTor)
    
    // Configure custom torrc
    updateTorrcCustomFile()
    
    return fileTor
}
```

### Control Port Communication

```kotlin
// Tor control interface for status monitoring
class TorControl {
    fun initConnection(maxTries: Int): Observable<Tor.Connection> {
        return createControlConn(maxTries)
            .map { configConnection(it, torInfo) }
    }
    
    fun newIdentity(): Boolean {
        return controlConn?.signal("NEWNYM") ?: false
    }
}
```

### Performance Optimizations

The Android implementation includes several Tor-specific optimizations:

1. **Reduced Padding**: `ReducedConnectionPadding 1`, `ReducedCircuitPadding 1`
2. **Memory Optimization**: `AvoidDiskWrites 1`
3. **Fast Connection**: Bootstrap timeout and retry logic
4. **Resource Management**: Efficient binary extraction and cleanup

---

## Configuration Files

### Tor Configuration (Android)

**File: `app/src/main/assets/common/torrc`**
```bash
# Base Tor configuration
TransPort 0
# Additional optimizations for mobile use
```

**Dynamic Configuration:**
- Custom port allocation to avoid conflicts
- Control port file management
- Cookie-based authentication
- DNS tunneling support

---

## User Experience

### Android Wallet

**Tor Features:**
- **Privacy Settings**: Toggle switch for Tor enablement
- **Status Display**: Real-time connection status with visual indicators
- **Error Handling**: Graceful failure handling with user notifications
- **Background Operation**: Tor runs continuously when enabled

**Status Types:**
```kotlin
enum class TorStatus {
    Connected,
    Connecting, 
    Failed,
    Closed
}
```

### iOS Wallet

**No Tor features available in the current implementation.**

---

## Key Findings

### Integration Type
- **Android**: Native Tor binary integration with custom `libtor.so`
- **iOS**: No Tor integration detected
- **Snowflake**: Not implemented on either platform

### Scope Analysis
- **Android**: **Complete protection** - all HTTP/HTTPS traffic routed through Tor
- **iOS**: **No protection** - direct network connections only

### Blockchain Operations

| Operation | Android Protection | iOS Protection |
|-----------|-------------------|----------------|
| **Data Requests** | ✅ Full Tor protection | ❌ No protection |
| **Transaction Broadcasting** | ✅ Full Tor protection | ❌ No protection |
| **Market API Calls** | ✅ Full Tor protection | ❌ No protection |
| **Analytics** | ✅ Full Tor protection | ❌ No protection |

---

## Recommendations

### For Android Implementation

1. **Enhanced Privacy**: Consider adding bridge support for censorship resistance
2. **Performance**: Implement connection pooling for better efficiency
3. **Security**: Add circuit monitoring and leak prevention mechanisms
4. **User Education**: Improve Tor status explanations and troubleshooting guides

### For iOS Implementation

1. **Tor Integration**: Implement native Tor or consider Tor.framework
2. **Platform Parity**: Achieve feature parity with Android version
3. **Privacy Migration**: Plan migration path for users requiring anonymity
4. **Testing**: Implement comprehensive Tor testing framework

---

## Conclusion

The Unstoppable Wallet demonstrates a **significant platform disparity** in Tor integration:

- **Android**: Provides **comprehensive, native Tor protection** for all network traffic, including both blockchain data requests and transaction broadcasting
- **iOS**: **Lacks Tor integration entirely**, leaving iOS users without built-in anonymity protection

This difference represents a critical gap in privacy protection between platforms and should be addressed to provide consistent security guarantees across the entire user base.

The Android implementation serves as an excellent reference for native Tor integration in cryptocurrency applications, demonstrating proper system-level proxy integration and comprehensive traffic protection.

---

**Analysis Date**: October 28, 2025  
**Analyst**: Cascade AI Assistant  
**Scope**: Complete source code analysis of unstoppable-wallet-android and unstoppable-wallet-ios projects