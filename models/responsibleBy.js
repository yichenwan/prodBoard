const db = require('../util/database');

module.exports = class ResponsibleBy {
  constructor(productId, teamId) {
    this.productId = productId;
    this.teamId = teamId;
  }

  save() {
    return db.execute(
      'INSERT INTO responsibleBy (productId, teamId) VALUES (?, ?)',
      [this.productId, this.teamId]
    );
  }

  static deleteById(productId, teamId) { db.execute('DELETE FROM responsibleBy WHERE responsibleBy.prodcutId = ? AND responsibleBy.teamId = ?'
      ,[productId, teamId])};

  static fetchAll() {
    return db.execute('SELECT * FROM responsibleBy');
  }

  static findById(productId, teamId) {
    return db.execute('SELECT * FROM responsibleBy WHERE responsibleBy.prodcutId = ? AND responsibleBy.teamId = ?'
      , [productId, teamId]);
  }

  static findByteamId(teamId) {
    return db.execute('SELECT * FROM responsibleBy JOIN products ON responsibleBy.productId = products.productId WHERE responsibleBy.teamId = ?'
      , [teamId]);
  }  
};