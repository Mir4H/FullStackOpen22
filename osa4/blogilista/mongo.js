const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://mir4H:${password}@cluster0.02gwous.mongodb.net/blogApp?retryWrites=true&w=majority`

mongoose.connect(url)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'blogi',
  author: 'mira',
  url: '',
  likes: 2
})

blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})