import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from '@windmill/react-ui'

const ShowRequestErrors = ({isOpen, onClose, requestErrorMessages}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalHeader>Campos no validos</ModalHeader>
    <ModalBody>
      Se encontraron los siguientes errores, favor de corregirlos antes de reenviar el formulario.
      <br></br>
      <ul className='text-red-900 dark:text-red-600 mt-2'>

      </ul>
    </ModalBody>
    <ModalFooter>
      {/* I don't like this approach. Consider passing a prop to ModalFooter
       * that if present, would duplicate the buttons in a way similar to this.
       * Or, maybe find some way to pass something like size="large md:regular"
       * to Button
       */}
      
      <div className="block w-full">
        <Button block size="large" onClick={onClose}>
          Accept
        </Button>
      </div>
    </ModalFooter>
  </Modal>
  )
}

export default ShowRequestErrors