import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Spinner,
  Center,
  Text,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  memoPath: string;
  itemName: string;
}

const MemoModal = ({ isOpen, onClose, memoPath, itemName }: MemoModalProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen && memoPath) {
      setLoading(true);
      setError('');

      // Fetch the markdown file with correct base URL
      const baseUrl = import.meta.env.BASE_URL;
      const fullPath = `${baseUrl}${memoPath}`;

      fetch(fullPath)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to load memo');
          }
          return response.text();
        })
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [isOpen, memoPath]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="90vh">
        <ModalHeader>{itemName} - Detailed Analysis</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading && (
            <Center py={12}>
              <Spinner size="xl" color="tor.500" />
            </Center>
          )}

          {error && (
            <Center py={12}>
              <Text color="red.500">Error loading memo: {error}</Text>
            </Center>
          )}

          {!loading && !error && (
            <Box
              className="markdown-content"
              sx={{
                'h1': {
                  fontSize: '2xl',
                  fontWeight: 'bold',
                  mb: 4,
                  mt: 6,
                  color: 'tor.600',
                  _dark: { color: 'tor.400' },
                },
                'h2': {
                  fontSize: 'xl',
                  fontWeight: 'bold',
                  mb: 3,
                  mt: 5,
                  color: 'tor.600',
                  _dark: { color: 'tor.400' },
                },
                'h3': {
                  fontSize: 'lg',
                  fontWeight: 'bold',
                  mb: 2,
                  mt: 4,
                  color: 'tor.600',
                  _dark: { color: 'tor.400' },
                },
                'h4': {
                  fontSize: 'md',
                  fontWeight: 'bold',
                  mb: 2,
                  mt: 3,
                },
                'p': {
                  mb: 3,
                  lineHeight: 'tall',
                },
                'ul, ol': {
                  mb: 3,
                  pl: 6,
                },
                'li': {
                  mb: 1,
                },
                'code': {
                  bg: 'gray.100',
                  _dark: { bg: 'gray.700' },
                  px: 1,
                  py: 0.5,
                  borderRadius: 'sm',
                  fontSize: 'sm',
                  fontFamily: 'mono',
                },
                'pre': {
                  bg: 'gray.100',
                  _dark: { bg: 'gray.700' },
                  p: 4,
                  borderRadius: 'md',
                  overflow: 'auto',
                  mb: 4,
                },
                'pre code': {
                  bg: 'transparent',
                  p: 0,
                },
                'table': {
                  width: '100%',
                  mb: 4,
                  borderCollapse: 'collapse',
                },
                'th': {
                  bg: 'gray.100',
                  _dark: { bg: 'gray.700', borderColor: 'gray.600' },
                  p: 2,
                  border: '1px solid',
                  borderColor: 'gray.300',
                  fontWeight: 'bold',
                  textAlign: 'left',
                },
                'td': {
                  p: 2,
                  border: '1px solid',
                  borderColor: 'gray.300',
                  _dark: { borderColor: 'gray.600' },
                },
                'blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'tor.500',
                  pl: 4,
                  ml: 0,
                  mb: 4,
                  fontStyle: 'italic',
                },
                'hr': {
                  my: 6,
                  borderColor: 'gray.300',
                  _dark: { borderColor: 'gray.600' },
                },
                'a': {
                  color: 'tor.500',
                  _hover: { textDecoration: 'underline' },
                },
                'strong': {
                  fontWeight: 'bold',
                },
                'em': {
                  fontStyle: 'italic',
                },
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="tor" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MemoModal;
