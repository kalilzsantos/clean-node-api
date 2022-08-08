const MissingParamError = require('./missing-param-erros')
const UnauthorizedError = require('./unauthorized-erros')

module.exports = class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError() {
    return {
      statusCode: 500
    }
  }
  
  static unauthorizedError() {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }

  static ok() {
    return {
      statusCode: 200
    }
  }
}
