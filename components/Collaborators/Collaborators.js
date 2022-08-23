import { Box, Button, Input, Stack, Text } from 'degen'
import { useMusicMetadata } from 'music-metadata-ipfs'

const Collaborators = () => {
  const { metadata, setMetadata } = useMusicMetadata()

  const handleAddButtonClick = () => {
    setMetadata({
      ...metadata,
      credits: metadata.credits ? metadata.credits.concat({}) : [{}],
    })
  }

  const handleDeleteButtonClick = (indexToRemove) => {
    const credits = [...metadata.credits]
    credits.splice(indexToRemove, 1)
    setMetadata({
      ...metadata,
      credits,
    })
  }

  return (
    <>
      <Text variant="headingTwo">Collaborators</Text>
      {metadata?.credits?.map((collaborator, index) => (
        <Stack direction="horizontal" key={index} align="flex-end">
          <Input
            placeholder="sagrado.eth"
            label="collaborator name"
            value={metadata.credits[index].name}
            onChange={(e) => {
              const newCredits = metadata?.credits ? metadata.credits : []
              newCredits[index] = { ...newCredits[index], name: e.target.value }
              setMetadata({
                ...metadata,
                credits: newCredits,
              })
            }}
          />
          <Input
            placeholder="collaborator type"
            label="creator"
            value={metadata.credits[index].collaboratorType}
            onChange={(e) => {
              const newCredits = [...metadata.credits]
              newCredits[index] = {
                ...newCredits[index],
                collaboratorType: e.target.value,
              }
              setMetadata({
                ...metadata,
                credits: newCredits,
              })
            }}
          />
          <Button variant="secondary" onClick={() => handleDeleteButtonClick(index)}>
            delete
          </Button>
        </Stack>
      ))}
      <Button onClick={handleAddButtonClick}>+ new collaborator</Button>
    </>
  )
}

export default Collaborators
