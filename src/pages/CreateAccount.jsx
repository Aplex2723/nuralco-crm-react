import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import validateEmail from '../funtions/validateEmail'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Input, Label, Button, HelperText  } from '@windmill/react-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import fetchData from '../funtions/fetchData'
import { RegisterUrl } from '../funtions/config'
import ShowRequestErrors from '../components/ShowRequestErrors'

function Login() {
  const [data, setData] = useState({
    email: '',
    first_name: '',
    password: '',
    confirmPassword: '',
  });
  const [emailError, setEmailError] = useState(true)

  const [showPassword, setShowPassword] = useState(false);
  const [showInvalidPassword, setShowInvalidPassword] = useState(true)
  const [differentPasswordValidator, setDifferentPasswordValidator] = useState(false)
  const [requestErrorMessages, setRequestErrorMessages] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activateAccountMsg, setActivateAccountMsg ] = useState(false) // _Cambiar

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name == "email"){
      let error = validateEmail(event.target.value) ? null : 1;
      setEmailError(error)
    } else {
      if(value.length <= 4 && name == "password"){       
        setShowInvalidPassword(true)
      } else { setShowInvalidPassword(false) }
    }
    if(name == "confirmPassword"){
      if(value != data.password) {
        setDifferentPasswordValidator(true)
      } else {
        setDifferentPasswordValidator(false)
      }
    }
    setData({
      ...data,
      [name]: value,
    });
  };

  const validateInputs = () => {
    if(!differentPasswordValidator && !emailError && !showInvalidPassword){ return true } else return false
  }


  const handleSubmit = (event) => {
    // Aquí puedes realizar la validación y el envío del formulario
    // (por ejemplo, enviar los datos al backend para su procesamiento).
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    if(validateInputs()){
      fetchData(`${RegisterUrl}/`, "POST", data, headers).then(d => {
        if(!d.error){
          setActivateAccountMsg(true)
        } else {
          console.log(d)
          for(let key in d.errors) {
            setRequestErrorMessages(Object.values(d.errors[key]))
            if(d.errors.email){ setEmailError(true)}
          }
          setIsModalOpen(true)
        }
      }).catch(e => console.log(e))
    }
    
  };

  const handleCloseModal = () => setIsModalOpen(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ShowRequestErrors isOpen={isModalOpen} onClose={handleCloseModal} requestErrorMessages={requestErrorMessages}/>
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className={`h-32 md:h-auto md:w-${activateAccountMsg ? "1/3" : "1/2"}`}>
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          {activateAccountMsg && <main className="flex items-center justify-center p-6 sm:p-12 md:w-full">
              <div className='w-full'>
                <div className='flex items-center font-semibold text-green-800 dark:text-green-400'>
                  <FontAwesomeIcon icon={faCheckCircle} className='w-6 h-6 mr-4'></FontAwesomeIcon>
                  <h1>Registro completado correctamente</h1>
                </div>
                <Label className="mt-5">Hemos enviado un <span className='font-bold text-green-800 dark:text-green-400'>enlace de activación</span> a tu dirección de correo electrónico. 
                  Por favor, verifica tu bandeja de entrada y sigue las instrucciones para activar tu cuenta. 
                  <br/> <br/>¡Gracias por unirte a nuestra comunidad! Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</Label>
              </div>
            </main>}
          {!activateAccountMsg && <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <Label>
                <span>Nombre *</span>
                <Input name="first_name" value={data.first_name} onChange={handleInputChange} placeholder="Pedro Guzman"></Input>
              </Label>
              <Label className="mt-4">
                <span>Correo *</span>
                <Input className="mt-1" value={data.email} onChange={handleInputChange} name="email" type="email" placeholder="usuario@codey.com" />
                {emailError ? <HelperText valid={false}>Proporciona un EMAIL valido</HelperText> : null}
              </Label>
              <Label className="mt-4">
                <span>Contraseña *</span>
                <div className='flex items-center'>
                  <Input className="mt-1" type={showPassword ? "text" : 'password'} value={data.password} onChange={handleInputChange} name="password" placeholder="***************" />
                  <button type='button' onClick={toggleShowPassword} className='ml-2'>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className='w-5 h-5 m-2'/>
                  </button>
                </div>
                  {showInvalidPassword ? <HelperText valid={false}>La contraseña debe tener mas de 4 caracteres</HelperText> : null}
              </Label>
              <Label className="mt-4">
                <span></span>
                <Input className="mt-1" value={data.confirmPassword} onChange={handleInputChange} name="confirmPassword" placeholder="***************" type={showPassword ? "text" : "password"} />
                {differentPasswordValidator ? <HelperText valid={false}>La contraseña no coincide</HelperText> : null}
              </Label>

              <Label className="mt-6" check>
                <Input type="checkbox" />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>

              <Button onClick={handleSubmit} block className="mt-4">
                Create account
              </Button>

              <hr className="my-8" />

              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button block className="mt-4" layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main> }


        </div>
      </div>
    </div>
  )
}

export default Login
