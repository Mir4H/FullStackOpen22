describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mira Hämäläinen',
      username: 'mirah',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('Login')

  })
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mirah')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Mira Hämäläinen logged in')
    })

    it('fails with wrong credentials and shows red message', function() {
      cy.get('#username').type('mirah')
      cy.get('#password').type('väärä')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mirah', password: 'salainen' })
      cy.createBlog({ title: 'Vähän tykätty', author: 'Testaaja', url: 'www', likes: 5 })
      cy.createBlog({ title: 'Eniten tykätty', author: 'Testaaja', url: 'www', likes: 33 })
      cy.createBlog({ title: 'Ei tykätty', author: 'Testaaja', url: 'www', likes: 0 })
    })

    it('A blog can be created', function() {
      cy.contains('Add Blog').click()
      cy.get('#title').type('Testi blogi')
      cy.get('#author').type('Testi author')
      cy.get('#url').type('TestiURL')
      cy.get('#submit-button').click()

      cy.contains('Testi blogi')
    })
    it('A blog can be liked', function() {
      cy.contains('Vähän tykätty').contains('View').click()
      cy.contains('Vähän tykätty').get('#details').contains('5')
      cy.contains('Vähän tykätty').get('#details').contains('Like').click()
      cy.contains('Vähän tykätty').get('#details').contains('6')
    })
    it('The creator can delete a blog', function() {
      cy.contains('Eniten tykätty').contains('View').click()
      cy.contains('Eniten tykätty').get('#details').contains('Delete').click()
      cy.contains('Eniten tykätty').should('not.exist')

    })
    it('One cant delete others blogs', function() {
      const user = {
        name: 'Testari',
        username: 'testi',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'testi', password: 'salainen' })
      cy.contains('Ei tykätty').contains('View').click()
      cy.contains('Ei tykätty').get('#details').contains('Delete').should('not.exist')
    })

    it('Blogs are sorted by likes, most liked blog first', function() {
      cy.get('.blog').eq(0).should('contain', 'Eniten tykätty')
      cy.get('.blog').eq(1).should('contain', 'Vähän tykätty')
      cy.get('.blog').eq(2).should('contain', 'Ei tykätty')
    })
  })
})