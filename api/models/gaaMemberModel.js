'use strict';
var mysql = require('mysql');
var Schema = mysql.Schema;


var MemberSchema = new Schema({
  farmOhId: {
    type: String,
    required: 'Enter Member Openherd Farm ID'
  },
  farmName: {
      type:  String,
      required: 'Enter Member Farm Name'
  },
  sales: {
      type: Boolean,
      required: 'Collect Sales Data?'
  },
  herdsires: {
    type: Boolean,
    required: 'Collect Herdsire Data?'
  },
  products: {
      type: Boolean,
      required: 'Collect Product Data?'
  },
  fiber: {
    type: Boolean,
    required: 'Collect Package Data?'
  },
  packages: {
    type: Boolean,
    required: 'Collect Product Data?'
  },
  isActive: {
    type: Boolean,
    required: 'Is Member Active?'
  },
  productOhId: {
    type: String,
    required: 'Product Openherd Id'
  },
  packagesName: {
    type: String,
    required: 'Openherd Packages Name'
  }
});

module.exports = mysql.model('Members', MemberSchema);