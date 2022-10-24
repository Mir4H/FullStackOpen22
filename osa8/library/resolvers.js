const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/Author')
const Book = require('./models/Book')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

const JWT_SECRET = 'SOME_SECRET_KEY'

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    // bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const bookAuthor = await Author.find({ name: args.author })
      if (args.author && args.genre) {
        const authorsBooksByGenre = await Book.find({
          author: bookAuthor,
          genres: { $in: [args.genre] },
        }).populate('author', {
          name: 1,
          born: 1,
        })
        return authorsBooksByGenre
      }
      if (args.author) {
        const authorsBooks = await Book.find({ author: bookAuthor }).populate(
          'author',
          {
            name: 1,
            born: 1,
          }
        )
        return authorsBooks
      }
      if (args.genre) {
        const bookGenres = await Book.find({
          genres: { $in: [args.genre] },
        }).populate('author', {
          name: 1,
          born: 1,
        })
        return bookGenres
      }
      return Book.find({}).populate('author', { name: 1, born: 1 })
    },
    allAuthors: async () => {
      const books = await Book.find({}).populate('author', { name: 1, born: 1 })
      const authors = books.reduce((prevBook, currentBook) => {
        return prevBook.find((item) => item.name === currentBook.author?.name)
          ? prevBook
          : [...prevBook, currentBook.author]
      }, [])
      return authors.map((author) => ({
        ...author.toJSON(),
        bookCount: books.filter((book) => book.author?.name === author.name)
          .length,
      }))
    },
  } /*
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      return books.length
    },
  },*/,
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong username or password')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('you must be logged in to add a book')
      }

      let bookAuthor = await Author.findOne({ name: args.author })
      if (!bookAuthor) {
        const author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        bookAuthor = author
      }
      const book = new Book({ ...args, author: bookAuthor })
      console.log(book)
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('you must be logged in to edit author')
      }
      const authorToEdit = await Author.findOne({ name: args.name })

      if (!authorToEdit) {
        return null
      }
      authorToEdit.born = args.born
      try {
        await authorToEdit.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return authorToEdit
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}
module.exports = resolvers
