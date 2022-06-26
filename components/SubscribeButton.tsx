import { channels } from '@epnsproject/frontend-sdk-staging'
import Button from 'components/primitives/Button'
import useUserSubscribed from 'hooks/useUserSubscribed'
import React, { FC, useState } from 'react'
import { chainId, useAccount, useSigner } from 'wagmi'

const SubscribeButton: FC = () => {
  const { data: signer } = useSigner()
  const { data: account } = useAccount()
  const [subscribedTime, setSubscribedTime] = useState<undefined | number>()
  const isSubscribed = useUserSubscribed(subscribedTime)

  return (
    <Button
      onClick={() => {
        if (isSubscribed) {
          channels.optOut(
            signer,
            '0xC55b549489723ea30B4C3c555b323e06753fc8D9',
            chainId.kovan,
            account.address,
            {
              baseApiUrl: 'https://backend-kovan.epns.io/apis',
              onSuccess: () => setSubscribedTime(new Date().getTime()),
              onError: (err) => {
                console.log(err)
              },
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
              onSuccess: () => setSubscribedTime(new Date().getTime()),
            }
          )
        }
      }}
    >
      {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </Button>
  )
}

export default SubscribeButton
