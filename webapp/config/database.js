/**
 * Created by asheshvidyut on 27/11/16.
 */
var config = require('./config');
var Sequelize = require('sequelize');
var database = new Sequelize(config.development.database, config.development.username, config.development.password);
module.exports = database;
