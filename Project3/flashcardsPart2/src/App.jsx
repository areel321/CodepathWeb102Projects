import { useState } from 'react';
import './App.css';
import Flashcard from './flashcard.jsx';


function App() {
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

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [resultColor, setResultColor] = useState({});
  const [shuffle, setShuffle] = useState(false);
  const [cards, setCards] = useState(flashcards);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const handleNext = () => {
    resetInput();
    setIndex((index) => (index + 1) % flashcards.length);
  };
  const handleBack = () => {
    resetInput();
    setIndex((index) => (index - 1 + flashcards.length) % flashcards.length);
  };

  const resetInput = () => {
    setAnswer('');
    setResultColor({}); 
  };

  const checkAnswer = () => {
    if (answer === flashcards[index].back) {
      setResultColor({ borderColor: 'green' }); 
      setStreak((streak) => streak + 1);
      if (streak >= longestStreak){
        setLongestStreak(streak);
      }

    } else {
      setResultColor({ borderColor: 'red' }); 
      setStreak(0);
    }
  };

  const handleShuffle = () => {
    resetInput();
    setShuffle(!shuffle);

    if (!shuffle) {
      let shuffledArr = [...flashcards]
      let currentIndex = shuffledArr.length;
      while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [shuffledArr[currentIndex], shuffledArr[randomIndex]] = [
          shuffledArr[randomIndex], shuffledArr[currentIndex]];
      }
      setCards(shuffledArr); 
      setIndex(0); 
    } else {
      setCards(flashcards); 
      setIndex(0); 
    }
  }



  return (
    <>
    <div class="header">
      <h1>French Pronouns</h1>
      <p>Flashcard set of French pronouns to English pronouns</p>
      <p>7 cards in set, colors indicate difficulty level</p>
    </div>
    <div className="flashcards">
      <Flashcard flashcards={cards} index={index}/>
      <div className="answer">
        <input 
          type="text" 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          placeholder="guess here!"
          style={resultColor} 
        />
        <button onClick={checkAnswer}>Check Answer</button>
      
      </div>
      <div className="buttons">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleShuffle}>Shuffle</button>
        
      </div>
      <div>
        <h3>Current Streak: {streak} </h3>
        <h3>Longest Streak: {longestStreak}</h3>
      </div>

    </div>
    </>
  )
}

export default App
