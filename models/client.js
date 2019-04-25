const db = require('../util/database');

module.exports = class Client {
  constructor(name, attribute, email) {
    this.name = name;
    this.attribute = attribute;
    this.email = email;
  }

  save() {    
    return db.execute(
      'INSERT INTO clients (name, attribute, email) VALUES(?, ?, ?)',
      [this.name, this.attribute, this.email]
    );
  }

  static deleteById(id) {'DELETE FROM clients WHERE clients.clientId = ?', [id]}

  static fetchAll() {
    return db.execute('SELECT * FROM clients ORDER BY clients.clientId DESC');
  }

  static findById(id) {
    return db.execute('SELECT * FROM clients WHERE clients.clientId = ?', [id]);
  }
};