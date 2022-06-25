import ConnectWalletButton from 'components/ConnectWalletButton'
import Layout from 'components/Layout'
import { Box } from 'components/primitives/Box'
import { Flex } from 'components/primitives/Flex'
import { Text } from 'components/primitives/Text'
import SubscribeButton from 'components/SubscribeButton'
import useUserSubscribed from 'hooks/useUserSubscribed'
import { NextPage } from 'next'
import { useConnect } from 'wagmi'

const IndexPage: NextPage = () => {
  const { isConnected } = useConnect()
  const isSubscribed = useUserSubscribed(null)

  if (isSubscribed) {
    return (
      <Layout title="gmfren">
        <Flex direction="column" align="center" css={{ mt: 95 }}>
          <Text style="h4" css={{ textAlign: 'center', mb: 64, mt: 52 }}>
            You are all set!
          </Text>
          <Text css={{ display: 'block' }}>
            Go to the app store or play store to download the app.
          </Text>
          <Flex css={{ gap: 16, marginTop: 32 }}>
            <Flex
              direction="column"
              align="center"
              css={{
                border: '1px solid #3A3F42',
                borderRadius: 16,
                padding: '32px 24px',
                gap: 16,
              }}
            >
              <img src="/googleplay.png" width="200px" alt="Google Logo" />
              <img src="/googleqr.png" width="127px" alt="Google QR Code" />
            </Flex>
            <Flex
              direction="column"
              align="center"
              css={{
                border: '1px solid #3A3F42',
                borderRadius: 16,
                padding: '32px 24px',
                gap: 16,
              }}
            >
              <img src="/appstore.png" width="200px" alt="Apple Logo" />
              <img src="/appleqr.png" width="127px" alt="Apple QR Code" />
            </Flex>
          </Flex>
        </Flex>
      </Layout>
    )
  }

  if (isConnected) {
    return (
      <Layout title="gmfren">
        <Flex direction="column" align="center" css={{ mt: 95 }}>
          <Text style="h4" css={{ textAlign: 'center', mb: 64, mt: 52 }}>
            Subscribe to our channel to
            <br /> recieve following events:
          </Text>
          <Box css={{ maxWidth: 471, mb: 163 }}>
            <Box css={{ mb: 24 }}>
              <Text css={{ display: 'block', fontWeight: 700 }}>
                Daily Greetings
              </Text>
              <Text>
                Daily greetings Receive daily greetings and mental health tips
                from gm fren
              </Text>
            </Box>
            <Box>
              <Text css={{ display: 'block', fontWeight: 700 }}>
                Sales Events
              </Text>
              <Text>
                Sales events Receive a message from gm fren whenever one of your
                items sells.
              </Text>
            </Box>
          </Box>
          <SubscribeButton />
        </Flex>
      </Layout>
    )
  }

  return (
    <Layout title="gmfren">
      <Flex direction="column" align="center">
        <img
          style={{ textAlign: 'center', width: 280, marginTop: 60 }}
          src="/bear.png"
          alt="Bear Coffee"
        />
        <Text style="h4" css={{ mb: 12, mt: 52 }}>
          Gm Fren!
        </Text>
        <Text css={{ textAlign: 'center', mb: 52 }}>
          Connect your wallet to receive daily messages from gmfren as well as
          <br />
          real-time updates whenever your listed tokens <br /> are sold or you
          receive a new offer.
        </Text>
        <ConnectWalletButton />
      </Flex>
    </Layout>
  )
}

export default IndexPage
