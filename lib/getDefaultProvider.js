const { ethers } = require('ethers')

const getDefaultProvider = (networkName, chainId) => {
  const polygonRpc = 'https://polygon-rpc.com'
  const mumbaiRpc = 'https://rpc-mumbai.maticvigil.com'
  const chainIdInt = parseInt(chainId?.toString())

  if (!chainId) return null
  if (networkName?.includes('matic')) {
    if (chainIdInt === 137) {
      return ethers.getDefaultProvider(polygonRpc)
    } else {
      return ethers.getDefaultProvider(mumbaiRpc)
    }
  }
  return ethers.getDefaultProvider({
    chainId: chainIdInt,
    name: networkName,
  })
}

export default getDefaultProvider
