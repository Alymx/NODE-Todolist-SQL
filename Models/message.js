
let connection = require('./config/Database');
let moment = require('./config/moment');



class Message{

    constructor(row){
        this.row = row;
    };
    //Getter du contenu
    get content (){
     return this.row.content;
    };
    //Getter de la date
    get created_at(){
        return moment(this.row.created_at); //Formatage de date avant renvoi
        console.log(moment(this.row.created_at));
    }
    //Getter de l'ID
    get id(){
        return this.row.id;
    }


    static create(content, callback){
        //Fonction d'insertion qui prend en params la requete + le contenu + callback
        connection.query('INSERT INTO messages SET content=?, created_at=?',[content, new Date()], (err, result)=>{
            if(err) throw err;
            callback(result);
        });
    }

    static all(callback){
        connection.query('SELECT * FROM messages ORDER BY created_at DESC', (err, rows)=>{
            if(err) throw err;
            callback(rows.map((row)=>{
                return new Message(row);
            }));
        });
    }

    static find(id, callback){
        connection.query('SELECT * FROM messages WHERE id=? LIMIT 1', [id],(err, rows)=>{
            if(err) throw err;
            callback(new Message(rows[0]));
        });
    }

}

module.exports = Message;