import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import AwesomeIcon from '../FontAwesomeIcon'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'

const SuccessModal = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader  className='font-semibold text-green-800 dark:text-green-400'><AwesomeIcon className="w-5 h-5 mr-3 " icon={faSquareCheck}/><span>Registro guardado correctamente</span></ModalHeader>
        <ModalBody>
        Se guardaron correctamente los campos. 
        </ModalBody>
        <ModalFooter>
            <Button className="w-full sm:w-auto" onClick={onClose}>Aceptar</Button>
        </ModalFooter>
    </Modal>
  )
}

export default SuccessModal