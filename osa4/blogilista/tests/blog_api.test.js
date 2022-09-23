const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Checking initial blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('all blogs have id field', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(item => expect(item.id).toBeDefined())
  })
})

describe('Adding a new blog', () => {
  test('a blog can be added ', async () => {
    const newBlog = {
      title: 'TestBlog',
      author: 'TestAuthor',
      url: 'http://someurl.com',
      likes: 5
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsNow = await helper.blogsInDb()
    expect(blogsNow).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsNow.map(blog => blog.title)
    expect(titles).toContain('TestBlog')
  })

  test('if likes is undefined, likes are 0', async () => {
    const newBlog = {
      title: 'Nolla',
      author: 'Nollatus',
      url: 'http://someurl.com',
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    expect(response.body.likes).toBe(0)
  })

  test('blog without title or url is not added', async () => {
    const newBlog = {
      author: 'Tero Testi',
      url: 'http://someurl.com',
      likes: 5,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Deleting a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(blog => blog.content)
    expect(contents).not.toContain(blogToDelete)
  })
})

describe('Updating a blog', () => {
  test('likes of a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[1]
    const newLikes = blogsAtStart[1].likes + 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: newLikes })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[1].likes).toBe(newLikes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})