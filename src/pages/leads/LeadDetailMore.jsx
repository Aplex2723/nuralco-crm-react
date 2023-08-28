import React from 'react'
import LineSeparator from '../../components/Others/LineSeparator';
import { Label, Input, Textarea } from '@windmill/react-ui'


const LeadDetailMore = ({values, handleValues, isEditing}) => {
    const handleInputs = (e) => {
        handleValues(e)
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pr-2 pl-2'>
    <Label className='text-lg'>
        <span>Cuenta</span>
        <Input className='text-md' name='account_name' disabled={isEditing ? true : false} value={values.account_name} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>

    <Label className='text-lg'>
        <span>Cantidad de Oportunidad</span>
        <Input className='text-md' name='opportunity_amount' disabled={isEditing ? true : false} value={values.opportunity_amount} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>

    <Label className='text-lg'>
        <span>Contacto/s</span>
        <Input className='text-md' name='contacts' disabled={isEditing ? true : false} value={values.contacts} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>
    <Label className='text-lg'>
        <span>Archivos</span>
        <Input className='text-md' name='lead_attachment' disabled={isEditing ? true : false} value={values.lead_attachment} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>
    <Label className='text-lg'>
        <span>Asignados</span>
        <Input className='text-md' name='assigned_to' disabled={isEditing ? true : false} value={values.assigned_to} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>
    <Label className='text-lg'>
        <span>Tipo de Consulta</span>
        <Input className='text-md' name='enquiry_type' disabled={isEditing ? true : false} value={values.enquiry_type} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>
    <Label className='text-lg'>
        <span>Equipos</span>
        <Input className='text-md' name='teams' disabled={isEditing ? true : false} value={values.teams} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>
    <Label className='text-lg'>
        <span>Desde API</span>
        <Input className='text-md' name='created_from_site' disabled={isEditing ? true : false} value={values.created_from_site} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>
</div>
  )
}

export default LeadDetailMore