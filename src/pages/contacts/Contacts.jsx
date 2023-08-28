import React, { useState, useEffect} from 'react'
import { faPlus, faPen, faTrash, faWarning, faEye } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import moment from 'moment';

import fetchData from '../../funtions/fetchData'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import AwesomeIcon from '../../components/FontAwesomeIcon'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Pagination,
} from '@windmill/react-ui'

import response from '../../utils/demo/tableData'
import { ContactUrl } from '../../funtions/config'
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';
// make a copy of the data, for the second table
const response2 = response.concat([])

function Contacts() {
  // setup data for every table
  const [pageTable2, setPageTable2] = useState(1)
  const [dataTable2, setDataTable2] = useState([])
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null)
  const [isDetailViewOpen, setDetailViewOpen] = useState(false);
  const [isEditViewOpen, setEditViewOpen] = useState(false);
  
  // pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const resultsPerPage = 10
  const totalResults = response.length

  const history = useHistory()
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }
  
  const redirectToAdd = () => {
    history.push('/app/contacts/add-contact/')
  }
  
  const deleteUser = id => {
    fetchData(`${ContactUrl}/${id}/`, 'delete', null, headers)
      .then((data) => {
        if (!data.error) {
          getcontacts()
        }
      })
      .catch(() => {
      })
  }
  const getcontacts = () => {
    fetchData(`${ContactUrl}/?offset=${(currentPage - 1) * 10}`, 'GET', null, headers).then(d => {
      if(!d.error){
        setTotalContacts(d.contacts_count)
        setTotalPages(Math.ceil(d.contacts_count / 10))
        setData(d.contact_obj_list)
        // localStorage.setItem('curr_contact_page', data.)
        // setTotalPages(data.)
      }
    }).catch(e => console.log(e))
  }
  
  useEffect(() => {
    getcontacts()
  }, [currentPage])
  // on page change, load new sliced data
  // here you would make another server request for new data

    
  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  
  const nextPage = (p) => {
    setCurrentPage(p)
  }
  const closeModal = () => {
    setIsModalOpen(false)

  }
  
  const openModal = (id) => {
    if(isDetailViewOpen){ setDetailViewOpen(false)}
    if(isEditViewOpen){ setEditViewOpen(false)}
    setIsModalOpen(true)
    setUser(id)
  }
  
  const handleDeleteUser = () => {
    setIsModalOpen(false)
    if(user) {
      deleteUser(user)
    } else {
      console.error(`cannot delete user ${user}`)
    }
  }

  const handleOpenPopup = (user) => {
    if(isEditViewOpen){ setEditViewOpen(false)}
    setDetailViewOpen(true);
    setUser(user)
  };
  
  const handleClosePopup = () => {
    setDetailViewOpen(false);
  };

  const handleEditViewOpen = (user) => {
    setEditViewOpen(true)
    if(isDetailViewOpen){ setDetailViewOpen(false) }
    setUser(user)
  }

  const handleEditViewClose = () => {
    setEditViewOpen(false)
    getcontacts()
  }

  return (
    <>
      <PageTitle>Contactos</PageTitle>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader><AwesomeIcon icon={faWarning} className='w-4 h-4 text-yellow-300 dark:text-yellow-500'/> ¿Estas seguro?</ModalHeader>
        <ModalBody>
          Recuerda que una vez realizado ya no podras recuperar la informacion eliminada.
          <br></br>
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button  onClick={closeModal}>
              Cancelar
            </Button>
          </div>
          <div className="block w-full sm:block">
            <Button block size="large" layout="outline" onClick={handleDeleteUser}>
              Acceptar  
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      <div className='flex justify-end'>
          <h1 className='text-xl font-bold text-gray-700 dark:text-gray-200 mt-2 mr-5'>Contactos: {totalContacts}</h1>
          <Button size='large' onClick={redirectToAdd}>Añadir contacto <AwesomeIcon icon={faPlus} className="w-4 h-4 ml-2 "/></Button>
      </div>

      <SectionTitle>Lista de contactos</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Cliente</TableCell>
              <TableCell>Numero</TableCell>
              <TableCell>Organizacion</TableCell>
              <TableCell>Registro</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                    <div>
                      <p className="font-semibold">{user.first_name} {user.last_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.primary_email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.mobile_number}</span>
                </TableCell>
                <TableCell>
                  <Badge >{user.organization}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{moment(user.created_on).format('DD/MM/YYYY')}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit" onClick={() => handleEditViewOpen(user)}>
                      <AwesomeIcon icon={faPen}className='w-5 h-5'/>
                    </Button>
                    <Button layout="link" size="icon" aria-label="View" onClick={() => handleOpenPopup(user)}>
                      <AwesomeIcon icon={faEye}className='w-5 h-5'/>
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={() => openModal(user.id)}>
                      <AwesomeIcon icon={faTrash} className='w-5 h-5'/>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalContacts}
            resultsPerPage={resultsPerPage}
            onChange={nextPage}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      {isDetailViewOpen && <ContactDetail onClose={handleClosePopup} user={user}/>}
      {isEditViewOpen && <EditContact  onClose={handleEditViewClose} user={user}/>}
    </>
  )
}

export default Contacts

