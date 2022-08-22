import { Button, Spinner } from 'degen'
import { useMusicMetadata } from 'music-metadata-ipfs'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useCreateDrop } from '@providers/CreateDropProvider'

const CreateDropButton = () => {
  const { contractMetadata, createIpfsMetadata } = useMusicMetadata()
  const { createDrop } = useCreateDrop()
  const [loading, setLoading] = useState(false)

  const createMetadata = async (metadata) => {
    const ipfs = await createIpfsMetadata(metadata)

    if (ipfs?.error) {
      toast.error(ipfs.error)
      return ipfs
    } else {
      toast.success(
        <a href={ipfs.url} target="__blank">
          IPFS Metadata Created (view here)
        </a>
      )
      return ipfs.url
    }
  }

  const handleClick = async () => {
    setLoading(true)
    const tokenUri = await createMetadata()
    if (!tokenUri.error) {
      const contractUri = await createMetadata(contractMetadata)
      if (!contractUri.error) {
        await createDrop(tokenUri + '?', contractUri)
      }
    }
    setLoading(false)
  }

  return (
    <Button width="full" disabled={loading} onClick={handleClick}>
      {loading ? <Spinner /> : 'Create Drop'}
    </Button>
  )
}

export default CreateDropButton
