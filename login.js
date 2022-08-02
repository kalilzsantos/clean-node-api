const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AccountModel = require('Account')

module.exports = () => {
  router.post('./signup', (req,res) =>{
    const {email, password, repeatPassword} = req.body
    if(password === repeatPassword) {
      const user = {email, password, repeatPassword}
      return res.json(user)
    }
    return res.status(400).json({ error: 'password must be equal to repeatPassword'})
  } )
}