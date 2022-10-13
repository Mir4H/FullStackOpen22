describe('Note ', function () {
  beforeEach(function () {
    cy.reset_db()
    cy.create_user({
      name: 'Mira Hämäläinen',
      username: 'mirah',
      password: 'salainen'
    })

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mirah')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Mira Hämäläinen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mirah')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('#notification').contains('wrong username/password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.log_in('mirah', 'salainen')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type(
        'Authenticate faster in tests with the cy.session command'
      )
      cy.get('#author').type('The Cypress team')
      cy.get('#url').type(
        'https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/'
      )
      cy.contains('create').click()

      cy.contains(
        'Authenticate faster in tests with the cy.session command'
      ).click()
    })
  })

  describe('When a blog exists', function () {
    beforeEach(function () {
      cy.log_in('mirah', 'salainen')

      cy.create_blog({
        title: 'Authenticate faster in tests with the cy.session command',
        author:
          'https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/',
        url: 'https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/'
      })
    })

    it('it can be liked', function () {
      cy.get('.itemInlist').contains('Authenticate').click()
      cy.contains('0 likes')
      cy.get('#likebutton').click()
      cy.contains('1 likes')
    })

    it('creator can remove it', function () {
      cy.get('.itemInlist').contains('Authenticate').click()
      cy.contains('remove').click()
      cy.get('#menubar').get('#home').click()
      cy.contains('The Cypress team').should('not.exist')
    })

    it('other users can not remove it', function () {
      cy.create_user({
        name: 'Mäski Hämäläinen',
        username: 'maski',
        password: 'sala'
      })

      cy.get('#logout-button').click()

      cy.log_in('maski', 'sala')

      cy.get('.itemInlist').contains('Authenticate').click()
      cy.contains('remove').should('not.exist')
    })
  })

  describe('are ordered by likes', function () {
    it('worx', () => {
      cy.log_in('mirah', 'salainen')

      cy.create_blog({
        title: 'blog A',
        author: 'Antti',
        url: 'http://aaa.fi'
      })
      cy.create_blog({
        title: 'blog B',
        author: 'Bettiina',
        url: 'http://aaa.fi'
      })
      cy.create_blog({
        title: 'blog C',
        author: 'Cecilia',
        url: 'http://ccc.fi'
      })

      cy.contains('blog A').click()
      cy.get('#likebutton').as('like_a')

      cy.get('@like_a').click()
      cy.contains("you liked 'blog A'")
      cy.get('#notification').should('exist')

      cy.get('#menubar').get('#home').click()

      cy.contains('blog B').click()
      cy.get('#likebutton').as('like_b')

      cy.get('@like_b').click()
      cy.contains("you liked 'blog B'")
      cy.get('#notification').should('exist')

      cy.get('@like_b').click()
      cy.contains("you liked 'blog B'")
      cy.get('#notification').should('exist')

      cy.get('#menubar').get('#home').click()

      cy.contains('blog C').click()
      cy.get('#likebutton').as('like_c')

      cy.get('@like_c').click()
      cy.contains("you liked 'blog C'")
      cy.get('#notification').should('exist')

      cy.get('@like_c').click()
      cy.contains("you liked 'blog C'")
      cy.get('#notification').should('exist')

      cy.get('@like_c').click()
      cy.contains("you liked 'blog C'")
      cy.get('#notification').should('exist')

      cy.get('#menubar').get('#home').click()

      cy.get('.itemInlist').eq(0).should('contain', 'blog C')
      cy.get('.itemInlist').eq(1).should('contain', 'blog B')
      cy.get('.itemInlist').eq(2).should('contain', 'blog A')
    })
  })
})
