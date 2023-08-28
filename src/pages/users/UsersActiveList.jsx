import React, { useState } from 'react';
import InfoUserCard from '../../components/Cards/InfoUserCard';
import RoundIcon from '../../components/RoundIcon';
import AwesomeIcon from '../../components/FontAwesomeIcon';
import { faCircleExclamation, faPerson } from '@fortawesome/free-solid-svg-icons';

const UsersList = ({users, selectedCards, onSelect}) => {

  

  const handleCardStyle = (cardId) => {
    if(selectedCards.includes(cardId)){
      return { border: "2px solid blue"}
    } else {
      return { border: ""}
    
    } 
  }

  if (users.length === 0) {
    return <p className='text-lg font-bold text-red-800 dark:text-red-600 '><AwesomeIcon icon={faCircleExclamation} className='w-5 h-5 mr-2'/> No se encontro ningun usuario.</p>;
  }
  return (
    <div className="overflow-y-scroll h-100">

      {users.map(user => (
        <div className='mb-3 rounded-lg' style={handleCardStyle(user.id)} key={user.user_details.id} onClick={() => {
            onSelect(user.id)

          }}>
          <InfoUserCard title={`${user.user_details.first_name} ${user.user_details.last_name}`} value={`${user.user_details.email}`}>
            <RoundIcon
              icon={faPerson}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoUserCard>
        </div>
      ))}

    </div>

  );
}

export default UsersList