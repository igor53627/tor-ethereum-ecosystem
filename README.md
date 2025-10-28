# Tor in Ethereum Ecosystem

A comprehensive directory of privacy-preserving tools and infrastructure for the Ethereum ecosystem that leverage the Tor network.

## Overview

This website showcases wallets, RPC providers, load balancers, and SDKs that integrate Tor to enhance privacy and censorship resistance for Ethereum users.

## Features

- **Search & Filter**: Easily find tools by name or filter by tags (WIP, Native, Snowflake)
- **Dark/Light Mode**: Toggle between themes with Tor-inspired color scheme
- **Copy Onion URLs**: One-click copy for .onion hidden service addresses
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **External Links**: Direct links to websites and GitHub repositories

## Categories

### Wallets
Privacy-focused wallets with Tor integration
- Native Tor support
- Snowflake proxy integration
- Work in progress implementations

### RPC Providers
Decentralized and privacy-preserving RPC endpoints
- Free tier options
- No API key required services
- Tor hidden service support

### Load Balancers
Infrastructure for distributing requests across multiple nodes
- High-performance solutions
- Fault-tolerant designs

### Wallet SDKs
Developer tools for building privacy-preserving wallets

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **UI Library**: Chakra UI
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: React Icons

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tor-ethereum-ecosystem.git

# Navigate to project directory
cd tor-ethereum-ecosystem

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Contributing

We welcome contributions from the community! Here's how you can help:

### Adding a New Tool

1. Fork the repository
2. Navigate to the appropriate JSON file in `src/data/`:
   - `wallets.json` - for wallets
   - `rpc-providers.json` - for RPC providers
   - `loadbalancers.json` - for load balancers
   - `wallet-sdks.json` - for wallet SDKs

3. Add your entry following this structure:

```json
{
  "id": "unique-tool-id",
  "name": "Tool Name",
  "description": "Brief description of the tool and its Tor integration",
  "website": "https://example.com",
  "github": "https://github.com/org/repo",
  "tags": ["WIP", "native", "snowflake"],
  "category": "wallet"
}
```

For RPC providers with onion URLs:
```json
{
  "id": "provider-id",
  "name": "Provider Name",
  "description": "Description",
  "website": "https://example.com",
  "onionUrl": "yourv3onionaddress.onion",
  "types": ["free", "no-api-key"],
  "tags": [],
  "category": "rpc-provider"
}
```

### Tag Definitions

- `WIP` - Work in progress, Tor integration under development
- `native` - Native Tor support built into the application
- `snowflake` - Uses Snowflake proxy for censorship resistance

### Pull Request Guidelines

1. Ensure your JSON is valid and properly formatted
2. Test locally that your entry displays correctly
3. Provide accurate and up-to-date information
4. Include relevant links (website, GitHub, documentation)
5. Write a clear PR description explaining what you're adding

### Code Contributions

For feature requests, bug fixes, or improvements to the website itself:

1. Create an issue describing the change
2. Fork and create a new branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request with clear description

## Project Structure

```
tor-ethereum-ecosystem/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── ItemCard.tsx
│   │   ├── SearchFilter.tsx
│   │   ├── CategorySection.tsx
│   │   └── StatusBadge.tsx
│   ├── data/                # JSON data files
│   │   ├── wallets.json
│   │   ├── rpc-providers.json
│   │   ├── loadbalancers.json
│   │   └── wallet-sdks.json
│   ├── theme/               # Chakra UI theme
│   │   └── torTheme.ts
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Privacy & Security

This is a directory website. Always verify:
- Official websites and repositories before using any tool
- Onion addresses through official channels
- Smart contract addresses if interacting on-chain

## License

MIT

## Acknowledgments

- Ethereum Foundation for ecosystem support
- Tor Project for privacy infrastructure
- All contributors and tool maintainers

## Contact

- Open an issue for questions or suggestions
- Submit PRs for contributions
- Star the repo if you find it useful!

---

**Privacy matters. Help others discover privacy-preserving tools in the Ethereum ecosystem.**
