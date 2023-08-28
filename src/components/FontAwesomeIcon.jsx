import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AwesomeIcon = ({ icon, ...props }) => {
  return (
    <FontAwesomeIcon icon={icon} {...props}></FontAwesomeIcon>
  )
}

export default AwesomeIcon