const express=require('express')
const router=express.Router()
const userInfo = require('../router_handle/userinfo')
// const {update_psdSchema}=require('../schemaVadidation/user')
// const expressJoi=require('express-joi')


router.get('/account/info',userInfo.getUserInfo)

router.post('/infoedit',userInfo.inforUpdate)

router.post('/psdrest',userInfo.psdReset)

router.post('/avata',userInfo.avatarUpdate)

module.exports=router