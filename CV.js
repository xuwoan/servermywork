var mongoose = require('mongoose');



mongoose.connect('mongodb://xuwoan:30071996@157.245.36.83:27017/servicemywork');
//mongoose.connect('mongodb://XuWoan1:30071996@139.59.99.218:27017/servicemywork');
//mongoose.connect('mongodb://139.59.99.218:27017/servicemywork');
//mongoose.connect('mongodb://localhost:27017/servicemywork');
var cvSchema = new mongoose.Schema({
    "cvname": String,
    "date": Date,
    "userid": String,
    "maincv": Boolean,
    "color":Number,
    "resume": {
        "profile": {
            "name": String,
            "address":
            {
                "address": String,
                "key": Number
            },
            "phone": String,
            "email": String,
            "birthday":String,

        },
        "target": String,
        "skill": [
            {
                "name": String,
                "rate": Number
            }
        ],
        "experience": [
            {
                "startYear": String,
                "endYear": String,
                "place": String,
                "rank": String
            }
        ],
        "certificate": [
            {

                "year": String,
                "name": String

            }
        ],
        "education":
        [{
            "startYear": String,
            "endYear": String,
            "place": String,
            "degree": String,
            "department": String
        }
        ]





    }


}, { collection: 'cv' });

// create model if not exists.
module.exports = mongoose.model('cv', cvSchema);