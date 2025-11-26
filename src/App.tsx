import { useState, useMemo } from 'react';
import { Container, Box } from '@chakra-ui/react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';
import type { Item } from './types';

// Import data
import walletsData from './data/wallets.json';
import rpcProvidersData from './data/rpc-providers.json';
import explorersData from './data/explorers.json';
import loadbalancersData from './data/loadbalancers.json';
import walletSdksData from './data/wallet-sdks.json';
import frontendsData from './data/frontends.json';
import nodesData from './data/nodes.json';
import ipfsGatewaysData from './data/ipfs-gateways.json';

const categories = [
  { value: 'wallet', label: 'Wallets' },
  { value: 'rpc-provider', label: 'RPC Providers' },
  { value: 'explorer', label: 'Explorers' },
  { value: 'frontend', label: 'Frontends' },
  { value: 'loadbalancer', label: 'Load Balancers' },
  { value: 'wallet-sdk', label: 'SDKs' },
  { value: 'ipfs-gateway', label: 'IPFS Gateways' },
  { value: 'node', label: 'Nodes' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Combine all data
  const allItems: Item[] = [
    ...walletsData,
    ...rpcProvidersData,
    ...explorersData,
    ...loadbalancersData,
    ...walletSdksData,
    ...frontendsData,
    ...ipfsGatewaysData,
    ...nodesData,
  ] as Item[];

  // Get all unique tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    allItems.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter items based on search, category, and tag
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === '' || item.category === selectedCategory;
      const matchesTag = selectedTag === '' || item.tags.includes(selectedTag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag, allItems]);

  // Separate items by category
  const wallets = filteredItems.filter((item) => item.category === 'wallet');
  const rpcProviders = filteredItems.filter(
    (item) => item.category === 'rpc-provider'
  );
  const explorers = filteredItems.filter(
    (item) => item.category === 'explorer'
  );
  const frontends = filteredItems.filter(
    (item) => item.category === 'frontend'
  );
  const loadbalancers = filteredItems.filter(
    (item) => item.category === 'loadbalancer'
  );
  const walletSdks = filteredItems.filter(
    (item) => item.category === 'wallet-sdk'
  );
  const ipfsGateways = filteredItems.filter(
    (item) => item.category === 'ipfs-gateway'
  );
  const nodes = filteredItems.filter((item) => item.category === 'node');

  return (
    <Box minH="100vh">
      <Header />
      <Container maxW="100%" px={{ base: 4, md: 8, lg: 12 }} pb={12}>
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          availableCategories={categories}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          availableTags={availableTags}
        />

        <CategorySection title="Wallets" items={wallets} id="wallets" />
        <CategorySection
          title="RPC Providers"
          items={rpcProviders}
          id="rpc-providers"
        />
        <CategorySection
          title="Explorers"
          items={explorers}
          id="explorers"
        />
        <CategorySection title="Frontends" items={frontends} id="frontends" />
        <CategorySection
          title="Load Balancers"
          items={loadbalancers}
          id="loadbalancers"
        />
        <CategorySection
          title="SDKs"
          items={walletSdks}
          id="sdks"
        />
        <CategorySection
          title="IPFS Gateways"
          items={ipfsGateways}
          id="ipfs-gateways"
        />
        <CategorySection title="Nodes" items={nodes} id="nodes" />
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
