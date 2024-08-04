const Fabricante = require('./Fabricante')
const Produto = require('./Produto')

// Definir associações após definir todos os modelos
Fabricante.hasMany(Produto,{
    foreignKey: 'fabricanteId',
    as: 'produtos', // alias para acessar produtos
    onDelete: 'CASCADE'
})

Produto.belongsTo(Fabricante,{
    foreignKey: 'fabricanteId',
    as: 'fabricante', // alias para acessar fabricante
    allowNull: false
})

module.exports = { Fabricante, Produto }
