import {
  Box,
  BoxProps,
  CloseButton,
  Divider,
  Flex,
  FlexProps,
  HStack,
  Icon,
  Link,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactText } from 'react';
import { IconType } from 'react-icons';
import { FaSpotify } from 'react-icons/fa';
import { SIDEBAR_WIDTH } from '..';
import { LinkItems } from '../LINK_ITEMS';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <NextLink href={href} passHref>
      <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          gap={4}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? 'cyan.400' : 'null'}
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}
        >
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />

          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      w={{ base: 'full', md: SIDEBAR_WIDTH }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        flex={'1'}
        justifyContent={{ base: 'space-between', md: 'center' }}
      >
        <HStack>
          <Icon
            w={10}
            h={10}
            color="spotify.logo"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={FaSpotify}
          />

          <Text
            fontSize="28"
            fontWeight="bold"
            letterSpacing={0.5}
            textTransform="uppercase"
            borderLeft="1px solid white"
            paddingLeft={2}
          >
            Explorify
          </Text>
        </HStack>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
