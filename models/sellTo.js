const db = require('../util/database');
const moment = require('moment');

module.exports = class SellTo {
  constructor(productId, clientId, startDate, endDate) {
    this.productId = productId;
    this.clientId = clientId
    this.startDate = startDate,
    this.endDate = endDate,
    this.createDate = moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss')
  }

  save() {
    return db.execute(
      'INSERT INTO sellTo (productId, clientId, startDate, endDate, createDate) VALUES (?, ?, ?, ?, ?)',
      [this.productId, this.clientId, this.startDate, this.endDate, this.createDate]
    );
  }

  static deleteById(productId, clientId) { return db.execute('DELETE FROM sellTo WHERE sellTo.productId = ? AND sellTo.clientId = ?'
      ,[productId, clientId])};

  static fetchAll() {
    return db.execute(`SELECT *, clients.name AS clientName, products.name As productName 
                       FROM sellTo JOIN products ON sellTo.productId = products.productId 
                      JOIN clients ON sellTo.clientId = clients.clientId ORDER BY sellTo.createDate
                      `);
  }

  static fetchByState(state) {
    if (state === 'product') {
      return db.execute('SELECT sellTo.productId, name, COUNT(*) FROM sellTo JOIN products ON sellTo.productId = products.productId GROUP BY sellTo.productId  ORDER BY COUNT(*) DESC');      
    } else if (state === 'client') {
      return db.execute('SELECT sellTo.clientId, name, COUNT(*) FROM sellTo JOIN clients ON sellTo.clientId = clients.clientId GROUP BY sellTo.clientId  ORDER BY COUNT(*) DESC');    
    }
  }   

  static findById(productId, clientId) {
    return db.execute('SELECT * FROM sellTo WHERE products.prodcutId = ? AND clients.clientId = ?'
      , [productId, clientId]);
  }
};