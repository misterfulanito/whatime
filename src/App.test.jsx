import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

describe('App', () => {
  it('increments count when the button is clicked', async () => {
    render(<App />)

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /count is 0/i }))

    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
  })
})
