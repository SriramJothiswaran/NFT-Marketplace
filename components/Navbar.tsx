import React, {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

import images from '../assets/index'
import { Button } from './index'
// import { NFTContext } from '../context/NFTContext';

type MenuItemsProps = {
  isMobile?: boolean
  active: string
  setActive: Dispatch<SetStateAction<string>>
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}

type ButtonGroupProps = {
  setActive: Dispatch<SetStateAction<string>>
  router: any
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

type checkActiveProps = {
  active: string
  setActive: Dispatch<SetStateAction<string>>
  router: any
}

const MenuItems = ({
  isMobile,
  active,
  setActive,
  setIsOpen
}: MenuItemsProps) => {
  const generateLink = (i: number) => {
    switch (i) {
      case 0:
        return '/'
      case 1:
        return '/listed-nfts'
      case 2:
        return '/my-nfts'
      default:
        return '/'
    }
  }

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && 'flex-col h-full'
      }`}
    >
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item)
            if (isMobile) setIsOpen && setIsOpen(false)
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 
          ${
            active === item
              ? 'dark:text-white text-nft-black-1'
              : 'dark:text-nft-gray-3 text-nft-gray-2'
          }`}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  )
}

const ButtonGroup = ({ setActive, router, setIsOpen }: ButtonGroupProps) => {
  // const { connectWallet, currentAccount } = useContext(NFTContext);
  const hasConnected = true

  return hasConnected ? (
    <Button
      btnName='Create'
      classStyles='mx-2 rounded-xl'
      handleClick={() => {
        setActive('')
        setIsOpen(false)
        router.push('/create-nft')
      }}
    />
  ) : (
    <Button
      btnName='Connect'
      classStyles='mx-2 rounded-xl'
      handleClick={() => {}}
    />
  )
}

const checkActive = ({ active, setActive, router }: checkActiveProps) => {
  switch (router.pathname) {
    case '/':
      if (active !== 'Explore NFTs') setActive('Explore NFTs')
      break
    case '/listed-nfts':
      if (active !== 'Listed NFTs') setActive('Listed NFTs')
      break
    case '/my-nfts':
      if (active !== 'My NFTs') setActive('My NFTs')
      break
    case '/create-nft':
      setActive('')
      break
    default:
      setActive('')
      break
  }
}

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [active, setActive] = useState('Explore NFTs')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='fixed z-10 flex-row w-full p-4 bg-white border-b flexBetween dark:bg-nft-dark dark:border-nft-black-1 border-nft-gray-1'>
      <div className='flex flex-row justify-start flex-1'>
        <Link href='/'>
          <div className='cursor-pointer flexCenter md:hidden'>
            <Image src={images.rareLogo} alt='logo' width={32} height={32} />
            <p className='ml-2 text-xl font-semibold dark:text-white text-nft-black-1'>
            RareBits
            </p>
          </div>
        </Link>
        <Link href='/'>
          <div
            className='hidden md:flex '
            onClick={() => {
              setActive('Explore NFTs')
              setIsOpen(false)
            }}
          >
            <Image src={images.rareLogo} alt='logo' width={32} height={32} />
          </div>
        </Link>
      </div>
      <div className='flex flex-row justify-end flex-initial '>
        <div className='flex items-center mr-10'>
          <input
            type='checkbox'
            className='checkbox'
            id='checkbox'
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label
            htmlFor='checkbox'
            className='relative w-8 h-4 p-1 bg-black flexBetween rounded-2xl label'
          >
            <i className='fas fa-sun' />
            <i className='fas fa-moon' />
            <div className='absolute w-3 h-3 bg-white rounded-full ball' />
          </label>
        </div>
        <div className='flex md:hidden'>
          <MenuItems active={active} setActive={setActive} />
          <div className='ml-4'>
            <ButtonGroup
              router={router}
              setActive={setActive}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>

      <div className='hidden ml-2 md:flex'>
        {isOpen ? (
          <Image
            src={images.cross}
            objectFit='contain'
            width={20}
            height={20}
            alt='close'
            onClick={() => setIsOpen(false)}
            className={theme === 'light' ? 'filter invert' : ''}
          />
        ) : (
          <Image
            src={images.menu}
            objectFit='contain'
            width={25}
            height={25}
            alt='menu'
            onClick={() => setIsOpen(true)}
            className={theme === 'light' ? 'filter invert' : ''}
          />
        )}
        {isOpen && (
          <div className='fixed inset-0 z-10 flex flex-col justify-between bg-white top-65 dark:bg-nft-dark nav-h'>
            <div className='flex-1 p-4'>
              <MenuItems
                active={active}
                setActive={setActive}
                isMobile
                setIsOpen={setIsOpen}
              />
            </div>
            <div className='p-4 border-t dark:border-nft-black-1 border-nft-gray-1'>
              <ButtonGroup
                router={router}
                setActive={setActive}
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
