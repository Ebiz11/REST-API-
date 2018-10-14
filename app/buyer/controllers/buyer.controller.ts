
import config from '../../config/secret';  
import BuyerService from '../services/buyer.service';
import moment from 'moment';

export default class Buyer{
    public buyerService:any;

    constructor() {
        this.buyerService = new BuyerService();
    }

    public buy_coin(req:any, data:any, callback:any) {
        let id_agent = req.body.agent;

        let insert = {
            user_request: data,
            user_confirm: id_agent,
            value: req.body.jml_coin
        }

        this.buyerService.cek_level(insert, (i:any) => {
            if(!i.status){
                callback(i);
                return;
            }

            if(i.results.length < 1){
                callback({status: false, msg: 'agent not found!'});
                return;
            }

            this.buyerService.buy(insert, (i:any) => {
                if(!i.status){
                    callback(i);
                    return;
                }
    
                callback({status: true, msg: 'topup successfully!'});
            })
                
        })


        
    }
}