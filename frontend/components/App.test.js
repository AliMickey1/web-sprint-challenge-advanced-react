// Write your tests here
import React from 'react'
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

const queryOptions = { exact: false }
const waitForOptions = { timeout: 100 }

test('renders without errors', () => {
  render(<AppFunctional />)
});

   test('submit render', () => {
    render(<AppFunctional />)

    const submitBtn = document.querySelector('#submit')

    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toBeTruthy()

  
  });
  
  test('buttons render', (() => {
    render(<AppFunctional />)

    const coord = document.querySelector('#coordinates')

    expect(coord).toBeInTheDocument()
    expect(coord).toBeTruthy()
    expect(coord).toBeVisible()
  
  }));

  test('email render', (() => {
    render (<AppFunctional />)

    const emailInput = document.querySelector('#email')

    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toBeVisible()

  }));
  
  test('renders email error when no email is entered', async () => {
    render(<AppFunctional />)

    const submitBtn = document.querySelector('#submit')
    fireEvent.click(up)
    fireEvent.click(right)
    fireEvent.click(submitBtn)
    await screen.findByText('Ouch: email is required', queryOptions, waitForOptions)
  })

  test('email type input', (() => {
    render (<AppFunctional />)

    const emailInput = document.querySelector('#email')

    fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
    expect(email).toHaveValue('lady@gaga.com')

  }));





//Test that the visible texts in headings, 
// buttons, 
// links... render on the screen.
// Test that typing on the input results in its value changing to the entered text.