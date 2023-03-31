import React from 'react'

type ButtonProps = {
  btnName: string
  classStyles: string
  handleClick?: () => void
}

const Button = ({ btnName, classStyles, handleClick }: ButtonProps) => (
  <button
    type='button'
    className={`nft-gradient text-sm minlg:text-lg py-4 px-8 minlg:px-8 font-poppins font-semibold text-white ${classStyles}`}
    onClick={handleClick}
  >
    {btnName}
  </button>
)

export default Button
