const User = {
  users(root, args, context, info) {
    return context.prisma.users({}, info)
  },

  async user(root, args, context, info) {
    const user = await context.prisma.user({ id: args.id }, info)

    return user
  },
}

module.exports = User
