const db = require('../util/database');

module.exports = class Rd {
  constructor(firstName, lastName, email, teamId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.teamId = teamId;
  }

  save() {
    return db.execute(
      'INSERT INTO rds (firstName, lastName, email, teamId) VALUES (?, ?, ?, ?)',
      [this.firstName, this.lastName, this.email, this.teamId]
    );
  }

  static deleteById(id) {'DELETE FROM rds WHERE rds.rdId = ?', [id]}

  static fetchAll() {
    return db.execute('SELECT * FROM rds');
  }

  static findById(id) {
    return db.execute('SELECT * FROM rds WHERE rds.rdId = ?', [id]);
  }

  static findByTeamId(id) {
    return db.execute('SELECT * FROM rds WHERE rds.teamId = ?', [id]);
  }  
};