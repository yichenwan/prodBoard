const db = require('../util/database');

module.exports = class Team {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  save() {
    return db.execute(
      'INSERT INTO teams (name, description) VALUES (?, ?)',
      [this.name, this.description]
    );
  }

  static deleteById(id) {'DELETE FROM teams WHERE teams.teamId = ?', [id]}

  static fetchAll() {
    return db.execute('SELECT * FROM teams');
  }

  static findById(id) {
    return db.execute('SELECT * FROM teams WHERE teams.teamId = ?', [id]);
  }
};