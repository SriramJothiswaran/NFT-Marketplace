import React, { useState, useMemo, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone'
import { useTheme } from 'next-themes'
import Image from 'next/image'

import { Button, Input, Loader } from '../components'
import images from '../assets'
import { NFTContext } from '../context/NFTContext'

const CreateNFT = () => {
  const { uploadToIPFS, createNFT, isLoadingNFT } = useContext(NFTContext)
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, setFormInput] = useState({
    name: '',
    description: '',
    price: ''
  })
  const { theme } = useTheme()
  const router = useRouter()

  if (isLoadingNFT) {
    ;<div className='min-h-screen flexStart'>
      <Loader />
    </div>
  }

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0])
    console.log(url)
    setFileUrl(url)
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000
  })

  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-2xl border-dashed ${
        isDragActive && 'border-file-active'
      } ${isDragAccept && 'border-file-accept'} ${
        isDragReject && 'border-file-reject'
      }`,
    [isDragActive, isDragAccept, isDragReject]
  )

  return (
    <div className='flex justify-center p-12 sm:px-4'>
      <div className='w-3/5 md:w-full'>
        <h1 className='flex-1 mt-10 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl sm:mb-4'>
          Create new NFT
        </h1>
        <div className='mt-16'>
          <p className='text-xl font-semibold font-poppins dark:text-white text-nft-black-1'>
            Upload File
          </p>
          <div className='mt-4'>
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className='flex-col text-center flexCenter'>
                <p className='text-xl font-semibold font-poppins dark:text-white text-nft-black-1'>
                  JPG, PNG, GIF, SVG, WEBM Max 100mb.
                </p>
                <div className='flex justify-center w-full my-12'>
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit='contain'
                    alt='file upload'
                    className={theme === 'light' ? 'filter invert' : ''}
                  />
                </div>
                <p className='text-sm font-semibold font-poppins dark:text-white text-nft-black-1'>
                  Drag and Drop File
                </p>
                <p className='text-sm font-semibold font-poppins dark:text-white text-nft-black-1'>
                  or Browse media on your device
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt='asset_file' />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType='input'
          title='Name'
          placeholder='NFT Name'
          handleClick={(e) =>
            setFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Input
          inputType='textarea'
          title='Description'
          placeholder='NFT Description'
          handleClick={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />
        <Input
          inputType='number'
          title='Price'
          placeholder='NFT Price'
          handleClick={(e) =>
            setFormInput({ ...formInput, price: e.target.value })
          }
        />
        <div className='flex justify-center w-full mt-10'>
          <Button
            btnName='Create NFT'
            classStyles='rounded-xl'
            handleClick={() => createNFT(formInput, fileUrl, router)}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateNFT
