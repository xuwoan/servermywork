var mongoose = require('mongoose');




mongoose.connect('mongodb://xuwoan:30071996@157.245.36.83:27017/servicemywork');
//mongoose.connect('mongodb://157.245.36.83:27017/servicemywork');
//mongoose.connect('mongodb://localhost:27017/servicemywork');
var newsSchema = new mongoose.Schema({ 
    "title" : String,
    "type" : Number,
    "image":String,
    "content":String,
    "date":Date,
    "viewer":Number

   
},{ collection : 'news' });



// create model if not exists.
module.exports = mongoose.model('news',newsSchema);