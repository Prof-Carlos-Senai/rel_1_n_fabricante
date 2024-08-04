const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Fabricante = db.define('fabricante',{
    codFabricante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marca: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
},{
    tableName: 'fabricantes',
    createdAt: false,
    updatedAt: false
})

module.exports = Fabricante
