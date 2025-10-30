import { Box, Heading, SimpleGrid, HStack, Link, IconButton } from '@chakra-ui/react';
import { FaLink } from 'react-icons/fa';
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
      <HStack spacing={3} mb={6}>
        <Heading
          size="xl"
          fontFamily="heading"
          color="tor.500"
          _dark={{ color: 'tor.300' }}
        >
          {title}
        </Heading>
        <Link href={`#${id}`} aria-label={`Link to ${title}`}>
          <IconButton
            icon={<FaLink />}
            aria-label={`Link to ${title}`}
            size="sm"
            variant="ghost"
            colorScheme="tor"
            color="gray.400"
            _hover={{ color: 'tor.500', _dark: { color: 'tor.300' } }}
          />
        </Link>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CategorySection;
