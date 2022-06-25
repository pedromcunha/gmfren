import { FC, useState } from 'react'
import { Avatar } from './primitives/Avatar'
import Button from './primitives/Button'
import { Flex } from './primitives/Flex'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from '@react-hookz/web'
import Link from 'next/link'
import { truncateAddress } from 'utils/truncate'
import { Anchor } from 'components/primitives/Anchor'
import NavbarHamburgerMenu from 'components/NavbarHamburgerMenu'
import ConnectWalletButton from 'components/ConnectWalletButton'
import {
  useConnect,
  useAccount,
  useEnsName,
  useEnsAvatar,
  useDisconnect,
} from 'wagmi'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Dropdown, DropdownMenuItem } from './primitives/Dropdown'
import { Text } from 'components/primitives/Text'

type Props = {
  isWalletConnected?: boolean
}

type HamburgerIconProps = {
  menuOpen: boolean
}

const HamburgerIcon: FC<HamburgerIconProps> = ({ menuOpen }) => {
  if (menuOpen) {
    return <FontAwesomeIcon icon={faClose} width={16} height={16} />
  }
  return <FontAwesomeIcon icon={faBars} width={16} height={16} />
}

const Navbar: FC<Props> = () => {
  const { data: account } = useAccount()
  const { data: ensName } = useEnsName({ address: account?.address })
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
  const { isConnected } = useConnect()
  const { disconnect } = useDisconnect()
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false)
  const isSmallDevice = useMediaQuery(
    'only screen and (max-width : 725px)',
    true
  )

  let address = ''
  let walletButton = null

  if (isConnected) {
    address = ensName ? ensName : truncateAddress(account?.address)
    walletButton = (
      <Button corners="pill" color="gray3">
        {ensAvatar ? (
          <Avatar size="small" src={ensAvatar} />
        ) : (
          <Jazzicon
            diameter={24}
            seed={jsNumberForAddress(account.address || '')}
          />
        )}
        {address}
      </Button>
    )
  }

  return (
    <>
      <Flex
        justify="between"
        css={{
          background: '$gray1',
          borderBottomColor: '$gray7',
          borderBottomWidth: 1,
          px: '$space$5',
          py: '$space$4',
          gap: 24,
        }}
      >
        <Flex align="center" css={{ gap: 24, flex: 1 }}>
          <Link href="/">
            <Anchor>
              <img src="/superset.svg" alt="Navbar Logo" />
            </Anchor>
          </Link>
        </Flex>
        <Flex justify="between" align="center" css={{ gap: 36 }}>
          {isSmallDevice ? (
            <Button
              color="gray3"
              size="xs"
              onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}
            >
              <HamburgerIcon menuOpen={hamburgerMenuOpen} />
            </Button>
          ) : (
            <>
              {isConnected ? (
                <Dropdown
                  trigger={walletButton}
                  contentProps={{ style: { padding: 0 }, sideOffset: 10 }}
                >
                  <DropdownMenuItem
                    css={{ padding: 8 }}
                    onClick={() => {
                      disconnect()
                    }}
                  >
                    <Text>Disconnect</Text>
                  </DropdownMenuItem>
                </Dropdown>
              ) : (
                <ConnectWalletButton />
              )}
            </>
          )}
        </Flex>
      </Flex>
      <NavbarHamburgerMenu open={hamburgerMenuOpen} />
    </>
  )
}

export default Navbar
