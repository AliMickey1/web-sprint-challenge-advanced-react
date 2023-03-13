import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'


// Suggested initial states
const initialMessage = '(2, 2)'
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialSubmit = ({
  x: null,
  y: null,
  steps: null,
  email: '',
})

const initialValues = {
  email: '',
  steps: null,
  message: "(2, 2)",
  index: 4,
};

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.

  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps)
  const [stepsMessage, setStepsMessage] = useState('times')
  const [index, setIndex] = useState(initialIndex)
  const [message, setMessage] = useState(initialMessage)
  const [submit, setSubmit] = useState(initialSubmit)
  const [error, setError] = useState("")
  const [data, setData] = useState(null)

  var newIndex = index;
  var myStep = 0;

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let x = null
    let y = null

    if(newIndex === 0) {
      x = 1
      y = 1
    }
    else if(newIndex === 1) {
      x = 2
      y = 1  
    }
    else if(newIndex === 2) {
      x = 3
      y = 1
    }
    else if(newIndex === 3) {
      x = 1
      y = 2
    }
    else if(newIndex === 4) {
      x =2
      y =2
    }
    else if(newIndex === 5) {
      x = 3
      y = 2
    }
    else if(newIndex === 6) {
      x = 1
      y =3
    }
    else if(newIndex === 7) {
      x = 2
      y = 3
    }
    else if(newIndex === 8) {
      x = 3
      y = 3
    }
    
    
    getXYMessage(x, y)
    submit.x = x
    submit.y = y
  }

  function getXYMessage(x, y) {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

      setMessage(`(${x}, ${y})`)
    
    return message
  }

  function reset() {
    // Use this helper to reset all states to their initial values.+
    setSteps(0)
    setIndex(4)
    setEmail(initialEmail)
    setMessage(initialMessage)
    setError("")
    setData(null)
    setSubmit(initialSubmit)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    // var newIndex = index;
    setError("")
   
    if(direction === 'left') {
      if ((index === 0) || (index === 3) || (index === 6)) {
        setError("You can't go left")
        return newIndex = index;
      }
      else if(index === 1) newIndex = 0
      else if(index === 4) newIndex = 3
      else if(index === 7) newIndex = 6
      else if(index === 2) newIndex = 1
      else if(index === 5) newIndex = 4
      else if(index === 8) newIndex = 7
    }
    if(direction === 'right') {
      if ((index === 2) || (index === 5) || (index === 8)) {
        setError("You can't go right")
        return newIndex = index;
      }
      else if(index === 0) {newIndex = 1}
      else if(index === 3) {newIndex = 4}
      else if(index === 6) {newIndex = 7}
      else if(index === 1) {newIndex = 2}
      else if(index === 4) {newIndex = 5}
      else if(index === 7) {newIndex = 8}
    }
    if(direction === 'down') {
      if ((index === 6) || (index === 7) || (index === 8)) {
        setError("You can't go down")
        return newIndex = index;
      }
      else if(index === 0) {newIndex = 3}
      else if(index === 1) {newIndex = 4}
      else if(index === 2) {newIndex = 5}
      else if(index === 3) {newIndex = 6}
      else if(index === 4) {newIndex = 7}
      else if(index === 5) {newIndex = 8}
    }
    if(direction === 'up') {
      if ((index === 0) || (index === 1) || (index === 2)) {
        setError("You can't go up")
        return newIndex = index;
      }
      else if(index === 3) {newIndex = 0}
      else if(index === 4) {newIndex = 1}
      else if(index === 5) {newIndex = 2}
      else if(index === 6) {newIndex = 3}
      else if(index === 7) {newIndex = 4}
      else if(index === 8) {newIndex = 5}
    }
    
    if(steps <= 0){ 
      setStepsMessage(`time`)

    }
    else {
      setStepsMessage("times")
    }

    setSteps(steps + 1)
return newIndex
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    getNextIndex(evt.target.id)
    getXY()
    setIndex(newIndex)


    submit.steps = steps
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { name, value, type } = evt.target

    setEmail(value)
    submit.email = evt.target.value

  }


  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()

    const submitSteps = steps
    submit.steps = submitSteps
  
    axios
      .post('http://localhost:9000/api/result', submit)
      .then(res => {
        setError(res.data.message)
        setData(res.data.message)
        setSubmit(res.data.message)

      })

      .catch(err => { 
        setError(err.response.data.message)

       })
       setEmail(initialEmail)
       setError("")
      
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        
        <h3 id="coordinates">Coordinates {message}</h3>
        <h3 id="steps">You moved {steps} {stepsMessage}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
              </div>
          ))
          
        }
      </div>
      <div className="info">
        <h3 id="message">{error}</h3>

      </div>
      <div id="keypad">

        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>

      <form onSubmit={onSubmit}>
        <input name="email" id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
        <input id="submit" type="submit" onChange={onChange} ></input>
      </form>
    </div>
  )
}
