import React, {useState} from 'react'
import {Input, Button, Label, Select, Textarea} from '@windmill/react-ui'
import PhoneInput from 'react-phone-input-2'
import industriesChoices from '../../utils/demo/industriesChoices'
import countries from 'countries-list';

const tabs = ['Detalles', 'Dirección', 'Más']; // Customize tab labels

const AddLead = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [inputValues, setInputValues] = useState({
        phone: null,
        probability: 0,  
        title: null,
        email: null,
        source: null,
        
        first_name: null,
        last_name: null,
        status: 'Active',
        website: null,
        description: null,
        organization: null,
        company: null,
        industry: null,
        close_date: null,
        
        address_line: null,
        street: null,
        city: null,
        state: null,
        postcode: null,
        country: null,
  
        account_name: null,
        opportunity_amount: null,
        contacts: null,
        lead_attachment: null,
        assigned_to: null,
        enquiry_type: null,
        teams: null,
        created_from_site: false
    })

    const countryOptions = Object.entries(countries.countries).map(([code, country]) => (
      <option key={code} value={code}>
        {country.name}
      </option>
    ));

    const sources_choices = {
            call: "Llamada",
            email: "Email",
            'existing customer': "Cliente Existente",
            partner: "Partner",
            'public relations': "Relaciones Publicas",
            compaign: "Campaña",
            other: "Otro"
    }


    const handleInputValues = (e) => {

        const {name, value} = e.target
        setInputValues(p => ({
          ...p,
          [name]: value
        }))
      }
    

    
  return (
    <div>
        <div className="pt-4 pl-4 pr-4 pb-2">
            <div className="flex flex-col md:flex-row justify-between md:space-x-4">
                <Button className="bg-blue-500 text-white px-4 py-2 mb-2 md:mb-0">
                Guardar
                </Button>
                <div className="flex flex-col md:flex-row md:space-x-2">
                    {tabs.map((value, index) => (
                        <Button className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 px-2 text-gray-700" onClick={() => setActiveTab(index)}>
                            {value}
                        </Button>
                    ))}
                    
                </div>
            </div>
        </div>
        <div className='bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-3'>
            {tabs[activeTab] == tabs[0] && <>
                <Label>
                    <span className='font-bold'>Número</span>
                    <PhoneInput disableDropdown={true} inputProps={{name: 'mobile_number', required: true}} onChange={(v, d, e) => {console.log(e)}} className='mt-2 mb-2'></PhoneInput>
                </Label>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-2'>
                    <Label>
                        <span className='font-bold'>Email</span>
                        <Input className='mt-2' name='' value='' onChange=''></Input>
                    </Label>
                    <Label>
                        <span className='font-bold'>Titulo</span>
                        <Input className='mt-2' name='' value='' onChange=''></Input>
                    </Label>
                    <Label>
                        <span className='font-bold'>Probabilidad de exito</span><br/>
                        <input type="range" min='0' max='100' className='mt-2 w-full' name='' value='0' onChange=''/>
                    </Label>
                    <Label>
                        <span className='font-bold'>Fuente</span>
                        <Select className='mt-2' name=''>
                            {
                                Object.keys(sources_choices).map(value => (
                                    <option value={value}>{sources_choices[value]}</option>
                                ))
                            }
                            

                        </Select>
                    </Label>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <Label>
                        <span className='font-bold'>Nombre/s</span>
                        <Input className='mt-2' name='' value='' onChange=''></Input>
                    </Label>
                    <Label>
                        <span className='font-bold'>Apellido/s</span>
                        <Input className='mt-2' name='' value='' onChange=''></Input>
                    </Label>
                    <Label>
                        <span className='font-bold'>Estado</span>
                        <Select className='mt-2' name=''>
                            <option value='in process'>En Proceso</option>
                            <option value='converted'>Convertido</option>
                            <option value='recycled'>Reciclado</option>
                            <option value='closed'>Cerrado</option>
                        </Select>
                    </Label>
                    <Label>
                        <span className='font-bold'>Sitio Web</span>
                        <Input className='mt-2' name='' value='' onChange=''></Input>
                    </Label>
                    <Label>
                        <span className='font-bold'>Organización</span>
                        <Input className='mt-2' name='' value='' onChange=''></Input>
                    </Label>
                    <Label>
                        <span className='font-bold'>Compañia</span>
                        <Input className='mt-2' name='' value='' onChange=''></Input>
                    </Label>
                    <Label>
                        <span className='font-bold'>Industria</span>
                        <Select className='mt-2' name=''>
                            {industriesChoices.map(industry => (
                                <option value={industry[0]}>{industry[1]}</option>
                            ))}
                        </Select>
                    </Label>
                    <Label>
                        <span className='font-bold'>Fecha de cierre</span>
                        <Input type="date" className='mt-2' name='' value='' onChange=''></Input>
                    </Label>
                </div>
                <Label>
                    <span className='font-bold'>Descripcción</span>
                    <Textarea className='mt-2' name='' value='' onChange=''></Textarea>
                </Label>
            </>}
            {tabs[activeTab] == tabs[1] && (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <Label>
                            <span className='font-bold'>Dirección</span>
                            <Input className='mt-2' name='' value='' onChange=''></Input>
                        </Label>
                        <Label>
                            <span className='font-bold'>Calle/s</span>
                            <Input className='mt-2' name='' value='' onChange=''></Input>
                        </Label>
                        <Label>
                            <span className='font-bold'>Ciudad</span>
                            <Input className='mt-2' name='' value='' onChange=''></Input>
                        </Label>
                        <Label>
                            <span className='font-bold'>Estado</span>
                            <Input className='mt-2' name='' value='' onChange=''></Input>
                        </Label>
                        <Label>
                            <span className='font-bold'>Codigo Postal</span>
                            <Input className='mt-2' name='' value='' onChange=''></Input>
                        </Label>
                        <Label>
                            <span className='font-bold'>País</span>
                            <Select className='mt-2' name='' value='' onChange=''>
                                <option value=''>-- Selecciona un País --</option>
                                {countryOptions}
                            </Select>
                        </Label>
                    </div>
                </>
            )}
        </div>
    </div>
  )
}

export default AddLead