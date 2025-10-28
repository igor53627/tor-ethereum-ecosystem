import { Input, HStack, Select, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTag: string;
  onTagChange: (value: string) => void;
  availableTags: string[];
}

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedTag,
  onTagChange,
  availableTags,
}: SearchFilterProps) => {
  return (
    <HStack spacing={4} mb={6}>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          bg="white"
          _dark={{ bg: 'gray.700' }}
        />
      </InputGroup>
      <Select
        value={selectedTag}
        onChange={(e) => onTagChange(e.target.value)}
        size="lg"
        maxW="250px"
        bg="white"
        _dark={{ bg: 'gray.700' }}
      >
        <option value="">All Tags</option>
        {availableTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </Select>
    </HStack>
  );
};

export default SearchFilter;
