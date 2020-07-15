import {iWarehouseInfo, WarehouseInfoModel} from './db_warehouseinfo';
import {iUserInfo, UserInfoModel} from './db_userinfo';
import {systemConfig} from './config/sysconfig';
import { Query,Types } from 'mongoose';
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
            console.log('connect db success: ', result);
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

    getWarehouseInfoByUserId(id: string) : Query<any>{
        return WarehouseInfoModel.find({user_id: Types.ObjectId(id)});
    }

    deleteWarehouseInfoById(id: string) : Query<any>{
        return WarehouseInfoModel.findByIdAndDelete(id);
    }
    updateWarehouseInfoById(id: string, data:iWarehouseInfo): Query<any>{
        return WarehouseInfoModel.findByIdAndUpdate(id,data);
    }

    createUserInfo(data: iUserInfo) : Promise<any> {
        return UserInfoModel.create(data);
    }

    retrieveUserInfo(user_name : string , user_pwd: string) : Query<any>{
        return UserInfoModel.find({user_name:user_name,user_pwd:user_pwd});
    }

    checkUserNameValidation(user_name : string) : Query<any> {
        return UserInfoModel.find({user_name:user_name});
    }


};

