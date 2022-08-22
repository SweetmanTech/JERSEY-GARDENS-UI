import { Box } from 'degen'
import MusicMetadataForm from '@components/MusicMetadataForm'
import ProjectMetadataForm from '@components/ProjectMetadataForm'
import ContractMetadataForm from '@components/ContractMetadataForm'
import ZoraSalesConfigForm from '@components/ZoraSalesConfigForm'
import CreateDropButton from '@components/CreateDropButton'
import Accordion from '@components/Accordion'

const CreateForm = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width={{ md: '180' }}
      alignItems="center"
      gap="5"
      marginBottom={15}
    >
      <Accordion buttonText="Music Metadata" content={<MusicMetadataForm />} />
      <Accordion buttonText="Project Metadata" content={<ProjectMetadataForm />} />
      <Accordion buttonText="Contract Metadata" content={<ContractMetadataForm />} />
      <Accordion buttonText="Zora Sales Config" content={<ZoraSalesConfigForm />} />
      <CreateDropButton />
    </Box>
  )
}

export default CreateForm
