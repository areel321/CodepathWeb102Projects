import { useState } from 'react';
import './App.css';
import Flashcard from './flashcard.jsx';


function App() {
  const [index, setIndex] = useState(0)
  const handleNext = () => {
    
    setIndex((index) => (index + 1) % flashcards.length);
  };
  const handleBack = () => {
    setIndex((index) => (index - 1 + flashcards.length) % flashcards.length);
  };
  
  const flashcards = [
    {front: 'je',
      back: 'i',
    }, 
    {front: 'tu',
      back: 'you (informal or singular)',
    },
    {front: 'nous',
      back: 'we',
    },
    {front: 'vous',
      back: 'you (formal or plural)',
    },
    {front: 'elle',
      back: 'she',
    },
    {front: 'il',
      back: 'he',
    },
    {front: 'on',
      back: 'one or people',
    },
  ]


  return (
    <>
    <div class="header">
      <h1>French Pronouns</h1>
      <p>Flashcard set of French pronouns to English pronouns</p>
      <p>7 cards in set, colors indicate difficulty level</p>
    </div>
    <div class="flashcards">

      <Flashcard flashcards={flashcards} index={index}/>
      <div class="buttons">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
        
      </div>

    </div>
    </>
  )
}

export default App
