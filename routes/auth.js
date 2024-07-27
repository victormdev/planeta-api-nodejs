const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
  '/signup',
  [
    body('name').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Email address already exist!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
  ],
  authController.signup
);

router.post('/login', authController.login);

router.post(
  '/save-details',
  [
    body('user_id').isInt(),
    body('pessoa_juridica').trim().not().isEmpty(),
    body('razao_social').trim().not().isEmpty(),
    body('cnpj').trim(),
    body('inscricao_municipal').trim().not().isEmpty(),
    body('nome_completo').trim().not().isEmpty(),
    body('rg').trim(),
    body('cpf').trim(),
    body('rua').trim().not().isEmpty(),
    body('cidade').trim().not().isEmpty(),
    body('estado').trim().not().isEmpty(),
    body('pais').trim().not().isEmpty(),
    body('cep').trim(),
    body('celular_1').trim(),
    body('celular_2').trim(),
    body('telefone').trim(),
    body('email').isEmail().normalizeEmail(),
    body('instagram').trim().not().isEmpty(),
    body('facebook').trim().not().isEmpty(),
    body('site').trim().not().isEmpty(),
  ],
  authController.saveDetails
);

router.post(
  '/save-user-pj-details',
  [
    body('user_id').isInt(),
    body('nome_completo').trim().not().isEmpty(),
    body('rg').trim(),
    body('cpf').trim(),
    body('estado_civil').trim().not().isEmpty(),
    body('data_nascimento').trim().not().isEmpty(),
    body('rua').trim().not().isEmpty(),
    body('cidade').trim().not().isEmpty(),
    body('estado').trim().not().isEmpty(),
    body('pais').trim().not().isEmpty(),
    body('cep').trim(),
    body('celular_1').trim(),
    body('celular_2').trim(),
    body('telefone').trim(),
    body('email').isEmail().normalizeEmail(),
    body('instagram').trim().not().isEmpty(),
    body('facebook').trim().not().isEmpty(),
    body('tiktok').trim().not().isEmpty(),
    body('kwai').trim().not().isEmpty(),
  ],
  authController.saveUserPJDetails
);


router.get('/user/:userId', authController.getUserDetails);

router.get('/user-pj/:userId', authController.getUserPJDetails);

module.exports = router;