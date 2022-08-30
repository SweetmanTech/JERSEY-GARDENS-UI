import { Box, Input } from 'degen'
import CreateDropButton from '@components/CreateDropButton'
import { useCreateDrop } from '@providers/CreateDropProvider'

const CreateForm = () => {
  const {
    setName,
    setSymbol,
    lengthOfDrop,
    setLengthOfDrop,
    setContractMetadata,
    setMusicMetadata,
  } = useCreateDrop()

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={{ md: '180' }}
      alignItems="center"
      gap="5"
      marginBottom={15}
    >
      <Input
        placeholder="contract name"
        label="contract name"
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <Input
        placeholder="MUSIC"
        label="contract symbol"
        onChange={(e) => {
          setSymbol(e.target.value)
        }}
      />
      <Input
        placeholder="ipfs://"
        label="music metadata"
        onChange={(e) => {
          setMusicMetadata(e.target.value)
        }}
      />
      <Input
        placeholder="ipfs://"
        label="contract metadata"
        onChange={(e) => {
          setContractMetadata(e.target.value)
        }}
      />
      <Input
        placeholder={lengthOfDrop}
        type="number"
        label="number of days for drop"
        min={0}
        step={1}
        onChange={(e) => {
          setLengthOfDrop(e.target.value)
        }}
      />
      <CreateDropButton />
    </Box>
  )
}

export default CreateForm
