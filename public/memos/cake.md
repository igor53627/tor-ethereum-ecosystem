# Cake Wallet Tor Integration Analysis

## Overview
Cake Wallet implements a comprehensive Tor integration system for privacy protection across multiple supported cryptocurrencies and platforms.

## Tor Implementation Details

### Integration Type: Native + SOCKS5 Hybrid

**Primary Implementation**: Native embedded Tor using the `torch_dart` library
- Uses `CakeTorTorch` class implementing `CakeTorInstance` interface
- Embeds Tor binaries directly within the application
- Runs Tor as a local SOCKS5 proxy on port 52142
- Configuration stored in app cache directory under `tor-data`

**Alternative Implementation**: SOCKS5 proxy support
- `CakeTorSocks` class for external SOCKS5 proxy connections
- Used primarily on Linux with system Tor (e.g., Tails OS)
- Supports environment variables: `SOCKS_SERVER` and `SOCKS_PROXY`

### Platform Support

**Full Native Tor Support**:
- ✅ iOS
- ✅ Android  
- ✅ macOS
- ✅ Windows
- ✅ Linux (via embedded Tor)

**System Tor (SOCKS5) Support**:
- ✅ Linux (Tails OS detection via `/etc/os-release`)
- ✅ Any platform with external SOCKS5 proxy

### Tor Configuration
- **SOCKS Port**: 52142 (hardcoded)
- **Data Directory**: App cache directory `tor-data`
- **Torrc Configuration**: 
  ```
  SocksPort 52142
  Log notice stdout  
  RunAsDaemon 0
  DataDirectory {cache}/tor-data
  ```
- **Tor Library**: External `torch_dart` dependency (v1.0.4)

## Scope of Tor Protection

### Protected Network Operations

**1. Blockchain Node Communications** ✅
- All wallet node connections (Bitcoin, Monero, Ethereum, etc.)
- Transaction history synchronization
- Balance queries
- Address generation requests
- Example: Monero wallet uses `CakeTor.instance!.enabled` for node proxy setup

**2. Exchange Services** ✅
- All exchange provider API calls (SimpleSwap, ChangeNOW, ThorChain, etc.)
- Exchange rate queries
- Transaction status monitoring
- Uses `ProxyWrapper().get()` and `ProxyWrapper().post()` with Tor routing

**3. Fiat Conversion Services** ✅
- Price data fetching via `fiat_conversion_service.dart`
- Supports both clearnet and onion endpoints
- Attempts onion first, falls back to clearnet via Tor

**4. Buy/Sell Services** ✅
- MoonPay, Onramper, Wyre, Robinhood, Kryptonik, MELD, DFX providers
- All API calls routed through Tor when enabled

**5. Transaction Broadcasting** ✅
- All cryptocurrency transaction broadcasts go through Tor
- Bitcoin, Monero, Ethereum, and all other supported chains
- Broadcasting happens via wallet node connections which are Tor-protected

**6. Additional Services** ✅
- Cake Pay API calls
- AnonPay invoice services
- WalletConnect communications
- Yat emoji ID services
- NFT data fetching
- Payjoin protocols

### Network Request Monitoring

Cake Wallet includes comprehensive network request logging:
- Network requests screen shows "T" for Tor traffic, "C" for clearnet
- Logs show Tor proxy details and connection status
- Monitoring via `MemoryProxyLogger` for debugging

## Control and User Interface

### Tor Settings
- **Setting**: `currentBuiltinTor` in `SettingsStore`
- **Default**: Disabled (user must enable)
- **Persistence**: Stored in SharedPreferences
- **Control**: Settings screen with enable/disable toggle

### Startup Flow
1. App initializes `CakeTor.instance` on startup
2. If Tor is enabled, shows `StartTorPage` with 5-second timeout
3. User can: wait for Tor, disable Tor, or ignore and launch
4. Tor status displayed in dashboard

### Integration Points
- **ProxyWrapper**: Central HTTP client with Tor/clearnet routing
- **Node connections**: All wallet node connections respect Tor setting
- **External APIs**: Exchange, buy/sell, price APIs use ProxyWrapper

## Technical Architecture

### Key Classes
- `CakeTorTorch`: Native Tor implementation
- `CakeTorSocks`: SOCKS5 proxy implementation  
- `CakeTorDisabled`: Fallback when Tor unavailable
- `ProxyWrapper`: HTTP client with Tor routing logic
- `StartTorViewModel`: Tor startup management

### Dependencies
- `torch_dart`: Embedded Tor library
- `socks5_proxy`: SOCKS5 client implementation
- `socks_socket`: Socket-level SOCKS support

## Security Considerations

### ✅ Strong Points
- Comprehensive coverage of all network requests
- Native Tor integration (no system dependency)
- Fallback to system Tor on Linux
- User control and visibility of Tor status
- Network request monitoring and logging

### ⚠️ Limitations
- No Snowflake integration (uses traditional Tor circuits)
- Fixed SOCKS port (52142)
- No bridges or obfuscation support visible
- Tor timeout of only 5 seconds may be insufficient

## Conclusion

Cake Wallet implements a robust Tor integration that protects essentially all network communications including:
- **✅ Blockchain data requests** (sync, balances, history)
- **✅ Transaction broadcasting** (all supported chains)
- **✅ External data sources** (prices, exchange rates, token info)
- **✅ Third-party services** (exchanges, buy/sell providers)

The integration is native (not just SOCKS5) on all major platforms (iOS, Android, macOS, Windows, Linux) and provides comprehensive privacy protection for wallet operations. The implementation does not use Snowflake but instead relies on traditional Tor circuits with embedded Tor binaries.

## Analysis Metadata

**Analysis Date**: October 28, 2025  
**Analyst**: Cascade AI Assistant  
**Codebase Version**: Current main branch  
**Analysis Scope**: Complete Tor integration across Cake Wallet codebase