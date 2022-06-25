import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { channels } from '@epnsproject/frontend-sdk-staging'

export default function useUserSubscribed(lastRefreshed: number | undefined) {
  const { data: account } = useAccount()
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (!account?.address) {
      setIsSubscribed(false)
      return
    }

    channels
      .isUserSubscribed(
        account?.address,
        '0xC55b549489723ea30B4C3c555b323e06753fc8D9'
      )
      .then((subscribed) => {
        setIsSubscribed(subscribed)
      })
  }, [account, lastRefreshed])

  return isSubscribed
}
