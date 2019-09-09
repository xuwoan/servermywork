var mongoose = require('mongoose');
mongoose.connect('mongodb://xuwoan:30071996@157.245.36.83:27017/servicemywork');
//mongoose.connect('mongodb://XuWoan1:30071996@139.59.99.218:27017/servicemywork');
//mongoose.connect('mongodb://localhost:27017/servicemywork');
var followerSchema = new mongoose.Schema({ 
    "candidateid" : String,
    "employerid" : String,
   
},{ collection : 'follower' });



// create model if not exists.
module.exports = mongoose.model('follower',followerSchema);