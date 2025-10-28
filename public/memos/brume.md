# Brume Wallet Tor Integration Analysis

## Overview
Brume wallet implements a **comprehensive Tor integration** using native Tor client capabilities via the `@hazae41/echalote` library. The integration is **not Snowflake-only** but includes Snowflake as a transport layer for circumventing censorship.

## Tor Implementation Type

### Native Tor Integration
- **Primary Implementation**: Native Tor client using `@hazae41/echalote` (v0.4.18)
- **Transport Layer**: WebSocket connections to Snowflake bridges (`wss://snowflake.torproject.net/`)
- **Architecture**: Full Tor circuit creation and management in-browser/extension

### Key Components
1. **Tor Client Core**: `src/libs/tor/tors/tors.ts`
2. **Circuit Management**: `src/libs/tor/circuits/circuits.ts`
3. **Stream Management**: `src/libs/tor/streams/streams.ts`
4. **Consensus Handling**: `src/mods/universal/tor/mods/consensus/index.ts`

## Scope of Integration

### 1. Circuit Creation and Management
- **Pool-based Architecture**: Manages pools of WebSocket connections and Tor circuits
- **3-Hop Circuits**: Guard → Middle → Exit relay structure
- **Smart Relay Selection**: Filters relays based on flags (Fast, Stable, Exit, V2Dir)
- **Reliability Testing**: Circuits undergo testing against `http://detectportal.firefox.com`

### 2. Transport Security
- **TLS Support**: HTTPS/WSS connections with strong cipher suites
- **Cipher Suites**: TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384

## Protected Operations

### ✅ Blockchain Data Requests - FULLY PROTECTED
**All blockchain RPC requests are routed through Tor circuits:**

- **RPC Calls**: `src/libs/rpc/rpc.ts` implements `fetchWithCircuitOrThrow()`
- **Ethereum Context**: `src/mods/background/service_worker/context.ts` uses Tor for all RPC
- **Simulations**: `src/mods/background/service_worker/entities/simulations/data.ts` - all simulation requests via Tor

### ✅ Transaction Broadcasting - FULLY PROTECTED
**All transaction broadcasting occurs through Tor:**

- **Function**: `eth_sendTransaction` in `src/mods/background/service_worker/index.ts`
- **Method**: Uses `eth_sendRawTransaction` via Tor-protected RPC calls
- **Implementation**: All wallet RPC operations are circuit-protected

### ✅ External Data Sources - SELECTIVELY PROTECTED
**Only sensitive external data requests use Tor:**

- **Blockchain Explorers**: Etherscan URLs are defined but not directly used for sensitive operations
- **Network Parameters**: Tor-protected when fetched for simulations
- **Node Discovery**: Protected when discovering network nodes

## Architecture Details

### Connection Flow
1. **WebSocket Pool**: Creates pool of connections to Snowflake bridges
2. **Tor Client Pool**: Manages Tor clients over WebSocket connections
3. **Circuit Pool**: Creates and maintains Tor circuits
4. **Stream Pool**: Manages individual streams through circuits

### Performance Features
- **Timeout Management**: Dynamic timeouts based on ping measurements
- **Retry Logic**: Extensive retry mechanisms for circuit creation
- **Health Monitoring**: Automatic circuit restart on failures
- **Caching**: Consensus data cached with expiration policies

## Security and Privacy

### ✅ Strong Privacy Guarantees
- **No Direct Connections**: All blockchain interactions via Tor
- **Circuit Isolation**: Separate circuits for different operations
- **Consensus Privacy**: Tor directory requests protected
- **Transport Obfuscation**: Snowflake provides censorship resistance

### Configuration
- **Pool Size**: Configurable circuit and connection pools
- **Timeout**: Adaptive based on network conditions
- **Relay Selection**: Smart filtering for performance and reliability

## Future Development

### WASM Tor Rewrite (Planned)
Documented in `docs/tor-wasm-rewrite-requirements.md`:
- **Objective**: WebAssembly-based Tor client using Arti core
- **Benefits**: Smaller bundle size, better performance, audited crypto
- **Timeline**: Future implementation, currently using Echalote

## Conclusion

**Brume Wallet implements comprehensive Tor protection:**

✅ **Native Tor Integration** (not Snowflake-only)
✅ **Complete Blockchain Data Protection** (all RPC calls)
✅ **Full Transaction Broadcasting Protection** (all sends)
✅ **Smart External Data Handling** (selective Tor usage)
✅ **Advanced Circuit Management** (pooled, reliable, tested)

The wallet provides strong privacy guarantees by routing all sensitive blockchain operations through native Tor circuits with Snowflake transport for censorship resistance.

---

## Analysis Metadata

**Analysis Date**: October 28, 2025  
**Analyst**: Cascade AI Assistant  
**Codebase Version**: 0.7.540  
**Analysis Scope**: Tor integration, privacy protection, and circuit management  