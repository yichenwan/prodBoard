const db = require('../util/database');

module.exports = class ProductMgr {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  save() {
    return db.execute(
      'INSERT INTO productMgrs (firstName, lastName, email) VALUES (?, ?, ?)',
      [this.firstName, this.lastName, this.email]
    );
  }

  static deleteById(id) {'DELETE FROM productMgrs WHERE productMgrs.mgrId = ?', [id]}

  static fetchAll() {
    return db.execute('SELECT * FROM productMgrs');
  }

  static findById(id) {
    console.log(id);
    return db.execute('SELECT * FROM productMgrs WHERE productMgrs.mgrId = ?', [id]);
  }
};