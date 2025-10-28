import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ItemCard from './ItemCard';
import type { Item } from '../types';

interface CategorySectionProps {
  title: string;
  items: Item[];
  id: string;
}

const CategorySection = ({ title, items, id }: CategorySectionProps) => {
  if (items.length === 0) return null;

  return (
    <Box mb={12} id={id}>
      <Heading
        size="xl"
        mb={6}
        fontFamily="heading"
        color="tor.500"
        _dark={{ color: 'tor.300' }}
      >
        {title}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CategorySection;
