const knex = require('knex');
const app = require('../src/app');
const bookmarkData = require('./bookmark-data')

context('Bookmark Route Suite', () => {
  let knexInstance;
  before('create knex instance', () => {
    knexInstance = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', knexInstance)
  })

  
  context('UNAUTHORIZED REQUEST', () => {
    it('/GET /bookmarks',() =>{
      return supertest(app)
        .get('/bookmarks')
        .set('Authorization', 'Bearer WRONGKEY')
        .expect(401)
    })
    it('/GET /bookmarks/:id',() =>{
      return supertest(app)
        .get('/bookmarks/1')
        .set('Authorization', 'Bearer WRONGKEY')
        .expect(401)
    })
    it('/POST /bookmarks',() =>{
      return supertest(app)
        .post('/bookmarks')
        .set('Authorization', 'Bearer WRONGKEY')
        .send({title: 'nope'})
        .expect(401)
    })
    it('/DELETE /bookmarks',() =>{
      return supertest(app)
        .delete('/bookmarks')
        .set('Authorization', 'Bearer WRONGKEY')
        .send({id: 1})
        .expect(401)
    })
  })

  context('WITH DATA', () => {
    const dummyData = bookmarkData.makeBookmarksArray()
    after(()=> knexInstance.destroy())
    beforeEach(() => knexInstance('bookmarks').truncate())
    beforeEach(() => {
      return knexInstance
        .into('bookmarks')
        .insert(dummyData)
    })

    it('/GET /bookmarks returns with data',() => {
      return supertest(app)
        .get('/bookmarks')
        .set('Authorization', 'Bearer 1aa2bb3cc4dd5ee')
        .expect(200, dummyData)
    })

    it('/POST /bookmarks adds bookmark',() => {
      return supertest(app)
        .post('/bookmarks')
        .send({title: 'Test Add', url: 'http://www.testurl.com', description: 'test desc', rating: '4'})
        .set('Authorization', 'Bearer 1aa2bb3cc4dd5ee')
        .then(result => console.log(result))
    })
  })
})
