import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('Creating a new blog', () => {

  test('<NewBlogform/> calls the event handler with the right props', async () => {
    const user = userEvent.setup()
    const addBlog = jest.fn()

    render(<NewBlogForm addNewBlog={addBlog}/>)

    const inputTitle = screen.getByPlaceholderText('Blog title...')
    const inputAuthor = screen.getByPlaceholderText('Blog author...')
    const inputUrl = screen.getByPlaceholderText('Blog URL...')
    const sendButton = await screen.findByText('Create')

    await user.type(inputTitle, 'this is test title')
    await user.type(inputAuthor, 'this is test author')
    await user.type(inputUrl, 'this is test url')
    await user.click(sendButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('this is test title')
    expect(addBlog.mock.calls[0][0].author).toBe('this is test author')
    expect(addBlog.mock.calls[0][0].url).toBe('this is test url')
  })
})