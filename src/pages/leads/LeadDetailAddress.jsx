import React from 'react'
import LineSeparator from '../../components/Others/LineSeparator';
import { Label, Input, Textarea } from '@windmill/react-ui'



function LeadDetailAddress({values, handleValues, isEditing}) {
    const handleInputs = (e) => {
        handleValues(e)
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pr-2 pl-2'>
    <Label className='text-lg'>
        <span>Dirección</span>
        <Input className='text-md' name='address_line' disabled={isEditing ? true : false} value={values.address_line} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>

    <Label className='text-lg'>
        <span>Calle/s</span>
        <Input className='text-md' name='street' disabled={isEditing ? true : false} value={values.street} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>

    <Label className='text-lg'>
        <span>Ciudad</span>
        <Input className='text-md' name='city' disabled={isEditing ? true : false} value={values.city} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>
    <Label className='text-lg'>
        <span>Estado</span>
        <Input className='text-md' name='state' disabled={isEditing ? true : false} value={values.state} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>
    <Label className='text-lg'>
        <span>Código Postal</span>
        <Input className='text-md' name='postcode' disabled={isEditing ? true : false} value={values.postcode} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>
    <Label className='text-lg'>
        <span>País</span>
        <Input className='text-md' name='country' disabled={isEditing ? true : false} value={values.country} onChange={handleInputs}></Input>
        <LineSeparator/>
    </Label>

</div>
  )
}

export default LeadDetailAddress