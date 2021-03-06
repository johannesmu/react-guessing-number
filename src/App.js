import {useState,useEffect} from 'react'
import './App.css';

function generateRandom() {
  return Math.round(Math.random() * 100)
}

function App() {
  const [message,setMessage] = useState('Have a guess')
  const [secret,setSecret] = useState( generateRandom() )
  const SubmitHandler = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const userGuess = parseInt( data.get('guess'))
    // verify if user guess matches secret
    if( userGuess === secret ) {
      setMessage('You guessed correct! The number is '+ {secret})
    }
    else if(userGuess > secret ) {
      setMessage('The number is smaller than '+ userGuess )
    }
    else if(userGuess < secret){
      setMessage('The number is larger than '+ userGuess)
    }
    
  }
  return (
    <div className="App">
      <header>
        <h1>Guess My Number</h1>
      </header>
      <form id="form" onSubmit={SubmitHandler}>
        <input type="text" name="guess" autoComplete="password" autoFocus="true"/>
        <button type="submit">Submit</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default App;
