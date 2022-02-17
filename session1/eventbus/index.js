const express=require('express')
const axios=require('axios')
const cors=require('cors')
const bodyParser=require('body-parser')

const app=express();
app.use(cors());
app.use(bodyParser.json());

const events=[]

app.get('/eventbus/event',(req,resp)=>{
    resp.send(events)
});
app.post('/eventbus/event',(req,resp)=>{
    const event =req.body;
    events.push(event)
    axios.post("http://post-service:4001/eventbus/event/listner",event).catch(e=>console.log(e.message));//to inform 4001 that event has occured
    axios.post("http://comments-service:4002/eventbus/event/listner",event).catch(e=>console.log(e.message));
    axios.post("http://query-service:4003/eventbus/event/listner",event).catch(e=>console.log(e.message));

    resp.send({})
});

app.listen(4005,()=>{
    console.log("u r on event bus ")
})