const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Login form', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/test/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Timo Testeri',
        username: 'TiTe',
        password: '1234'
      }
    })
    await page.goto('/')
  })

  test('Login form should be visible', async ({ page }) => {
    await expect(page.locator('.usernameInput')).toBeVisible()
    await expect(page.locator('.passwordInput')).toBeVisible()
  })

  test('Login form should be functional', async ({ page }) => {

    const usernameInput = await page.locator('.usernameInput')
    const passwordInput = await page.locator('.passwordInput')
    const submitButton = await page.getByRole('button', { type: 'submit' })

    await expect(page.getByText('Timo Testeri logged in')).not.toBeVisible()

    await usernameInput.fill("TiTe")
    await passwordInput.fill("1234")
    await submitButton.click()

    await expect(page.locator('div').getByText('Timo Testeri logged in')).toBeVisible()

  })

  test('Should not be able to log in with invalid credentials', async ({ page }) => {
    const usernameInput = await page.locator('.usernameInput')
    const passwordInput = await page.locator('.passwordInput')
    const submitButton = await page.getByRole('button', { type: 'submit' })

    await expect(page.locator('div').getByText('Timo Testeri logged in')).not.toBeVisible()

    await usernameInput.fill("TiTe")
    await passwordInput.fill("4321")
    await submitButton.click()

    await expect(page.locator('div').getByText('Timo Testeri logged in')).not.toBeVisible()

  })
})

