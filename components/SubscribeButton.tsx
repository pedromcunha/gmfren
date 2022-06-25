import { channels } from '@epnsproject/frontend-sdk-staging'
import Button from 'components/primitives/Button'
import React, { FC, useEffect, useState } from 'react'
import { chainId, useAccount, useSigner } from 'wagmi'

const SubscribeButton: FC = () => {
  const { data: signer } = useSigner()
  const { data: account } = useAccount()
  const [channel, setChannel] = useState<any>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    channels.getChannelByAddress('').then((details) => {
      setChannel(details)
    })
  }, [])

  useEffect(() => {
    setIsSubscribed(channels.isUserSubscribed(account, ''))
  }, [account])

  if (!channel)
    return (
      <Button
        onClick={() => () => {
          isSubscribed
            ? channels.optOut(signer, channel.addr, chainId.kovan, account, {
                baseApiUrl: 'https://backend-kovan.epns.io/apis',
              })
            : channels.optIn(signer, channel.addr, chainId.kovan, account, {
                baseApiUrl: 'https://backend-kovan.epns.io/apis',
                onSuccess: () => setIsSubscribed(true),
              })
        }}
      >
        {isSubscribed ? 'Subscribe' : 'Sunsubscribe'}
      </Button>
    )
}

export default SubscribeButton
