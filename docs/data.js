/**
 * Instanciando data com o timezone correto
 */
const data = {
  updated_at:"2023-01-26 13:46:11"
}

const data1 = new Date(data.updated_at)

console.log(data1)

const data2 = new Date(data.updated_at + " UTC")

console.log(data2)

console.log(data2.toLocaleTimeString('pt-BR'))
console.log(data2.toLocaleString('pt-BR'))
