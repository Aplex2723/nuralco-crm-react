import React from 'react';
import { Draggable } from 'react-beautiful-dnd'; // You'll need to install this library

const LeadCard = ({ lead, index, onLeadClick }) => {
    const handleClick = () => {
        onLeadClick(lead);
      };
  return (
    <Draggable draggableId={lead.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md mb-4 break-words"
          onClick={handleClick}
        >
          <h3 className="text-lg text-black dark:text-white font-semibold ">{lead.title}</h3>
          <p className="text-gray-600 dark:text-gray-200">{lead.description}</p>
          {/* You can add more lead details here */}
        </div>
      )}
    </Draggable>
  );
};

export default LeadCard;