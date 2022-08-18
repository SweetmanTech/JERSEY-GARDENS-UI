import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Text } from 'degen'
import CreateDropButton from '@components/CreateDropButton'

const CreatePage = () => (
  <Box backgroundColor="black" display="flex" flexDirection="column" alignItems="center">
    <Box
      display="flex"
      padding="6"
      marginBottom="12"
      minWidth="full"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text>Vol FM - Music NFT Drops</Text>
      <ConnectButton />
    </Box>
    <CreateDropButton />
  </Box>
)

export default CreatePage
