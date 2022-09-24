const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})

  const newUser = {
    username: 'Tester',
    name: 'Mira',
    password: 'salasana',
  }

  const testUser = await api
    .post('/api/users')
    .send(newUser)

  const resToken = await api
    .post('/api/login')
    .send(newUser)
  token = resToken.body.token
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

  test('a blog can be added', async () => {

    const newBlog = {
      title: 'TestBlog',
      author: 'TestAuthor',
      url: 'http://someurl.com',
      likes: 5,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsNow = await helper.blogsInDb()
    expect(blogsNow).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsNow.map(blog => blog.title)
    expect(titles).toContain('TestBlog')
  })

  test('a blog cant be added without token', async () => {

    const newBlog = {
      title: 'TestBlog',
      author: 'TestAuthor',
      url: 'http://someurl.com',
      likes: 5,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if likes is undefined, likes are 0', async () => {
    const newBlog = {
      title: 'Nolla',
      author: 'TestAuthor',
      url: 'http://someurl.com',
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Deleting a blog', () => {
  test('a blog can be deleted', async () => {
    const newBlog = {
      title: 'Poistettava Blogi',
      author: 'Tero Testi',
      url: 'http://someurl.com',
      likes: 5,
    }
    const blogId = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtStart = await helper.blogsInDb()
    expect(blogsAtStart).toHaveLength(helper.initialBlogs.length +1)

    await api
      .delete(`/api/blogs/${blogId.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length -1)

    const endContents = blogsAtEnd.map(blog => blog.title)
    expect(endContents).not.toContain('Poistettava Blogi')
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

describe('creating users to the DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Mir4H',
      name: 'Mira Hämäläinen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('creation fails without password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Testinen',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is required and must have at least 3 characters')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('creation fails with too short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Testinen',
      name: 'Superuser',
      password: 'a'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is required and must have at least 3 characters')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('creation fails without username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('creation fails with too short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'a',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`a`) is shorter than the minimum allowed length (3).')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})