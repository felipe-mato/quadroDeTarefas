import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default function Column({ title, cards, onDropCard, onAddCard }) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHighlighted(true);
  };

  const handleDragLeave = () => {
    setIsHighlighted(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const cardInfo = JSON.parse(e.dataTransfer.getData('application/json'));
    onDropCard(cardInfo, title);
    setIsHighlighted(false);
  };

  return (
    <section className="column">
      <h2 className="column__title">{title}</h2>
      <section
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`column__cards ${isHighlighted ? 'column__highlight' : ''}`}
      >
        {cards.map((card, index) => (
          <Card key={index} cardInfo={card} />
        ))}
      </section>
        <div className="button-container">
        <button onClick={onAddCard}>+ Adicionar uma tarefa</button>
        </div>
    </section>
  );
}

Column.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  onDropCard: PropTypes.func.isRequired,
  onAddCard: PropTypes.func.isRequired
};
