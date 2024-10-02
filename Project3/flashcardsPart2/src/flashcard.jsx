import './flash.css';
import { useState } from 'react';

const flashcard = ({flashcards, index}) => {
  const [flipped, setFlipped] = useState(true);
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const { front, back, difficulty } = flashcards[index];



  return (
    <div className="flashcard" onClick={handleFlip}>
    <div className={`card ${difficulty}`}>
        {flipped ?
        <div class="flashcard-content">
            {front}
        </div>
        : <div class="flashcard-content">
        {back}
        </div>}  
    </div>
    </div>
  );
};

export default flashcard;