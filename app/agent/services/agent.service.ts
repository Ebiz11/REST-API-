import connection from "../../connections/mysql.connection";

export default class AgentService {

    public topup(data:any, callback:any){

        let query = `
                    INSERT INTO topup (
                        user_request,
                        user_confirm,
                        value,
                        created_date
                    ) VALUES (
                        `+data.user_request+`,
                        `+data.user_confirm+`,
                        `+data.value+`,
                        NOW()
                    )
                    `;

        connection.dbcoin.query(query, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else
                callback({status: true, results: results});
        });
    }

    public cek_level(data:any, callback:any){

        let query = `
                    SELECT
                        u.user_id,
                        level,
                        coin_value
                    FROM
                        USER u
                    JOIN dompet_coin d ON d.user_id = u.user_id
                    WHERE
                        u.user_id = `+data.user_confirm+`
                    AND u.level = "master"
                    `;

        connection.dbcoin.query(query, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else
                callback({status: true, results: results});
        });
    }

    public list_topup(data:any, callback:any){

        let query = `
                    SELECT
                        *
                    FROM
                        topup
                    WHERE
                        user_confirm = `+data;

        connection.dbcoin.query(query, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else
                callback({status: true, results: results});
        });
    }

    public confirm_topup(data:any, callback:any){

        let query = `
                    UPDATE topup
                    SET status = "`+data.status+`"
                    WHERE
                        user_confirm = `+data.user_id+`
                    AND topup_id = `+data.topup_id;

                    console.log(query);
                    

        connection.dbcoin.query(query, function (error, results, fields) {
            if(error)
                callback({status: false, error: error.sqlMessage});
            else
                callback({status: true, results: results});
        });
    }
}