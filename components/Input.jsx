/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'

import { NFTContext } from '../context/NFTContext'

const Input = ({ inputType, title, placeholder, handleClick }) => {
  const { nftCurrency } = useContext(NFTContext)
  return (
    <div className='w-full mt-10'>
      <p className='text-xl font-semibold font-poppins dark:text-white text-nft-black-1'>
        {title}
      </p>

      {inputType === 'number' ? (
        <div className='flex-row w-full px-4 py-3 mt-4 text-base bg-white border outline-none dark:bg-nft-black-1 dark:border-nft-black-1 border-nft-gray-2 rounded-lf font-poppins dark:text-white text-nft-gray-2 flexBetween'>
          <input
            type='number'
            className='flex w-full bg-white outline-none dark:bg-nft-black-1'
            placeholder={placeholder}
            onChange={handleClick}
          />
          <p className='text-xl font-semibold font-poppins dark:text-white text-nft-black-1'>
            {nftCurrency}
          </p>
        </div>
      ) : inputType === 'textarea' ? (
        <textarea
          rows={10}
          className='w-full px-4 py-3 mt-4 text-base bg-white border outline-none dark:bg-nft-black-1 dark:border-nft-black-1 border-nft-gray-2 rounded-lf font-poppins dark:text-white text-nft-gray-2'
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <input
          className='w-full px-4 py-3 mt-4 text-base bg-white border outline-none dark:bg-nft-black-1 dark:border-nft-black-1 border-nft-gray-2 rounded-lf font-poppins dark:text-white text-nft-gray-2'
          placeholder={placeholder}
          onChange={handleClick}
        />
      )}
    </div>
  )
}

export default Input
