import React, {useState} from 'react'
import SectionTitle from '../../components/Typography/SectionTitle'
import { faLeaf, faPenToSquare, faSquareEnvelope, faSquarePhone, faSquarePollHorizontal, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import AwesomeIcon from '../../components/FontAwesomeIcon';
import PageTitle from '../../components/Typography/PageTitle';
import ShowProfileDetail from '../../components/Profile/ShowProfileDetail';
import LineSeparator from '../../components/Others/LineSeparator';
import { Label, Input, Textarea } from '@windmill/react-ui'
import ProgressBar from '../../components/Others/ProgressBar';
import LeadDetail from './LeadDetail'
import Tab from '../../components/MainApp/Tab';
import TabsForLeads from './TabsForLeads';

const tabs = ['Detalles', 'Dirección', 'Asignación']; // Customize tab labels
const activeTabIndex = 0; // Change this to set the initial active tab
const LeadContainer = ({ isOpen, onClose, lead = null, isEditing}) => {
    
    const [leadValue, setLeadValue] = useState({
        phone: lead.phone,
        probability: lead.probability,  
        title: lead.title,
        email: lead.email,
        source: lead.source,
        
        first_name: lead.first_name,
        last_name: lead.last_name,
        status: lead.status,
        website: lead.website,
        description: lead.description,
        organization: lead.organization,
        company: lead.company,
        industry: lead.industry,
        close_date: lead.close_date,
        
        address_line: lead.address_line,
        street: lead.street,
        city: lead.city,
        state: lead.state,
        postcode: lead.postcode,
        country: lead.country,
  
        account_name: lead.account_name,
        opportunity_amount: lead.opportunity_amount,
        contacts: lead.contacts,
        lead_attachment: lead.lead_attachment,
        assigned_to: lead.assigned_to,
        enquiry_type: lead.enquiry_type,
        teams: lead.teams,
        created_from_site: lead.created_from_site
    })

    const handleSource = source => {
        const sources = {
                call: "Llamada",
                email: "Email",
                'existing customer': "Cliente Existente",
                partner: "Partner",
                'public relations': "Relaciones Publicas",
                compaign: "Campaña",
                other: "Otro"
        }
        return sources[source]
    }
  return (
    <div className='bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-3 mb-5'>
        <div className='flex mb-3 flex-col md:flex-row'>
            <div className='flex flex-col md:flex-row'>
                <div className='bg-green-700 rounded-lg shadow-xl dark:bg-green-300 w-11 h-11'>
                    <AwesomeIcon className="p-2 text-green-300 dark:text-green-700 w-7 h-7" icon={faLeaf}/>
                </div>
                <div className='md:ml-3'>
                    <h1 className='text-black dark:text-white text-2xl font-bold flex items-center break-words'>{lead.title || 'Sin titulo'}</h1>
                    <span className='text-black dark:text-white text-sm opacity-60'>Oportunidad del {lead.probability || 0}%</span>
                    <ProgressBar percentage={lead.probability || 0}/>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 pt-5 md:pt-0 md:ml-auto pr-2 flex justify-center items-center'>
                <div className='text-center'> 
                    <p className=' text-black dark:text-gray-300 text-lg font-semibold'><AwesomeIcon className='mr-2' icon={faSquarePhone}/> Numero</p>
                    <span className='text-black dark:text-gray-500 text-md'>{lead.phone || '--'}</span>
                </div>
                <div className='text-center'>
                    <p className='text-black dark:text-gray-300 text-lg font-semibold'><AwesomeIcon className='mr-2' icon={faSquareEnvelope}/> Email</p>
                    <span className='text-black dark:text-gray-500 text-md'>{lead.email || '--'}</span>
                </div>
                <div className='text-center'>
                    <p className='text-black dark:text-gray-300 text-lg font-semibold'><AwesomeIcon className='mr-2' icon={faSquarePollHorizontal}/>Fuente</p>
                    <span className='text-black dark:text-gray-500 text-md'>{handleSource(lead.source) || '--'}</span>
                </div>
            </div>
        </div>

        <LineSeparator/>


        <div className='mt-3 flex flex-col md:flex-row mt-4'>
            <div className='md:w-full'>
                <TabsForLeads tabs={tabs} onClose={onClose} leadValue={leadValue} setLeadValue={setLeadValue} isEditing={isEditing}/>
            </div>
            <div className='md:w-1/2'>
                <h1 className='text-black dark:text-gray-300 text-xl font-bold mb-4 '>Creado Por</h1>
                <ShowProfileDetail user={lead.created_by} />
            </div>

        </div>
    </div>
  )
}

export default LeadContainer