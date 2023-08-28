import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Label, Input, Button, HelperText, Select, Badge } from '@windmill/react-ui'
import countries from 'countries-list';
import AwesomeIcon from '../../components/FontAwesomeIcon';
import { faBuilding, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import fetchData from '../../funtions/fetchData'
import { OrgUrl } from '../../funtions/config'
import ShowRequestErrors from '../../components/ShowRequestErrors';


function RegisterOrg() {
    const [invalidInputsMessage, setInvalidInputsMessage] = useState(true)
    const [requestsErrors, setRequestErrors] = useState([])
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [inputValues, setInputValues] = useState({
        name: null,
        address: null,
        user_limit: 5,
        country: null
    })
    const history = useHistory()

    const validateInputs = () => {
        if(!inputValues.name || !inputValues.address || !inputValues.country || !inputValues.user_limit){
            console.log("returning false")
            const newArray = []
            if(!inputValues.name){newArray.push("El NOMBRE es obligatorio")}
            if(!inputValues.address){newArray.push("La DIRECCION no es valida")}
            if(!inputValues.country){newArray.push("Debes seleccionar un país")}
            setRequestErrors(newArray)
            setShowErrorModal(true)
            return false
        }
        setInvalidInputsMessage(false)
        return true
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }
 
    const handleCloseModal = () => setShowErrorModal(false)

    const handleSubmit = (event) => {
      console.log(inputValues)
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`,
      }

      if(validateInputs()){

            fetchData(`${OrgUrl}/`, "POST", inputValues, headers).then(data => {
            if(!data.error){
                localStorage.setItem('org', data.org.id)
                history.push('/app')
            } else {
                const newArray = Object.keys(data.errors).map((clave) => [clave, data.errors[clave][0]]);
                setRequestErrors(newArray)
                setShowErrorModal(true)
            }
        })
    }

    };
  
    const countryOptions = Object.entries(countries.countries).map(([code, country]) => (
      <option key={code} value={code}>
        {country.name}
      </option>
    ));
  return (
    <div className='items-center justify-center'>
        <ShowRequestErrors isOpen={showErrorModal} onClose={handleCloseModal} requestErrorMessages={requestsErrors}/>
        <h1 className="text-2xl md:text-4xl font-bold text-blue-800 dark:text-blue-400"><AwesomeIcon icon={faCircleExclamation} className="mr-4" />Antes de continuar</h1>
        <Label className="text-lg md:text-xl mb-2 mt-4 font-semibold ">Cuentanos mas de tu empresa</Label>
        <Label className="mb-4 ">Para poder continuar es necesario que nos proporcione informacion acerca de su empresa, negocio u organización.</Label>
        <div className='p-4 mb-2 rounded-lg grid grid-cols-1 bg-gray-100 dark:bg-gray-900'>
            <Label>
                <span className="font-semibold">Nombre o Alias</span>
                <Input name="name" className="mt-2 mb-2" onChange={handleInputChange} value={inputValues.name}></Input>
            </Label>
            <Label>
                <span className="font-semibold">Dirección</span>
                <Input name="address" className="mt-2 mb-2" onChange={handleInputChange} value={inputValues.address}></Input>
            </Label>
            <Label className="mb-2">
                <span className="font-semibold">País</span>
                <Select value={inputValues.country} name="country" className="mt-2 mb-2" onChange={handleInputChange}>
                    <option value="">-- Selecciona un país --</option>
                    {countryOptions}
                </Select>
            </Label>
            <Label>
                <span className="font-semibold mr-4">Numero de empleados</span>{(inputValues.user_limit >= 10 && inputValues.user_limit < 100) ? 
                (<Badge type="warning">Emprendedor</Badge>) : 
                 (inputValues.user_limit >= 100) ? 
                 (<Badge type="success">Pro</Badge>) : 
                 <Badge type="neutral">Basic</Badge>}
                <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={inputValues.user_limit}
                    name="user_limit"
                    onChange={handleInputChange}
                    className="w-full mt-2 "
                />
                <HelperText>Empleados: {inputValues.user_limit === "100" ? "100+": inputValues.user_limit} </HelperText>
            </Label>
        </div>

        <Label className="mb-2 text-xs ">Al continuar, estas de acurdo que está de acuerdo con que Codey trate sus datos personales tal como se describe en la declaracion de privacidad</Label>
        <Button block  onClick={handleSubmit}>
            Continuar
        </Button>

    </div> 
  )
}

export default RegisterOrg