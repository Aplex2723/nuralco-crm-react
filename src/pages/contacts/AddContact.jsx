import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import PhoneInput from 'react-phone-input-2'
import fetchData from '../../funtions/fetchData'
import { ContactUrl } from '../../funtions/config'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import AwesomeIcon from '../../components/FontAwesomeIcon'

import 'react-phone-input-2/lib/style.css'
import { Input, HelperText, Label, Button, Textarea, Modal, ModalHeader, ModalBody, ModalFooter} from '@windmill/react-ui'
import { Switch } from '@headlessui/react'
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import validateEmail from '../../funtions/validateEmail'


const AddContact = () => {
  const [date, setDate] = useState('');
   
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [requestErrorMessages, setRequestErrorMessages] = useState([])
  
  const [enabled, setEnabled] = useState(true)
  const dateInputRef = useRef(null);
  const history = useHistory()
  // Required input fields
  const [inputErrors, setInputErrors] = useState({
    first_name: '',
    last_name: '',
    title: '',
    primary_email: '',
    secondary_email: '',
    address_line: '',
    mobile_number: '', 
    organization: ''
  })
  const [inputValues, setInputValues] = useState({
    salutation: 'no salute',
    first_name: '',
    last_name: '',
    email: '',
    organization: '',
    title: '',
    primary_email: '',
    secondary_email: '',
    mobile_number: '',
    secondary_number: '',
    department: '',
    language: '',
    do_not_call: enabled,

    address_line: '',
    street: '',
    city: '',
    state: '',
    postcode: '',
    country: '',

    description: '',
    facebook_url: '',
    linked_in_url: '',
    twitter_username:''
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
    if(name == 'date_of_birth'){
      setDate(event.target.value);
      setInputValues((p) => ({...p, [name]: date}))
    }
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

  };

  const handleSwitch = value => {
    setEnabled(value)
  }

  const submitCallBack = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `jwt ${localStorage.getItem('Token')}`,
      org: localStorage.getItem('org')
    }

    if (validation()) {
      fetchData(`${ContactUrl}/`, 'POST', inputValues, headers)
        .then((data) => {
          if (!data.error) {
            history.push('/app/contacts/')
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

  return (
    <>
      <div className='flex justify-end mb-3'>
          <Button size='large' onClick={submitCallBack}>Guardar <AwesomeIcon icon={faSave} className="w-4 h-4 ml-2 "/></Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Campos no validos</ModalHeader>
        <ModalBody>
          Se encontraron los siguientes errores, favor de corregirlos antes de reenviar el formulario.
          <br></br>
          <ul className='text-red-900 dark:text-red-600 mt-2'>
            {requestErrorMessages.map((e, i) => (<li key={i}>{e}</li>))}
          </ul>
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Basic information section */}
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <SectionTitle>Información Básica</SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Label>
            <span>Nombre/s</span>
            <Input valid={inputErrors.first_name ? false : true} name='first_name' onChange={handleInputChange} value={inputValues.first_name} className='mt-2' placeholder='Pedro'></Input>
            {inputErrors.first_name && <HelperText valid={false}>{inputErrors.first_name}</HelperText> }
          </Label>
          <Label>
            <span>Apellido/s</span>
            <Input valid={inputErrors.last_name ? false : true} name='last_name' onChange={handleInputChange} value={inputValues.last_name} className='mt-2' placeholder='Pedro'></Input>
            {inputErrors.last_name && <HelperText valid={false}>{inputErrors.last_name}</HelperText> }
          </Label>
          <Label>
            <span>Fecha de nacimiento</span>
            <Input
              type="date"
              name='date_of_birth'
              onChange={handleInputChange}
              ref={dateInputRef}
              className='mt-2'
            />
          </Label>
          <Label>
            <span>Empresa/Organización</span>
            <Input valid={inputErrors.organization ? false : true } name='organization' onChange={handleInputChange} value={inputValues.organization} className='mt-2'></Input>
            {inputErrors.organization && <HelperText valid={false}>{inputErrors.organization}</HelperText>}
          </Label>
          <Label>
            <span>Departamento</span>
            <Input name='department' onChange={handleInputChange} value={inputValues.department} className='mt-2'></Input>
          </Label>
          <Label>
            <span>Ocupación</span>
            <Input valid={inputErrors.title ? false : true } name='title' onChange={handleInputChange} value={inputValues.title} className='mt-2'></Input>
            {inputErrors.title && <HelperText valid={false}>{inputErrors.title}</HelperText> }
          </Label>
          <Label>
            <span>Correo principal</span>
            <Input valid={inputErrors.primary_email ? false : true} name='primary_email' onChange={handleInputChange} value={inputValues.primary_email} className='mt-2'></Input>
            {inputErrors.primary_email && <HelperText valid={false}>{inputErrors.primary_email}</HelperText> }
          </Label>
          <Label>
            <span>Correo secundario</span>
            <Input valid={inputErrors.secondary_email ? false : true} name='secondary_email' onChange={handleInputChange} value={inputValues.secondary_email} className='mt-2'></Input>
            {inputErrors.secondary_email && <HelperText valid={false}>{inputErrors.secondary_email}</HelperText> }
          </Label>
          <Label>
            <span>Número telefonico</span>
            <PhoneInput disableDropdown={true} inputProps={{name: 'mobile_number', required: true}} onChange={(v, d, e) => {handleInputChange(e)}} className='mt-2'></PhoneInput>
            {inputErrors.mobile_number && <HelperText valid={false}>{inputErrors.mobile_number}</HelperText>}
          </Label>
          <Label>
            <span>Número telefonico secundario</span>
            <PhoneInput disableDropdown={true} inputProps={{name: 'secondary_number'}} onChange={(v, d, e) => {handleInputChange(e)}} className='mt-2'></PhoneInput>
          </Label>
          <Label>
            <span>Lenguaje</span>
            <Input name='languaje' onChange={handleInputChange} value={inputValues.languaje} className='mt-2'></Input>
          </Label>
          <Label className='mt-5'>
            <span className='mr-5 pt-5'>Avisar registro</span>
            <Switch
              name='do_not_call'
              checked={enabled}
              onChange={handleSwitch}
              className={`${enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-500'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </Label>
        </div>
      </div>
      
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <SectionTitle>Dirección de contacto</SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Label>
            <span>Dirección</span>
            <Input valid={inputErrors.address_line ? false : true } name='address_line' onChange={handleInputChange} value={inputValues.address_line} className='mt-2' ></Input>
            {inputErrors.address_line && <HelperText valid={false}>{inputErrors.address_line}</HelperText> }
          </Label>
          <Label>
            <span>Calle/s</span>
            <Input name='street' onChange={handleInputChange} value={inputValues.street} className='mt-2' ></Input>
          </Label>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-4'>
           <Label>
            <span>Ciudad</span>
            <Input name='city' onChange={handleInputChange} value={inputValues.address_line} className='mt-2' ></Input>
          </Label>
          <Label>
            <span>Estado</span>
            <Input name='state' onChange={handleInputChange} value={inputValues.state} className='mt-2' ></Input>
          </Label> 
          <Label>
            <span>Postal</span>
            <Input name='postcode' onChange={handleInputChange} value={inputValues.postcode} className='mt-2' ></Input>
          </Label> 
          <Label>
            <span>País</span>
            <Input name='country' onChange={handleInputChange} value={inputValues.country} className='mt-2' ></Input>
          </Label> 
        </div>
      </div>
      
      {/* Description & Social Network */}
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <SectionTitle>Descripcción & Redes</SectionTitle>
        <div className='grid grid-cols-1 gap-4'>
          <Label>
            <span>Descripcción</span>
            <Textarea name='description' onChange={handleInputChange} value={inputValues.description} className='mt-2' ></Textarea>
          </Label>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 mt-4'>
           <Label>
            <AwesomeIcon icon={ faFacebook } className='mr-3 w-4 h-4'></AwesomeIcon>
            <span >Facebook</span>
            <Input name='facebook_url' onChange={handleInputChange} value={inputValues.facebook_url} className='mt-2' ></Input>
          </Label>
           <Label>
            <AwesomeIcon icon={ faLinkedin } className='mr-3 w-4 h-4'></AwesomeIcon>
            <span >LinkedIn</span>
            <Input name='linked_in_url' onChange={handleInputChange} value={inputValues.linked_in_url} className='mt-2' ></Input>
          </Label>
           <Label>
            <AwesomeIcon icon={ faTwitter } className='mr-3 w-4 h-4'></AwesomeIcon>
            <span >Twitter</span>
            <Input name='twitter_username' onChange={handleInputChange} value={inputValues.twitter_username} className='mt-2' ></Input>
          </Label>
        </div>
      </div>    
    </>
  )
}

export default AddContact