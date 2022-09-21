const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((previous, current) => previous + current.likes, 0)

const favoriteBlog = (blogs) => {
  const likeList = blogs.map(item => item.likes)
  const mostLikes = blogs.find(item => item.likes === Math.max(...likeList))
  return (({ title, author, likes }) => ({ title, author, likes }))(mostLikes)
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs.map(item => item.author))
  const maxBlogs = _.max(Object.values(authors))
  const maxAuthor = Object.keys(authors).find(key => authors[key] === maxBlogs)
  return { 'author': maxAuthor, 'blogs': maxBlogs }
}

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((authors, selected) => {
    const index = authors.findIndex(item => item.author === selected.author)
    const newObject = {
      author: selected.author,
      likes: selected.likes,
    }
    index < 0 ? authors.push(newObject) : authors[index].likes += selected.likes
    return authors
  }, [])
  const maxLikes =  _.max(authorLikes.map(author => author.likes))
  return authorLikes.find(item => item.likes === maxLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
