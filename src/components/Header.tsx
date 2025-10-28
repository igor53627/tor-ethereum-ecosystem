import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorMode,
  Flex,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { SiTorbrowser } from 'react-icons/si';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg="white"
      _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
      borderBottom="1px"
      borderColor="gray.200"
      py={6}
      mb={8}
    >
      <Container maxW="100%" px={{ base: 4, md: 8, lg: 12 }}>
        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <SiTorbrowser size={40} color="#7d33b8" />
            <Box>
              <Heading
                size="lg"
                fontFamily="heading"
                color="tor.500"
                _dark={{ color: 'tor.300' }}
              >
                Tor in Ethereum Ecosystem
              </Heading>
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Privacy-preserving tools and infrastructure for Ethereum
              </Text>
            </Box>
          </HStack>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
            size="lg"
            colorScheme="tor"
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
