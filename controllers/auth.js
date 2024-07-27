const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword
        }

        const result = await User.save(userDetails)
        res.status(201).json({message: "Usuário criado com sucesso!"})
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await User.find(email);
        if(user[0].length !== 1){
            const error = new Error("O endereço de e-mail não foi encontrado.");
            error.statusCode = 401;
            throw error;
        }
        const storedUser = user[0][0];
        const isEqual = await bcrypt.compare(password, storedUser.password);
        if(!isEqual){
            const error = new Error("Senha incorreta!");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email: storedUser.email,
            userId: storedUser.id
        },
        'secretfortoken',
        { expiresIn: '1h' }
    );
    res.status(200).json({token: token, userId: storedUser.id});

    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

    
}

exports.saveDetails = async (req, res, next) => {
    try {
      const userDetails = req.body;
      await User.saveDetails(
        userDetails.user_id,
        userDetails.pessoa_juridica,
        userDetails.razao_social,
        userDetails.cnpj,
        userDetails.inscricao_municipal,
        userDetails.nome_completo,
        userDetails.rg,
        userDetails.cpf,
        userDetails.rua,
        userDetails.cidade,
        userDetails.estado,
        userDetails.pais,
        userDetails.cep,
        userDetails.celular_1,
        userDetails.celular_2,
        userDetails.telefone,
        userDetails.email,
        userDetails.instagram,
        userDetails.facebook,
        userDetails.site
      );
      res.status(201).json({ message: 'User details saved successfully.' });
    } catch (error) {
      next(error);
    }
  };

  exports.getUserDetails = (req, res, next) => {
    const userId = req.params.userId;
    User.getUserDetails(userId)
      .then(([rows]) => {
        res.status(200).json(rows[0]);
      })
      .catch(err => {
        res.status(500).json({ message: 'Erro ao buscar detalhes do usuário', error: err });
      });
  };
  
  