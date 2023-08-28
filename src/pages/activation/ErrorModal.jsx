import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'

function ErrorModal({isOpen, onClose}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalHeader className="text-red-800 dark:text-red-600 font-semibold">El email actual se encuentra activado</ModalHeader>
    <ModalBody>
        ¡Ups! Parece ser que el email que estas intentando activar ya se encuentra activo, prueba a iniciar sesion nuevamente o ponte en contacto con nuestro soporte en linea. 
    </ModalBody>
    <ModalFooter>
        <Button className="w-full sm:w-auto" onClick={onClose}>Aceptar</Button>
    </ModalFooter>
    </Modal>
  )
}

export default ErrorModal