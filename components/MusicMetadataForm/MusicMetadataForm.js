import { Input, Textarea } from 'degen'
import { MediaPicker } from '@components/MediaPicker.tsx'
import { useMusicMetadata } from 'music-metadata-ipfs'

const MusicMetadataForm = () => {
  const { metadata, setMetadata } = useMusicMetadata()

  return (
    <>
      <MediaPicker
        id="image"
        compact
        accept="image/jpeg, image/png, image/webp, image/gif"
        label="Song cover image"
        onError={console.error}
        onChange={(e) => setMetadata({ ...metadata, image: e })}
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

      <Input
        placeholder={metadata.external_url}
        label="external url (shows up as a link in open sea)"
        onChange={(e) => setMetadata({ ...metadata, external_url: e.target.value })}
      />
      <Input
        placeholder={metadata.duration}
        label="duration"
        step="1"
        min={0}
        suffix="seconds"
        type="number"
        onChange={(e) => setMetadata({ ...metadata, duration: parseInt(e.target.value) })}
      />
      <Input
        placeholder={metadata.trackNumber}
        label="track number"
        step="1"
        min={0}
        type="number"
        onChange={(e) =>
          setMetadata({ ...metadata, trackNumber: parseInt(e.target.value) })
        }
      />
      <Input
        placeholder={metadata.genre}
        label="genre"
        onChange={(e) => {
          const genreMetadata = {
            genre: e.target.value,
            attributes: { ...metadata.attributes, genre: e.target.value },
          }
          setMetadata({ ...metadata, ...genreMetadata })
        }}
      />
      <Input
        placeholder={metadata.bpm}
        label="bpm (beats per minute)"
        step="1"
        min={0}
        type="number"
        onChange={(e) => {
          const bpm = parseInt(e.target.value)
          const bpmMetadata = {
            bpm,
            attributes: { ...metadata.attributes, bpm },
          }
          setMetadata({ ...metadata, ...bpmMetadata })
        }}
      />
      <Input
        placeholder={metadata.key}
        label="key"
        onChange={(e) => {
          const keyMetadata = {
            key: e.target.value,
            attributes: { ...metadata.attributes, key: e.target.value },
          }
          setMetadata({ ...metadata, ...keyMetadata })
        }}
      />
    </>
  )
}

export default MusicMetadataForm
