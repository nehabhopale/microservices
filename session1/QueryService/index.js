const express=require('express')
const axios=require('axios')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express();
app.use(cors());
app.use(bodyParser.json());


const posts={}

app.get('/api/v1/blog/post/query',(req,resp)=>{
    resp.send(posts);
})

const handleMyEvent=(type,data)=>{
    if(type=="Post Created"){
        const {id,title}=data
        posts[id]={id,title,comments:[]}
        return;
    }
    if (type="Comment Created"){
        const {postId,commentId,message}=data;
        const post=posts[postId]
        post.comments.push({commentId,message})
        return;
    }
}
app.post('/eventbus/event/listner',(req,resp)=>{
    const {type,data}=req.body;
    console.log("Received Event",{type})
    handleMyEvent(type,data)
    resp.send({})
})

app.listen(4003,async()=>{
     const resp=await axios.get('http://eventbus:4005/eventbus/event')
     console.log(resp)
    const events =resp.data|| [];
    for (let e of events){
        handleMyEvent(e.type,e.data)
    }
    console.log("Query has loaded all the events started at 4003")
})