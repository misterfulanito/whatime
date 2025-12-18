import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

describe('App', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    globalThis.localStorage.clear()
  })

  it('renders the main UI and allows toggling language', async () => {
    await act(async () => {
      render(<App />)
    })

    // Main title
    expect(
      screen.getByRole('heading', { name: /whatime/i })
    ).toBeInTheDocument()

    // Toggles are present - the aria-label changes based on current language
    // When language is 'es', button says "Switch to English"
    const languageToggle = screen.getByRole('button', { name: /switch to english/i })
    expect(languageToggle).toBeInTheDocument()

    // Default language in App is `es` when nothing is saved
    expect(globalThis.localStorage.getItem('language')).toBe('es')

    // Toggle to `en` and verify it persists via the effect.
    const user = userEvent.setup()
    await user.click(languageToggle)

    await waitFor(() => {
      expect(globalThis.localStorage.getItem('language')).toBe('en')
      // After toggle, button should say "Cambiar a Español"
      expect(screen.getByRole('button', { name: /cambiar a español/i })).toBeInTheDocument()
    })
  })
})
