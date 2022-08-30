import React, { useContext, useState } from 'react'
import { useAccount, useNetwork, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import getZoraNFTCreatorV1Address from '@lib/getZoraNFTCreatorV1Address'
import abi from '@lib/ZoraNFTCreatorV1-abi.json'
import { toast } from 'react-toastify'

export const CreateDropContext = React.createContext({})

export const CreateDropProvider = ({ children }) => {
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const { activeChain } = useNetwork()
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('MUSIC')
  const [defaultAdmin, setDefaultAdmin] = useState(account?.address)
  const [musicMetadata, setMusicMetadata] = useState(account?.address)
  const [contractMetadata, setContractMetadata] = useState(account?.address)
  const [editionSize, setEditionSize] = useState(100)
  const [royaltyBps, setRoyaltyBps] = useState(300)
  const [lengthOfDrop, setLengthOfDrop] = useState(31)
  const [fundsRecipient, setFundsRecipient] = useState(account?.address)
  const [publicSalePrice, setPublicSalePrice] = useState('0')
  const [maxSalePurchasePerAddress, setMaxSalePurchasePerAddress] = useState(1)
  const [publicSaleStart, setPublicSaleStart] = useState(Math.round(Date.now() / 1000))
  const [publicSaleEnd, setPublicSaleEnd] = useState(publicSaleStart + 60 * 60 * 24 * 31)
  const [presaleStart, setPresaleStart] = useState(0)
  const [presaleEnd, setPresaleEnd] = useState(0)
  const [presaleMerkleRoot, setPresaleMerkleRoot] = useState(
    '0x0000000000000000000000000000000000000000000000000000000000000000'
  )
  const contractAddress = getZoraNFTCreatorV1Address(activeChain?.id)
  const contract = new ethers.Contract(contractAddress, abi, signer)

  const createDrop = () => {
    console.log('CREATING DROP')
    const uriBase = musicMetadata + '?'
    console.log('uriBase', uriBase)

    //'ipfs://bafyreih3xnktib5ghccu4nnnmuzo67m3kssp6mddlpjaqygtawrckepx6q/metadata.json'
    const contractUri = contractMetadata
    const dropDurationSeconds = 60 * 60 * 24 * lengthOfDrop
    const publicSaleEnd = publicSaleStart + dropDurationSeconds
    console.log('publicSaleEnd', publicSaleEnd)

    // 'ipfs://bafyreifkmolfi5cc6agx7mj64dpponmxuino2fymsxmssk6lonps224dam/metadata.json'

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
        contractUri
      )
      .then(async (tx) => {
        const receipt = await tx.wait()
        const dropAddress = receipt.events.find((e) => e.event === 'CreatedDrop').args
          .editionContractAddress
        toast.success(
          <a target="__blank" href={`/${activeChain.id}/${dropAddress}`}>
            view drop here
          </a>,
          { autoClose: false, closeOnClick: false }
        )
        return receipt
      })
      .catch(console.error)
  }

  return (
    <CreateDropContext.Provider
      value={{
        createDrop,
        name,
        setContractMetadata,
        setMusicMetadata,
        lengthOfDrop,
        setLengthOfDrop,
        setName,
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
