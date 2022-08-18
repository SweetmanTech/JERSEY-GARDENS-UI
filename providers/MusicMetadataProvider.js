import React, { useContext, useState } from 'react'

export const MusicMetadataContext = React.createContext({})

function MusicMetadataProvider({ children }) {
  const [metadata, setMetadata] = useState({})

  return (
    <MusicMetadataContext.Provider value={{ metadata, setMetadata }}>
      {children}
    </MusicMetadataContext.Provider>
  )
}

export default MusicMetadataProvider

export const useMusicMetadata = () => useContext(MusicMetadataContext)
