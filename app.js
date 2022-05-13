const express=require('express');
const cors= require('cors')
const userRouter = require('./router/user')
const userInfoRouter=require('./router/userinfo')
const cateRouter=require('./router/aticle_ate')
const articleRouter=require('./router/article_content')
// const joi=require('joi')

const app=express()

app.use(function (req,res,next){
   res.cc=function (err,status=1) {
       res.send({
           status,
           msg:err instanceof Error ? err.message:err,
       })
   }
   next()
})

//中间件记得加()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use('/uploads',express.static('./uploads'))

app.use('/api',userRouter)
app.use('/info',userInfoRouter)
app.use('/article',cateRouter)
app.use('/content',articleRouter)
// app.use(function (err,req,res,next){
//     if(err instanceof joi.ValidationError) return res.cc(err)
//     res.cc(err)
// })

app.listen(3000,function (err){
    if(err) throw err;
    console.log('access OK http://127.0.0.1:3000!')
})

