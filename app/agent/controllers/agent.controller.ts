
import AgentService from '../services/agent.service';

export default class Buyer{
    public agentService:any;

    constructor() {
        this.agentService = new AgentService();
    }

    public topup(req:any, data:any, callback:any) {
        let id_master = req.body.master;

        let insert = {
            user_request: data,
            user_confirm: id_master,
            value: req.body.jml_coin
        }

        this.agentService.cek_level(insert, (i:any) => {
            if(!i.status){
                callback(i);
                return;
            }

            if(i.results.length < 1){
                callback({status: false, msg: 'master not found!'});
                return;
            }

            this.agentService.topup(insert, (i:any) => {
                if(!i.status){
                    callback(i);
                    return;
                }
    
                callback({status: true, msg: 'topup successfully!'});
            })
                
        })


        
    }
}