var mongoose = require('mongoose');



mongoose.connect('mongodb://xuwoan:30071996@157.245.36.83:27017/servicemywork');
//mongoose.connect('mongodb://XuWoan1:30071996@139.59.99.218:27017/servicemywork');
//mongoose.connect('mongodb://139.59.99.218:27017/servicemywork');
//mongoose.connect('mongodb://localhost:27017/servicemywork');
var userSchema = new mongoose.Schema({
    "userid":String,
    "type": Number,
    "detailcandidate": {
        "birthday": String,
        "name": String,
        "address": {
            "street": String,
            "city": {
                "key": Number,
                "name": String
            }

        },
        "phone": String,
        "email": String,
        "major":{
            "name": String,
            "key": Number
        },
      
        "avatar":  String,
        "setting" : {
            "player_id" : String,
            "recruimentposted_noti" : Boolean
        }

    },
    "detailemployer":
    {
        "name": String,
        "company": {
            "name": String,
            "phone": String,
            "email": String,
            "intro":String,
            "website":String,
           // "logo":  { "data": String, "contentType": String },
            "logo" : String,
            "address": {
                "street": String,
                "city": {
                    "key": Number,
                    "name": String
                }

            }
        },
        "setting" :{
            "player_id":String,
            "receivecv_noti":Boolean
        }
    }



}, { collection: 'user' });



// create model if not exists.
module.exports = mongoose.model('user', userSchema);