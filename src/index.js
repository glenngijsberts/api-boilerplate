/*
  Import and declare a new server as yogaserver.
*/
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

require('dotenv').config({ path: '.env' })

const yogaServer = require('./yogaServer')
const server = yogaServer()
const { prisma } = require('./generated/prisma-client')

server.express.use(cookieParser())

/*
  Set the userId on the request when available
  and verified based on authorization header
*/
server.express.use((req, res, next) => {
  const { authorization } = req.headers

  if (authorization) {
    const token = authorization.substring(7, authorization.length)

    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = userId
    } catch {
      req.userId = null
    }
  } else {
    req.userId = null
  }

  next()
})

/*
  Set the user on the request when there is
  a userId available. This can help inside the
  resolvers for example.
*/
server.express.use(async (req, res, next) => {
  if (!req.userId) return next()

  try {
    const user = await prisma.user({
      id: req.userId,
    })

    // Make sure to remove the password from the request
    delete user.password
    req.user = user
  } catch {
    req.user = null
  }

  next()
})

server.start((s) =>
  console.log(`Server is now running on port http://localhost:${s.port}`)
)
