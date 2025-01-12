import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author', () => {
  const user = {
    token: "foo",
    username: "h4n54eva",
    name: "Jyrki Tukusa"
  }

  const blog = {
    title: 'Cuppers Into Kunto',
    author: 'Hans Välimäki',
    url: 'http://www.testurl.co.uk',
    likes: 0,
    user: user
  }

  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()
})

test("doesn't render url", () => {
  const user = {
    token: "foo",
    username: "h4n54eva",
    name: "Jyrki Tukusa"
  }

  const blog = {
    title: 'Cuppers Into Kunto',
    author: 'Hans Välimäki',
    url: 'http://www.testurl.co.uk',
    likes: 0,
    user: user
  }

  const {container} = render(<Blog blog={blog} user={user} />)

  const detailsContainer = container.querySelector('.detailsContainer')
  expect(detailsContainer).toHaveStyle('display: none')
})

test("Should hide and reveal extra data", async () => {
  const user = {
    token: "foo",
    username: "h4n54eva",
    name: "Jyrki Tukusa"
  }

  const blog = {
    title: 'Cuppers Into Kunto',
    author: 'Hans Välimäki',
    url: 'http://www.testurl.co.uk',
    likes: 0,
    user: user
  }

  const {container} = render(<Blog blog={blog} user={user} />)
  const eventsUser = userEvent.setup()

  const button = container.querySelector('.showButton')
  const detailsContainer = container.querySelector('.detailsContainer')

  expect(detailsContainer).toHaveStyle('display: none')
  await eventsUser.click(button)
  expect(detailsContainer).not.toHaveStyle('display: none')
  await eventsUser.click(button)
  expect(detailsContainer).toHaveStyle('display: none')
})

test("like button should call event handler", async () => {
  const user = {
    token: "foo",
    username: "h4n54eva",
    name: "Jyrki Tukusa"
  }

  const blog = {
    title: 'Cuppers Into Kunto',
    author: 'Hans Välimäki',
    url: 'http://www.testurl.co.uk',
    likes: 0,
    user: user
  }

  const mockHandler = vi.fn()

  const {container} = render(<Blog blog={blog} user={user} handleLike={mockHandler} />)
  const eventsUser = userEvent.setup()

  const button = container.querySelector('.likeButton')
  await eventsUser.click(button)
  await eventsUser.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})