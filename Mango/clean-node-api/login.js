const express = require('express')
const route = express.Router()

module.exports = () => {
  const router = new SignUpRouter()
  route.post('/signup', ExpressRouterAdpter.adapt(router))
}

class ExpressRouterAdpter {
  static adapt(router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statuCode).json(httpResponse.body)
    }
  }
}

//Presentation
// signup-router
class SignUpRouter {
  async route(httpRequest) {
    const {email, password, repeatPassword} = httpRequest.body
    const user = await new SignUpUseCase().signUp(email, password, repeatPassword)
    return {
      statuCode: 200,
      body: user
    }
  }
}

//Domain
// signup-usecase
class SignUpUseCase {
  async signUp(email, password, repeatPassword){
    if(password === repeatPassword){
      await new AddAccountRepository().add(email, password)
    }
  }
}

//Infra
//add-account-repo
const mongoose = require('mongoose')
const AccountModel = mongoose.Model('Account')
class AddAccountRepository {
  async add(email, password){
    const user = await AccountModel.create({email, password})
    return user 
  }
}
