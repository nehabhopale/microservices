const express=require('express')
const cors=require('cors')
const axios=require('axios')
const uuid=require('uuid')
const bodyParser=require('body-parser')

const app=express();

app.use(cors())
app.use(bodyParser.json())

const postsWithComments={}

app.get('/api/v1/blog/post/:postId/comment',(req,resp)=>{
    const postId=req.params.postId
    const comments=postsWithComments[postId] || []
    resp.send(comments)
});

app.post('/api/v1/blog/post/:postId/comment',async(req,resp)=>{
    const commentId=uuid.v4();
    const {message}=req.body;
    const postId=req.params.postId
    const comment=postsWithComments[postId] || [] //bcoz one post can have multiple comments
    comment.push({commentId,message})
    postsWithComments[postId]=comment

    await axios.post("http://eventbus:4005/eventbus/event",{
        type:"Comment Created",
        data:{postId,commentId,message}
    }).catch(e=>console.log(e.message))
    resp.status(201).send({commentId,message})
});

app.post('/eventbus/event/listner',(req,resp)=>{
    const {type} = req.body;
    console.log("Received Event",type)
    resp.send({})
})

app.listen(4002,()=>{
    console.log("Blogcomment has started on 4002")
})
