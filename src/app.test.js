import request from 'supertest'
import app from './app.js'


describe("POST /clients/login", () => {
  describe("given a email and password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/clients/login").send({
        email: req.body.email,
        password:  req.body.password
      })
      expect(response.statusCode).toBe(200)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        email: req.body.email,
        password: req.body.password
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has userId", async () => {
      const response = await request(app).post("/users/login").send({
        email: req.body.email,
        password: req.body.password
      })
      expect(response.body.userId).toBeDefined()
    })
  })

  describe("when the email and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {email: req.body.email},
        {password: req.body.password}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/clients.login").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

})