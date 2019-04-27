const db = require('../util/database');

module.exports = class responsibleFor {
  constructor(productId, teamId) {
    this.productId = productId;
    this.teamId = teamId;
  }

  save() {
    return db.execute(
      'INSERT INTO responsibleFor (productId, teamId) VALUES (?, ?)',
      [this.productId, this.teamId]
    );
  }

  static deleteById(productId, teamId) { db.execute('DELETE FROM responsibleFor WHERE responsibleFor.prodcutId = ? AND responsibleFor.teamId = ?'
      ,[productId, teamId])};

  static fetchAll() {
    return db.execute('SELECT * FROM responsibleFor');
  }

  static findById(productId, teamId) {
    return db.execute('SELECT * FROM responsibleFor WHERE responsibleFor.prodcutId = ? AND responsibleFor.teamId = ?'
      , [productId, teamId]);
  }

  static findByteamId(teamId) {
    return db.execute('SELECT * FROM responsibleFor JOIN products ON responsibleFor.productId = products.productId WHERE responsibleFor.teamId = ?'
      , [teamId]);
  }  

  static findByProductId(productId) {
    return db.execute('SELECT * FROM responsibleFor JOIN teams ON responsibleFor.teamId = teams.teamId WHERE responsibleFor.productId = ?'
      , [productId]);
  }   

 static deleteByProductId(productId) { return db.execute('DELETE FROM responsibleFor WHERE responsibleFor.productId = ?'
      ,[productId])};

};