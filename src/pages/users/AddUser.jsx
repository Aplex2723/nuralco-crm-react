import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import PhoneInput from 'react-phone-input-2'
import fetchData from '../../funtions/fetchData'
import { ContactUrl, UserUrl } from '../../funtions/config'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import AwesomeIcon from '../../components/FontAwesomeIcon'

import 'react-phone-input-2/lib/style.css'
import { Input, HelperText, Label, Button, Textarea, Modal, ModalHeader, ModalBody, ModalFooter, Select} from '@windmill/react-ui'
import { Switch } from '@headlessui/react'
import { faFacebook, faLinkedin, faSkype, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faRectangleXmark, faSave, faShuffle } from '@fortawesome/free-solid-svg-icons'
import validateEmail from '../../funtions/validateEmail'
import ShowRequestErrors from '../../components/ShowRequestErrors'
import SuccessModal from '../../components/Others/SuccessModal'


const AddUser  = ({onClose}) => {
  const [enableMarketing, setEnableMarketing] = useState(true)
  const [enableSales, setEnableSales] = useState(false)
  const [enableAdmin, setEnableAdmin] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
   
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [requestErrorMessages, setRequestErrorMessages] = useState([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);

  };
  // Required input fields
  const [inputErrors, setInputErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address_line: '',
    phone: '', 
    alternate_phone: '', 
    alternate_email: '',
    password: ''
  })
  const [inputValues, setInputValues] = useState({
    first_name: '',
    last_name: '',
    role: 'USER',
    email: '',
    alternate_email: '',
    phone: null,
    alternate_phone: null, 
    skype_ID: null,
    password: '',

    address_line: '',
    street: '',
    city: '',
    state: '',
    postcode: '',
    country: '',

    description: '',
    profile_pic: null,
    has_sales_access: false,
    has_marketing_access: true,
    is_organization_admin: false,
    status: "Active"

  });
  
  const generateRandomPassword = () => {
    const length = 12; // You can adjust the length of the generated password
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let newPassword = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    
    setInputValues((prevValues) => ({
      ...prevValues,
      ['password']: newPassword,
    }));
  };

  const validation = () => {
    let newErrors = {}
    const bannedNames = ['has_sales_access', 'has_marketing_access', 'is_organization_admin', 'profile_pic', 'alternate_phone', 'alternate_email'] 
    let flag = true
    Object.keys(inputValues).forEach(k => { 
      const value = inputValues[k]
      if(!bannedNames.includes(k)){
        if(k == 'email' || k == 'alternate_email'){
          if(!validateEmail(value)) {
            newErrors[k] = '* correo no valido'
          }
        } else {
          if(Object.keys(inputErrors).includes(k)){
            if(typeof value === 'string' && value.trim() === ''){
              newErrors[k] = '* campo requerido'
              flag = false
            } 
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

  const handleProfilePic = (event) => {
    const file = event.target.files[0];
    setInputValues((prevData) => ({ ...prevData, profile_pic: file }));
    setSelectedFile(file)
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

  };

  const handleMarketingSwitch = (value) => {
    setEnableMarketing(value)
    setInputValues(p => ({
      ...p,
      ["has_marketing_access"]: value
    }))
    
  }
  const handleSaleSwitch = (value) => {
    setEnableSales(value)
    setInputValues(p => ({
      ...p,
      ["has_sales_access"]: value
    }))
    
  }
  const handleAdminSwitch = (value) => {
    setEnableAdmin(value)
    setInputValues(p => ({
      ...p,
      ["is_organization_admin"]: value
    }))
    
  }

  const submitCallBack = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `jwt ${localStorage.getItem('Token')}`,
      org: localStorage.getItem('org')
    }

    
    if (validation()) {
      console.log(inputValues)
      fetchData(`${UserUrl}/`, 'POST', inputValues, headers)
        .then((data) => {
          if (!data.error) {
            // Cerrar
            setShowSuccessModal(true)
          }
          if (data.error) {
            console.log(data) 
          }
        })
        .catch((e) => {
          console.log(e)
          const errors = e.response.data.errors
          console.log(errors)
          handleErrors(errors)
        })
    }
  }

  const handleErrors = (errors) => {
    const errorObj = {}
    const errorsList = []

    Object.keys(errors).forEach(prop => {
      console.log(`Property: ${prop}`);
      const errorsObj = errors[prop];

      Object.keys(errorsObj).forEach(errorName => {
        errorsList.push(errorName)
      });
      
      
    });

    if(errorsList.includes("email")){ errorObj["email"] = "* email ya registrado o invalido"}
    if(errorsList.includes("phone")){ errorObj["phone"] = "* numero ya registrado o invalido"}
    if(errorsList.includes("alternate_phone")){ errorObj["alternate_phone"] = "* numero invalido"}
    setInputErrors(errorObj)
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
      <SuccessModal isOpen={showSuccessModal} onClose={closeSuccessModal}/>
      <div className='flex justify-end mb-3 mt-3'>
          <Button layout="link" onClick={onClose} className="mr-2"><AwesomeIcon icon={faRectangleXmark} className="w-6 h-6"/></Button>
          <Button onClick={submitCallBack}>Guardar <AwesomeIcon icon={faSave} className="w-4 h-4 ml-2 "/></Button>
      </div>

      {/* Basic information section */}
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <SectionTitle>Credenciales de inicio</SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <Label>
            <span>Correo </span> {inputErrors.email && <HelperText valid={false}>{inputErrors.email}</HelperText> }
            <Input valid={inputErrors.email ? false : true} name='email' onChange={handleInputChange} value={inputValues.email} className='mt-2'></Input>
          </Label>
          <Label>
            <span>Contraseña </span> {inputErrors.password && <HelperText valid={false}>{inputErrors.password}</HelperText> }
            <div className='flex'>
              <Input valid={inputErrors.password ? false : true} name='password' onChange={handleInputChange} value={inputValues.password} className='mt-2'></Input>
              <Button className="ml-2 mt-2" onClick={generateRandomPassword}><AwesomeIcon icon={faShuffle}/></Button>
            </div>
          </Label>
        </div>
        <SectionTitle>Información Básica</SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Label>
            <span>Nombre/s </span> {inputErrors.first_name && <HelperText valid={false}>{inputErrors.first_name}</HelperText> }
            <Input valid={inputErrors.first_name ? false : true} name='first_name' onChange={handleInputChange} value={inputValues.first_name} className='mt-2' placeholder='Pedro'></Input>
          </Label>
          <Label>
            <span>Apellido/s </span> {inputErrors.last_name && <HelperText valid={false}>{inputErrors.last_name}</HelperText> }
            <Input valid={inputErrors.last_name ? false : true} name='last_name' onChange={handleInputChange} value={inputValues.last_name} className='mt-2' placeholder='Pedro'></Input>
          </Label>
          <Label>
            <span>Rol</span>
            <Select value={selectedValue} onChange={handleSelectChange} className="mt-1">
              <option value="USER">Usuario</option>
              <option value="ADMIN">Administrador</option>
            </Select>
          </Label>

          <Label>
            <span>Correo secundario</span>
            <Input valid={inputErrors.alternate_email ? false : true} name='alternate_email' onChange={handleInputChange} value={inputValues.alternate_email} className='mt-2'></Input>
          </Label>
          <Label>
            <span>Número telefonico </span> {inputErrors.phone && <HelperText valid={false}>{inputErrors.phone}</HelperText>}
            <PhoneInput disableDropdown={true} inputProps={{name: 'phone', required: true}} onChange={(v, d, e) => {handleInputChange(e)}} className='mt-2'></PhoneInput>
          </Label>
          <Label>
            <span>Número telefonico secundario</span>
            <PhoneInput disableDropdown={true} inputProps={{name: 'alternate_phone'}} onChange={(v, d, e) => {handleInputChange(e)}} className='mt-2'></PhoneInput>
          </Label>
          <Label>
            <span><AwesomeIcon icon={faSkype} className='mr-2'/>Skype</span>
            <Input name='skype_ID' onChange={handleInputChange} value={inputValues.skype_ID} className='mt-2'></Input>
          </Label>
        </div>
      </div>
      
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <SectionTitle>Dirección de contacto</SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Label>
            <span>Dirección </span> {inputErrors.address_line && <HelperText valid={false}>{inputErrors.address_line}</HelperText> }
            <Input valid={inputErrors.address_line ? false : true } name='address_line' onChange={handleInputChange} value={inputValues.address_line} className='mt-2' ></Input>
          </Label>
          <Label>
            <span>Calle/s</span>
            <Input name='street' onChange={handleInputChange} value={inputValues.street} className='mt-2' ></Input>
          </Label>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-4'>
           <Label>
            <span>Ciudad</span>
            <Input name='city' onChange={handleInputChange} value={inputValues.city} className='mt-2' ></Input>
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
      
      {/* Description & Config */}
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <SectionTitle>Descripcción & Foto de Perfil</SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Label>
            <span>Descripcción</span>
            <Textarea name='description' onChange={handleInputChange} value={inputValues.description} className='mt-2' ></Textarea>
          </Label>
          <div>
            <div className="flex flex-col items-center justify-center space-y-4 ">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4-9a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm8-3a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <label className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"  
                  name='Profile Pic'
                  onChange={handleProfilePic}
                />
                {selectedFile ? 'Cambiar Foto' : 'Seleccionar Foto'}
              </label>
            </div>
          </div>
        </div>
        <SectionTitle>Permisos</SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 mt-4'>
          <Label>
            <span className='mr-5 pt-5'>Permisos de Marketing</span>
            <Switch
              name='has_marketing_access'
              checked={enableMarketing}
              onChange={handleMarketingSwitch}
              className={`${enableMarketing ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-500'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Permisos de Marketing</span>
              <span
                className={`${enableMarketing ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </Label>
          <Label>
            <span className='mr-5 pt-5'>Permisos de Ventas</span>
            <Switch
              name='has_sales_access'
              checked={enableSales}
              onChange={handleSaleSwitch}
              className={`${enableSales ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-500'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Permisos de Ventas</span>
              <span
                className={`${enableSales ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </Label>

        </div>
      </div>


    </>
  )
}

export default AddUser