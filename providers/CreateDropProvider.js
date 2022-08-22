import React, { useContext, useState } from 'react'
import { useAccount, useNetwork, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import getZoraNFTCreatorV1Address from '@lib/getZoraNFTCreatorV1Address'
import abi from '@lib/ZoraNFTCreatorV1-abi.json'
import { useMusicMetadata } from 'music-metadata-ipfs'
import { toast } from 'react-toastify'

export const CreateDropContext = React.createContext({})

export const CreateDropProvider = ({ children }) => {
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const { activeChain } = useNetwork()
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
  const contractAddress = getZoraNFTCreatorV1Address(activeChain?.id)
  const contract = new ethers.Contract(contractAddress, abi, signer)
  const { contractMetadata } = useMusicMetadata()

  const createDrop = (uriBase, contractUri) => {
    return contract
      .createDrop(
        contractMetadata.name,
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
        contractUri
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
    <CreateDropContext.Provider
      value={{
        createDrop,
        symbol,
        setSymbol,
        defaultAdmin,
        setDefaultAdmin,
        editionSize,
        setEditionSize,
        royaltyBps,
        setRoyaltyBps,
        fundsRecipient,
        setFundsRecipient,
        publicSalePrice,
        setPublicSalePrice,
        maxSalePurchasePerAddress,
        setMaxSalePurchasePerAddress,
        publicSaleStart,
        setPublicSaleStart,
        publicSaleEnd,
        setPublicSaleEnd,
        presaleStart,
        setPresaleStart,
        presaleEnd,
        setPresaleEnd,
        presaleMerkleRoot,
        setPresaleMerkleRoot,
      }}
    >
      {children}
    </CreateDropContext.Provider>
  )
}

export const useCreateDrop = () => useContext(CreateDropContext)
