import { Schema, Model, model, Document } from 'mongoose';

export interface iUserInfo extends Document {
    user_name : string,
    user_pwd : string,
    warehouseinfo_id ?: string
}

const UserInfoSchema : Schema = new Schema({
    user_name : {type:String, unique:true, required:true},
    user_pwd : {type:String, required:true},
    warehouseinfo_id : {type:String, unique:true}
})

export const UserInfoModel : Model<iUserInfo> = model('UserInfo',UserInfoSchema);