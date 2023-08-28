import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Label, Button, Input, Textarea, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import AwesomeIcon from '../../components/FontAwesomeIcon'
import { faClapperboard, faNoteSticky, faNotesMedical, faPerson, faPen, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

import ShowRequestErrors from '../../components/ShowRequestErrors';
import validateEmail from '../../funtions/validateEmail'
import { ContactUrl } from '../../funtions/config'
import fetchData from '../../funtions/fetchData';


const EditContact = ({ onClose, user }) => {
    const [date, setDate] = useState('');
    const [requestErrorMessages, setRequestErrorMessages] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const history = useHistory()

    // Required input fields
    const [inputErrors, setInputErrors] = useState({
        first_name: '',
        last_name: '',
        title: '',
        primary_email: '',
        secondary_email: '',
        address_line: ''
    })
    const [inputValues, setInputValues] = useState({
        salutation: 'no salute',
        first_name: user.first_name,
        last_name: user.last_name,
        organization: user.organization,
        title: user.title,
        primary_email: user.primary_email,
        secondary_email: user.secondary_email,
        mobile_number: user.mobile_number,
        secondary_number: user.secondary_number,
        department: user.department,
        language: user.language,

        address_line: user.address.address_line,
        street: user.address.street,
        city: user.address.city,
        state: user.address.state,
        postcode: user.address.postcode,
        country: user.address.country,

        description: user.description,
        facebook_url: user.facebook_url,
        linked_in_url: user.linked_in_url,
        twitter_username: user.twitter_username
    });

  const validation = () => {
    let newErrors = {}
    let flag = true
    Object.keys(inputValues).forEach(k => { 
      const value = inputValues[k]
      if(k != 'do_not_call'){
        if(k == 'primary_email' || k == 'secondary_email'){
          if(!validateEmail(value)) {
            newErrors[k] = '* correo no valido'
          }
        } else {
          if(value.trim() == '' && Object.keys(inputErrors).includes(k)){
            newErrors[k] = '* campo requerido'
            flag = false
          }
        }
      }
    })

    if(Object.keys(newErrors).length > 0){
      setInputErrors(newErrors)
    } else {
      flag = true
    }

    return flag
  }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name == 'date_of_birth') {
            setDate(event.target.value);
            setInputValues((p) => ({ ...p, [name]: date }))
        }
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

    };

    const submitCallBack = () => {
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `jwt ${localStorage.getItem('Token')}`,
          org: localStorage.getItem('org')
        }
    
        if (validation()) {
          fetchData(`${ContactUrl}/${user.id}/`, 'PUT', inputValues, headers)
            .then((data) => {
              if (!data.error) {
                setShowSuccessModal(true) 
              }
              if (data.error) {
                console.log(data) 
              }
            })
            .catch((e) => {
              const errors = e.response.data.errors
              for(let key in errors) {
                setRequestErrorMessages(Object.values(errors[key]))
              }
              setIsModalOpen(true)
            })
        }
      }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const closeSuccessModal = () => {
        setShowSuccessModal(false)
        onClose()
    }

    return (
        <>
            <Modal isOpen={showSuccessModal} onClose={closeSuccessModal}>
                <ModalHeader  className='font-semibold text-green-800 dark:text-green-400'><AwesomeIcon className="w-5 h-5 mr-3 " icon={faSquareCheck}/><span>Registro actualizado correctamente</span></ModalHeader>
                <ModalBody>
                   Se actualizaron correctamente los campos. 
                </ModalBody>
                <ModalFooter>
                    <Button className="w-full sm:w-auto" onClick={closeSuccessModal}>Aceptar</Button>
                </ModalFooter>
            </Modal>
            <ShowRequestErrors isOpen={isModalOpen} onClose={closeModal} requestErrorMessages={requestErrorMessages}/>
            <div className='mt-3 mb-3' >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md ">
                    <h2 className='text-xl font-semibold text-black dark:text-white mb-4'><AwesomeIcon className="mr-4" icon={faPen} />Editar registro</h2>
                    <h1 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400"><AwesomeIcon className="mr-2" icon={faPerson} /> {user.first_name} {user.last_name} [{user.id}]</h1>
                    <div className='p-2 rounded grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 bg-gray-100 dark:bg-gray-900'>
                        <Label>
                            <span className="font-semibold">Empresa/Organización</span>
                            <Input name="organization" className="mt-2" onChange={handleInputChange} value={inputValues.organization}></Input>
                        </Label>

                        <Label>
                            <span className="font-semibold">Departamento</span>
                            <Input name="department" className="mt-2" onChange={handleInputChange} value={inputValues.department}></Input>
                        </Label>

                        <Label>
                            <span className="font-semibold">Ocupación</span>
                            <Input name="title" className="mt-2" onChange={handleInputChange} value={inputValues.title}></Input>
                        </Label>

                        <Label>
                            <span className="font-semibold">Email Principal</span>
                            <Input name="primary_email" className="mt-2" onChange={handleInputChange} value={inputValues.primary_email}></Input>
                        </Label>

                        <Label>
                            <span className="font-semibold">Email Secundario</span>
                            <Input name="secondary_email" className="mt-2" onChange={handleInputChange} value={inputValues.secondary_email}></Input>
                        </Label>

                        <Label>
                            <span className="font-semibold">Numero Telefonico</span>
                            <Input name="mobile_number" className="mt-2" onChange={handleInputChange} value={inputValues.mobile_number}></Input>
                        </Label>

                        <Label>
                            <span className="font-semibold">Numero Secundario</span>
                            <Input name="secondary_number" className="mt-2" onChange={handleInputChange} value={inputValues.secondary_number}></Input>
                        </Label>

                        <Label>
                            <span className="font-semibold">País</span>
                            <Input name="country" className="mt-2" onChange={handleInputChange} value={inputValues.country}></Input>
                        </Label>

                        <Label>
                            <span className="font-semibold">Lenguaje</span>
                            <Input name="language" className="mt-2" onChange={handleInputChange} value={inputValues.language}></Input>
                        </Label>
                    </div>

                    <div className='pl-2 pt-2 pb-2 rounded grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 bg-gray-100 dark:bg-gray-900'>
                        <Label>
                            <span className="font-semibold">Dirección</span>
                            <Input name="address_line" className="mt-2" onChange={handleInputChange} value={inputValues.address_line}></Input>
                        </Label>
                        <Label>
                            <span className="font-semibold">Calle</span>
                            <Input name="street" className="mt-2" onChange={handleInputChange} value={inputValues.street}></Input>
                        </Label>
                        <Label>
                            <span className="font-semibold">Ciudad</span>
                            <Input name="city" className="mt-2" onChange={handleInputChange} value={inputValues.city}></Input>
                        </Label>
                        <Label>
                            <span className="font-semibold">Estado</span>
                            <Input name="state" className="mt-2" onChange={handleInputChange} value={inputValues.state}></Input>
                        </Label>
                        <Label>
                            <span className="font-semibold">Código Postal</span>
                            <Input name="postcode" className="mt-2" onChange={handleInputChange} value={inputValues.postcode}></Input>
                        </Label>
                        <Label>
                            <span className="font-semibold">País</span>
                            <Input name="country" className="mt-2" onChange={handleInputChange} value={inputValues.country}></Input>
                        </Label>
                    </div>

                    <div className='p-2 rounded grid grid-cols-2 md:grid-cols-3 gap-4 mb-5 bg-gray-100 dark:bg-gray-900'>
                        <Label>
                            <span className="font-semibold"><AwesomeIcon className="mr-4" icon={faLinkedin} />LinkedIn</span>
                            <Input name="linked_in_url" className="mt-2" onChange={handleInputChange} value={inputValues.linked_in_url}></Input>
                        </Label>
                        <Label>
                            <span className="font-semibold"><AwesomeIcon className="mr-4" icon={faFacebook} />Facebook</span>
                            <Input name="facebook_url" className="mt-2" onChange={handleInputChange} value={inputValues.facebook_url}></Input>
                        </Label>
                        <Label>
                            <span className="font-semibold"><AwesomeIcon className="mr-4" icon={faTwitter} />Twitter</span>
                            <Input name="twitter_username" className="mt-2" onChange={handleInputChange} value={inputValues.twitter_username}></Input>
                        </Label>

                    </div>

                    <div className='p-2 rounded grid grid-cols-1 mb-5 bg-gray-100 dark:bg-gray-900'>
                        <Label>
                            <span className="font-semibold">Descripcción</span>
                            <Textarea name="description" className="mt-2" onChange={handleInputChange} value={inputValues.description}></Textarea>
                        </Label>
                    </div>
                    <div className='flex justify-end'>
                        <Button className="w-full sm:w-auto" size="regular" onClick={submitCallBack}>
                            Actualizar
                        </Button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default EditContact