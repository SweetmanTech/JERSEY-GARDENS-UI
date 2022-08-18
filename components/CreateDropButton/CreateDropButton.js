import { Box, Button, Input, Spinner, Text } from 'degen'
import { useAccount, useSigner, useNetwork } from 'wagmi'
import { ethers } from 'ethers'
import abi from '@lib/ZoraNFTCreatorV1-abi.json'
import getZoraNFTCreatorV1Address from '@lib/getZoraNFTCreatorV1Address'
import { useState } from 'react'
import { toast } from 'react-toastify'
import MusicMetadataForm from '@components/MusicMetadataForm'
import { useMusicMetadata } from '@providers/MusicMetadataProvider'
import { NFTStorage } from 'nft.storage'

const CreateDropButton = () => {
  const { metadata } = useMusicMetadata()
  const { data: account } = useAccount()
  const { activeChain } = useNetwork()
  const { data: signer } = useSigner()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('sweets the engineer')
  const [symbol, setSymbol] = useState('MUSIC')
  const [defaultAdmin, setDefaultAdmin] = useState(account?.address)
  const [editionSize, setEditionSize] = useState(1000000)
  const [royaltyBps, setRoyaltyBps] = useState(300)
  const [fundsRecipient, setFundsRecipient] = useState(account?.address)
  const [publicSalePrice, setPublicSalePrice] = useState('10000000000000000')
  const [maxSalePurchasePerAddress, setMaxSalePurchasePerAddress] = useState(0)
  const [publicSaleStart, setPublicSaleStart] = useState(Math.round(Date.now() / 1000))
  const [publicSaleEnd, setPublicSaleEnd] = useState(publicSaleStart + 60 * 60 * 24)
  const [presaleStart, setPresaleStart] = useState(0)
  const [presaleEnd, setPresaleEnd] = useState(0)
  const [presaleMerkleRoot, setPresaleMerkleRoot] = useState(
    '0x0000000000000000000000000000000000000000000000000000000000000000'
  )
  const [metadataURIBase, setMetadataURIBase] = useState(
    'ipfs://bafkreihpvyzqb76nupvb5tukbx55ypnldy6bhcg2qa3ocsuangmcy2sgxi?'
  )
  const [metadataContractURI, setMetadataContractURI] = useState(
    'ipfs://bafkreihpvyzqb76nupvb5tukbx55ypnldy6bhcg2qa3ocsuangmcy2sgxi'
  )
  const contractAddress = getZoraNFTCreatorV1Address(activeChain?.id)
  const contract = new ethers.Contract(contractAddress, abi, signer)

  const handleClick = async () => {
    setLoading(true)
    const ipfs = await createIpfsMetadata()
    if (ipfs.error) {
      toast.error(ipfs.error)
    } else {
      toast.success(
        <a href={ipfs.url} target="__blank">
          IPFS Metadata Created (view here)
        </a>
      )
      const uriBase = ipfs.url + '?'
      await createDrop(uriBase)
    }
    setLoading(false)
  }

  const createIpfsMetadata = async () => {
    if (!metadata.image) {
      return { error: 'Please upload an image' }
    }
    const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY })
    const ipfs = await client
      .store(metadata)
      .then((response) => response)
      .catch((error) => ({ error }))
    return ipfs
  }

  const createDrop = (uriBase) => {
    return contract
      .createDrop(
        name,
        symbol,
        defaultAdmin || account?.address,
        editionSize,
        royaltyBps,
        fundsRecipient || account?.address,
        [
          publicSalePrice,
          maxSalePurchasePerAddress,
          publicSaleStart,
          publicSaleEnd,
          presaleStart,
          presaleEnd,
          presaleMerkleRoot,
        ],
        uriBase,
        metadataContractURI
      )
      .then(async (tx) => {
        const receipt = await tx.wait()
        const dropAddress = receipt.events.find((e) => e.event === 'CreatedDrop').args
          .editionContractAddress
        toast.success(
          <a target="__blank" href={`/${activeChain.id}/${dropAddress}`}>
            view drop here
          </a>
        )
        return receipt
      })
      .catch(console.error)
  }
  return (
    <Box display="flex" flexDirection="column" width={{ md: '180' }} alignItems="center">
      <Text>Metadata</Text>
      <MusicMetadataForm />
      <Input
        placeholder={metadataContractURI}
        label="metadata contract URI"
        onChange={(e) => setMetadataContractURI(e.target.value)}
      />
      <Input
        placeholder="drop name"
        label="contract name"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder={symbol}
        label="contract symbol"
        onChange={(e) => setSymbol(e.target.value)}
      />
      <Input
        placeholder={defaultAdmin}
        label="default admin"
        onChange={(e) => setDefaultAdmin(e.target.value)}
      />
      <Input
        placeholder={editionSize}
        label="edition size"
        type="number"
        onChange={(e) => setEditionSize(e.target.value)}
      />
      <Input
        placeholder={royaltyBps}
        label="royalty bps"
        onChange={(e) => setRoyaltyBps(e.target.value)}
      />
      <Input
        placeholder={fundsRecipient}
        label="funds recipient"
        onChange={(e) => setFundsRecipient(e.target.value)}
      />
      <Text>Sales Config</Text>
      <Input
        placeholder={publicSalePrice}
        label="public sale price (wei)"
        onChange={(e) => setPublicSalePrice(e.target.value)}
      />
      <Input
        placeholder="0 (infinite)"
        label="max sale purchase per address"
        onChange={(e) => setMaxSalePurchasePerAddress(e.target.value)}
      />
      <Input
        placeholder="epoch seconds (defaults to now)"
        label="public sale start"
        type="number"
        onChange={(e) => setPublicSaleStart(e.target.value)}
      />
      <Input
        placeholder="epoch seconds (defaults to 48 hours)"
        label="public sale end"
        type="number"
        onChange={(e) => setPublicSaleEnd(e.target.value)}
      />
      <Input
        placeholder={presaleStart}
        label="presale start"
        type="number"
        onChange={(e) => setPresaleStart(e.target.value)}
      />
      <Input
        placeholder={presaleEnd}
        label="presale end"
        type="number"
        onChange={(e) => setPresaleEnd(e.target.value)}
      />
      <Input
        placeholder={presaleMerkleRoot}
        label="presale merkle root"
        onChange={(e) => setPresaleMerkleRoot(e.target.value)}
      />

      <Button width="full" disabled={loading} onClick={handleClick}>
        {loading ? <Spinner /> : 'Create Drop'}
      </Button>
    </Box>
  )
}

export default CreateDropButton
