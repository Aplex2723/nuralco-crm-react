
import React, { useState, useRef, useEffect } from 'react'

import SectionTitle from '../Typography/SectionTitle'

import 'react-phone-input-2/lib/style.css'
import { Input, HelperText, Label, Button, Textarea, Modal, ModalHeader, ModalBody, ModalFooter, Select, Badge } from '@windmill/react-ui'
import LineSeparator from '../Others/LineSeparator'


const ShowProfileDetail = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);


  return (
    <>
      {/* Basic information section */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-700 rounded-lg shadow-md break-words">
            <div className='p-3 shadow-inner'>
              <div className='mb-4 flex flex-col items-center justify-center'>
                <div className="space-y-4 ">
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

                </div>
              </div>
              <SectionTitle>{user.user_details.first_name}<br/>{user.user_details.last_name}</SectionTitle>
              <Label className='mb-1 font-semibold'>{user.user_details.email}</Label> 
              <div className='grid grid-cols-2 gap-5 mt-3'>
                <Badge className='flex justify-center font-bold' type={user.is_active ? `success` : "danger"}>{user.is_active ? "Activo" : "Inactivo"}</Badge>
                <Badge className='flex justify-center font-bold'>{user.role}</Badge>
              </div>
            </div>

            <div className='dark:bg-gray-900 rounded-l-lg shadow-lg p-3'>
              <h1 className='text-black flex flex-col items-center justify-center dark:text-white font-bold'>Permisos</h1>
              <div className='grid grid-cols-2 mb-4'>
                <div className='flex flex-col items-center justify-center'>
                  <Label>Marketing</Label>
                  <div className={user.has_marketing_access ? `w-6 mt-2 h-6 rounded-full bg-green-500` : `w-6 mt-2 h-6 rounded-full bg-gray-500`}></div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <Label>Ventas</Label>
                  <div className={user.has_sales_access ? `w-6 mt-2 h-6 rounded-full bg-green-500` : `w-6 mt-2 h-6 rounded-full bg-gray-500`}></div>
                </div>

              </div>
              <LineSeparator/>
              <h1 className='text-black flex flex-col items-center justify-center mb-2 dark:text-white font-bold'>Fecha de registro</h1>
              <Label>{user.date_of_joining || '--'}</Label>
              <LineSeparator/>
              {user.phone && (
                <div>
                  <h1 className='text-black flex mb-2 flex-col items-center justify-center dark:text-white font-bold'>Número</h1>
                  <Label>{user.phone}</Label>
                  <LineSeparator/>
                </div>
              )}
              <h1 className='text-black flex mt-2 flex-col mb-2 items-center justify-center dark:text-white font-bold'>Correo Alternativo</h1>
              <Label className=''>{user.user_details.alternate_email || '--'}</Label>
              <LineSeparator/>
              <h1 className='text-black flex mt-2 flex-col items-center mb-2 justify-center dark:text-white font-bold'>Descripcción</h1>
              <Label className='truncate'>{user.user_details.description || '--'}</Label>
            </div>

          </div>

    </>
  )
}

export default ShowProfileDetail