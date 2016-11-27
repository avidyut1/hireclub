'use strict';
module.exports = function(sequelize, DataTypes) {
  var Code = sequelize.define('Code', {
    code: DataTypes.TEXT,
    lang: DataTypes.STRING,
    keyname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Code;
};