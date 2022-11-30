const jwt = require("jsonwebtoken")
//撒盐，加密时候混淆
const authConfig = require('../config/auth.config.js');

//生成token
//info也就是payload是需要存入token的信息
exports.createToken = (info) => {
    let token = jwt.sign(info, authConfig.secret, {
        //Token有效时间 单位s
        expiresIn: 60 * 60 * 10
    })
    return token
}

//验证Token
exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, authConfig.secret, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}