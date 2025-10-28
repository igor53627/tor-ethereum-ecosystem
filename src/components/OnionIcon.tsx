import { Icon } from '@chakra-ui/react';

interface OnionIconProps {
  boxSize?: number | string;
  color?: string;
  _dark?: Record<string, unknown>;
}

const OnionIcon = (props: OnionIconProps) => {
  return (
    <Icon viewBox="0 0 100 100" {...props}>
      {/* Onion leaves/sprout */}
      <path
        d="M 45 15 Q 40 5, 35 10 Q 30 15, 35 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 50 10 Q 50 0, 50 0 Q 50 0, 50 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 55 15 Q 60 5, 65 10 Q 70 15, 65 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Outer onion bulb */}
      <ellipse
        cx="50"
        cy="60"
        rx="30"
        ry="35"
        fill="currentColor"
        opacity="0.2"
      />

      {/* Middle onion layer */}
      <ellipse
        cx="50"
        cy="60"
        rx="22"
        ry="27"
        fill="currentColor"
        opacity="0.4"
      />

      {/* Inner onion layer */}
      <ellipse
        cx="50"
        cy="60"
        rx="14"
        ry="19"
        fill="currentColor"
        opacity="0.6"
      />

      {/* Center core */}
      <ellipse
        cx="50"
        cy="60"
        rx="6"
        ry="11"
        fill="currentColor"
        opacity="0.8"
      />

      {/* Onion root lines */}
      <path
        d="M 45 90 Q 43 95, 40 98"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 50 92 Q 50 96, 50 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 55 90 Q 57 95, 60 98"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </Icon>
  );
};

export default OnionIcon;
