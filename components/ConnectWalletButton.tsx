import Button from 'components/primitives/Button'
import React, { useEffect, useState } from 'react'
import { useConnect } from 'wagmi'

const ConnectWalletButton: React.FC = () => {
  const { connect, connectors, pendingConnector, isConnecting } = useConnect()
  const connector = connectors[0]

  const [isComponentMounted, setIsComponentMounted] = useState(false)

  useEffect(() => setIsComponentMounted(true), [])

  if (!isComponentMounted) {
    return null
  }

  return (
    <Button
      disabled={!connector.ready}
      key={connector.id}
      onClick={() => connect(connector)}
    >
      Connect Wallet
      {!connector.ready && ' (unsupported)'}
      {isConnecting && connector.id === pendingConnector?.id && ' (connecting)'}
    </Button>
  )
}

export default ConnectWalletButton
