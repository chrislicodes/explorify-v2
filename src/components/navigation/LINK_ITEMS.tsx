import { IconType } from 'react-icons';
import {
  BsFillHouseDoorFill,
  BsFillPersonFill,
  BsMusicNoteBeamed,
  BsSearch,
} from 'react-icons/bs';
import { ImHeadphones } from 'react-icons/im';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

export const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: () => <BsFillHouseDoorFill />, href: '/app' },
  {
    name: 'Top Artist',
    icon: () => <BsFillPersonFill />,
    href: '/app/top/artists',
  },
  {
    name: 'Top Tracks',
    icon: () => <BsMusicNoteBeamed />,
    href: '/app/top/tracks',
  },
  {
    name: 'Track Mixer',
    icon: () => <ImHeadphones />,
    href: '/app/trackmixer',
  },
  { name: 'Search', icon: () => <BsSearch />, href: '/app/search' },
];
