'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('produto', 
      { 
        id_produto:{
          primaryKey:true,
          allowNull:false,
          autoIncrement:true,
          type:DataTypes.INTEGER
         },
        nome:{
          allowNull:false,
          type:DataTypes.STRING(100)
        },
        cod_barras:{
          allowNull:false,
          type:DataTypes.STRING(128)
        },
        preco:{
          allowNull:false,
          type:DataTypes.FLOAT(14,2)
        },
        peso:{
          allowNull:false,
          type:DataTypes.FLOAT(14,2),
        },
        unidade_medida:{
          allowNull:false,
          type:DataTypes.STRING(10)
        },
        id_marca : {
          allowNull:false,
          type:DataTypes.INTEGER,
          references:{
            model:"marca",
            key:"id_marca"
          },
          onUpdate:"CASCADE",
          onDelete:"CASCADE"
        },
        id_fornecedor:{
          allowNull:false,
          type:DataTypes.INTEGER
        },
        id_estoque:{
          allowNull:false,
          type:DataTypes.INTEGER
        }

      })
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('produto');
    
  }
};
