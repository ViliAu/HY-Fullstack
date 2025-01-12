import { render, screen } from '@testing-library/react'
import BlogForm from '../src/components/BlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('calls event handler with the right attributes', async () => {
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

  const blogMock = vi.fn()
  const messageMock = vi.fn()
  const refMock = vi.fn();

  const { container } = render(<BlogForm blogHandler={blogMock} showMessage={messageMock} blogFormRef={refMock} />)
  const event = userEvent.setup()

  const titleInput = container.querySelector('.titleInput')
  const authorInput = container.querySelector('.authorInput')
  const urlInput = container.querySelector('.urlInput')
  const submit = container.querySelector('.submitButton')

  await event.type(titleInput, blog.title)
  await event.type(authorInput, blog.author)
  await event.type(urlInput, blog.url)
  await event.click(submit)

  delete blog.likes
  delete blog.user

  expect(blogMock.mock.calls[0][0]).toEqual(blog)
})