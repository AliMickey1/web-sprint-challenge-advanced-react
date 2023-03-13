import React from 'react'
import axios from 'axios'


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

const initialValues = ({
  email: '',
  steps: null,
  message: "(2, 2)",
  index: 4,
})


export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
        message: initialMessage,
        index: initialIndex,
        newIndex: null,
        myX: 2,
        myY: 2,
        mySteps: initialSteps,
        myEmail: initialEmail,
        error: '',
        stepsMessage: 'times',
        steps: initialSteps,
        email: initialEmail,
        myStep: initialSteps - 1,
        submit: initialSubmit,
        formErrors: initialValues,
      }
    
    }


      
  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    if(this.state.newIndex === 0) {
      this.state.myX = 1
      this.state.myY = 1
    }
    else if(this.state.newIndex === 1) {
      this.state.myX = 2
      this.state.myY = 1  
    }
    else if(this.state.newIndex === 2) {
      this.state.myX = 3
      this.state.myY = 1
    }
    else if(this.state.newIndex === 3) {
      this.state.myX = 1
      this.state.myY = 2
    }
    else if(this.state.newIndex === 4) {
      this.state.myX =2
      this.state.myY =2
    }
    else if(this.state.newIndex === 5) {
      this.state.myX = 3
      this.state.myY = 2
    }
    else if(this.state.newIndex === 6) {
      this.state.myX = 1
      this.state.myY =3
    }
    else if(this.state.newIndex === 7) {
      this.state.myX = 2
      this.state.myY = 3
    }
    else if(this.state.newIndex === 8) {
      this.state.myX = 3
      this.state.myY = 3
    }

    
  this.getmyXYMessage()

  }

  getmyXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getmyXY` helper above to obtain the coordinates, and then `getmyXYMessage`
    // returns the fully constructed string.
    
    this.setState({message: `(${this.state.myX}, ${this.state.myY})`})
    
    return this.state.message
  }

  reset = (evt) => {
    // Use this helper to reset all states to their initial values.

    this.setState({mySteps: initialSteps})
    this.setState({index: initialIndex})
    this.setState({email: initialEmail})
    this.setState({message: initialMessage})
    this.setState({newIndex: initialIndex})
    this.setState({myEmail: initialEmail})
    this.setState({error: ''})
    this.setState({email: ''})

    this.state.myX = 2
    this.state.myY = 2
    this.state.mySteps = initialSteps
    this.state.email = initialEmail

  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    this.state.error = ''

    if(direction === 'left') {
      if ((this.state.index === 0) || (this.state.index === 3) || (this.state.index === 6)) {
        this.state.error = "You can't go left"
       return this.state.newIndex = this.state.index;
      }
      else if(this.state.index === 1) this.state.newIndex = 0
      else if(this.state.index === 4) this.state.newIndex = 3
      else if(this.state.index === 7) this.state.newIndex = 6
      else if(this.state.index === 2) this.state.newIndex = 1
      else if(this.state.index === 5) this.state.newIndex = 4
      else if(this.state.index === 8) this.state.newIndex = 7
    }
    if(direction === 'right') {
      if ((this.state.index === 2) || (this.state.index === 5) || (this.state.index === 8)) {
        this.state.error = "You can't go right"
        return this.state.newIndex = this.state.index;
      }
      else if(this.state.index === 0) {this.state.newIndex = 1}
      else if(this.state.index === 3) {this.state.newIndex = 4}
      else if(this.state.index === 6) {this.state.newIndex = 7}
      else if(this.state.index === 1) {this.state.newIndex = 2}
      else if(this.state.index === 4) {this.state.newIndex = 5}
      else if(this.state.index === 7) {this.state.newIndex = 8}
    }
    if(direction === 'down') {
      if ((this.state.index === 6) || (this.state.index === 7) || (this.state.index === 8)) {
        this.state.error = "You can't go down"
        return this.state.newIndex = this.state.index;
      }
      else if(this.state.index === 0) {this.state.newIndex = 3}
      else if(this.state.index === 1) {this.state.newIndex = 4}
      else if(this.state.index === 2) {this.state.newIndex = 5}
      else if(this.state.index === 3) {this.state.newIndex = 6}
      else if(this.state.index === 4) {this.state.newIndex = 7}
      else if(this.state.index === 5) {this.state.newIndex = 8}
    }
    if(direction === 'up') {
      if ((this.state.index === 0) || (this.state.index === 1) || (this.state.index === 2)) {
        this.state.error = "You can't go up"
        return this.state.newIndex = this.state.index;
      }
      else if(this.state.index === 3) {this.state.newIndex = 0}
      else if(this.state.index === 4) {this.state.newIndex = 1}
      else if(this.state.index === 5) {this.state.newIndex = 2}
      else if(this.state.index === 6) {this.state.newIndex = 3}
      else if(this.state.index === 7) {this.state.newIndex = 4}
      else if(this.state.index === 8) {this.state.newIndex = 5}
    }
    
    this.setState({index: this.state.newIndex})
    this.setState({mySteps: this.state.mySteps + 1})

    if(this.state.mySteps <= 0){ 
      this.setState({stepsMessage: "time"})
    }
    else {
      this.setState({stepsMessage: "times"})
    }
    return this.state.mySteps
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    this.getNextIndex(evt.target.id)
    this.getXY()
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.

    this.setState({email: evt.target.value})
    submit[this.email] = evt.target.value
  }


  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.

    evt.preventDefault()

    this.state.submit.x = this.state.myX
    this.state.submit.y = this.state.myY
    this.state.submit.steps = this.state.mySteps
    this.state.submit.email = this.state.email

    axios
    .post('http://localhost:9000/api/result', this.state.submit)
    .then((res) => this.setState({error: res.data.message }))
    .catch((err) => this.setState({error: err.response.data.message }))

    this.state.email = initialEmail

  }


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.state.message}</h3>
          <h3 id="steps">You moved {this.state.mySteps} {this.state.stepsMessage}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.error}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
          
        </div>
        <form name="theForm" onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}


