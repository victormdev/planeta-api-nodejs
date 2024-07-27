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

  static insertDetails(user_id, pessoa_juridica, razao_social, cnpj, inscricao_municipal, nome_completo, rg, cpf, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, site) {
    return db.execute(
      'INSERT INTO user_pf (user_id, pessoa_juridica, razao_social, cnpj, inscricao_municipal, nome_completo, rg, cpf, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, site) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, pessoa_juridica, razao_social, cnpj, inscricao_municipal, nome_completo, rg, cpf, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, site]
    );
  }
  
  static updateDetails(user_id, pessoa_juridica, razao_social, cnpj, inscricao_municipal, nome_completo, rg, cpf, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, site) {
    return db.execute(
      'UPDATE user_pf SET pessoa_juridica = ?, razao_social = ?, cnpj = ?, inscricao_municipal = ?, nome_completo = ?, rg = ?, cpf = ?, rua = ?, cidade = ?, estado = ?, pais = ?, cep = ?, celular_1 = ?, celular_2 = ?, telefone = ?, email = ?, instagram = ?, facebook = ?, site = ? WHERE user_id = ?',
      [pessoa_juridica, razao_social, cnpj, inscricao_municipal, nome_completo, rg, cpf, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, user_id]
    );
  }
  
  static getUserDetails(user_id) {
    return db.execute('SELECT * FROM user_pf WHERE user_id = ?', [user_id]);
  }
  
  static insertUserPJDetails(user_id, nome_completo, rg, cpf, estado_civil, data_nascimento, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, tiktok, kwai) {
    return db.execute(
      'INSERT INTO user_pj (user_id, nome_completo, rg, cpf, estado_civil, data_nascimento, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, tiktok, kwai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, nome_completo, rg, cpf, estado_civil, data_nascimento, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, tiktok, kwai]
    );
  }
  
  static updateUserPJDetails(user_id, nome_completo, rg, cpf, estado_civil, data_nascimento, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, tiktok, kwai) {
    return db.execute(
      'UPDATE user_pj SET nome_completo = ?, rg = ?, cpf = ?, estado_civil = ?, data_nascimento = ?, rua = ?, cidade = ?, estado = ?, pais = ?, cep = ?, celular_1 = ?, celular_2 = ?, telefone = ?, email = ?, instagram = ?, facebook = ?, tiktok = ?, kwai = ? WHERE user_id = ?',
      [nome_completo, rg, cpf, estado_civil, data_nascimento, rua, cidade, estado, pais, cep, celular_1, celular_2, telefone, email, instagram, facebook, tiktok, kwai, user_id]
    );
  }
  
  static getUserPJDetails(user_id) {
    return db.execute('SELECT * FROM user_pj WHERE user_id = ?', [user_id]);
  }
  

};