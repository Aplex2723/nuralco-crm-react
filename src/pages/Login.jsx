import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import fetchData from '../funtions/fetchData'
import { LoginUrl, OrgUrl } from '../funtions/config'
import validateEmail from '../funtions/validateEmail'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button, HelperText } from '@windmill/react-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import ActivateAccountAlert from './activation/ActivateAccountAlert'
import RegisterOrg from './organization/RegisterOrg'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [loginFail, setLoginFail] = useState(false)
  const [callbackExecute, setCallbackExecute] = useState(false)
  const [pendingActivation, setPendingActivation] = useState(false)

  const [registerOrgMenu, setRegisterOrgMenu] = useState(false)

  const [httpStatus, setHttpStatus] = useState(200)

  const history = useHistory()

  const handleEmail = (e) => {
    setEmail(e.target.value)
    let error = validateEmail(e.target.value) ? null : 1;
    setEmailError(error)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLoginFail = failed => {
    if(failed) {
      setLoginFail(true)
    } else {
      setLoginFail(false)
    }
  }

  const handleHttpStatus = (status) => {
    setHttpStatus(status)
    if(status >= 400){
      localStorage.clear()
    }
  }

  const submiteCallBack = () => {
    const json_obj = { email: email, password: password}
    fetchData(`${LoginUrl}/`, 'POST', json_obj, headers).then(data => {
      if(!data.error){

        localStorage.setItem('Token', data.tokens.access_token)
        localStorage.setItem('isAuth', true)
        setCallbackExecute(true)
      } else {
        setPendingActivation(true)
      }
      
    }).catch(e => { handleLoginFail(true); console.log(e)})
  }

  useEffect(() => {
    if(localStorage.getItem('Token')){
      const OrgHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`
      }
      fetchData(`${OrgUrl}/`, 'GET', null, OrgHeaders).then(data => {
        if(data.profile_org_list.length == 0){
          // Anadir menu de creacion de empresa
          setRegisterOrgMenu(true)
        } else {
          if(!data.error){
            localStorage.setItem('org', data.profile_org_list[0].org.id)
            history.push('/app')
          }
        }
      }).catch(e => handleHttpStatus(e.request.status))
    }
  }, [callbackExecute, history])

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className={`h-32 transition-all duration-500 ease-in-out md:h-auto md:w-${registerOrgMenu ? "1/3" : "1/2"}`}>
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
          <main className={`flex items-center justify-center p-6 sm:p-12 md:w-${registerOrgMenu ? "full" : "1/2"}`}>
              {registerOrgMenu ? (<RegisterOrg/>) : 
                pendingActivation ? (<ActivateAccountAlert email={email}/>) :
                
                <div className="w-full">
                  <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Bienvenido a Codey CRM</h1>
                  {loginFail && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3" role="alert">
                    <strong className="font-bold">Correo o contraseña </strong>
                    <span className="block sm:inline">no validos, o cuenta aun no activa, intenta nuevamente.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    </span>
                  </div>}
                  {httpStatus == 401 && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3" role="alert">
                    <strong className="font-bold">Sesion terminada </strong>
                    <span className="block sm:inline">por favor inicie sesion nuevamente.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    </span>
                  </div>}

                    <Label>
                    <span>Email</span>
                    <Input className="mt-1" type="email" placeholder="john@doe.com" value={email} onChange={handleEmail} valid={emailError || loginFail ? false : true}/>
                    {emailError ? <HelperText valid={false}>Proporciona un EMAIL valido</HelperText> : null}
                  </Label>

                  <Label className="mt-4">
                    <span>Password</span>
                    <div className='flex items-center'>
                      <Input valid={loginFail ? false : true } className="mt-1" type={showPassword ? "text" : 'password'} value={password} onChange={handlePassword} placeholder="***************" />
                      <button type='button' onClick={toggleShowPassword} className='ml-2'>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className='w-5 h-5 m-2'/>
                      </button>
                    </div>
                  </Label>


                  <Button className="mt-4" block onClick={submiteCallBack}>
                    Log in
                  </Button>

                  <hr className="my-8" />

                  <Button block layout="outline">
                    <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                    Github
                  </Button>
                  <Button className="mt-4" block layout="outline">
                    <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                    Twitter
                  </Button>

                  <p className="mt-4">
                    <Link
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      to="/forgot-password"
                    >
                      Forgot your password?
                    </Link>
                  </p>
                  <p className="mt-1">
                    <Link
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      to="/create-account"
                    >
                      Create account
                    </Link>
                  </p>
                </div>
              }
                          
          </main>
        </div>
      </div>
    </div>
  )
  }

export default Login
