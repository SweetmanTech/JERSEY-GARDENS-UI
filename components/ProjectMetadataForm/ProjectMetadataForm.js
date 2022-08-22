import { Input, Textarea } from 'degen'
import { useMusicMetadata } from 'music-metadata-ipfs'
import { MediaPicker } from '@components/MediaPicker.tsx'

const ProjectMetadataForm = () => {
  const { metadata, setMetadata } = useMusicMetadata()

  return (
    <>
      <Input
        placeholder={metadata?.project?.title}
        label="project title"
        onChange={(e) => {
          const projectTitleMetadata = {
            project: { ...metadata.project, title: e.target.value },
            attributes: { ...metadata.attributes, project: e.target.value },
          }
          setMetadata({
            ...metadata,
            ...projectTitleMetadata,
          })
        }}
      />
      <MediaPicker
        id="projectArtwork"
        compact
        accept="image/jpeg, image/png, image/webp, image/gif"
        label="Project artwork"
        onError={console.error}
        onChange={(e) => {
          const artworkMetadata = {
            ...metadata.project,
            artwork: {
              uri: e,
              mimeType: e.type,
            },
          }
          setMetadata({
            ...metadata,
            project: artworkMetadata,
          })
        }}
      />
      <Textarea
        placeholder="project description"
        label="project description"
        onChange={(e) =>
          setMetadata({
            ...metadata,
            project: { ...metadata.project, description: e.target.value },
          })
        }
      />
      <Input
        placeholder="Single / EP / Album"
        label="project type"
        onChange={(e) =>
          setMetadata({
            ...metadata,
            project: { ...metadata.project, type: e.target.value },
          })
        }
      />
      <Input
        placeholder="April 20, 2022"
        label="project original release date"
        onChange={(e) =>
          setMetadata({
            ...metadata,
            project: { ...metadata.project, originalReleaseDate: e.target.value },
          })
        }
      />
      <Input
        placeholder="my record label"
        label="project record label"
        onChange={(e) => {
          const projectLabelMetadata = {
            project: { ...metadata.project, recordLabel: e.target.value },
            attributes: { ...metadata.attributes, recordLabel: e.target.value },
          }
          setMetadata({
            ...metadata,
            ...projectLabelMetadata,
          })
        }}
      />
      <Input
        placeholder="my publisher"
        label="project publisher"
        onChange={(e) =>
          setMetadata({
            ...metadata,
            project: { ...metadata.project, publisher: e.target.value },
          })
        }
      />
      <Input
        placeholder="upc code from distribution company"
        label="project upc"
        onChange={(e) =>
          setMetadata({
            ...metadata,
            project: { ...metadata.project, upc: e.target.value },
          })
        }
      />
    </>
  )
}

export default ProjectMetadataForm
