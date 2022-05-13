const express=require('express')
const userHandle=require('../router_handle/user')

const router=express.Router()


router.post('/register',userHandle.regUser)

router.post('/login',userHandle.logIn)

module.exports = router