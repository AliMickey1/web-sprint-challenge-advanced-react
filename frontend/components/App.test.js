// Write your tests here
import AppFunctional from "./AppFunctional"

test('sanity', () => {
  expect(true).toBe(false)
})

test('headings render', (() => {
  render(<AppFunctional />)

  const head = screen.queryByText(/coordinate/i)

  expect(head).toBeInTheDocument()
  expect(head).toBeTruthy()
  expect(head).toHaveTextContent(/coordinate/i)

}))

test('buttons render', (() => {
  render(<AppFunctional />)

  const buttons = screen.getByLabelText(/button/i)

  expect(buttons).toBeInTheDocument()
  expect(buttons).toBeTruthy()
  expect(buttons).toBeVisible()

}))

test('links render', (() => {
  render(<index.js />)

  const links = screen.queryByLabelText(/navlink/i)

  expect(links).toBeInTheDocument()
  expect(links).toBeTruthy()
  expect(links).toBeVisible()

}))




//Test that the visible texts in headings, 
// buttons, 
// links... render on the screen.
// Test that typing on the input results in its value changing to the entered text.