describe('Blog form', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/test/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Timo Testeri',
        username: 'TiTe',
        password: '1234'
      }
    })
    await page.goto('/')
  })

  const login = async (page) => {
    const usernameInput = await page.locator('.usernameInput')
    const passwordInput = await page.locator('.passwordInput')
    const submitButton = await page.getByRole('button', { type: 'submit' })

    await usernameInput.fill("TiTe")
    await passwordInput.fill("1234")
    await submitButton.click()
  }

  test('Blog form should be visible when show button is clicked', async ({ page }) => {
    const blog = {
      title: "MYFIRSTTESTBLOG",
      author: "tester",
      url: "www.404.com"
    }
    await login(page);
    const button = await page.locator('button:text("new blog")')
    await button.click()
    const titleInput = await page.locator('.titleInput')
    const authorInput = await page.locator('.authorInput')
    const urlInput = await page.locator('.urlInput')
    const submit = await page.locator('.submitButton')

    await titleInput.fill(blog.title);
    await authorInput.fill(blog.author);
    await urlInput.fill(blog.url);
    await submit.click();

    await expect(page.getByText(blog.title).first()).toBeVisible();
  })

  test('Blog can be liked', async ({ page }) => {
    const blog = {
      title: "MYFIRSTTESTBLOG",
      author: "tester",
      url: "www.404.com"
    }
    await login(page);
    const button = await page.locator('button:text("new blog")')
    await button.click();
    const titleInput = await page.locator('.titleInput')
    const authorInput = await page.locator('.authorInput')
    const urlInput = await page.locator('.urlInput')
    const submit = await page.locator('.submitButton')

    await titleInput.fill(blog.title);
    await authorInput.fill(blog.author);
    await urlInput.fill(blog.url);
    await submit.click();

    const showMoreButton = await page.locator('.showButton').first()
    await showMoreButton.click();

    await expect(page.getByText('likes: 0').first()).toBeVisible();

    const likeButton = await page.locator('.likeButton').first()


    // const responsePromise = page.waitForResponse(response =>
    //   response.url().includes('/api/blogs') && response.status() === 200
    //       && response.request().method() === 'GET'
    // );
    await likeButton.click();
    // const response = await responsePromise;

    await expect(page.getByText('likes: 1').first()).toBeVisible();
    await expect(page.getByText('likes: 0').first()).not.toBeVisible();
  })

  test('Blog can be deleted', async ({ page }) => {
    const blog = {
      title: "MYFIRSTTESTBLOG",
      author: "tester",
      url: "www.404.com"
    }
    await login(page);
    const button = await page.locator('button:text("new blog")')
    await button.click();
    const titleInput = await page.locator('.titleInput')
    const authorInput = await page.locator('.authorInput')
    const urlInput = await page.locator('.urlInput')
    const submit = await page.locator('.submitButton')

    await titleInput.fill(blog.title);
    await authorInput.fill(blog.author);
    await urlInput.fill(blog.url);
    await submit.click();

    const showMoreButton = await page.locator('.showButton').first()
    await showMoreButton.click();

    const deleteButton = await page.locator('button:text("delete")')

    await expect(page.locator('.blog')).toHaveCount(1);
    await deleteButton.click();
    await expect(page.locator('.blog')).toHaveCount(0);
  })

  test('Blog delete button can only be seen as owner', async ({ page, request }) => {
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Kimmo Kokeilija',
        username: 'KiKKel',
        password: '1234'
      }
    })
    const blog = {
      title: "MYFIRSTTESTBLOG",
      author: "tester",
      url: "www.404.com"
    }
    await login(page);
    const button = await page.locator('button:text("new blog")')
    await button.click();
    const titleInput = await page.locator('.titleInput')
    const authorInput = await page.locator('.authorInput')
    const urlInput = await page.locator('.urlInput')
    const submit = await page.locator('.submitButton')

    await titleInput.fill(blog.title);
    await authorInput.fill(blog.author);
    await urlInput.fill(blog.url);
    await submit.click();

    const showMoreButton = await page.locator('.showButton').first()
    await showMoreButton.click();

    await expect(page.locator('button:text("delete")')).toBeVisible();

    const logoutButton = await page.locator('button:text("logout")');
    await logoutButton.click();

    // Log in as another user
    const usernameInput = await page.locator('.usernameInput')
    const passwordInput = await page.locator('.passwordInput')
    const submitButton = await page.getByRole('button', { type: 'submit' })

    await usernameInput.fill("KiKKel")
    await passwordInput.fill("1234")
    await submitButton.click()

    await expect(page.locator('button:text("delete")')).not.toBeVisible();
  })

  test('Blogs are sorted by likes', async ({ page, request }) => {
    const blogs = [
      {
        title: "MYFIRSTTESTBLOG",
        author: "tester",
        url: "www.404.com"
      },
      {
        title: "MYSECONDTESTBLOG",
        author: "tester2",
        url: "www.404.com"
      },
      {
        title: "MYTHIRDTESTBLOG",
        author: "tester3",
        url: "www.404.com"
      }

    ]

    const loginPromise = page.waitForResponse(response =>
      response.url().includes('/api/users') && response.status() === 200
          && response.request().method() === 'POST'
    );

    //await login(page);
    const usernameInput = await page.locator('.usernameInput')
    const passwordInput = await page.locator('.passwordInput')
    const submitButton = await page.getByRole('button', { type: 'submit' })

    await usernameInput.fill("TiTe")
    await passwordInput.fill("1234")
    await submitButton.click()
    // extract token
    const userData = await loginPromise
    const body = await userData.body()
    const parsed = await JSON.parse(body)
    const token = parsed.token
    // Update blogs to backend

    const likes = [1, 100, 30]
    for (const i in blogs) {
      // create blog
      const res = await request.post('/api/blogs', {
        headers: {'authorization': 'Bearer '+token},
        data: blogs[i]
      })
      // extract id
      const blogBody = await res.body()
      const parsedBlog = await JSON.parse(blogBody)
      // add likes
      await request.put('/api/blogs/'+parsedBlog.id, {
        headers: {'authorization': 'Bearer '+token},
        data: {likes: likes[i]}
      })
    }
    
    const blogPromise = page.waitForResponse(response =>
      response.url().includes('/api/blogs') && response.status() === 200
          && response.request().method() === 'GET'
    );
    
    page.reload()
    // wait for blogs
    //await blogPromise
    

    // Open blogs
    for (const key in blogs) {
      const likeBtn = await page.locator('.showButton').nth((+key))
      await likeBtn.click()
    }

    await expect(page.locator('.blog').nth(0).getByText('likes: 100')).toBeVisible();
    await expect(page.locator('.blog').nth(1).getByText('likes: 30')).toBeVisible();
    await expect(page.locator('.blog').nth(2).getByText('likes: 1')).toBeVisible();

    
    /*const newBlogButton = await page.locator('button:text("new blog")')
    const titleInput = await page.locator('.titleInput')
    const authorInput = await page.locator('.authorInput')
    const urlInput = await page.locator('.urlInput')
    const submit = await page.locator('.submitButton')*/

    /*const responsePromise = page.waitForResponse(response =>
         response.url().includes('/api/blogs') && response.status() === 201
             && response.request().method() === 'POST'
    );
    
    for (const b of blogs) {
      await newBlogButton.click();
      await titleInput.fill(b.title);
      await authorInput.fill(b.author);
      await urlInput.fill(b.url);
      await submit.click();
      await responsePromise;

    }

    // collect like btns
    const likeButtons = []
    for (const key in blogs) {
      const likeBtn = await page.locator(`:nth-match((.likebutton),${key+1})`)
      likeButtons.push(likeBtn)
    }

    // like blogs
    */

  })
})