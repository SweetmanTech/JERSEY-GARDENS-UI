import { Button } from 'degen'
import { useAccount, useSigner, useNetwork } from 'wagmi'
import { ethers } from 'ethers'
import abi from '@lib/ZoraNFTCreatorV1-abi.json'
import getZoraNFTCreatorV1Address from '@lib/getZoraNFTCreatorV1Address'

const CreateDropButton = () => {
  const { data: account } = useAccount()
  const { activeChain } = useNetwork()
  const { data: signer } = useSigner()

  const contractAddress = getZoraNFTCreatorV1Address(activeChain?.id)
  const contract = new ethers.Contract(contractAddress, abi, signer)

  const handleClick = async () => {
    await createDrop()
  }

  const createDrop = () => {
    const name = 'sweets the engineer'
    const symbol = 'MUSIC'
    const defaultAdmin = account.address
    const editionSize = 1000000
    const royaltyBps = 300
    const fundsRecipient = account.address
    // SALE CONFIG
    const publicSalePrice = '10000000000000000'
    const maxSalePurchasePerAddress = 0
    const publicSaleStart = Math.round(Date.now() / 1000)
    const publicSaleEnd = publicSaleStart + 86400
    const presaleStart = 0
    const presaleEnd = 0
    const presaleMerkleRoot =
      '0x0000000000000000000000000000000000000000000000000000000000000000'
    // END SALE CONFIG
    const metadataURIBase =
      'ipfs://bafkreihpvyzqb76nupvb5tukbx55ypnldy6bhcg2qa3ocsuangmcy2sgxi?'
    const metadataContractURI =
      'ipfs://bafkreihpvyzqb76nupvb5tukbx55ypnldy6bhcg2qa3ocsuangmcy2sgxi?'
    return contract
      .createDrop(
        name,
        symbol,
        defaultAdmin,
        editionSize,
        royaltyBps,
        fundsRecipient,
        [
          publicSalePrice,
          maxSalePurchasePerAddress,
          publicSaleStart,
          publicSaleEnd,
          presaleStart,
          presaleEnd,
          presaleMerkleRoot,
        ],
        metadataURIBase,
        metadataContractURI
      )
      .then(async (tx) => {
        const receipt = await tx.wait()
        return receipt
      })
  }
  return <Button onClick={handleClick}>Create Drop</Button>
}

export default CreateDropButton
