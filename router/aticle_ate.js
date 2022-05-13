const express=require('express')
const router=express.Router()
const listData=require('../router_handle/aticle_ate')

router.get('/cates',listData.articleCate)
router.post('/addcates',listData.addCate)
router.get('/deletecate/:id',listData.deleteCate)
router.post('/updatecate',listData.updateCate)



module.exports=router