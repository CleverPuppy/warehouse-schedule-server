import {iWarehouseInfo, WarehouseInfoModel} from './db_warehouseinfo';
import {systemConfig} from './config/sysconfig';
import { Query } from 'mongoose';
const mongoose = require('mongoose');

const DB_URL : string = [systemConfig.mongodb_host,systemConfig.mongodb_port].join(':');

export class DBHelper {
    constructor(){
        mongoose.connect(DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user:systemConfig.mongodb_user,
            pass: systemConfig.mongodb_pwd,
            authSource : systemConfig.mongodb_dbName,
            dbName: systemConfig.mongodb_dbName
            
        })
        .then(result => {
            console.log('connect db success: ');
        })
        .catch(err => {
            console.log('connect failed: ', err);
        })
    }

    addWarehouseInfo(data:iWarehouseInfo) : Promise<any> {
        return WarehouseInfoModel.create(data);
    }
    getWarehouseInfoById(id: string) : Query<any> {
        return WarehouseInfoModel.findById(id);
    }
    deleteWarehouseInfoById(id: string) : Query<any>{
        return WarehouseInfoModel.findByIdAndDelete(id);
    }
    updateWarehouseInfoById(id: string, data:iWarehouseInfo): Query<any>{
        return WarehouseInfoModel.findByIdAndUpdate(id,data);
    }
};