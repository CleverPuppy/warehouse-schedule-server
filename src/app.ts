import { systemConfig } from './config/sysconfig';
import { DBHelper } from './db_helper';
import express = require('express');


const app: express.Express = express();
app.use(express.json());
const db = new DBHelper();

// db.getWarehouseInfoById("5f048a2d1ceeba1b36047fbc")
//     .then(value => {
//         console.log("query success : ", value);
//     })
//     .catch(err => {
//         console.log("query failed : err: ", err);
//     })

// get by id
app.get('/warehouseinfo/id/:id', (req, res) => {
    db.getWarehouseInfoById(req.params.id)
        .then(value => res.json(value))
        .catch(err => {
            console.log(err);
            res.sendStatus(403);
        });
})
// create
app.post('/warehouseinfo/', (req, res) => {
    console.log(req.params);
    db.addWarehouseInfo(req.body)
        .then(value => res.json(value))
        .catch(err=>{
            console.log(err);
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
        .then(value => res.sendStatus(200))
        .catch(err => res.sendStatus(403));
})


app.get('/', (req, res) => {
    console.log(req);
    res.send('Hello world');
});

app.listen(systemConfig.port, function () {
    console.log('Listennint to port : ', systemConfig.port);
})


export default app;