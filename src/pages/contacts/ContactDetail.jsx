import React, { useEffect } from 'react'
import { Label, Button } from '@windmill/react-ui'
import AwesomeIcon from '../../components/FontAwesomeIcon'
import { faClapperboard, faNoteSticky, faNotesMedical, faPerson } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

const ContactDetail = ({ onClose, user }) => {

  return (
    <>
    <div className='mt-3 mb-3 ' >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md ">
          <h1 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400"><AwesomeIcon className="mr-2" icon={faPerson}/> {user.first_name} {user.last_name} [{user.id}]</h1>
          <h2 className='text-xl font-semibold text-black dark:text-white'><AwesomeIcon className="mr-4" icon={faClapperboard}/>Información Personal</h2>
          <div className='pl-2 pt-2 pb-2 rounded grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 bg-gray-100 dark:bg-gray-900'>
            <Label><span className="font-semibold">Empresa/Organización</span><br />{user.organization}</Label>

            {user.department && <Label><span className="font-semibold">Departamento</span><br />{user.department}</Label>}

            <Label><span className="font-semibold">Ocupación</span><br />{user.title}</Label>

            <Label><span className="font-semibold">Email Principal</span><br />{user.primary_email}</Label>

            {user.secondary_email && <Label><span className="font-semibold">Email Secundario</span><br />{user.secondary_email}</Label> }

            <Label><span className="font-semibold">Numero Telefónico</span><br />{user.mobile_number}</Label>

            {user.secondary_number && <Label><span className="font-semibold">Numero Secundario</span><br />{user.secondary_number}</Label> }

            {user.country && <Label><span className="font-semibold">País</span><br />{user.country}</Label> }

            {user.language && <Label><span className="font-semibold">País</span><br />{user.language}</Label> }
          </div> 

          <div className='pl-2 pt-2 pb-2 rounded grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 bg-gray-100 dark:bg-gray-900'>
            <Label><span className="font-semibold">Direccion</span><br />{user.address.address_line || "-"}</Label>
            <Label><span className="font-semibold">Calle</span><br />{user.address.street || "-"}</Label>
            <Label><span className="font-semibold">Ciudad</span><br />{user.address.city || "-"}</Label>
            <Label><span className="font-semibold">Estado</span><br />{user.address.state|| "-"}</Label>
            <Label><span className="font-semibold">Codigo Postal</span><br />{user.address.postcode || "-"}</Label>
            <Label><span className="font-semibold">Pais</span><br />{user.address.country || "-"}</Label>
          </div>

          <div className=' pl-2 pt-2 pb-2 rounded grid grid-cols-2 md:grid-cols-3 gap-4 mb-5 bg-gray-100 dark:bg-gray-900'>
            <Label><span className="font-semibold"><AwesomeIcon className="mr-4" icon={faLinkedin}/>LinkedIn</span><br />{user.linked_in_url || "-"}</Label>
            <Label><span className="font-semibold"><AwesomeIcon className="mr-4" icon={faFacebook}/>Facebook</span><br />{user.facebook_url || "-"}</Label>
            <Label><span className="font-semibold"><AwesomeIcon className="mr-4" icon={faTwitter}/>Twitter</span><br />{user.twitter_username || "-"}</Label>

          </div>

          <h2 className='text-black dark:text-white text-xl font-semibold'><AwesomeIcon className="mr-4" icon={faNoteSticky}/>Descripcción</h2>
          <div className='pl-2 pt-2 pb-2 rounded grid grid-cols-1 mb-5 bg-gray-100 dark:bg-gray-900'>
            <Label>{user.description || "-"}</Label>

          </div>
          <div className='flex justify-end'>
            <Button className="w-full sm:w-auto" size="small" layout="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>

    </div>
    </>
  );
};


export default ContactDetail