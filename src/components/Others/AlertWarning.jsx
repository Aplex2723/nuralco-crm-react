import React from 'react'
import AwesomeIcon from '../FontAwesomeIcon'
import { faWarning, faXmark } from '@fortawesome/free-solid-svg-icons'

const AlertWarning = ({children}) => {
  return (
    <div
    className="bg-yellow-50 border border-yellow-400 rounded text-yellow-800 text-sm p-4 mb-4 flex justify-between">
    <div>
        <div className="flex items-center">
        <AwesomeIcon  className="w-6 h-6 mr-3" icon={faWarning}/>
        <p>
            <span className="font-bold">Alerta: </span>
            {children}
        </p>
        </div>
    </div>
    <div>
        <AwesomeIcon icon={faXmark} className="w-6 h-6"/>
    </div>
    </div>
  )
}

export default AlertWarning