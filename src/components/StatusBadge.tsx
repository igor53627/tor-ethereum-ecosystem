import { Badge } from '@chakra-ui/react';

interface StatusBadgeProps {
  tag: string;
}

const StatusBadge = ({ tag }: StatusBadgeProps) => {
  const getVariant = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag === 'wip') return 'wip';
    if (lowerTag === 'native') return 'native';
    if (lowerTag === 'snowflake') return 'snowflake';
    return 'solid';
  };

  return (
    <Badge variant={getVariant(tag)} fontSize="xs" px={2} py={1} borderRadius="md">
      {tag}
    </Badge>
  );
};

export default StatusBadge;
