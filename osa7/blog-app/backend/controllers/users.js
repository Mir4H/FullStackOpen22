const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    author: 1,
    title: 1,
    url: 1,
    likes: 1
  })

  response.json(users)
})

router.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({
      error:
        'Failed to create account: Invalid password (Must be at least 3 characters)'
    })
  }

  if (!username || username.length < 3) {
    return response.status(400).json({
      error:
        'Failed to create account: Invalid username (Must be at least 3 characters)'
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'Failed to create account: Username already exists'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = router
