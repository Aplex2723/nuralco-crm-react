import React, { useState } from 'react';
import LeadDetail from './LeadDetail';
import LeadDetailAddress from './LeadDetailAddress';
import LeadDetailMore from './LeadDetailMore';
import {Button} from '@windmill/react-ui'
import fetchData from '../../funtions/fetchData';
import { LeadUrl, headersAuthOrg } from '../../funtions/config';
import SuccessModal from '../../components/Others/SuccessModal';

const TabsForLeads = ({ tabs, leadValue, isEditing, setLeadValue, onClose }) => {

  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [activeTab, setActiveTab] = useState(0);


  const handleSubmit = () => {
    fetchData(`${LeadUrl}/${leadValue.id}/`, 'PUT', leadValue, headersAuthOrg).then(data => {
      if(!data.error){
        setOpenSuccessModal(true)
        console.log(data)
      } else {
        console.error(data.error)
      }
    }).catch(e => {
      console.error(e)
    })
  }

  const handleCloseModal = () => {setOpenSuccessModal(false); onClose()}

  const handleInputValues = (e) => {

    const {name, value} = e.target
    setLeadValue(p => ({
      ...p,
      [name]: value
    }))
  }

  return (
    <div className="flex flex-col space-y-2">
      <SuccessModal isOpen={openSuccessModal} onClose={handleCloseModal}/>
      <div className="flex flex-col md:flex-row space-x-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-1 mb-2 md:mb-0 rounded-full ${
              index === activeTab
                ? 'bg-blue-500 dark:bg-blue-700 text-white font-semibold'
                : 'bg-gray-200 dark:bg-gray-700 text-blue-500'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
        {!isEditing && <Button onClick={handleSubmit}>Guardar</Button>}
      </div>
        {
          tabs[activeTab] == tabs[0] ? (<LeadDetail isEditing={isEditing} values={leadValue} handleValues={handleInputValues}/>) : 
          tabs[activeTab] == tabs[1] ? (<LeadDetailAddress isEditing={isEditing} handleValues={handleInputValues} values={leadValue}/>) : 
          <LeadDetailMore isEditing={isEditing} handleValues={handleInputValues} values={leadValue}/>
        }

    </div>
  );
};

export default TabsForLeads;