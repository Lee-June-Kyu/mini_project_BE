const express = require('express');

// const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email, name , password, className, phoneNum   } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      res.status(403).send('이미 존재하는 email 입니다.');
    }else{
        const hash = await bcrypt.hash(password, 12);
        await User.create({
          email,
          name ,
          password: hash,
          className,
          phoneNum
        });
        res.status(201).json({
            code: 201,
            message: "success"
        })
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;