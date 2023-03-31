/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { NFTContext } from '../context/NFTContext'
import { Loader, Button, Modal } from '../components'
import images from '../assets'
import { shortenAddress } from '../utils/shortenAddress'

const PaymentBodyCmp = ({ nft, nftCurrency }) => (
  <div className='flex flex-col'>
    <div className='flexBetween'>
      <p className='text-base font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-xl'>
        Item
      </p>
      <p className='text-base font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-xl'>
        Subtotal
      </p>
    </div>
    <div className='my-5 flexBetweenStart'>
      <div className='flex-1 flexStartCenter'>
        <div className='relative w-28 h-28'>
          <Image src={nft.image} layout='fill' objectFit='cover' />
        </div>
        <div className='flex-col ml-5 flexCenterStart'>
          <p className='text-sm font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-xl'>
            {shortenAddress(nft.seller)}
          </p>
          <p className='text-sm font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-xl'>
            {nft.name}
          </p>
        </div>
      </div>
      <div>
        <p className='text-sm font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-xl'>
          {nft.price} <span className='font-semibold'>{nftCurrency}</span>
        </p>
      </div>
    </div>
    <div className='mt-10 flexBetween'>
      <p className='text-base font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-xl'>
        Total
      </p>
      <p className='text-sm font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-xl'>
        {nft.price} <span className='font-semibold'>{nftCurrency}</span>
      </p>
    </div>
  </div>
)

const NFTDetails = () => {
  const { nftCurrency, currentAccount, buyNFT, isLoadingNFT } =
    useContext(NFTContext)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentModal, setPaymentModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [nft, setNft] = useState({
    image: '',
    tokenId: '',
    name: '',
    owner: '',
    price: '',
    seller: ''
  })
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    setNft(router.query)
    setIsLoading(false)
  }, [router.isReady])

  const checkout = async () => {
    await buyNFT(nft)
    setPaymentModal(false)
    setSuccessModal(true)
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flexStart'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='relative flex justify-center min-h-screen md:flex-col'>
      <div className='relative flex-1 p-12 border-r flexCenter sm:px-4 md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1'>
        <div className='relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557'>
          <Image
            src={nft.image}
            objectFit='cover'
            className='shadow-lg rounded-xl'
            layout='fill'
          />
        </div>
      </div>
      <div className='justify-start flex-1 p-12 mt-12 sm:px-4 sm:pb-4'>
        <div className='flex flex-row sm:flex-col'>
          <h2 className='text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-3xl'>
            {nft.name}
          </h2>
        </div>
        <div className='mt-10'>
          <p className='text-xs font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-base'>
            Creator
          </p>
          <div className='flex flex-row items-center mt-3'>
            <div className='relative w-12 h-12 mr-2 minlg:w-20 minlg:h-20'>
              <Image
                src={images.creator1}
                objectFit='cover'
                className='rounded-full'
              />
            </div>
            <p className='text-xs font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-base'>
              {shortenAddress(nft.seller)}
            </p>
          </div>
        </div>
        <div className='flex flex-col mt-10'>
          <div className='flex flex-row w-full border-b dark:border-nft-black-1 border-nft-gray-1'>
            <p className='mb-2 text-base font-medium font-poppins dark:text-white text-nft-black-1'>
              Details
            </p>
          </div>
          <div className='mt-3'>
            <p className='text-base font-normal font-poppins dark:text-white text-nft-black-1'>
              {nft.description}
            </p>
          </div>
        </div>
        <div className='flex flex-row mt-10 sm:flex-col'>
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className='p-2 text-base font-normal border font-poppins dark:text-white text-nft-black-1 border-gray'>
              You cannot buy your own NFT
            </p>
          ) : currentAccount === nft.owner.toLowerCase() ? (
            <Button
              btnName='List on Marketplace'
              classStyles='mr-5 sm:mr-0 sm:mb-5 rounded-xl'
              handleClick={() =>
                router.push(
                  `/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                )
              }
            />
          ) : (
            <Button
              btnName={`Buy for ${nft.price} ${nftCurrency}`}
              classStyles='mr-5 sm:mr-0 sm:mb-5 rounded-xl'
              handleClick={() => setPaymentModal(true)}
            />
          )}
        </div>
      </div>
      {paymentModal && (
        <Modal
          header='Check Out'
          body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
          footer={
            <div className='flex flex-row sm:flex-col'>
              <Button
                btnName='Checkout'
                classStyles='mr-5 sm:mb-5 sm:mr-0 rounded-xl'
                handleClick={checkout}
              />
              <Button
                btnName='Cancel'
                classStyles='rounded-xl'
                handleClick={() => setPaymentModal(false)}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}
      {isLoadingNFT && (
        <Modal
          header='Buying NFT...'
          body={
            <div className='flex-col text-center flexCenter'>
              <div className='relative w-52 h-52'>
                <Loader />
              </div>
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}
      {successModal && (
        <Modal
          header='Payment Successful'
          body={
            <div
              className='flex-col text-center flexCenter'
              onClick={() => setSuccessModal(false)}
            >
              <div className='relative w-52 h-52'>
                <Image src={nft.image} layout='fill' objectFit='cover' />
              </div>
              <p className='mt-10 text-sm font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-xl'>
                You successfully purchased{' '}
                <span className='font-semibold'>{nft.name}</span> from{' '}
                <span className='font-semibold'>
                  {shortenAddress(nft.seller)}
                </span>
                .
              </p>
            </div>
          }
          footer={
            <div className='flex-col flexCenter'>
              <Button
                btnName='Check it out'
                classStyles='sm:mb-5 rounded-xl'
                handleClick={() => router.push('/my-nfts')}
              />
            </div>
          }
          handleClose={() => setSuccessModal(false)}
        />
      )}
    </div>
  )
}

export default NFTDetails
