import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Card({ cardInfo, onEdit }) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(cardInfo.text);
  const [isDragging, setIsDragging] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEdit(cardInfo.id, editedText);
      setIsEditing(false);
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify(cardInfo));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section
      className="card"
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <textarea
          placeholder='Digite uma tarefa...'
          value={editedText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus
          className="card-textarea"
        />
      ) : (
        <div>{editedText}</div>
      )}
    </section>
  );
}

Card.propTypes = {
  cardInfo: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
};
