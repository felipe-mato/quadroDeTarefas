import { useState } from 'react';

import Column from './Column';

export default function MainComponent() {
  const initialColumns = {
    'TO DO': [{ id: 1, }],
    'IN PROGRESS': [],
    'TO REVIEW': [],
    'DONE': []
  };

  const [columns, setColumns] = useState(initialColumns);

  const handleDropCard = (cardInfo, targetColumn) => {
    setColumns(prevColumns => {
      const newColumns = { ...prevColumns };
      for (const column in newColumns) {
        newColumns[column] = newColumns[column].filter(card => card.id !== cardInfo.id);
      }
      newColumns[targetColumn].push(cardInfo);
      return newColumns;
    });
  };

  const handleAddCard = (columnTitle) => {
    const newCard = { id: Date.now(), text: 'Nova tarefa', onFocus: true };
    setColumns(prevColumns => ({
      ...prevColumns,
      [columnTitle]: [...prevColumns[columnTitle], newCard]
    }));
  };

  return (
    <>
      <main>
        <header>
          <span>Projects / Felipe Matos</span>
          <h1>Board</h1>
        </header>
        <section className="columns">
          {Object.keys(columns).map(column => (
            <Column
              key={column}
              title={column}
              cards={columns[column]}
              onDropCard={handleDropCard}
              onAddCard={() => handleAddCard(column)}
            />
          ))}
        </section>
      </main>
    </>
  );
}
