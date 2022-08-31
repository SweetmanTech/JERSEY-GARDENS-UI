import Head from 'next/head'
import { useState } from 'react'
import {
  Box,
  Stack,
  Flex,
  Well,
  Text,
  Button,
  Paragraph,
  SpinnerOG,
} from '@zoralabs/zord'
import { ConnectWallet } from '@components/ConnectWallet'
import ERC721DropContractProvider from '@providers/ERC721DropProvider'
import { NextPage } from 'next'
import { SubgraphERC721Drop } from 'models/subgraph'
import { MintStatus } from '@components/MintStatus'
import { MintDetails } from '@components/MintDetails'
import { PresaleStatus } from '@components/PresaleStatus'
import { ipfsImage } from '@lib/helpers'
import { header, maxWidth, border, heroImage } from 'styles/styles.css'
import { useSaleStatus } from 'hooks/useSaleStatus'

interface HomePageProps {
  collection: SubgraphERC721Drop;
  chainId?: number;
}

const HomePage: NextPage<HomePageProps> = ({ collection, chainId }) => {
  const ogImage = ipfsImage(collection.editionMetadata.imageURI)
  const { presaleExists, saleNotStarted, saleIsFinished } = useSaleStatus({ collection })
  const [showPresale, setShowPresale] = useState(saleNotStarted && !saleIsFinished)

  return (
    <>
      <Head>
        <title>{collection.name}</title>
        <meta name="title" content={`${collection.name}`} />
        <meta
          name="description"
          content={
            collection.editionMetadata?.description ||
            "VolFM's creator toolkit makes it easy to create a music NFT collection, with tooling that scales with your creative ambitions"
          }
        />
        <meta name="og:title" content={`${collection.name}`} />
        <meta
          name="og:url"
          content="https://www.vol.fm/#/"
        />
        <meta
          name="og:description"
          content={
            collection.editionMetadata?.description ||
            "VolFM's creator toolkit makes it easy to create a music NFT collection, with tooling that scales with your creative ambitions"
          }
        />
        <meta name="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${collection.name}`} />
        <meta
          name="twitter:url"
          content="https://www.vol.fm/#/"
        />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <Flex justify="flex-end" p="x4" className={header}>
        <ConnectWallet />
      </Flex>
      <Stack mt="x3" gap="x3">
        <Box className={maxWidth} p="x4">
          <Text variant="menu-lg" mb="x8" align="center">
            <b>{collection.name}</b>
          </Text>
          <Text variant="label-lg" >
            4 Artists:
          </Text>
          <Text mb="x4" >
            <a href="https://twitter.com/moruf88" target="__blank"><u>MoRuf</u></a>, <a href="https://twitter.com/marcusariah" target="__blank"><u>Marcus</u></a>, <a color="#37735B" href="https://twitter.com/ikenna92" target="__blank"><u>Ikenna</u></a>, and <a href="https://twitter.com/jhamar" target="__blank"><u>Jhamar</u></a>
          </Text>
          <Text variant="label-lg" >
            Smart Contract:
          </Text>
          <Text mb="x4" >
            <a href="https://github.com/SweetmanTech" target="__blank"><u>sweetman.eth</u></a>
          </Text>
          <Text variant="label-lg" >
            Drop #1:
          </Text>
          <Text mb="x4" >
            The purpose of this drop is to find the first 100 members of <a href="https://twitter.com/thefifthartist" target="__blank"><u>The Fifth Leaf</u></a> so they can help us create a full album.
          </Text> 
          <Text variant="label-lg" >
            Next Drop:
          </Text>
          <Text mb="x4" >
            10/01/2022
          </Text> 
          <Text variant="label-lg" >
            Song Metadata:
          </Text> 
          <Text style={{whiteSpace: "pre-line"}}>{collection?.editionMetadata?.description}</Text>
          <Box mt="x8" mx="auto" style={{ maxWidth: 560 }}>
          <ERC721DropContractProvider
                erc721DropAddress={collection.address}
                chainId={chainId}
              >
<Well className={border} p="x6" style={{ borderBottom: 0 }}>
              <img
                className={heroImage}
                src={ipfsImage(collection.editionMetadata.imageURI)}
                alt={collection.name}
              />
              {collection.editionMetadata?.mimeType?.includes?.("audio") && <audio controls>
                <source src={ipfsImage(collection.editionMetadata.animationURI)} type={collection.editionMetadata.mimeType} />
              Your browser does not support the audio element.
              </audio>}
            </Well>
            <Well className={border} p="x6">
                <Box>
                  {collection != null ? (
                    <>
                      {presaleExists ? (
                        <>
                          <Flex flexChildren gap="x3" mb="x2">
                            <Button
                              pill
                              variant={showPresale ? 'primary' : 'ghost'}
                              color={showPresale ? 'primary' : 'tertiary'}
                              onClick={() => setShowPresale(true)}
                            >
                              Presale
                            </Button>
                            <Button
                              pill
                              variant={!showPresale ? 'primary' : 'ghost'}
                              color={!showPresale ? 'primary' : 'tertiary'}
                              onClick={() => setShowPresale(false)}
                            >
                              Public sale
                            </Button>
                          </Flex>
                          <Box style={{ display: showPresale ? 'block' : 'none' }}>
                            <PresaleStatus collection={collection} />
                          </Box>
                          <Box style={{ display: !showPresale ? 'block' : 'none' }}>
                            <MintStatus collection={collection} />
                          </Box>
                        </>
                      ) : (
                        <MintStatus collection={collection} />
                      )}
                      <MintDetails collection={collection} showPresale={false} />
                    </>
                  ) : (
                    <Paragraph align="center" mt="x8">
                      <SpinnerOG />
                    </Paragraph>
                  )}
                </Box>
            </Well>
              </ERC721DropContractProvider>
            
          </Box>
        </Box>
      </Stack>
    </>
  )
}

export default HomePage
