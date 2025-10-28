import {
  Card,
  CardBody,
  Heading,
  Text,
  HStack,
  VStack,
  Link,
  IconButton,
  useClipboard,
  useToast,
  Box,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt, FaCopy, FaCheck } from 'react-icons/fa';
import { SiTorbrowser } from 'react-icons/si';
import StatusBadge from './StatusBadge';
import type { Item } from '../types';

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const onionUrl = 'onionUrl' in item ? item.onionUrl : undefined;
  const { hasCopied, onCopy } = useClipboard(onionUrl || '');
  const toast = useToast();

  const handleCopy = () => {
    onCopy();
    toast({
      title: 'Copied to clipboard',
      description: 'Onion URL has been copied',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Card variant="elevated" size="sm">
      <CardBody>
        <VStack align="stretch" spacing={3}>
          <Flex justify="space-between" align="start">
            <Heading size="md" fontFamily="heading">
              {item.name}
            </Heading>
            <HStack spacing={2}>
              {item.tags.map((tag) => (
                <StatusBadge key={tag} tag={tag} />
              ))}
            </HStack>
          </Flex>

          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
            {item.description}
          </Text>

          {onionUrl && (
            <Box
              bg="tor.800"
              _dark={{ bg: 'tor.900' }}
              p={3}
              borderRadius="md"
              border="1px solid"
              borderColor="tor.600"
            >
              <Flex justify="space-between" align="center" gap={2}>
                <HStack spacing={2} flex={1} minW={0}>
                  <Box flexShrink={0}>
                    <SiTorbrowser color="#7d33b8" />
                  </Box>
                  <Text
                    fontSize="xs"
                    fontFamily="mono"
                    color="tor.200"
                    isTruncated
                    wordBreak="break-all"
                  >
                    {onionUrl}
                  </Text>
                </HStack>
                <IconButton
                  aria-label="Copy onion URL"
                  icon={hasCopied ? <FaCheck /> : <FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="tor"
                  onClick={handleCopy}
                  flexShrink={0}
                />
              </Flex>
            </Box>
          )}

          {'types' in item && item.types && item.types.length > 0 && (
            <HStack spacing={2}>
              {item.types.map((type) => (
                <Badge key={type} colorScheme="purple" fontSize="xs">
                  {type}
                </Badge>
              ))}
            </HStack>
          )}

          <HStack spacing={3} pt={2}>
            {item.website && (
              <Link href={item.website} isExternal>
                <HStack spacing={1} fontSize="sm" color="tor.500">
                  <FaExternalLinkAlt size={12} />
                  <Text>Website</Text>
                </HStack>
              </Link>
            )}
            {item.github && (
              <Link href={item.github} isExternal>
                <HStack spacing={1} fontSize="sm" color="tor.500">
                  <FaGithub size={14} />
                  <Text>GitHub</Text>
                </HStack>
              </Link>
            )}
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ItemCard;
