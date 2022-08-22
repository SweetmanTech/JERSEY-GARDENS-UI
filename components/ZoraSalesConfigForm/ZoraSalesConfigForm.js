import { Input, Text } from 'degen'
import { useCreateDrop } from '@providers/CreateDropProvider'

const ZoraSalesConfigForm = () => {
  const {
    publicSalePrice,
    setPublicSalePrice,
    setMaxSalePurchasePerAddress,
    setPublicSaleStart,
    setPublicSaleEnd,
    presaleStart,
    setPresaleStart,
    presaleEnd,
    setPresaleEnd,
    presaleMerkleRoot,
    setPresaleMerkleRoot,
  } = useCreateDrop()

  return (
    <>
      <Text size="headingTwo">Zora Sales Config</Text>
      <Input
        placeholder={publicSalePrice}
        label="public sale price (wei)"
        type="number"
        min={0}
        step={1}
        onChange={(e) => setPublicSalePrice(e.target.value)}
      />
      <Input
        placeholder="0 (infinite)"
        label="max sale purchase per address"
        type="number"
        min={0}
        step={1}
        onChange={(e) => setMaxSalePurchasePerAddress(e.target.value)}
      />
      <Input
        placeholder="epoch seconds (defaults to now)"
        label="public sale start"
        type="number"
        min={0}
        step={1}
        onChange={(e) => setPublicSaleStart(e.target.value)}
      />
      <Input
        placeholder="epoch seconds (defaults to 48 hours)"
        label="public sale end"
        type="number"
        min={0}
        step={1}
        onChange={(e) => setPublicSaleEnd(e.target.value)}
      />
      <Input
        placeholder={presaleStart}
        label="presale start"
        type="number"
        min={0}
        step={1}
        onChange={(e) => setPresaleStart(e.target.value)}
      />
      <Input
        placeholder={presaleEnd}
        label="presale end"
        type="number"
        min={0}
        step={1}
        onChange={(e) => setPresaleEnd(e.target.value)}
      />
      <Input
        placeholder={presaleMerkleRoot}
        label="presale merkle root"
        onChange={(e) => setPresaleMerkleRoot(e.target.value)}
      />
    </>
  )
}

export default ZoraSalesConfigForm
