import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = '(2, 2)'
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const URL = 'http://localhost:9000/api/result'

// const 

export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
        message: initialMessage,
        index: initialIndex,
        newIndex: null,
        submit:  [{
          x: null,
          y: null,
          steps: null,
          email: '',
          }],
        myX: 0,
        myY: 0,
        mySteps: initialSteps,
        myEmail: initialEmail,
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
    else if(this.state.newIndemyX === 4) {
      this.state.myX =2
      this.state.myY =2
    }
    else if(this.state.newIndemyX === 5) {
      this.state.myX = 3
      this.state.myY = 2
    }
    else if(this.state.newIndemyX === 6) {
      this.state.myX = 1
      this.state.myY =3
    }
    else if(this.state.newIndemyX === 7) {
      this.state.myX = 2
      this.state.myY = 3
    }
    else if(this.state.newIndemyX === 8) {
      this.state.myX = 3
      this.state.myY = 3
    }
    
    
  this.getmyXYMessage()

    // submit.myX = this.state.myX
    // submit.y = this.state.y
  }

  getmyXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getmyXY` helper above to obtain the coordinates, and then `getmyXYMessage`
    // returns the fully constructed string.
    this.setState({message: `(${this.state.myX}, ${this.state.myY})`})
    
    return this.state.message
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.

    this.setState({
      email: '',
      message: '(2, 2)',
      index: 4,
      steps: 0
    })
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    // console.log(`the index is: ${this.state.index}`)

    if(direction === 'left') {
      if ((this.state.index === 0) || (this.state.index === 3) || (this.state.index === 6)) {
        this.state.newIndex = this.state.index;
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
        this.state.newIndex = this.state.index;
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
        this.state.newIndex = this.state.index;
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
        this.state.newIndex = this.state.index;
      }
      else if(this.state.index === 3) {this.state.newIndex = 0}
      else if(this.state.index === 4) {this.state.newIndex = 1}
      else if(this.state.index === 5) {this.state.newIndex = 2}
      else if(this.state.index === 6) {this.state.newIndex = 3}
      else if(this.state.index === 7) {this.state.newIndex = 4}
      else if(this.state.index === 8) {this.state.newIndex = 5}
    }
    
    this.setState({index: this.state.newIndex})
    
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    this.setState({steps: this.state.steps + 1})
    this.getNextIndex(evt.target.id)
    this.getXY()

    // console.log(`submit: ${this.state.submit}`)
    // this.setState({submit: this.state.submit.push(steps)}) 
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.



    this.setState({email: evt.target.value})


    // this.setState({submit: this.state.email = evt.target.value}) 
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.

    // let { email, submit, steps, x, y } = this.state

    evt.preventDefault()

    // submit.push(x, myY, steps, email)
    console.log(`submit is: ${this.state.submit}`)

    axios
    .post(URL, this.state.submit)
    .then(res => {
      console.log(res.data.data)
      // this.state({...this.state, submit: res.data.data })
      // this.setState({submit})
    })
    .catch(err => { console.error(err) })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.state.message}</h3>
          <h3 id="steps">You moved {this.state.submit.steps} times</h3>
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
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit" onChange={this.onChange} onClick={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
