import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Rendering Blog', () => {
  const blog = {
    title: 'Test title',
    url: 'Test url',
    author: 'Test author',
    likes: 5,
    user: { username: 'Mirde', name: 'Mira Hämäläinen', id: '6331522fc1e0957dac4c37a5' }
  }

  test('renders test title and author first', () => {

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Test title')
    expect(div).toHaveTextContent('Test author')
    expect(div).not.toHaveTextContent('Test url')
    expect(div).not.toHaveTextContent(5)

  })

  test('render author and likes once view button is clicked', async () => {

    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = await screen.findByText('View')
    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Test title')
    expect(div).toHaveTextContent('Test author')
    expect(div).toHaveTextContent('Test url')
    expect(div).toHaveTextContent(5)

  })
  test('if like button is clicked two times, the function is called two times', async () => {

    const mockHandler = jest.fn()

    render(<Blog blog={blog} addLike={mockHandler} />)

    const user = userEvent.setup()
    const buttonView = await screen.findByText('View')
    await user.click(buttonView)

    const buttonLike = await screen.findByText('Like')
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})