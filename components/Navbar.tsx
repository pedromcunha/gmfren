import { FC, useState } from 'react'
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
  useDisconnect,
  chainId,
  useSigner,
} from 'wagmi'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Dropdown, DropdownMenuItem } from './primitives/Dropdown'
import { Text } from 'components/primitives/Text'
import { channels } from '@epnsproject/frontend-sdk-staging'
import { useRecoilState } from 'recoil'
import channelSubscribedState from 'atoms/channelSubscribedState'

type HamburgerIconProps = {
  menuOpen: boolean
}

const HamburgerIcon: FC<HamburgerIconProps> = ({ menuOpen }) => {
  if (menuOpen) {
    return <FontAwesomeIcon icon={faClose} width={16} height={16} />
  }
  return <FontAwesomeIcon icon={faBars} width={16} height={16} />
}

const Navbar = () => {
  const { data: signer } = useSigner()
  const [channelSubscribed, setChannelSubscribed] = useRecoilState(
    channelSubscribedState
  )
  const { data: account } = useAccount()
  const { isConnected } = useConnect()
  const { disconnect } = useDisconnect()
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false)
  const isSmallDevice = useMediaQuery(
    'only screen and (max-width : 725px)',
    true
  )

  let walletButton = null

  if (isConnected) {
    walletButton = (
      <Button corners="pill" color="gray3">
        <Jazzicon
          diameter={24}
          seed={jsNumberForAddress(account.address || '')}
        />
        {truncateAddress(account?.address)}
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
              <img style={{ height: 43 }} src="/gmfren.svg" alt="Navbar Logo" />
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
                  {channelSubscribed && (
                    <DropdownMenuItem
                      css={{ padding: 8 }}
                      onClick={() => {
                        channels.optOut(
                          signer,
                          '0xC55b549489723ea30B4C3c555b323e06753fc8D9',
                          chainId.kovan,
                          account.address,
                          {
                            baseApiUrl: 'https://backend-kovan.epns.io/apis',
                            onSuccess: () => setChannelSubscribed(false),
                          }
                        )
                      }}
                    >
                      <Text>Unsubscribe</Text>
                    </DropdownMenuItem>
                  )}
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
