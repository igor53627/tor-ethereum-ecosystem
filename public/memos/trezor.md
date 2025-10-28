# Tor Integration Analysis in Trezor Suite

## Overview
Trezor Suite implements comprehensive Tor integration to enhance user privacy and anonymity. The integration is sophisticated, supporting both bundled and external Tor configurations with extensive platform support.

## Tor Integration Type

### SOCKS5-based Implementation
- **Primary Method**: SOCKS5 proxy integration using `socks-proxy-agent` package
- **Configuration**: Creates SOCKS5 proxy rules at system level via Electron session management
- **Identity Management**: Supports multiple Tor identities with username/password authentication for circuit isolation
- **Code Location**: `packages/request-manager/src/torIdentities.ts`, `packages/blockchain-link/src/workers/electrum/sockets/tor.ts`

### Native Tor Process Management
- **Bundled Tor**: Includes native Tor binary that can be started/stopped programmatically
- **External Tor**: Supports connecting to external Tor instances (e.g., system Tor, Tor Browser)
- **Control Port Integration**: Uses Tor control port for circuit management and bootstrap monitoring
- **Code Location**: `packages/suite-desktop-core/src/modules/tor.ts`

## Platform Support

### Desktop Platforms (Full Support)
- **Windows**: Native Tor binary included, full SOCKS5 integration
- **macOS**: Native Tor binary included, full SOCKS5 integration  
- **Linux**: Native Tor binary included, full SOCKS5 integration

### Web Platform (Limited)
- **Detection Only**: Can detect if running on .onion domain
- **No Native Tor**: Cannot bundle Tor binary in browser environment
- **Relies on External**: Users must configure external Tor (Tor Browser) manually

### Mobile Platforms (No Support)
- **iOS**: No Tor integration detected
- **Android**: No Tor integration detected
- **React Native**: Snowflake component exists but is purely decorative UI element

## Scope of Tor Protection

### Fully Protected by Tor
1. **Blockchain Data Requests**: All blockchain API calls routed through Tor
   - Electrum server connections: `packages/blockchain-link/src/workers/electrum/sockets/tor.ts`
   - Blockbook connections: Uses proxyAgent in `packages/blockchain-link/src/workers/blockbook/index.ts`
   - All cryptocurrency balance and transaction data

2. **Transaction Broadcasting**: All transaction submissions protected
   - Bitcoin-like transactions via Electrum: `packages/blockchain-link/src/workers/electrum/index.ts`
   - Ethereum transactions via RPC endpoints
   - All blockchain network communications

3. **Trezor Connect Communications**: Device communication through Tor
   - `packages/suite-desktop-core/src/modules/trezor-connect.ts`
   - All device API calls routed through Tor proxy

### Partially Protected
1. **External Data Sources**: Mixed protection
   - **Fiat Rates**: Coingecko API calls may use Tor if intercepted
   - **Token Info**: Some token metadata requests protected
   - **Trading Services**: Buy/sell/exchange API calls partially protected

2. **Application Updates**: Electron updater session included in Tor proxy
   - Code: `packages/suite-desktop-core/src/modules/tor.ts` line 63-64

### Not Protected
1. **Local Communications**: Device USB/WebUSB connections
2. **Some Analytics**: May bypass Tor for certain telemetry
3. **DNS Leaks**: Potential DNS leaks if not properly configured

## Circuit Management

### Identity Isolation
- **Multiple Identities**: Supports separate Tor circuits for different identity contexts
- **Circuit Reset**: Automatic circuit reset after certain operations or timeouts
- **User Control**: Manual circuit reset functionality available

### Bootstrap Monitoring
- **Progress Tracking**: Real-time bootstrap progress with UI feedback
- **Error Handling**: Comprehensive error reporting and retry mechanisms
- **Performance Monitoring**: Detects slow bootstrap and provides user feedback

## Configuration Options

### Bundled Tor Settings
- **Automatic Port Selection**: Finds free ports for SOCKS and control ports
- **Data Directory**: Tor data stored in app userData directory
- **Process Management**: Start/stop/restart Tor process lifecycle

### External Tor Settings
- **Custom Port Configuration**: Connect to external Tor on any port
- **No Control Port**: Limited functionality with external Tor
- **Fake Bootstrap**: Simulated bootstrap progress for external Tor

## Security Considerations

### Strengths
1. **Comprehensive Coverage**: Most network traffic protected
2. **Circuit Isolation**: Multiple identities prevent correlation
3. **Control Port Integration**: Advanced Tor features accessible
4. **Platform Integration**: Deep integration with Electron security model

### Limitations
1. **Desktop Only**: No mobile support
2. **External Dependencies**: Requires Tor binary for full functionality
3. **Configuration Complexity**: External Tor setup can be complex
4. **Potential Leaks**: DNS and other leaks possible if misconfigured

