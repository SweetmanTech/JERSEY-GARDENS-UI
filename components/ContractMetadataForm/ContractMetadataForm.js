import { Input } from 'degen'
import { useMusicMetadata } from 'music-metadata-ipfs'
import { useCreateDrop } from '@providers/CreateDropProvider'

const ContractMetadataForm = () => {
  const { contractMetadata, setContractMetadata } = useMusicMetadata()
  const {
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
  } = useCreateDrop()

  return (
    <>
      <Input
        placeholder="drop name"
        label="contract name"
        onChange={(e) =>
          setContractMetadata({ ...contractMetadata, name: e.target.value })
        }
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
        step="1"
        min={0}
        onChange={(e) => setEditionSize(e.target.value)}
      />
      <Input
        placeholder={royaltyBps}
        label="royalty bps"
        type="number"
        step="1"
        min={0}
        onChange={(e) => {
          setRoyaltyBps(e.target.value)
          setContractMetadata({
            ...contractMetadata,
            seller_fee_basis_points: e.target.value,
          })
        }}
      />
      <Input
        placeholder={fundsRecipient}
        label="funds recipient"
        onChange={(e) => {
          setFundsRecipient(e.target.value)
          setContractMetadata({
            ...contractMetadata,
            fee_recipient: e.target.value,
          })
        }}
      />
    </>
  )
}

export default ContractMetadataForm
