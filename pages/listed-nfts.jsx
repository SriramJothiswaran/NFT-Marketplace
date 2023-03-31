import React, { useState, useEffect, useContext } from 'react'

import { NFTContext } from '../context/NFTContext'
import { NFTCard, Loader } from '../components/index'

const ListedNFTs = () => {
  const { fetchMyNFTsOrListedNFTs } = useContext(NFTContext)
  const [nfts, setNfts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMyNFTsOrListedNFTs('fetchItemsListed').then((items) => {
      setNfts(items)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    ;<div className='min-h-screen flexStart'>
      <Loader />
    </div>
  }

  if (!isLoading && nfts.length === 0) {
    return (
      <div className='min-h-screen p-16 mt-4 flexCenter sm:p-4'>
        <h1 className='text-3xl font-extrabold font-poppins dark:text-white text-nft-black-1'>
          No NFTs Listed for Sale
        </h1>
      </div>
    )
  }

  return (
    <div className='flex justify-center min-h-screen p-12 sm:px-4'>
      <div className='w-full mimd:w-4/5'>
        <div className='mt-8'>
          <h2 className='mt-2 ml-4 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 sm:ml-2'>
            NFTs Listed for Sale
          </h2>
          <div className='flex flex-wrap justify-start w-full mt-3 md:justify-center'>
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListedNFTs
