const db = require('../util/database');
const moment = require('moment');

module.exports = class Product {
  constructor(name, description, deadline, complete, mgrId) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.complete = complete;
    this.mgrId = mgrId,
    this.createDate = moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss');
  }

  save() {
    return db.execute(
      'INSERT INTO products (name, description, deadline, complete, mgrId, createDate) VALUES(?, ?, ?, ?, ?, ?)',
      [this.name, this.description, this.deadline, this.complete, this.mgrId, this.createDate]
    );
  }

  static deleteById(id) {return db.execute('DELETE FROM products WHERE products.productId = ?'
                        , [id])};

  static updateById(id, product) {return db.execute(`UPDATE products SET name = ?, description=?, 
                                   deadline=?, complete = ?,  mgrId = ?
                                   WHERE productId = ?`,
    [product.name, product.description, product.deadline, product.complete, product.mgrId, id])};

  static fetchAll() {
    return db.execute('SELECT * FROM products JOIN productMgrs ON products.mgrId = productMgrs.mgrId ORDER BY products.createDate DESC');
  }

  static fetchByState(state) {
    if (state === 'ongoing') {
      return db.execute('SELECT * FROM products JOIN productMgrs ON products.mgrId = productMgrs.mgrId WHERE deadline > now() AND complete = 0 ORDER BY deadline');      
    } else if (state === 'delayed') {
      return db.execute('SELECT *  FROM products JOIN productMgrs ON products.mgrId = productMgrs.mgrId WHERE deadline <= now() AND complete = 0');    
    } else {
      return db.execute('SELECT * FROM products JOIN productMgrs ON products.mgrId = productMgrs.mgrId WHERE complete = 1');    
    }
  }  

  static fetchNumByState(state) {
    if (state === 'ongoing') {
      return db.execute('SELECT COUNT(*) FROM products JOIN productMgrs ON products.mgrId = productMgrs.mgrId WHERE deadline > now() AND complete = 0');      
    } else if (state === 'delayed') {
      return db.execute('SELECT COUNT(*)  FROM products JOIN productMgrs ON products.mgrId = productMgrs.mgrId WHERE deadline <= now() AND complete = 0');    
    } else {
      return db.execute('SELECT COUNT(*) FROM products JOIN productMgrs ON products.mgrId = productMgrs.mgrId WHERE complete = 1');    
    }
  } 

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.productId = ?', [id]);
  }

  static findMgrById(mgrId) {
    return db.execute('SELECT * FROM products  WHERE products.mgrId = ?  ORDER BY deadline', [mgrId]);      
  }
};