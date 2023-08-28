import React from 'react';
import InfoUserCard from '../../components/Cards/InfoCard';
import RoundIcon from '../../components/RoundIcon';
import { PeopleIcon } from '../../icons';
import AwesomeIcon from '../../components/FontAwesomeIcon';
import { faCircleExclamation, faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const UsersInactiveList = ({users, selectedCards, onSelect}) => {
  const handleCardStyle = (cardId) => {
    if(selectedCards.includes(cardId)){
      return { border: "2px solid red"}
    } else {
      return { border: ""}
    
    } 
  }
  if (users.length === 0) {
    return <p className='text-lg font-bold text-gray-500 '><AwesomeIcon icon={faCircleExclamation} className='w-5 h-5 mr-2'/> No se encontro ningun usuario.</p>;
  }
  return (
    <div className="overflow-y-scroll h-100">

      {users.map(user => (
        <div className='mb-3 mr-2 rounded-lg' style={handleCardStyle(user.id)} key={user.user_details.id} onClick={() => {
          onSelect(user.id)

        }}>
          <InfoUserCard title={`${user.user_details.first_name} ${user.user_details.last_name}`} value={`${user.user_details.email}`}>
            <RoundIcon
              icon={faPersonCircleQuestion}
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

export default UsersInactiveList