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

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Combine all data
  const allItems: Item[] = [
    ...walletsData,
    ...rpcProvidersData,
    ...explorersData,
    ...loadbalancersData,
    ...walletSdksData,
    ...frontendsData,
  ] as Item[];

  // Get all unique tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    allItems.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter items based on search and tag
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === '' || item.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag, allItems]);

  // Separate items by category
  const wallets = filteredItems.filter((item) => item.category === 'wallet');
  const rpcProviders = filteredItems.filter(
    (item) => item.category === 'rpc-provider'
  );
  const explorers = filteredItems.filter(
    (item) => item.category === 'explorer'
  );
  const loadbalancers = filteredItems.filter(
    (item) => item.category === 'loadbalancer'
  );
  const walletSdks = filteredItems.filter(
    (item) => item.category === 'wallet-sdk'
  );
  const frontends = filteredItems.filter(
    (item) => item.category === 'frontend'
  );

  return (
    <Box minH="100vh">
      <Header />
      <Container maxW="100%" px={{ base: 4, md: 8, lg: 12 }} pb={12}>
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
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
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
