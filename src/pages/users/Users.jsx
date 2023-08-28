import React, { useEffect, useState } from 'react'
import { Label, Card, CardBody, Button } from "@windmill/react-ui"
import { faCircleInfo, faCrown, faEye, faHand, faToggleOff, faToggleOn, faTrash, faUserPen, faUserPlus, faUsers, faUsersSlash } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

import UsersList from './UsersActiveList'
import PageTitle from '../../components/Typography/PageTitle'
import MoreInfoCard from '../../components/Others/MoreInfoCard'
import AlertWarning from '../../components/Others/AlertWarning'
import AwesomeIcon from '../../components/FontAwesomeIcon'
import UsersInactiveList from './UsersInactiveList'
import InfoCard from '../../components/Cards/InfoCard'
import RoundIcon from '../../components/RoundIcon'
import AddUser from './AddUser'

import fetchData from '../../funtions/fetchData'
import { UserUrl } from '../../funtions/config'
import SuccessModal from '../../components/Others/SuccessModal';
import EditUser from './EditUser';

const Users = () => {
  const subscriptions = useSelector((state) => state.subscription.subscription);
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUesrOpen] = useState(false)

  const [activeUsersCount, setActiveUsersCount] = useState(0)
  const [inactiveUsersCount, setInactiveUsersCount] = useState(0)
  const [activeUsersList, setActiveUsersList] = useState([])
  const [inactiveUsersList, setInactiveUsersList] = useState([])
  const [selectedCards, setSelectedCards] = useState([]);
  const [openSuccessModal, setOpenSuccessModal] = useState(false)

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }

  const toggleCardSelection = (cardId) => {
    
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }

  };

  const updateUserStatus = async (id, status) => {
    const params = {
      status: status
    }
    await fetchData(`${UserUrl}/${id}/status/`, "POST", params, headers).then(d => console.log(d)).catch(e => console.error(e))
  }


  const toggleUserStatus = (status) => {
    if(status == "Active"){
      selectedCards.forEach(user_id => {
        updateUserStatus(user_id, "Active")
      })

      setOpenSuccessModal(true)
    }else if (status == 'Inactive'){
      selectedCards.forEach(user_id => {
        updateUserStatus(user_id, 'Inactive')
      })

      setOpenSuccessModal(true)
    }
  }
  useEffect(() => {  
  
    fetchData(`${UserUrl}/`, "GET", null, headers).then(data => {
      if(!data.error){
        const activeUsers = data.active_users
        const inactiveUsers = data.inactive_users

        setActiveUsersCount(activeUsers.active_users_count)
        setActiveUsersList(activeUsers.active_users)

        setInactiveUsersCount(inactiveUsers.inactive_users_count)
        setInactiveUsersList(inactiveUsers.inactive_users)
      } else {
        console.error(data.error)
      }
    }).catch(e => console.error(e))
  }, [openSuccessModal])

  const handleOpenAddUser = () => {
    setAddUserOpen(true)
  }

  const handleOpenEditUser = () => {
    let user_to_show = []

    activeUsersList.forEach(e => {  
      if(selectedCards.includes(e.id)){
        user_to_show.push(e)
      }
    })

    inactiveUsersList.forEach(e => {
      if(selectedCards.includes(e.id)){
        user_to_show.push(e)
      }
    })

    return setEditUesrOpen(user_to_show)
  }

  const handleCloseEditUser = () => setEditUesrOpen(false)

  const handleCloseAddUser = () => {
    setAddUserOpen(false)
  }

  const handleCloseSuccessModal = () => setOpenSuccessModal(false)

  const isMultipleButtonEnabled = selectedCards.length > 0;
  const isInactiveButtonEnabled = () => {
    if(selectedCards.length > 0 && !inactiveUsersList.map(e => selectedCards.includes(e.id)).includes(true)){
      return false
    } else {
      return true
    }

  } 
  const isActiveButtonEnabled = () => {
    if(selectedCards.length > 0 && !activeUsersList.map(e => selectedCards.includes(e.id)).includes(true)){
      return false
    } else {
      return true
    }

  } 
  const isEditButtonEnabled = selectedCards.length > 0;
  return (
    <>
        <div className='h-full min-h-screen flex flex-col overflow-y-auto md:flex-row justify-center '>
            <SuccessModal isOpen={openSuccessModal} onClose={handleCloseSuccessModal}/>
            <div className='mt-4 md:w-full'>
                <MoreInfoCard message="Para agregar más usuarios a tu cuenta, mejórala."/>
                <AlertWarning>Haz alcanzado el máximo de usuarios, mejora tu cuenta para obtener mayores beneficios</AlertWarning>
                {/* <Card colored className="bg-purple-600"> */}
                <Card>
                  <CardBody>
                    <p className="mb-4 font-semibold text-black dark:text-white"><AwesomeIcon icon={faCircleInfo} className='mr-4' />Conceder Acceso</p>
                    <p className="text-black dark:text-white">
                      Si quieres dar permisos a algun miembro de tu organizacion o parte de tu equipo, 
                      crea una cuenta con los datos requeridos para otorgar acceso a la plataforma.
                    </p>
                  </CardBody>
                </Card>

                <div className='mt-3 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-4 mb-4'>
                  <Button disabled={!isMultipleButtonEnabled} onClick={handleOpenAddUser} >
                    Borrar <AwesomeIcon className="ml-2" icon={faTrash}/>
                  </Button>
                  <Button disabled={isInactiveButtonEnabled()} onClick={() => toggleUserStatus("Inactive")} >
                    Desactivar<AwesomeIcon className="ml-2" icon={faToggleOff}/>
                  </Button>
                  <Button disabled={isActiveButtonEnabled()} onClick={() => toggleUserStatus("Active")} >
                    Activar<AwesomeIcon className="ml-2" icon={faToggleOn}/>
                  </Button>
                  <Button disabled={!isEditButtonEnabled} onClick={handleOpenEditUser}>
                    Ver <AwesomeIcon className="ml-2" icon={faEye}/>
                  </Button>
                  <Button disabled={addUserOpen ? true : false} onClick={handleOpenAddUser}>
                    Agregar Usuario <AwesomeIcon className="ml-2" icon={faUserPlus}/>
                  </Button>
                </div>

              {addUserOpen ? <AddUser onClose={handleCloseAddUser}/> : (
                  <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                  <InfoCard title="Usuarios activos" value={activeUsersCount}>
                    <RoundIcon
                      icon={faUsers}
                      iconColorClass="text-orange-500 dark:text-orange-100"
                      bgColorClass="bg-orange-100 dark:bg-orange-500"
                      className="mr-4"
                    />
                  </InfoCard>

                  <InfoCard title="Usuarios inactivos" value={inactiveUsersCount}>
                    <RoundIcon
                      icon={faUsersSlash}
                      iconColorClass="text-green-500 dark:text-green-100"
                      bgColorClass="bg-green-100 dark:bg-green-500"
                      className="mr-4"
                    />
                  </InfoCard>

                  <InfoCard title="Plan activo" value={subscriptions.plan}>
                    <RoundIcon
                      icon={faCrown}
                      iconColorClass="text-blue-500 dark:text-blue-100"
                      bgColorClass="bg-blue-100 dark:bg-blue-500"
                      className="mr-4"
                    />
                  </InfoCard>

                  <InfoCard title="Limite de usuarios" value={subscriptions.user_limit}>
                    <RoundIcon
                      icon={faHand}
                      iconColorClass="text-teal-500 dark:text-teal-100"
                      bgColorClass="bg-teal-100 dark:bg-teal-500"
                      className="mr-4"
                    />
                  </InfoCard>
                </div> 
                )}

                {editUserOpen && <EditUser onClose={handleCloseEditUser} users={editUserOpen}/>}
                
            </div>

            <div className='md:w-1/2 ml-4 '>
              <PageTitle>Usuarios Activos</PageTitle>
              <Label className="mb-2">La siguiente lista muestra los contactos actualmente registrados</Label> 
              <UsersList users={activeUsersList} selectedCards={selectedCards} onSelect={toggleCardSelection}/>   
              <PageTitle>Usuarios Inactivos</PageTitle>
              <UsersInactiveList users={inactiveUsersList} selectedCards={selectedCards} onSelect={toggleCardSelection}/>
            </div>
        </div> 
    </>
  )
}


export default Users;