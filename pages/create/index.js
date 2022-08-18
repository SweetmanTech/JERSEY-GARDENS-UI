import CreatePage from '@components/CreatePage/CreatePage'
import MusicMetadataProvider from '@providers/MusicMetadataProvider'

const Create = () => {
  return (
    <MusicMetadataProvider>
      <CreatePage />
    </MusicMetadataProvider>
  )
}

export default Create
