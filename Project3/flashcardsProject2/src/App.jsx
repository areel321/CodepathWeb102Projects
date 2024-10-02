import { useState } from 'react';
import './App.css';
import Flashcard from './flashcard.jsx';


function App() {
  const [index, setIndex] = useState(0)
  const handleNext = () => {
    setIndex(Math.floor(Math.random() * flashcards.length));
  };
  
  const flashcards = [
    {front: 'je',
      back: 'i',
      difficulty: 'easy',
    }, 
    {front: 'tu',
      back: 'you (informal or singular)',
      difficulty: 'easy',
    },
    {front: 'nous',
      back: 'we',
      difficulty: 'medium',
    },
    {front: 'vous',
      back: 'you (formal or plural)',
      difficulty: 'medium',
    },
    {front: 'elle',
      back: 'she',
      difficulty: 'hard',
    },
    {front: 'il',
      back: 'he',
      difficulty: 'hard',
    },
    {front: 'on',
      back: 'one or people',
      difficulty: 'hard',
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
        <button onClick={handleNext}>Next</button>
      </div>

    </div>
    </>
  )
}

export default App
