import { channels } from '@epnsproject/frontend-sdk-staging'
import Button from 'components/primitives/Button'
import React, { FC } from 'react'
import { chainId, useAccount, useSigner } from 'wagmi'
import { useRecoilState } from 'recoil'
import channelSubscribedState from 'atoms/channelSubscribedState'

const SubscribeButton: FC = () => {
  const { data: signer } = useSigner()
  const { data: account } = useAccount()
  const [channelSubscribed, setChannelSubscribed] = useRecoilState(
    channelSubscribedState
  )

  return (
    <Button
      onClick={() => {
        if (channelSubscribed) {
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
        } else {
          channels.optIn(
            signer,
            '0xC55b549489723ea30B4C3c555b323e06753fc8D9',
            chainId.kovan,
            account.address,
            {
              baseApiUrl: 'https://backend-kovan.epns.io/apis',
              onSuccess: () => setChannelSubscribed(true),
            }
          )
        }
      }}
    >
      {channelSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </Button>
  )
}

export default SubscribeButton
