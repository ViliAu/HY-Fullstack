const { test, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const testBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const validUsers = [
  {
    username: "tester69",
    name: "test user",
    password: "salis123"
  },
  {
    username: "testdude70",
    name: "test user 2",
    password: "salis123"
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  for (let u of validUsers) {
    await api.post('/api/users').send(u)
  }
  const testUsers = await User.find({});
  await Blog.deleteMany({})
  for (let b of testBlogs) {
    const blog = {
      ...b,
      user: {
        username: testUsers[0].username,
        name: testUsers[0].name,
        _id: testUsers[0].id
      }
    }
    await new Blog(blog).save();
  }
})

test('Fetches all blogs', async () => {
  const res = await api.get('/api/blogs')
  assert.strictEqual(testBlogs.length, res.body.length)
})

test('Blogs should have an id field', async () => {
  const res = await api.get('/api/blogs')
  assert.notStrictEqual(res.body[0].id, undefined)
  const blog = testBlogs.find(b => b._id === res.body[0].id)
  assert.notStrictEqual(blog, undefined)
})

test('Able to add a blog only with a valid user', async () => {
  const newBlog = {
    _id: "5a422bc61b54a888234d17fc",
    title: "The pain of testing",
    author: "Terry A. Davis",
    url: "http://example.com/",
    likes: 20,
    __v: 0
  }

  const credentials = {
    username: validUsers[0].username,
    password: validUsers[0].password,
  }

  // Post without token
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  // Log in
  const res = await api.post('/api/users/login').send(credentials);

  // Post with token
  const oldAmount = testBlogs.length;
  await api
    .post('/api/blogs')
    .set({ 'authorization': `Bearer ${res.body.token}` })
    .send(newBlog)
    .expect(201)

  // Check content
  const updatedBlogs = await Blog.find({})
  assert.notStrictEqual(oldAmount, updatedBlogs.length);
  const foundBlog = await Blog.findById(newBlog._id);
  assert.notStrictEqual(foundBlog, undefined)
})

test('Likes default to 0', async () => {
  const newBlog = {
    _id: "5a422bc61b54a888234d17fc",
    title: "The pain of testing",
    author: "Terry A. Davis",
    url: "http://example.com/",
    __v: 0
  }

  const credentials = {
    username: validUsers[0].username,
    password: validUsers[0].password,
  }

  // Log in
  const res = await api.post('/api/users/login').send(credentials);

  const oldAmount = testBlogs.length;
  const apiRes = await api
    .post('/api/blogs')
    .set({ 'authorization': `Bearer ${res.body.token}` })
    .send(newBlog)
    .expect(201)
  const foundBlog = await Blog.findById(apiRes.body.id);
  assert.strictEqual(foundBlog.likes, 0)
})

test('Bad request should return status code 400', async () => {
  const newBlog = {
    _id: "5a422bc61b54a888234d17fc",
    title: "The pain of testing",
    author: "Terry A. Davis",
    url: "http://example.com/",
    likes: 20,
    __v: 0
  }

  const credentials = {
    username: validUsers[0].username,
    password: validUsers[0].password,
  }

  // Log in
  const res = await api.post('/api/users/login').send(credentials);

  await api
    .post('/api/blogs')
    .set({ 'authorization': `Bearer ${res.body.token}` })
    .send(newBlog)
    .expect(201)
  delete newBlog.title
  await api
    .post('/api/blogs')
    .set({ 'authorization': `Bearer ${res.body.token}` })
    .send(newBlog)
    .expect(400)
  delete newBlog.url
  await api
    .post('/api/blogs')
    .set({ 'authorization': `Bearer ${res.body.token}` })
    .send(newBlog)
    .expect(400)
})

test('Should be able to delete blog only with the right user', async () => {
  const newBlog = {
    _id: "5a422bc61b54a888234d17fc",
    title: "The pain of testing",
    author: "Terry A. Davis",
    url: "http://example.com/",
    __v: 0
  }

  const credentials = {
    username: validUsers[0].username,
    password: validUsers[0].password,
  }

  const wrongCredentials = {
    username: validUsers[1].username,
    password: validUsers[1].password,
  }

  const oldLength = testBlogs.length;

  let res = await api.post('/api/users/login').send(credentials);

  // add new blog
  const apiRes = await api
    .post('/api/blogs')
    .set({ 'authorization': `Bearer ${res.body.token}` })
    .send(newBlog)
    .expect(201)

  let blogs = await Blog.find({});
  assert.strictEqual(blogs.length, oldLength + 1);

  // delete unauth
  await api
    .delete('/api/blogs/' + apiRes.body.id)
    .expect(401)

  // delete with wrong user
  // Log in
  res = await api.post('/api/users/login').send(wrongCredentials);
  await api
    .delete('/api/blogs/' + apiRes.body.id)
    .set({ 'authorization': `Bearer ${res.body.token}` })
    .expect(401)

  res = await api.post('/api/users/login').send(credentials);

  // Delete authorized
  await api
    .delete('/api/blogs/' + apiRes.body.id)
    .set({ 'authorization': `Bearer ${res.body.token}` })
    .send(newBlog)
    .expect(200)

  blogs = await Blog.find({})
  assert.strictEqual(oldLength, blogs.length)

  // Delete non-existing blog
  await api
    .delete('/api/blogs/5a422bc61b54a888234d17fc')
    .set({ 'authorization': `Bearer ${res.body.token}` })
    .expect(204)
  assert.strictEqual(oldLength, blogs.length)
})

test('Should be able to update blog with the right ser', async () => {
  const newBlog = {
    _id: "5a422bc61b54a888234d17fc",
    title: "The pain of testing",
    author: "Terry A. Davis",
    url: "http://example.com/",
    likes: 20,
    __v: 0
  }

  const credentials = {
    username: validUsers[0].username,
    password: validUsers[0].password,
  }

  const wrongCredentials = {
    username: validUsers[1].username,
    password: validUsers[1].password,
  }

  const newLikes = 50;


  // send a new blog
  // login
  let res = await api.post('/api/users/login').send(credentials);

  const apiRes = await api
    .post('/api/blogs')
    .set({ 'authorization': `Bearer ${res.body.token}` })
    .send(newBlog)
    .expect(201)

  // update unauthorized
  await api
    .put('/api/blogs/' + apiRes.body.id)
    .send({ likes: newLikes })
    .expect(401)

  res = await api.post('/api/users/login').send(credentials);

  // update authorized
  await api
    .put('/api/blogs/' + apiRes.body.id)
    .set({ 'authorization': `Bearer ${res.body.token}` })
    .send({ likes: newLikes })
    .expect(200)

  const blog = await Blog.findById(apiRes.body.id )
  assert.strictEqual(blog.likes, newLikes)
})