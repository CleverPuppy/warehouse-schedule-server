import { systemConfig } from './config/sysconfig';
import { DBHelper } from './db_helper';
import express = require('express');


const app: express.Express = express();
app.use(express.json());
// app.use(express.static('/static/'));

const db = new DBHelper();
// get by id
app.get('/warehouseinfo/id/:id', (req, res) => {
    db.getWarehouseInfoById(req.params.id)
        .then(value => res.json(value))
        .catch(err => {
            console.log(err);
            res.sendStatus(403);
        });
})

app.get('/warehouseinfo/userid/:user_id',(req, res) =>{
    db.getWarehouseInfoByUserId(req.params.user_id)
        .then(value  => {
            console.log('getWarehouseInfoByUserID ', req.params.user_id);
            res.json(value);
        })
        .catch(err => {
            console.log('getWarehouseInfoByUserId error', err);
            res.sendStatus(500);
        })
})

// create
app.post('/warehouseinfo/create', (req, res) => {
    console.log(req.params);
    db.addWarehouseInfo(req.body)
        .then(value => {
            console.log("addWarehouseInfo success");
            res.json(value)})
        .catch(err=>{
            console.log("addWarehouseInfo failed, err: ", err);
            res.sendStatus(403);
        })
})

// update
app.post('/warehouseinfo/id/:id', (req, res) => {
    db.updateWarehouseInfoById(req.params.id,req.body)
        .then(value=>{
            res.json(value);
        })
        .catch(err=>{
            console.log(err);
            res.sendStatus(403);
        })
})

// delete
app.delete('/warehouseinfo/id/:id', (req, res) => {
    db.deleteWarehouseInfoById(req.params.id)
        .then(value => {
            console.log(value);
            res.sendStatus(200)
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(403);
        });
})

app.post('/auth/signin/',(req, res) =>{
    db.retrieveUserInfo(req.body.user_name, req.body.user_pwd)
        .then(value =>{
            console.log(value);
            if(value.length != 0){
                res.json({"user_id":value[0]._id});
            }else{
                res.sendStatus(403);
            }
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(403);
        })
})

app.post('/auth/signup/',(req, res) =>{
    db.createUserInfo(req.body)
        .then(value => {
            console.log(value);
            res.sendStatus(200);
        })
        .catch(err=>{
            console.log(err);
            res.sendStatus(403);
        })
})

app.get('/', (req, res) => {
    console.log(req);
    res.sendFile('/static/index.html');
});

app.listen(systemConfig.port, function () {
    console.log('Listennint to port : ', systemConfig.port);
})


export default app;