var exports = (module.exports = {})

/*
  Helper function to check if passed e-mail
  is valid.
*/
exports.validateEmail = function(email) {
  const validEmailRegex = /\S+@\S+\.\S+/
  return validEmailRegex.test(email)
}

/*
  Helper function to check if an property is unique based
  on a passed list.

  Example: validator.uniqueField(users, 'email', args.email)
  Above will check if the passed e-mail is unique in the users array
*/
exports.checkIfFieldIsUnique = function(array, field, argument) {
  return Boolean(array.find((item) => item[field] === argument))
}
