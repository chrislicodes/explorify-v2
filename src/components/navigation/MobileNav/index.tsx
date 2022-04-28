import {
  Avatar,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { FiMenu } from 'react-icons/fi';
import { User } from 'src/pages/api/me';
import useSWR from 'swr';
import { SIDEBAR_WIDTH } from '..';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { data: user, error } = useSWR<{ user: User }>('/api/me', fetcher);

  return (
    <Flex
      ml={{ base: 0, md: SIDEBAR_WIDTH }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>
      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              {user && (
                <HStack>
                  <Avatar size={'sm'} src={user.user.imageUrl} />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="md">{user.user.name}</Text>
                  </VStack>
                </HStack>
              )}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() =>
                  signOut({ callbackUrl: `${window.location.origin}/` })
                }
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
