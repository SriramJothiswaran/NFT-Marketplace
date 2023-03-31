/* eslint-disable multiline-ternary */
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'

import { NFTContext } from '../context/NFTContext'
import images from '../assets'
import { NFTCard, Loader, Banner, SearchBar } from '../components'
import { shortenAddress } from '../utils/shortenAddress'

const MyNFTs = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext)
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeSelect, setActiveSelect] = useState('Recently added')

  useEffect(() => {
    fetchMyNFTsOrListedNFTs('fetchMyNFTs').then((items) => {
      setNfts(items)
      setNftsCopy(items)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    const sortedNfts = [...nfts]

    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price))
        break
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price))
        break
      case 'Recently added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId))
        break
      default:
        setNfts(nfts)
        break
    }
  }, [activeSelect])

  if (isLoading) {
    ;<div className='min-h-screen flexStart'>
      <Loader />
    </div>
  }

  const onHandleSearch = (value) => {
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    )

    if (filteredNfts.length) {
      setNfts(filteredNfts)
    } else {
      setNfts(nftsCopy)
    }
  }

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy)
    }
  }

  return (
    <div className='flex flex-col items-center justify-start w-full min-h-screen'>
      <div className='flex-col w-full flexCenter'>
        <Banner
          name='Your Nifty NFTs'
          childStyles='text-center mt-4'
          parentStyles='h-80 justify-center'
        />
        <div className='z-0 flex-col -mt-20 flexCenter'>
          <div className='w-40 h-40 p-1 rounded-full flexCenter sm:w-36 sm:h-36 bg-nft-black-1'>
            <Image
              src={images.creator1}
              className='object-cover rounded-full'
              objectFit='cover'
            />
          </div>
          <p className='mt-6 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1'>
            {shortenAddress(currentAccount)}
          </p>
        </div>
      </div>
      {!isLoading && !nfts.length && !nftsCopy.length ? (
        <div className='p-16 flexCenter sm:p-4'>
          <h1 className='text-3xl font-extrabold font-poppins dark:text-white text-nft-black-1'>
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <div className='flex-col w-full p-12 sm:px-4 mimd:w-4/5 flexCenter'>
          <div className='flex flex-row flex-1 w-full pxmy-nft-4 sm:flex-col xs:px-0 minlg:px-8'>
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className='flex flex-wrap w-full mt-3'>
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} onProfilePage />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MyNFTs
