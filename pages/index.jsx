/* eslint-disable multiline-ternary */
import React, { useState, useEffect, useRef, useContext } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

import images from '../assets'
import { Banner, CreatorCard, Loader, NFTCard, SearchBar } from '../components'
import { NFTContext } from '../context/NFTContext'
import { getCreators } from '../utils/getTopCreators'
import { shortenAddress } from '../utils/shortenAddress'

const Home = () => {
  const [hideButtons, setHideButtons] = useState(false)
  const [nfts, setNfts] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])
  const [activeSelect, setActiveSelect] = useState('Recently added')
  const [isLoading, setIsLoading] = useState(true)
  const parentRef = useRef(null)
  const scrollRef = useRef(null)
  const { theme } = useTheme()
  const { fetchNFTs } = useContext(NFTContext)

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items)
      setNftsCopy(items)
      setIsLoading(false)
    })
  }, [])

  const handleScroll = (direction) => {
    const { current } = scrollRef

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount
    } else {
      current.scrollLeft += scrollAmount
    }
  }

  const isScrollable = () => {
    const { current } = scrollRef
    const { current: parent } = parentRef

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false)
    } else {
      setHideButtons(true)
    }
  }

  useEffect(() => {
    isScrollable()
    window.addEventListener('resize', isScrollable)
    return () => {
      window.removeEventListener('resize', isScrollable)
    }
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

  const topCreators = getCreators(nftsCopy)

  return (
    <div className='flex justify-center p-12 sm:px-4'>
      <div className='w-full minmd:w-4/5'>
        <Banner
          name='Discover, collect, and sell extraordinary NFTs'
          childStyles='md:text-4xl sm:text-2xl xs:text-xl text-left'
          parentStyles='justifyStart mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl'
        />
        {!isLoading && !nfts.length ? (
          <h1 className='ml-4 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl xs:ml-0'>
            That&apos;s wierd... No NFTs for sale!
          </h1>
        ) : isLoading ? (
          <Loader />
        ) : (
          <>
            <div className=''>
              <h1 className='ml-4 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl xs:ml-0'>
                Top Sellers
              </h1>
              <div
                ref={parentRef}
                className='relative flex flex-1 max-w-full mt-3'
              >
                <div
                  ref={scrollRef}
                  className='flex flex-row overflow-x-scroll select-none w-max no-scrollbar'
                >
                  {topCreators.map((creator, i) => (
                    <CreatorCard
                      key={creator.seller}
                      rank={i + 1}
                      creatorImg={images[`creator${i + 1}`]}
                      creatorName={shortenAddress(creator.seller)}
                      creatorEths={creator.sum}
                    />
                  ))}
                  {!hideButtons && (
                    <>
                      <div
                        onClick={() => handleScroll('left')}
                        className='absolute left-0 w-8 h-8 cursor-pointer minlg:w-12 minlg:h-12 top-45'
                      >
                        <Image
                          src={images.left}
                          layout='fill'
                          objectFit='contain'
                          alt='leftArrow'
                          className={theme === 'light' ? 'filter invert' : ''}
                        />
                      </div>
                      <div
                        onClick={() => handleScroll('right')}
                        className='absolute right-0 w-8 h-8 cursor-pointer minlg:w-12 minlg:h-12 top-45'
                      >
                        <Image
                          src={images.right}
                          layout='fill'
                          objectFit='contain'
                          alt='leftArrow'
                          className={theme === 'light' ? 'filter invert' : ''}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='mt-10'>
              <div className='mx-4 flexBetween sm:mx-0 minlg:mx-8 sm:flex-col sm:items-start'>
                <h1 className='flex-1 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl sm:mb-4'>
                  Hot NFTs
                </h1>
                <div className='flex flex-row flex-2 sm:w-full sm:flex-col'>
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className='flex flex-wrap justify-start w-full mt-3 md:justify-center'>
                {nfts.map((nft) => (
                  <NFTCard key={nft.tokenId} nft={nft} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