## Implementation Architecture

### Core Components
1. **Tor Module**: `packages/suite-desktop-core/src/modules/tor.ts` - Main Tor orchestration
2. **Request Interceptor**: `packages/request-manager/src/interceptor.ts` - Network request interception
3. **Identity Manager**: `packages/request-manager/src/torIdentities.ts` - Tor circuit management
4. **Socket Integration**: `packages/blockchain-link/src/workers/electrum/sockets/tor.ts` - Blockchain connections

### Integration Points
- **Electron Session**: System-level proxy configuration
- **Blockchain Workers**: All blockchain communications
- **Trezor Connect**: Device communication layer
- **HTTP Client**: Custom HTTP client with Tor support

## Conclusion

Trezor Suite implements a robust, comprehensive Tor integration that protects the vast majority of network communications, including all blockchain interactions and transaction broadcasting. The implementation is sophisticated with features like circuit isolation, bootstrap monitoring, and support for both bundled and external Tor configurations. However, the integration is desktop-only, with no support for mobile platforms, and requires careful configuration to avoid potential leaks.

The scope of protection covers:
- ✅ **Blockchain data requests** (fully protected)
- ✅ **Transaction broadcasting** (fully protected)  
- ✅ **Trezor Connect communications** (fully protected)
- ⚠️ **External data sources** (partially protected)
- ❌ **Mobile platforms** (no protection)
- ❌ **Some local communications** (not applicable)

## .onion Address Usage

### Core Configuration

**Main Tor Domain Mapping** (`packages/urls/src/tor.ts`):
```typescript
export const TOR_URLS: { [key: string]: string } = {
    'trezor.io': 'trezoriovpjcahpzkrewelclulmszwbqpzmzgub37gbcjlvluxtruqad.onion',
};
```

**Connect Package Config** (`packages/connect/src/data/config.ts`):
- Includes the same onion domain mapping
- Whitelists the onion address for secure connections
- Used for Trezor Connect API communication

### URL Conversion Logic

The `urlToOnion` function (`packages/utils/src/urlToOnion.ts`) converts clearnet URLs to onion addresses:

1. **Pattern matching**: Extracts protocol, subdomains, domain, and path from URLs
2. **Domain lookup**: Checks if the domain has an onion equivalent in the mapping
3. **URL reconstruction**: Builds new URL with onion domain, preserving subdomains and paths

**Example conversions**:
- `https://trezor.io/` → `http://trezoriovpjcahpzkrewelclulmszwbqpzmzgub37gbcjlvluxtruqad.onion/`
- `https://cdn.trezor.io/image.png` → `http://cdn.trezoriovpjcahpzkrewelclulmszwbqpzmzgub37gbcjlvluxtruqad.onion/image.png`
- `wss://trezor.io` → `ws://trezoriovpjcahpzkrewelclulmszwbqpzmzgub37gbcjlvluxtruqad.onion`

### Tor Integration

**Tor Status Management** (`packages/suite/src/utils/suite/tor.ts`):
- Checks if Tor is enabled/running
- Detects onion URLs with `isOnionUrl()`
- Provides `getTorUrlIfAvailable()` for conditional URL conversion

**User Control** (`packages/suite/src/views/settings/SettingsGeneral/TorOnionLinks.tsx`):
- Settings toggle for "Onion links"
- Users can enable/disable automatic onion redirection
- Analytics tracking for Tor usage preferences

**External Link Handling** (`packages/suite/src/hooks/suite/useExternalLink.ts`):
- Automatically converts external links to onion versions when:
  - Tor is enabled
  - User has enabled onion links preference
  - Onion version exists for the domain

### CoinJoin Integration

**Extended Domain Mapping** (`packages/suite/src/services/coinjoin/config.ts`):
- Includes additional onion domains for CoinJoin services:
  - `wasabiwallet.io` → `wasabiukrxmkdgve5kynjztuovbg43uxcbcxn6y2okcrsg7gb6jdmbad.onion`
  - `wasabiwallet.co` → `testwnp3fugjln6vh5vpj7mvq3lkqqwjj3c2aafyu7laxz42kgwh2rad.onion`

### Security Considerations

1. **Domain verification**: Only pre-approved domains have onion equivalents
2. **Protocol handling**: HTTP/HTTPS/WSS all convert appropriately
3. **Subdomain preservation**: Maintains full URL structure for compatibility
4. **Fallback behavior**: Returns original URL if no onion mapping exists

The .onion addresses enable users to access Trezor services with enhanced privacy through the Tor network, automatically handling URL conversion when Tor is enabled and the user opts into onion link usage.

## Analysis Metadata

**Analysis Date**: October 28, 2025  
**Analyst**: Cascade AI Assistant  
**Codebase Version**: Latest from repository  
**Analysis Scope**: Complete Tor integration across all platforms and network communications