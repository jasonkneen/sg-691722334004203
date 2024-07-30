import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { useToast } from '@/components/ui/use-toast'
import Home from '../index'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/components/ui/use-toast', () => ({
  useToast: jest.fn(),
}))

describe('Home', () => {
  const mockPush = jest.fn()
  const mockToast = jest.fn()

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush })
    useToast.mockReturnValue({ toast: mockToast })
    global.fetch = jest.fn()
  })

  it('renders the home page correctly', () => {
    render(<Home />)
    expect(screen.getByText('My Fishing Journal')).toBeInTheDocument()
    expect(screen.getByText('Add New Entry')).toBeInTheDocument()
  })

  it('navigates to add entry page when "Add New Entry" is clicked', () => {
    render(<Home />)
    fireEvent.click(screen.getByText('Add New Entry'))
    expect(mockPush).toHaveBeenCalledWith('/add-entry')
  })

  it('displays loading state when fetching entries', async () => {
    global.fetch.mockImplementationOnce(() => new Promise(() => {}))
    render(<Home />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays error toast when fetching entries fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API Error'))
    render(<Home />)
    await screen.findByText('My Fishing Journal')
    expect(mockToast).toHaveBeenCalledWith({
      title: "Error",
      description: "Failed to fetch entries. Please try again.",
      variant: "destructive",
    })
  })

  it('renders entries when fetch is successful', async () => {
    const mockEntries = [
      { id: 1, title: 'Big Catch', weight: 5.5, location: 'Lake Test', date: '2023-05-01' },
      { id: 2, title: 'Small Catch', weight: 2.0, location: 'River Test', date: '2023-05-02' },
    ]
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEntries),
    })

    render(<Home />)
    
    await screen.findByText('Big Catch')
    expect(screen.getByText('Big Catch')).toBeInTheDocument()
    expect(screen.getByText('Small Catch')).toBeInTheDocument()
    expect(screen.getByText('5.5 lbs')).toBeInTheDocument()
    expect(screen.getByText('2.0 lbs')).toBeInTheDocument()
    expect(screen.getByText('Lake Test')).toBeInTheDocument()
    expect(screen.getByText('River Test')).toBeInTheDocument()
  })

  it('allows sorting entries by different criteria', async () => {
    const mockEntries = [
      { id: 1, title: 'Big Catch', weight: 5.5, location: 'Lake Test', date: '2023-05-01' },
      { id: 2, title: 'Small Catch', weight: 2.0, location: 'River Test', date: '2023-05-02' },
    ]
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEntries),
    })

    render(<Home />)
    
    await screen.findByText('Big Catch')
    
    fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'weight' } })
    expect(screen.getAllByRole('row')[1]).toHaveTextContent('Big Catch')
    
    fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'date' } })
    expect(screen.getAllByRole('row')[1]).toHaveTextContent('Small Catch')
  })

  it('filters entries based on search input', async () => {
    const mockEntries = [
      { id: 1, title: 'Big Catch', weight: 5.5, location: 'Lake Test', date: '2023-05-01' },
      { id: 2, title: 'Small Catch', weight: 2.0, location: 'River Test', date: '2023-05-02' },
    ]
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEntries),
    })

    render(<Home />)
    
    await screen.findByText('Big Catch')
    
    const searchInput = screen.getByPlaceholderText('Search entries...')
    await userEvent.type(searchInput, 'Big')
    
    expect(screen.getByText('Big Catch')).toBeInTheDocument()
    expect(screen.queryByText('Small Catch')).not.toBeInTheDocument()
  })
})
