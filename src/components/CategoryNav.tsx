import { Box, Container, HStack, Link, Text } from '@chakra-ui/react';
import { FaLink } from 'react-icons/fa';

interface Category {
  id: string;
  name: string;
}

interface CategoryNavProps {
  categories: Category[];
}

const CategoryNav = ({ categories }: CategoryNavProps) => {
  return (
    <Box
      bg="gray.50"
      _dark={{ bg: 'gray.900', borderColor: 'gray.700' }}
      borderBottom="1px"
      borderColor="gray.200"
      py={3}
      mb={6}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="100%" px={{ base: 4, md: 8, lg: 12 }}>
        <HStack spacing={1} flexWrap="wrap" gap={2}>
          <Text fontSize="sm" fontWeight="semibold" color="gray.600" _dark={{ color: 'gray.400' }} mr={2}>
            Jump to:
          </Text>
          {categories.map((category, index) => (
            <HStack key={category.id} spacing={1}>
              <Link
                href={`#${category.id}`}
                fontSize="sm"
                fontWeight="medium"
                color="tor.600"
                _dark={{ color: 'tor.300' }}
                _hover={{
                  color: 'tor.700',
                  _dark: { color: 'tor.200' },
                  textDecoration: 'underline',
                }}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <FaLink size={10} />
                {category.name}
              </Link>
              {index < categories.length - 1 && (
                <Text color="gray.400" fontSize="sm">
                  •
                </Text>
              )}
            </HStack>
          ))}
        </HStack>
      </Container>
    </Box>
  );
};

export default CategoryNav;
