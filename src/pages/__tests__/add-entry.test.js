import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { useToast } from '@/components/ui/use-toast'
import AddEntry from '../add-entry'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/components/ui/use-toast', () => ({
  useToast: jest.fn(),
}))

describe('AddEntry', () => {
  const mockPush = jest.fn()
  const mockToast = jest.fn()

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush })
    useToast.mockReturnValue({ toast: mockToast })
    global.fetch = jest.fn()
  })

  it('renders the form correctly', () => {
    render(<AddEntry />)
    expect(screen.getByText('Add New Catch')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Weight (lbs)')).toBeInTheDocument()
    expect(screen.getByLabelText('Location')).toBeInTheDocument()
    expect(screen.getByLabelText('Date')).toBeInTheDocument()
    expect(screen.getByLabelText('Notes')).toBeInTheDocument()
    expect(screen.getByLabelText('Tags (comma-separated)')).toBeInTheDocument()
  })

  it('updates form fields on input', async () => {
    render(<AddEntry />)
    const titleInput = screen.getByLabelText('Title')
    await userEvent.type(titleInput, 'Test Catch')
    expect(titleInput).toHaveValue('Test Catch')
  })

  it('submits the form successfully', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true })
    render(<AddEntry />)

    await userEvent.type(screen.getByLabelText('Title'), 'Test Catch')
    await userEvent.type(screen.getByLabelText('Weight (lbs)'), '5.5')
    await userEvent.type(screen.getByLabelText('Location'), 'Test Lake')
    await userEvent.type(screen.getByLabelText('Date'), '2023-05-01')
    await userEvent.type(screen.getByLabelText('Notes'), 'Test notes')
    await userEvent.type(screen.getByLabelText('Tags (comma-separated)'), 'test, catch')

    fireEvent.click(screen.getByText('Save Entry'))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/entries', expect.any(Object))
      expect(mockToast).toHaveBeenCalledWith({
        title: "Success",
        description: "Entry added successfully!",
      })
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  it('handles form submission error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API Error'))
    render(<AddEntry />)

    fireEvent.click(screen.getByText('Save Entry'))

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Error",
        description: "Failed to add entry. Please try again.",
        variant: "destructive",
      })
    })
  })

  it('navigates back on cancel', () => {
    render(<AddEntry />)
    fireEvent.click(screen.getByText('Cancel'))
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('disables buttons when loading', async () => {
    global.fetch.mockImplementationOnce(() => new Promise(() => {}))
    render(<AddEntry />)

    fireEvent.click(screen.getByText('Save Entry'))

    await waitFor(() => {
      expect(screen.getByText('Save Entry')).toBeDisabled()
      expect(screen.getByText('Cancel')).toBeDisabled()
    })
  })
})
