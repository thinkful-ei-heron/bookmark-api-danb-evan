const app = require('../src/app');
const STORE = require('../src/STORE')

let dummyData = STORE
let testData;
describe('No Auth', () => {
  beforeEach('bopy the bookmarks', () => {
  testData = dummyData
  })
  it('401s on GET bookmarks/ without auth', () => {
    return supertest(app)
      .get('/bookmarks')
      .expect(401)
  })
  it('401s on GET bookmark/:id without auth', () => {
    return supertest(app)
      .get(`/bookmarks/${testData[0].id}`)
      .expect(401)
  })
  it('401s on POST bookmarks without auth', () => {
    return supertest(app)
      .get(`/bookmarks`)
      .send({url: 'website.com', desc: 'something', rating: 5})
      .expect(401)
  })
})

describe('Invalid data', () => {
  it('400s on invalid URL', () => {
    return supertest(app)
      .post('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .send({url: 'soemthing', desc: 'soemthing', rating: 2})
      .expect(400)
  })
  it('400s on too long of url', () => {
    return supertest(app)
      .post('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .send({url: 'http://ssoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingsoemthingoemthing.com', desc: 'soemthing', rating: 2})
      .expect(400)
  })
  it('400s on URL being empty', () => {
    return supertest(app)
      .post('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .send({url: '', desc: 'something to talk about', rating: 2})
      .expect(400)
  })
  it('400s on Rating being empty', () => {
    return supertest(app)
      .post('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .send({url: 'http://www.website.com', desc: 'something to talk about', rating: '' })
      .expect(400)
  })
  it('400s on Rating being NaN', () => {
    return supertest(app)
      .post('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .send({url: 'http://www.website.com', desc: 'something to talk about', rating: 's' })
      .expect(400)
  })
  it('400s on Rating being NaN', () => {
    return supertest(app)
      .post('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .send({url: 'http://www.website.com', desc: 'something to talk about', rating: '2' })
      .expect(400)
  })
  it('400s on desc being empty', () => {
    return supertest(app)
      .post('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .send({url: 'http://website.com', desc: '', rating: 2})
      .expect(400)
  })
})

describe('200s', () => {
  beforeEach('copy marks', () => {
    testData = dummyData
  })

  it('GET /bookmarks responds with json with a body of 3 items', () => {
    return supertest(app)
      .get('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
          expect(res.body.length).to.deep.equal(3)
      })
  });
  it('DELETE /bookmark/:id responds with 2 items', () => {
    const target = testData[0]
    const expected = testData.filter(x => x.id === target.id)
    console.log(testData)
    return supertest(app)
      .delete(`/bookmark/${target.id}`)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200)
      .then(() => {
        expect(testData).eql(expected)
      })
  })
});

























