const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('../../../utils/validator')

const User = {
  async register(root, args, context, info) {
    // Make sure to lowercase the email
    args.email = args.email.toLowerCase()

    // Check if the e-mail is valid
    if (!validator.validateEmail(args.email)) {
      const errors = [
        {
          code: '422',
          message: 'Use a valid e-mailadress',
        },
      ]

      return {
        token: null,
        user: null,
        errors,
      }
    }

    // Fetch users to check if the e-mail already exists
    const users = await context.prisma.users()

    if (validator.checkIfFieldIsUnique(users, 'email', args.email)) {
      const errors = [
        {
          code: '422',
          message: '',
        },
      ]

      return {
        token: null,
        user: null,
        errors,
      }
    }

    const encryptedPassword = await bycrypt.hash(args.password, 10)
    args.password = encryptedPassword

    // Create the user at the prisma server
    const user = await context.prisma.createUser(
      {
        ...args,
      },
      info
    )

    // Return the user and the JWT token
    return {
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
      user,
      errors: [],
    }
  },

  async login(root, args, context, info) {
    const user = await context.prisma.user(
      {
        email: args.email,
      },
      info
    )

    if (!user) {
      const errors = [
        {
          code: '404',
          message: `No user found with the given e-mailadress ${args.email}`,
        },
      ]

      return {
        token: null,
        user: null,
        errors,
      }
    }

    console.log(user.password)
    console.log(args.password)

    const validPassword = await bycrypt.compare(args.password, user.password)

    console.log(validPassword)

    if (!validPassword) {
      const errors = [
        {
          code: '422',
          message: 'The combination of this e-mail and password is incorrect',
        },
      ]

      return {
        token: null,
        user: null,
        errors,
      }
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
      user,
      errors: [],
    }
  },
}

module.exports = User
