const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "products",
    {
      productId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "categoryId",
        },
      },
      productName: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      productPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      productInfo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      productStatus: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      thumbnailUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      detailUrls: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "products",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "productId" }],
        },
        {
          name: "categoryId",
          using: "BTREE",
          fields: [{ name: "categoryId" }],
        },
      ],
    }
  );
};
