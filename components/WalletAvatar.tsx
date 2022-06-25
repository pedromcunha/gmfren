import { Box } from 'components/primitives/Box'
import { Flex } from 'components/primitives/Flex'
import { Text } from 'components/primitives/Text'
import { FC } from 'react'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

const WalletAvatar: FC = () => {
  const { data: account } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
  const { data: ensName } = useEnsName({ address: account?.address })

  return (
    <Flex align="center" css={{ marginBottom: '$4' }}>
      <Box css={{ marginRight: '$3' }}>
        {ensAvatar ? (
          <img
            style={{ borderRadius: '50%', width: 50, height: 50 }}
            src={ensAvatar}
          />
        ) : (
          <Jazzicon
            diameter={50}
            seed={jsNumberForAddress(account.address || '')}
          />
        )}
      </Box>
      <Box>
        <Box>
          <Text style="h5" css={{ color: '$gray12' }}>
            {ensName || account?.address}
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default WalletAvatar
