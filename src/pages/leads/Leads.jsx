import React, {useEffect, useState} from 'react'
import { DragDropContext } from 'react-beautiful-dnd'; // You'll need to install this library
import LeadList from './LeadList';
import { Button} from '@windmill/react-ui'
import AwesomeIcon from '../../components/FontAwesomeIcon';
import { faLeaf, faPenToSquare, faSquareEnvelope, faSquarePhone, faSquarePollHorizontal, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import LeadContainer from './LeadContainer';
import fetchData from '../../funtions/fetchData';
import { LeadUrl } from '../../funtions/config';
import ThemedSuspense from '../../components/ThemedSuspense';
import AddLead from './AddLead';


const Leads = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [openLeads, setOpenLeads] = useState(null)
  const [closeLeads, setCloseLeads] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [contacts, setContacts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openLead, setOpenLead] = useState(false)
  const [enableEdit, setEnableEdit] = useState(false)

  const [leadsCount, setLeadsCount] = useState({open_leads_count: 0, close_leads_count: 0})
  
  const perPage = 10

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }

  useEffect(() => {
    
    fetchData(`${LeadUrl}/`, 'GET', null, headers).then(data => {
      if(!data.error){
        setOpenLeads(data.open_leads.open_leads)
        if(data.close_leads.close_leads){ setCloseLeads(data.close_leads.close_leads) }
        if(data.contacts){ setContacts(data.contacts) }

        setLeadsCount({
          open_leads_count: data.open_leads.leads_count,
          close_leads_count: data.close_leads.leads_count
        })
        setIsLoading(false)

      } else {
        console.error(data.error)
      }
    }).catch(e => console.error(e))
  }, [])

  const onDragEnd = (result) => {
    // Handle lead reordering and status changes here
  };

  const handleCloseLead = () => {setOpenLead(false)}

  const handleEditButton = () => {
    if(openLead){
      setEnableEdit(false); 
    } else {
      setEnableEdit(true)
    }
  }


  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
    setEnableEdit(true)
    setOpenLead(true)
    console.log(lead)
  };

  return (
    <>
      {!isLoading ? (
        <div>
          <div className='md:mr-2 mt-3 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-2 mb-3'>
            <Button disabled={openLead ? false : true}>
              Eliminar <AwesomeIcon className="ml-2" icon={faTrashCan}/>
            </Button>
            <Button disabled={enableEdit ? false : true} onClick={handleEditButton}>
              Editar <AwesomeIcon className="ml-2" icon={faPenToSquare} />
            </Button>
            <Button disabled={openLead ? false : true} onClick={handleCloseLead}>
              Cerrar
            </Button>
          </div>
          <div className="md:flex md:justify-center mb-5">
            <DragDropContext onDragEnd={onDragEnd} className=''>
                <LeadList leads={openLeads.filter(lead => lead.status === 'in process')} status="En Proceso" onLeadClick={handleLeadClick} />
                <LeadList leads={openLeads.filter(lead => lead.status === 'recycled')} status="Reciclado" onLeadClick={handleLeadClick} />
                <LeadList leads={closeLeads.filter(lead => lead.status === 'closed')} status="Cerrado" onLeadClick={handleLeadClick} />
            </DragDropContext>

            <AddLead/>
          </div>


          {openLead && <LeadContainer onClose={handleCloseLead} lead={selectedLead} isEditing={enableEdit}/>}
        </div>

      ) : <ThemedSuspense/>}
      
    </>
  );
}

export default Leads