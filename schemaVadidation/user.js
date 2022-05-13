const joi=require('express-joi').Joi

const username=joi.string()

const password = joi.string()
const newPwd= joi.string()

// exports.reg_login_schema={
//     body:{
//         username,
//         password
//     },
//     password:joi.string()
// }

exports.update_pdw_schema={
    body:{
        oldPwd:password,
        newPwd:newPwd
    }
}