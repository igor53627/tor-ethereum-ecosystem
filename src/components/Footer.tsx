import {
  Box,
  Container,
  Text,
  Link,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { SiTorbrowser } from 'react-icons/si';

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="white"
      _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
      borderTop="1px"
      borderColor="gray.200"
      py={8}
      mt={12}
    >
      <Container maxW="100%" px={{ base: 4, md: 8, lg: 12 }}>
        <HStack spacing={4} justify="center" align="center" flexWrap="wrap">
          <HStack spacing={2}>
            <Icon as={SiTorbrowser} boxSize={5} color="tor.500" _dark={{ color: 'tor.300' }} />
            <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
              Tor in Ethereum Ecosystem
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.400">
            •
          </Text>
          <Link
            href="https://github.com/igor53627/tor-ethereum-ecosystem"
            isExternal
            display="flex"
            alignItems="center"
            gap={2}
            fontSize="sm"
            color="gray.600"
            _dark={{ color: 'gray.400' }}
            _hover={{
              color: 'tor.500',
              _dark: { color: 'tor.300' },
              textDecoration: 'underline',
            }}
          >
            <Icon as={FaGithub} boxSize={5} />
            View on GitHub
          </Link>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
