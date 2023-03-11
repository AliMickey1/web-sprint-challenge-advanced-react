// Write your tests here
import React from 'react'
import AppFunctional from './frontend/components/AppFunctional'
import AppClass from './frontend/components/AppClass'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

let up, down, left, right, reset, submit
let squares, coordinates, steps, message, email

// const updateStatelessSelectors = document => {
//   up = document.querySelector('#up')
//   down = document.querySelector('#down')
//   left = document.querySelector('#left')
//   right = document.querySelector('#right')
//   reset = document.querySelector('#reset')
//   submit = document.querySelector('#submit')
// }

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
  email = document.querySelector('#email')
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}



describe(`Testing visible texts`, () => {
  test('sanity', () => {
    expect(true).toBe(false)
  })
  
  test('submit render', (() => {
    render(<AppFunctional />)

    expect(submit).toBeInTheDocument()
    expect(submit).toBeTruthy()
    expect(submit).toHaveTextContent(/submit/i)
  
  }))
  
  test('buttons render', (() => {
    render(<AppFunctional />)
    
    expect(coordinates).toBeInTheDocument()
    expect(coordinates).toBeTruthy()
    expect(coordinates).toBeVisible()
  
  }))
  
  // test('links render', (() => {
  //   render(<index.js />)
  
  //   const links = screen.queryByLabelText(/navlink/i)
  
  //   expect(links).toBeInTheDocument()
  //   expect(links).toBeTruthy()
  //   expect(links).toBeVisible()
  
  // }))
  
})





//Test that the visible texts in headings, 
// buttons, 
// links... render on the screen.
// Test that typing on the input results in its value changing to the entered text.