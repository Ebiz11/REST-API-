
import config from '../../config/secret';  
import MasterService from '../services/master.service';
import moment from 'moment';

export default class Master{
    public masterService:any;

    constructor() {
        this.masterService = new MasterService();
    }

    public list_topup(data:any, callback:any) {
        this.masterService.list_topup(data, (i:any) => {
            if(!i.status){
                callback(i);
                return;
            }

            callback({status: true, data: i.results});
        })
        
    }

    public confirm_topup(req:any, data:any, callback:any) {
        let update = {
            user_id : data,
            topup_id : req.body.topup_id,
            status : req.body.status
        }

        this.masterService.confirm_topup(update, (i:any) => {
            if(!i.status){
                callback(i);
                return;
            }

            callback({status: true, msg: 'topup successfully!'});
        })
        
    }
}