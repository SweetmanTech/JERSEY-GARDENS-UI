import React, { useContext, useState } from 'react'
import exampleMetadata from '@lib/musicNFTMetadata-example-1.json'

export const MusicMetadataContext = React.createContext({})

function MusicMetadataProvider({ children }) {
  const [metadata, setMetadata] = useState(exampleMetadata)

  return (
    <MusicMetadataContext.Provider value={{ metadata, setMetadata }}>
      {children}
    </MusicMetadataContext.Provider>
  )
}

export default MusicMetadataProvider

export const useMusicMetadata = () => useContext(MusicMetadataContext)
