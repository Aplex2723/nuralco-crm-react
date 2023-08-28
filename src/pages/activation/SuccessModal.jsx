import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'

function SuccessModal({isOpen, onClose}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalHeader className="text-green-800 dark:text-green-400 font-semibold">Correo de activacion enviado nuevamente</ModalHeader>
    <ModalBody>
    Si no ves el correo electrónico en tu bandeja de estas intentando activar ya se encuentra activo, prueba a iniciar sesion nuevamente o ponte en contacto con nuestro soporte en linea. 
    </ModalBody>
    <ModalFooter>
        <Button className="w-full sm:w-auto" onClick={onClose}>Aceptar</Button>
    </ModalFooter>
    </Modal>
  )
}

export default SuccessModal