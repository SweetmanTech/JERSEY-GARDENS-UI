import { Input, Textarea } from 'degen'
import { useMusicMetadata } from '@providers/MusicMetadataProvider'
import { MediaPicker } from '@components/MediaPicker.tsx'

const MusicMetadataForm = () => {
  const { metadata, setMetadata } = useMusicMetadata()

  return (
    <>
      <Input
        placeholder={metadata.name}
        label="song name"
        onChange={(e) => {
          const nameMetadata = {
            name: e.target.value,
            title: e.target.value,
          }
          setMetadata({ ...metadata, ...nameMetadata })
        }}
      />
      <Input
        placeholder={metadata.artist}
        label="artist name"
        onChange={(e) => {
          const artistMetadata = {
            artist: e.target.value,
            attributes: { ...metadata.attributes, artist: e.target.value },
          }
          setMetadata({ ...metadata, ...artistMetadata })
        }}
      />
      <Textarea
        placeholder={metadata.description}
        label="song description"
        onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
      />
      <MediaPicker
        id="song"
        compact
        maxSize={100}
        accept="audio/wav"
        label="Upload your sound"
        onError={console.error}
        onChange={(e) => {
          const audioMetadata = {
            animation_url: e,
            mimeType: e.type,
          }
          if (audioMetadata.mimeType === 'audio/wav') {
            audioMetadata.losslessAudio = e
          }
          setMetadata({ ...metadata, ...audioMetadata })
        }}
        name="song"
      />
      <MediaPicker
        id="image"
        compact
        accept="image/jpeg, image/png, image/webp, image/gif"
        label="Song cover image"
        onError={console.error}
        onChange={(e) => setMetadata({ ...metadata, image: e })}
      />
      <Input
        placeholder={metadata.external_url}
        label="external url (shows up as a link in open sea)"
        onChange={(e) => setMetadata({ ...metadata, external_url: e.target.value })}
      />
    </>
  )
}

export default MusicMetadataForm
