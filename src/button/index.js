import React  from 'react'

import './styles.css'

const Button = ({
  type = 'button',
  onClick = () => {},
  children
}) => {
  return (
    <button type={type} onClick={onClick} className="btn">
      {children}
    </button>
  )
}

export default Button
