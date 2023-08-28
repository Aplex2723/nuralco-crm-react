import React from 'react';
import { Droppable } from 'react-beautiful-dnd'; // You'll need to install this library
import LeadCard from '../../components/Cards/LeadCard';
import { Button} from '@windmill/react-ui'
import LineSeparator from '../../components/Others/LineSeparator';


const LeadList = ({ leads, status, onLeadClick }) => {

    return (
      <Droppable droppableId={status} key={status}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="w-full shadow-lg md:w-1/4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg md:mr-2 mb-4 md:mb-0"
            
          >
            <h2 className="text-lg text-gray-700 dark:text-gray-400 font-semibold mb-4">{status}</h2>
            <LineSeparator/>
            {leads.map((lead, index) => (
              <LeadCard key={lead.id} lead={lead} index={index} onLeadClick={onLeadClick}/>
            ))}
            {status == "En Proceso" && (<Button block layout="outline" size="small">Agregar</Button>)}
        
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };
  
export default LeadList;