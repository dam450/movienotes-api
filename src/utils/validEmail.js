/**
 * Avalia se um endereço de email é válido
 * @param {String} email e-mail a ser testado
 * @returns Boolean
 */
const validEmail = (email) => {
  const regex = /\S+@\S+\.\S+/
  return regex.test(email)
}

module.exports = validEmail
