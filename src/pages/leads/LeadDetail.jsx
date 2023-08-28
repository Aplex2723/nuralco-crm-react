import React, { useState } from 'react'
import LineSeparator from '../../components/Others/LineSeparator';
import { Label, Input, Textarea } from '@windmill/react-ui'


const LeadDetail = ({values, handleValues, isEditing }) => {
    const handleInput = (e) => {
        handleValues(e)
    }

  return (
    <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pr-2 pl-2'>
            <Label className='text-lg'>
                <span>Nombre/s</span>
                <Input className='text-md' name='first_name' disabled={isEditing ? true : false} value={values.first_name} onChange={handleInput}></Input>
                <LineSeparator/>
            </Label>

            <Label className='text-lg'>
                <span>Apellido/s</span>
                <Input className='text-md' name='last_name' disabled={isEditing ? true : false} value={values.last_name} onChange={handleInput}></Input>
                <LineSeparator/>
            </Label>

            <Label className='text-lg'>
                <span>Estado</span>
                <Input className='text-md' name='status' disabled={isEditing ? true : false} value={values.status} onChange={handleInput}></Input>
                <LineSeparator/>
            </Label>
            <Label className='text-lg'>
                <span>Sitio Web</span>
                <Input className='text-md' name='website' disabled={isEditing ? true : false} value={values.website} onChange={handleInput}></Input>
                <LineSeparator/>
            </Label>
            <Label className='text-lg'>
                <span>Descripcción</span>
                <Textarea className='text-md' name='description' disabled={isEditing ? true : false} value={values.description} onChange={handleInput}></Textarea>
                <LineSeparator/>
            </Label>
            <Label className='text-lg'>
                <span>Organización</span>
                <Input className='text-md' name='organization' disabled={isEditing ? true : false} value={values.organization} onChange={handleInput}></Input>
                <LineSeparator/>
            </Label>
            <Label className='text-lg'>
                <span>Compañia</span>
                <Input className='text-md' name='company' disabled={isEditing ? true : false} value={values.company} onChange={handleInput}></Input>
                <LineSeparator/>
            </Label>
            <Label className='text-lg'>
                <span>Industria</span>
                <Input className='text-md' name='industry' disabled={isEditing ? true : false} value={values.industry} onChange={handleInput}></Input>
                <LineSeparator/>
            </Label>
            <Label className='text-lg'>
                <span>Fecha de cierre</span>
                <Input className='text-md' name='close_date' disabled={isEditing ? true : false} value={values.close_date} onChange={handleInput}></Input>
                <LineSeparator/>
            </Label>
        </div>
    </>
  )
}

export default LeadDetail