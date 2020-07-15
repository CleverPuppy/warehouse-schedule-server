const mongoose = require('mongoose');
import  { Schema, Model, model, Document, Types } from 'mongoose';

interface iRobot {
    name:string,
}
interface iStock{
    name:string,
    access:Array<number>
}
interface iRobotPack{
    robot_type: number,
    size : number
}

interface iDepot{
    name?:string,
    x: number,
    y: number,
    robotAssignment: Array<iRobotPack>
}

interface iRack{
    x: number,
    y: number,
    access: Array<number>
}
interface iObstacle{
    x: number,
    y: number
}
export interface iWarehouseInfo extends Document{
    name: string,
    block_width: number,
    block_height: number,
    robots?: Array<iRobot>,
    stocks?: Array<iStock>,
    
    obsArray: Array<iObstacle>,
    rackArray: Array<iRack>,
    depotArray: Array<iDepot>,
    user_id : Types.ObjectId
}

const WarehouseInfoSchema: Schema = new Schema({
    name: String,
    block_width: Number,
    block_height: {type: Number},
    robots: [{name:String}],
    stocks: [{name:String,access:[Number]}],

    obsArray: [{x:Number,y:Number}],
    rackArray: [{x:Number,y:Number,access:[Number]}],
    depotArray:[{x:Number,y:Number,robotAssignment:[{type:Number,size:Number}]}],

    user_id : {type: mongoose.Types.ObjectId, required:true, index:true}
});

export const WarehouseInfoModel: Model<iWarehouseInfo> = model('WarehouseInfo',WarehouseInfoSchema);