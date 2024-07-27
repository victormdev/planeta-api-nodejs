const db = require('../util/database');

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, user.password]
    );
  }

  static saveDetails(user_id, pessoa_juridica, razao_social, cnpj, inscricao_municipal, nome_completo, rg, cpf, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, site) {
    return db.execute(
      'INSERT INTO user_pf (user_id, pessoa_juridica, razao_social, cnpj, inscricao_municipal, nome_completo, rg, cpf, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, site) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, pessoa_juridica, razao_social, cnpj, inscricao_municipal, nome_completo, rg, cpf, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, site]
    );
  }

  static getUserDetails(user_id) {
    return db.execute('SELECT * FROM user_pf WHERE user_id = ?', [user_id]);
  }
  
};