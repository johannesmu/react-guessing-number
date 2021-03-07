import { useState, useEffect } from 'react'
import './App.css';

function generateRandom() {
  return Math.round(Math.random() * 100)
}

function App() {
  const maxGuessCount = 6

  const [message, setMessage] = useState('You have '+ maxGuessCount + ' guesses')
  const [secret, setSecret] = useState(generateRandom())
  const [playing, setPlaying] = useState(true)
  const [guessCount, setGuessCount ] = useState( maxGuessCount )

  useEffect( () => {
    if( guessCount === 0 ) {
      setMessage( 'Out of guesses')
      setPlaying( false )
    }
  }, [guessCount] )

  const SubmitHandler = (event) => {
    event.preventDefault()
    if (playing === false) {
      setSecret(generateRandom())
      setPlaying(true)
      setMessage('Have a guess')
      setGuessCount( maxGuessCount )
    }
    else {
      const data = new FormData(event.target)
      event.target.reset()
      const userGuess = parseInt(data.get('guess'))
      // verify that a number has been entered
      if (isNaN(userGuess)) {
        setMessage('Only a number between 0-100 accepted')
        return
      }
      else if (userGuess > 100) {
        setMessage('Only a number between 0-100 accepted')
        return
      }
      // verify if user guess matches secret
      if (userGuess === secret) {
        setMessage('You guessed correct! The number is ' + secret)
        setPlaying(false)
      }
      else if (userGuess > secret) {
        setMessage('The number is smaller than ' + userGuess)
        setGuessCount( guessCount - 1 )
      }
      else if (userGuess < secret) {
        setMessage('The number is larger than ' + userGuess)
        setGuessCount( guessCount - 1 )
      }
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Guess My Number</h1>
      </header>
      <form id="form" onSubmit={SubmitHandler}>
        <input 
          type="text" 
          name="guess" 
          autoComplete="password" 
          autoFocus="true" 
          disabled={ playing ? false : true }
        />
        <button type="submit" className={ playing ? "" : "play"}>
          { playing ? guessCount + ( guessCount > 1 ? " Guesses" : " Guess") : "Play again? " }
        </button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default App;
