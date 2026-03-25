import { Avatar } from '@fluentui/react-components';

interface AgentIconProps {
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  logoUrl?: string;
}

const LOGO = 'https://www.nureva.com/hubfs/support/help-center-trial-072020/Console%20logo.png';

export function AgentIcon({
  alt = "AI Assistant",
  size = 'medium',
}: AgentIconProps) {
  const sizeMap: Record<string, number> = {
    small: 24,
    medium: 32,
    large: 40,
  };

  return (
    <Avatar
      aria-label={alt}
      image={{ src: LOGO, style: { objectFit: 'contain', width: '100%', height: '100%' } }}
      size={sizeMap[size] as 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128}
      color="brand"
    />
  );
}
