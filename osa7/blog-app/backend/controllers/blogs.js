const router = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

  response.json(blogs)
})

router.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user

  const blog = new Blog({
    ...request.body,
    user: user.id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const blogToReturn = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1
  })

  response.status(201).json(blogToReturn)
})

router.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(204).end()
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: 'only the creator can delete a blog'
    })
  }

  await Blog.findByIdAndRemove(request.params.id)
  await Comment.deleteMany({ blog: blogToDelete.id })

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query'
  }).populate('user', { username: 1, name: 1 })

  response.json(updatedBlog)
})

router.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    content: body.content,
    blog: blog._id
  })
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  const updatedBlog = await Blog.findById(request.params.id)
    .populate('comments', { content: 1 })
    .populate('user', { username: 1, name: 1 })

  response.status(201).json(updatedBlog)
})

router.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const comments = await Comment.find({ blog: blog._id }).populate('blog', {
    title: 1
  })

  response.json(comments)
})

module.exports = router
