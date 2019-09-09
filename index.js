'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var Provincedb = require("./Province");
var Genderdb = require("./Gender");
var Jobdb = require("./Job");
var Typejobdb = require("./Typejob");
var Experiencedb = require("./Experience");
var Departmentdb = require("./Department");
var Accountdb = require("./Account");
var Userdb = require("./User");
var Postdb = require("./Post");
var Followerdb = require("./Follower")
var Newsdb = require("./News");
var CVPublicdb = require("./CVPublic");
var CVdb = require("./CV");
var Commentdb = require("./Comment");
var CVtoEmployerdb = require("./CVtoEmployer");
var Registerdb = require("./RegisterCode");
var config = require('./config');
var fs = require('fs');
var cors = require('cors')
var dateFormat = require('dateformat');
var server = app.listen('3000', function () {
    var host = server.address().address;
    var port = server.address().port;
    // console.log('Server start at http://%s:%s', '0.0.0.0', host, 3000);
});
var OneSignal = require('onesignal-node');
var imgPath = './download.png';
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var path = require('path');
var imgpath_male = './avatar_man.png';
var imgpath_female = './avatar_woman.png';
var imgpath_company = './default_company_logo.jpg';
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser({ limit: '50mb' }))
app.use(bodyParser.json())



String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};

var CronJob = require('cron').CronJob;

var myClient = new OneSignal.Client({
    userAuthKey: 'NDllOTMyZjctZWUzMC00ZDZmLThmZWEtNTllYjE4N2ZjOTMy',
    // note that "app" must have "appAuthKey" and "appId" keys
    app: { appAuthKey: 'YjQ3OTViODAtOWRlYi00NThjLTg2MTAtM2M0Zjk0NTBiMTI3', appId: 'fb118ac0-4197-4d2c-9360-25d28c0bf412' }
});

new CronJob('0 0 0 * * 0-7', function () {
    var newdate = new Date();
    var d = new Date();
    var response = {};
    Postdb.find({ $and: [{ date: { $lt: d.setDate(newdate.getDate() - 15) } }, { active: true }] }, function (err, data) {
        // This will run Mongo Query to fetch data based on ID.
        if (err) {
            // console.log(err)
        } else {
            for (var i = 0; i < data.length; i++) {
                Postdb.findById(data[i]._id, function (error, post) {
                    if (error) {
                        response = { "error": true, "message": "Error fetching data" };
                    } else {
                        post.active = false;

                        // save the data
                        post.save(function (err) {
                            if (err) {
                                response = { "error": true, "message": "Error updating data" };
                            } else {
                                response = { "error": false, "message": "Data is updated for " };
                            }
                            //   // console.log(response);
                        })
                    }
                });
            }

        }

    });
}, null, true, 'America/Los_Angeles');
router.use('/image', express.static(path.join(__dirname)));
router.route("/province/all")
    .get(function (req, res) {
        var response = {};
        Provincedb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

// router.route("/getarrangedepartment/all")
//     .get(function (req, res) {
//         var response = {};
//         Provincedb.find({}, function (err, data) {

//             if (err) {
//                 response = { "error": true, "message": "Error fetching data" };
//             } else {
//                 response = { "error": false, "message": data };
//             }
//             res.json(response);
//         });
//     })

router.route("/province")
    .get(function (req, res) {
        var response = {};
        Provincedb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

// get data gender
router.route("/gender/all")
    .get(function (req, res) {
        var response = {};
        Genderdb.find({}, function (err, data) {

            if (err) {
                // console.log(err)
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })


router.route("/gender")
    .get(function (req, res) {
        var response = {};
        Genderdb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
// Job  
router.route("/job/all")
    .get(function (req, res) {
        var response = {};
        Jobdb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

router.route("/job")
    .get(function (req, res) {
        var response = {};
        Jobdb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
// Job  
router.route("/job/all")
    .get(function (req, res) {
        var response = {};
        Jobdb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

router.route("/job")
    .get(function (req, res) {
        var response = {};
        Jobdb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
// TypeJob  
router.route("/typejob/all")
    .get(function (req, res) {
        var response = {};
        Typejobdb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

router.route("/typejob")
    .get(function (req, res) {
        var response = {};
        Typejobdb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
// Department  
router.route("/department/all")
    .get(function (req, res) {
        var response = {};
        Departmentdb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

router.route("/department")
    .get(function (req, res) {
        var response = {};
        Departmentdb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

// Experience
router.route("/experience/all")
    .get(function (req, res) {
        var response = {};
        Experiencedb.find({}, function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })

router.route("/experience")
    .get(function (req, res) {
        var response = {};
        Experiencedb.find({ key: req.query.key }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })


// Account
// router.route("/account/all")
//     .get(function (req, res) {
//         var response = {};
//         Accountdb.find({}, function (err, data) {

//             if (err) {
//                 response = { "error": true, "message": "Error fetching data" };
//             } else {
//                 response = { "error": false, "message": data };
//             }
//             res.json(response);
//         });
//     })


// LOGIN
router.route("/account")
    .get(function (req, res) {
        var response = {};

        var token = req.headers['x-access-token'];
        if (!token) return res.json({ auth: false, message: 'No token provided.' });
        //    // console.log(token);
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            Userdb.findOne({ userid: decoded.id }, function (err, user) {

                if (err) {
                    response = { "error": true, "message": "Error somewhere" };
                } else {
                    if (user !== null) {
                        let newtoken = jwt.sign({ id: user.userid }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        response = { "error": false, "message": user, "token": newtoken };
                    }
                    else response = { "error": true, "message": "Error Looking user" };
                }
                res.json(response);
            });

        });
    })
    .post(function (req, res) {
        //    // console.log(req.body.username)
        var response = {};
        var deferred = Q.defer();

        //res.send(JSON.stringify(req.query));
        Accountdb.findOne({ username: req.body.username }, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
                res.json(response);
            } else {
                //    // console.log(data);
                if (data !== null) {
                    if (bcrypt.compareSync(req.body.password, data.hash)) {
                        Userdb.findOne({ userid: data._id }, function (err, user) {

                            if (err) {
                                response = { "error": true, "message": "Error somewhere" };
                            } else {
                                var token = jwt.sign({ id: user.userid }, config.secret, {
                                    expiresIn: 86400 // expires in 24 hours
                                });

                                //            // console.log(token);

                                response = { "error": false, "message": user, "token": token };
                            }
                            res.json(response);
                        });
                    }
                    else {
                        return res.json({ error: false, message: "Tài khoản  mật khẩu sai" });
                    }
                } else {
                    return res.json({ error: false, message: "Tài khoản  mật khẩu sai" });
                }

            }

        });
    })

// USER

async function getjobname(keyid) {


    //    // console.log(keyid)
    var a = await Jobdb.findOne({ key: keyid }, function (err, data) {
        // if (err) {
        //     // console.log(err)
        //     return "";
        // } else {
        //     name =  data.name
        // }
    })

    return await a.name;


}
async function countcv(key) {
    var cv = await CVPublicdb.find({ dep_id: key, active: true }, async function (err, data) {

    })

    return await cv.length;
}
async function getusername(id) {


    // // console.log("KEY", id)
    var a = await Userdb.findOne({ userid: id }, async function (err, data) {


    })
    var name = "";
    //    // console.log("1", a)
    if (a !== null) {
        if (a.type === 0)
            name = a.detailcandidate.name;
        else if (a.type === 1)
            name = a.detailemployer.company.name;
        // // console.log(name)
    }

    return await name;


}
async function getmaincv(id) {
    // // console.log("KEY", id)
    var a = await CVdb.findOne({ userid: id, maincv: true }, async function (err, data) {


    })

    if (a === null)
        return await null;
    else
        return await a._id;





}
async function getcompanyname(id) {

    var name = await Userdb.findOne({ userid: id, type: 1 }, function (err, data) {

    })

    return await name.detailemployer.company.name;


}
async function getlogocompany(id) {

    // var logo = {};
    var logo = await Userdb.findOne({ userid: id, type: 1 }, function (err, data) {

    })

    return await logo.detailemployer.company.logo;

}
async function getavataruser(id) {

    // var logo = {};
    //   // console.log(id)
    var avatar = await Userdb.findOne({ userid: id, type: 0 }, function (err, data) {

    })

    return await avatar.detailcandidate.avatar;


}
async function getavataruserall(id) {

    // var logo = {};
    //    // console.log(id)
    var avatar = await Userdb.findOne({ userid: id }, function (err, data) {

    })
    //    // console.log("1", avatar)
    if (avatar !== null) {
        if (avatar.type === 0)
            return await avatar.detailcandidate.avatar;
        else
            return await avatar.detailemployer.company.logo;
    }
    else return await "";





}
async function getdepartmentname(keyid) {
    if (keyid === null)
        return ""
    else {
        var a = await Departmentdb.findOne({ key: keyid }, function (err, data) {
        })

        if (a !== null)
            return await a.name;
        else return await null;
    }


}
async function gettypejobname(keyid) {

    var a = await Typejobdb.findOne({ key: keyid }, function (err, data) {

    })

    if (a !== null)
        return await a.name;
    else return await null;
}
async function getgendername(keyid) {
    var a = await Genderdb.findOne({ key: keyid }, function (err, data) {

    })
    if (a !== null)
        return await a.name;
    else return await null;


}
async function getprovincename(keyid) {


    var a = await Provincedb.findOne({ key: keyid }, function (err, data) {

    })

    return await a.name;


}
async function checkfollower(employerid, candidateid) {
    var check = await Followerdb.findOne({ candidateid: candidateid, employerid: employerid }, async function (err, data) {


    });
    if (check !== null) {
        return true;
    } else return false;
}
async function countjob(data) {

    var count = 0;
    for (var i = 0; i < data.length; i++) {
        count = count + data[i].job.length;
    }


    return await count;


}
async function covertdate(date) {

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    //    // console.log(dt + '-' + month + '-' + year)
    return await dt + '-' + month + '-' + year;




}

async function getexperiencename(keyid) {


    var a = await Experiencedb.findOne({ key: keyid }, function (err, data) {

    })

    return await a.name;


}
async function resetPlayerid(id, userid) {

    console.log(id)
    var a = await Userdb.find({
        $or: [{
            type: 0,
            "detailcandidate.setting.player_id": id,





        }, {
            type: 1,
            "detailemployer.setting.player_id": id,



        }
        ]
    }, function (err, data) {

        if (err) {
            return 0;
        } else {
            for (var i = 0; i < data.length; i++) {
                if (data[i].type === 0 && data[i].userid !== userid) {
                    data[i].detailcandidate.setting.player_id = null;
                    data[i].save(async function (err) {
                        if (err) {
                            return 0;
                        } else {


                        }

                    })
                }
                else
                    if (data[i].type === 1 && data[i].userid !== userid) {
                        data[i].detailemployer.setting.player_id = null;
                        data[i].save(async function (err) {
                            if (err) {
                                return 0;
                            } else {


                            }

                        })
                    }
            }
        }

    })

    return 1;


}

router.route("/recruiment")

    .post(async function (req, res) {
        var job = {
            amount: null,
            job: null,

        }
        var post = {
            id: null,
            rate: null,
            company: { userid: null, name: null, logo: null },
            active: null,
            deadline: null,
            contact: null,
            detail: null,
            getcv: null,
            job: [],

        };
        var response;
        await Postdb.findOne({ _id: req.body.id }, async function (err, data) {

            if (err) {
                // console.log(err)
                response = { "error": true, "message": err };

            } else {
                post.id = data._id;
                post.title = data.title;
                post.rate = data.rate;
                post.getcv = data.getcv;
                post.company.userid = data.userID;
                //// console.log("a");
                post.company.name = await getcompanyname(data.userID);

                post.company.logo = await getlogocompany(data.userID);
                post.active = data.active;
                post.deadline = data.deadline;
                for (var i = 0; i < data.job.length; i++) {

                    post.job[i] = Object.assign({}, job);
                    post.job[i].amount = data.job[i].info.amount;

                    post.job[i].job = await getjobname(data.job[i].info.jobKey)


                    post.job[i].major = await getdepartmentname(data.job[i].info.majorKey);
                    post.job[i].typejob = await gettypejobname(data.job[i].info.typeKey);
                    post.job[i].salary = data.job[i].info.salary;
                    post.job[i].address = data.job[i].info.address.address;
                    post.job[i].experience = await getexperiencename(data.job[i].require.experienceKey);
                    post.job[i].gender = await getgendername(data.job[i].require.genderKey);
                    post.job[i].other = data.job[i].require.other;
                }
                post.contact = data.contact;
                post.detail = data.detail;




                response = { "error": true, "message": post };

            }
            await res.json(response)

        });
    });

async function sortmajor(arr) {

    var a = [], b = [], prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = arr[i];
    }

    return [a, b];




}
router.route("/gettopmajor")

    .get(async function (req, res) {
        var onedata = {
            name: null,
            department: null,
            population: null

        }
        var array = [];
        var arraymajor = [];
        var response;
        var countpost = 0;
        await Postdb.find({

        }, async function (error, data) {
            if (error) {
                response = { "error": true, "message": "Error fetching data account" };

            } else {

                for (var i = 0; i < data.length; i++) {
                    countpost = countpost + data[i].job.length;
                    for (var j = 0; j < data[i].job.length; j++) {
                        arraymajor.push(data[i].job[j].info.majorKey)

                    }
                }

                let datamajor = await sortmajor(arraymajor)
                // console.log(datamajor)
                for (var i = 0; i < datamajor[0].length; i++) {
                    var newarray = Object.assign({}, onedata)

                    newarray.department = await getdepartmentname(datamajor[0][i]);
                    newarray.population = parseFloat((datamajor[1][i] / countpost * 100).toFixed(1))
                    newarray.name = String(newarray.population + "%")
                    array.push(newarray)
                }

                array.sort(function (a, b) { return b.population - a.population });
                if (array.length < 10) {
                    let l = array.length;
                    while (array.length <= 11) {
                        var newarray = Object.assign({}, onedata)
                        newarray.department = ""
                        newarray.population = 0
                        newarray.name = "0%"
                        array.push(newarray)
                    }
                }
                if (array.length > 10) {
                    var sum = 0
                    for (var i = 0; i < 10; i++) {
                        sum = sum + array[i].population;
                    }
                    array[10].population = Number((100 - sum).toFixed(1));
                    array[10].department = "Khác";
                    array[10].name = array[10].population + "%"
                }




                response = { "error": true, "message": array.slice(0, 11) };


            }
            await res.json(response)
        });




    });
router.route("/getavatar")
    .post(async function (req, res) {
        var img = req.body.image;
        var type = req.body.type;


        var datatype = await type.replace("image/", "")
        //// console.log("DATA TYPE", datatype)
        res.json({ a: datatype })

        // await fs.writeFile("./userimage/"+'image'+'.'+datatype, buf, err => {
        //     // console.log(err)

        //     res.json({a:err})
        // })
    })
router.route("/addregistercode")
    .post(async function (req, res) {

        var db = new Registerdb();
        var response = {};

        db.code = req.body.code;



        db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = { "error": true, "message": { "message": err, "success": false } };
            } else {
                response = { "error": false, "message": { "message": "Create RC successful !!", "success": true } };
            }
            res.json(response);
        });

    });
router.route("/user")
    .get(function (req, res) {
        var response = {};
        // console.log("aaaa", req.query)


        if (req.query.type === 1) {
            Userdb.find({ _id: req.query.userid }, function (err, data) {

                if (err) {
                    response = { "error": true, "message": "Error fetching data user" };
                } else {
                    var info = { "type": req.query.type, "info": data.detailemployer }
                    response = { "error": false, "message": info };
                }
                res.json(response);
            });
        }
        else
            if (req.query.type === 0) {
                Userdb.find({ _id: req.query.userid }, function (err, data) {

                    if (err) {
                        response = { "error": true, "message": "Error fetching data user" };
                    } else {
                        var info = { "type": req.query.type, "info": data.detailcandidate }
                        response = { "error": false, "message": info };
                    }
                    res.json(response);
                });
            }
    })

    .post(function (req, res) {
        var db = new Userdb();
        var dbaccount = new Accountdb();
        var response = {};
        var checkusername = 0;
        if (req.body.type === 0) {
            dbaccount.username = req.body.username;

            dbaccount.hash = bcrypt.hashSync(req.body.password);
            var find = Accountdb.find({ username: req.body.username }, function (error, data) {
                if (error) {
                    response = { "error": true, "message": { "success": false, "message": "Error fetch data account" } };
                    res.json(response);
                } else {

                }
            })
            find.count(async function (error, count) {
                checkusername = count;


                if (checkusername >= 1) {
                    response = { "error": true, "message": { "success": false, "message": "Please choose anoter username" } };
                    res.json(response);
                }
                else {
                    var code = await Registerdb.findOne({ code: req.body.code }, function (error, data) {
                        if (error) {
                            response = { "error": true, "message": { "success": false, "message": "Error fetch code" } };
                            res.json(response);
                        } else {
                            // console.log("data", data)
                        }
                    })
                    // console.log("cc", code);
                    if (code !== null) {
                        dbaccount.save(function (err) {

                            if (err) {
                                response = { "error": true, "message": { "success": false, "message": { "success": false, "message": "Error adding data" } } };
                            } else {

                                //checkusername = Accountdb.find({ username: req.body.username }).count();

                                Accountdb.findOne({ username: req.body.username }, function (error, data) {

                                    if (error) {
                                        response = { "error": true, "message": { "success": false, "message": "Error adding data" } };
                                        res.json(response);
                                    } else {

                                        if (data !== null) {

                                            db.userid = data._id;
                                            db.type = 0;
                                            db.detailcandidate = req.body.detail;

                                            db.detailcandidate.avatar = "/image/userimage/" + data._id + ".png"
                                            if (req.body.detail.gender == 0)
                                            // db.detailcandidate.avatar.data = fs.readFileSync(imgpath_male);
                                            {
                                                fs.writeFile("./userimage/" + data._id + ".png", fs.readFileSync(imgpath_male), err => {
                                                    // console.log(err)
                                                })
                                            }
                                            else
                                            // db.detailcandidate.avatar.data = fs.readFileSync(imgpath_female);
                                            {
                                                {
                                                    fs.writeFile("./userimage/" + data._id + ".png", fs.readFileSync(imgpath_female), err => {
                                                        // console.log(err)
                                                    })
                                                }
                                            }
                                            db.detailemployer = null;
                                            db.save(function (err) {

                                                if (err) {
                                                    response = { "error": true, "message": { "success": false, "message": "Error adding data" } };
                                                } else {
                                                    response = { "error": false, "message": { "success": true, "message": "Resgister Succesfull " } };
                                                }
                                                res.json(response);


                                            });
                                        } else res.json({ "error": true, "message": { "success": false, "message": "Error adding data" } });
                                    }


                                });
                            }
                        })
                    } else {
                        res.json({ "error": true, "message": { "success": false, "message": "Code is not exist" } });
                    }
                }

            });




        } else
            if (req.body.type === 1) {
                dbaccount.username = req.body.username;
                // Hash the password using SHA1 algorithm.
                dbaccount.hash = bcrypt.hashSync(req.body.password);
                var find = Accountdb.find({ username: req.body.username }, function (error, data) {
                    if (error) {
                        response = { "error": true, "message": "Error fetching data account" };
                        res.json(response);
                    } else {
                    }
                })
                find.count(async function (error, count) {
                    checkusername = count;
                    if (checkusername >= 1) {
                        response = { "error": true, "message": { "success": false, "message": "Please choose anoter username" } };
                        res.json(response);
                    }
                    else {
                        var code = await Registerdb.findOne({ code: req.body.code }, function (error, data) {
                            if (error) {
                                response = { "error": true, "message": { "success": false, "message": "Error fetch code" } };
                                res.json(response);
                            } else {
                                // console.log("data", data)
                            }
                        })
                        // console.log("cc", code);
                        if (code !== null) {
                            dbaccount.save(function (err) {

                                if (err) {
                                    response = { "error": true, "message": { "success": false, "message": "Error save account" } };
                                } else {

                                    //checkusername = Accountdb.find({ username: req.body.username }).count();

                                    Accountdb.findOne({ username: req.body.username }, function (error, data) {

                                        if (error) {
                                            response = { "error": true, "message": { "success": false, "message": "Error find account" } };
                                            res.json(response);
                                        } else {
                                            if (data !== null) {
                                                var a;

                                                // console.log(data)
                                                db.userid = data._id;
                                                db.type = 1;
                                                db.detailcandidate = null;
                                                db.detailemployer = req.body.detail;
                                                db.detailemployer.company.logo = "/image/userimage/" + data._id + ".jpg"
                                                // db.detailemployer.company.logo.contentType = 'image/jpg';
                                                // db.detailemployer.company.logo.data = fs.readFileSync(imgpath_company);
                                                fs.writeFile("./userimage/" + data._id + ".jpg", fs.readFileSync(imgpath_company), err => {
                                                    // console.log(err)
                                                })
                                                db.save(function (err) {

                                                    if (err) {
                                                        response = { "error": true, "message": { "success": false, "message": "Error adding data" } };
                                                    } else {
                                                        response = { "error": false, "message": { "success": true, "message": "Resgister Employer Succesfull" } };
                                                    }
                                                    res.json(response);


                                                });
                                            } else res.json({ "error": true, "message": { "success": false, "message": "Error adding data" } });
                                        }


                                    });
                                }
                            })
                        } else {
                            res.json({ "error": true, "message": { "success": false, "message": "Code is not exist" } });
                        }
                    }

                });
            }

    })

router.route("/user/update")
    .post(function (req, res) {
        var response = {};
        if (req.body.type === 1) {
            Accountdb.findById(req.body.userid, function (err, data) {
                if (err) {
                    response = { "error": true, "message": "Error fetching data" };
                } else {
                    // console.log(req.body.password);
                    if (bcrypt.compareSync(req.body.password, data.hash)) {

                        data.hash = bcrypt.hashSync(req.body.newpassword);
                        data.save(function (err) {
                            if (err) {
                                response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                                res.json(response);
                            } else {
                                Userdb.findOne({ userid: req.body.userid }, async function (err, data) {
                                    if (err) {
                                        response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                                    } else {
                                        response = { "error": false, "message": { "message": data, "success": true } };
                                    }
                                    res.json(response);

                                })

                            }

                        })
                    }
                    else res.json({ "error": true, "message": { "message": "Mật khẩu cũ không chính xác ", "success": false } });
                }
            });
        } else
            if (req.body.type === 2) {
                Userdb.findOne({ userid: req.body.userid }, async function (err, data) {
                    if (err) {
                        response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                    } else {
                        if (data !== null) {
                            // console.log(data)
                            var a = Math.floor((Math.random() * 5000) + 1);
                            if (req.body.changeimage === true) {
                                var img = req.body.image.data;
                                var type = req.body.image.type;
                                var datatype = await type.replace("image/", "");
                                var buf = new Buffer(img, 'base64');
                                if (req.body.usertype == 0) {
                                    var filename = await data.detailcandidate.avatar.replace("/image/userimage/", "");
                                }
                                else if (req.body.usertype == 1) {
                                    var filename = await data.detailemployer.company.logo.replace("/image/userimage/", "");

                                }
                                await fs.writeFile("./userimage/" + req.body.userid + '_' + a + '.' + datatype, buf, err => {
                                    if (err === null) {

                                        // console.log("FF", filename)
                                        fs.unlink("./userimage/" + filename, (err) => {
                                            if (err) {
                                                // console.log("failed to delete local image:" + err);
                                            } else {
                                                // console.log('successfully deleted local image');
                                            }
                                        });
                                    } else {

                                        res.json({ "error": true, "message": { "message": err, "success": false } })
                                    }

                                })

                            }





                            // console.log("P");
                            if (req.body.usertype == 0) {
                                // console.log("P2")
                                data.detailcandidate = req.body.detail;
                                if (req.body.changeimage === true) {
                                    data.detailcandidate.avatar = "/image/userimage/" + req.body.userid + '_' + a + "." + req.body.image.type.replace("image/", "");
                                }
                                data.detailemployer = null;
                            }
                            else if (req.body.usertype == 1) {
                                // console.log("P3")
                                data.detailcandidate = null;

                                data.detailemployer = req.body.detail;
                                if (req.body.changeimage === true) {
                                    data.detailemployer.company.logo = "/image/userimage/" + req.body.userid + '_' + a + "." + req.body.image.type.replace("image/", "");
                                }

                            }
                            await data.save(function (err) {
                                if (err) {
                                    response = { "error": true, "message": { "message": "Error updating data", "success": false } };
                                } else {
                                    response = { "error": false, "message": { "message": data, "success": true } };
                                }
                                res.json(response);
                            })
                        } else res.json({ "error": true, "message": { "message": "Error updating data", "success": false } });
                    }
                });
            }

    })


router.route("/user/updateplayerid")
    .post(function (req, res) {
        var response = {};

        Userdb.findOne({ userid: req.body.userid }, async function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data", "success": true };
            } else {
                // console.log("ID", req.body.player_id)
                if (data.type === 1) {

                    if (data.detailemployer.setting.player_id !== req.body.player_id) {
                        data.detailemployer.setting.player_id = req.body.player_id
                    }
                    else {
                        response = { "error": false, "message": { "message": "Nothing change", "success": true } };
                        res.json(response);
                    }
                } else {
                    if (data.detailcandidate.setting.player_id !== req.body.player_id) {
                        data.detailcandidate.setting.player_id = req.body.player_id

                    }
                    else {
                        response = { "error": false, "message": { "message": "Nothing change", "success": true } };
                        res.json(response);
                    }
                }
                if (response.error === undefined) {

                    data.save(async function (err) {
                        if (err) {
                            response = { "error": true, "message": { "message": "Error saving data", "success": false } };
                        } else {
                            response = { "error": false, "message": { "message": "Update successful", "success": true } };
                            await resetPlayerid(req.body.player_id, req.body.userid)
                        }
                        res.json(response);
                    })
                }
            }
        });


    })

router.route("/user/getinfocompany")
    .post(function (req, res) {
        var response = {};
        var info = {
            name: "",
            website: "",
            intro: "",
            address: "",
            isfollow: false
        }
        Userdb.findOne({ userid: req.body.employerid, type: 1 }, async function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data", "success": true };
            } else {

                if (data !== null) {
                    var companyinfo = Object.assign({}, info)
                    companyinfo.name = data.detailemployer.company.name;
                    companyinfo.website = data.detailemployer.company.website;
                    companyinfo.address = data.detailemployer.company.address;
                    companyinfo.logo = data.detailemployer.company.logo;
                    companyinfo.intro = data.detailemployer.company.intro;
                    companyinfo.isfollow = await checkfollower(req.body.employerid, req.body.candidateid);

                    response = { "error": false, "message": { "message": companyinfo, "success": true } };
                    await res.json(response);
                }
                else {

                    response = { "error": false, "message": { "message": companyinfo, "success": true } };
                    res.json(response);

                }
            }
        });


    })

router.route("/recruiment/getuserpost")
    .get(function (req, res) {
        var response = {};

        var post = {
            id: "",
            title: "",
            userid: "",
            active: null,
            getcv: null,
            date: null,
            numOfCandidate: 0,
            job: []
        }
        //res.send(JSON.stringify(req.query));
        Postdb.find({ userID: req.query.userid }, async function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                await data.sort(function (b, a) { return new Date(a.date) - new Date(b.date) });
                var data1 = [];
                for (var i = 0; i < data.length; i++) {
                    var npost = Object.assign({}, post);
                    npost.id = data[i]._id;
                    // console.log("abc")
                    npost.title = data[i].title;
                    npost.userid = data[i].userid;
                    npost.active = data[i].active;
                    npost.getcv = data[i].getcv;
                    npost.date = await covertdate(data[i].date);
                    var find = await CVtoEmployerdb.find({ recruimentid: data[i]._id, active: true }, function (error, data) {
                        if (error) {
                            response = { "error": true, "message": { "success": false, "message": "Error fetch data account" } };
                            res.json(response);
                        } else {

                        }
                    })
                    npost.numOfCandidate = find.length;
                    npost.job = [];
                    for (var j = 0; j < data[i].job.length; j++) {
                        // console.log("JOB LE", data[i].job.length)
                        await npost.job.push(await getjobname(data[i].job[j].info.jobKey))

                    }
                    await data1.push(npost)


                }
                response = { "error": false, "message": data1 };
            }
            res.json(response);
        });


    })
async function showlistjob(list) {
    var name = "";

    for (var i = 0; i < list.length; i++) {
        name = name + "," + await getjobname(list[i].info.jobKey)
    }


    return await name.slice(1);
}
async function showlistcity(list) {
    var name = "";
    let arrid = []
    for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].info.address.cityKey.length; j++) {
            if (arrid.indexOf(list[i].info.address.cityKey[j]) == -1)
                arrid.push(list[i].info.address.cityKey[j])

        }

    }
    for (var i = 0; i < arrid.length; i++) {

        name = name + "," + await getprovincename(arrid[i])
    }


    return await name.slice(1);

}
function showlistsalary(list) {
    var name = ""

    if (list.length === 1)
        if (list[0].info.salary.salary === null)
            name = list[0].info.salary.other
        else name = list[0].info.salary.salary
    else
        name = 'Xem chi tiết';
    return name;

}


router.route("/recruiment/getallpost")
    .get(function (req, res) {
        var response = {};
        var array = [];
        var post = {
            id: null,
            title: null,
            rate: null,
            companyname: null,
            image: null,
            salary: null,
            job: null,
            location: null,
            userid: null
        }
        //res.send(JSON.stringify(req.query));
        Postdb.find({ active: true }, async function (err, data) {

            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                //// console.log(data)
                var array = [];
                await data.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });
                for (var i = 0; i < data.length; i++) {
                    data[i].score = i * 0.2 + data[i].rate * 0.8;
                    //  // console.log("score", data[i].score)
                }
                //// console.log("NUM", data.length)
                await data.sort(function (a, b) { return b.score - a.score });
                for (var a = 0; a < data.length; a++) {
                    var newarray = Object.assign({}, post)
                    newarray.id = data[a]._id;
                    newarray.title = data[a].title;
                    newarray.rate = data[a].rate;
                    newarray.companyname = await getcompanyname(data[a].userID);
                    newarray.image = await getlogocompany(data[a].userID);
                    newarray.salary = await showlistsalary(data[a].job);
                    newarray.job = await showlistjob(data[a].job);
                    newarray.location = await showlistcity(data[a].job);
                    newarray.userid = data[a].userID;
                    array.push(newarray)

                }

                response = { "error": false, "message": array };
            }
            res.json(response);
        });


    })
router.route("/recruiment/filterallpost")
    .post(function (req, res) {
        var response = {};
        var array = [];
        var post = {
            id: null,
            title: null,
            rate: null,
            companyname: null,
            image: null,
            salary: null,
            job: null,
            location: null,
            userid: null
        }
        //  console.log(req.body)
        Postdb.find(
            {
                $or: [{
                    active: true,
                    job: {
                        $elemMatch: {
                            "require.experienceKey": req.body.experience !== null ? req.body.experience : { $exists: true },
                            "require.genderKey": req.body.gender !== null ? req.body.gender : { $exists: true },
                            "info.jobKey": req.body.job !== null ? req.body.job : { $exists: true },
                            "info.majorKey": req.body.major !== null ? req.body.major : { $exists: true },
                            "info.typeKey": req.body.typejob !== null ? req.body.typejob : { $exists: true },
                            "info.address.cityKey": req.body.city !== null ? req.body.city : { $exists: true },
                            "info.salary.salary": req.body.salarymax !== null ? { $gte: req.body.salarymin, $lte: req.body.salarymax } : { $exists: true },


                        }
                    }
                    ,
                    title: { "$regex": req.body.query, "$options": 'i' }
                }, {
                    active: true,
                    job: {
                        $elemMatch: {
                            "require.experienceKey": req.body.experience !== null ? req.body.experience : { $exists: true },
                            "require.genderKey": req.body.gender !== null ? req.body.gender : { $exists: true },
                            "info.jobKey": req.body.job !== null ? req.body.job : { $exists: true },
                            "info.majorKey": req.body.major !== null ? req.body.major : { $exists: true },
                            "info.typeKey": req.body.typejob !== null ? req.body.typejob : { $exists: true },
                            "info.address.cityKey": req.body.city !== null ? req.body.city : { $exists: true },
                            "info.salary.salary": req.body.salarymax !== null ? { $gte: req.body.salarymin, $lte: req.body.salarymax } : { $exists: true },


                        }
                    }
                    ,
                    companyname: { "$regex": req.body.query, "$options": 'i' }
                }
                ]
            }
            , async function (err, data) {

                if (err) {
                    response = { "error": true, "message": { "message": err, "success": false } };
                } else {

                    let arraytype = []
                    data.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });
                    for (var i = 0; i < data.length; i++) {
                        data[i].score = i * 0.4 + data[i].rate * 0.6;
                    }
                    data.sort(function (a, b) { return b.score - a.score });
                    //// console.log(data.length);
                    for (var a = 0; a < data.length; a++) {
                        var newarray = Object.assign({}, post)
                        newarray.id = data[a]._id;
                        newarray.title = data[a].title;
                        newarray.rate = data[a].rate;
                        newarray.companyname = await getcompanyname(data[a].userID);
                        newarray.image = await getlogocompany(data[a].userID);
                        newarray.salary = await showlistsalary(data[a].job);
                        newarray.job = await showlistjob(data[a].job);
                        newarray.location = await showlistcity(data[a].job);
                        newarray.userid = data[a].userID;
                        array.push(newarray)

                    }
                    let num = array.length;
                    let numpage = Math.floor(num / 6) + (num % 6 === 0 ? 0 : 1);

                    // console.log("B",numpage)
                    if (num > 6) {
                        if (req.body.page * 6 < num) {
                            if (req.body.page === 1)
                                arraytype = await array.slice(0, 6);
                            else if (req.body.page > 1)
                                arraytype = await array.slice(0, req.body.page * 6);

                        }
                        else {

                            arraytype = array.slice(0, num);

                        }
                    }
                    else {

                        arraytype = await array.slice(0, num);
                    }

                    response = { "error": false, "message": { "message": arraytype, "amount": numpage, "success": true } };
                }
                res.json(response);
            });

    })
router.route("/post/createpost")
    .post(async function (req, res) {
        var db = new Postdb();
        var response = {};

        db.title = req.body.title;
        db.job = req.body.job;
        db.detail = req.body.detail;
        db.contact = req.body.contact;
        db.deadline = req.body.deadline;
        db.active = req.body.active;
        db.date = dateFormat(req.body.date, "yyyy-mm-dd HH:MM:ss");
        db.userID = req.body.userid;
        db.getcv = req.body.getcv;
        db.rate = req.body.rate
        db.companyname = await getcompanyname(req.body.userid)



        await db.save(async function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = { "error": true, "message": { "message": err, "success": false } };
            } else {
                response = { "error": false, "message": { "message": "Create recruiment successful !!", "success": true } };
            }
            await res.json(response);
            if (response.error === false) {
                setTimeout(async function () {
                    // console.log("COME ")
                    let companyname = await getcompanyname(db.userID);
                    await sendNotification_Recruiment(db._id, companyname, db.userID)
                }, 1000)

            }
        });

    })
router.route("/post/deletepost")
    .post(function (req, res) {

        var response = {};

        Postdb.remove({ _id: req.body.id }, function (err, result) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": { "message": "Delete recruiment successful !!", "success": true } };
            }
            res.json(response);
        });


    })
router.route("/post/getdetailpost")
    .get(function (req, res) {
        var response = {};

        var text = {
            experience: "Không yêu cầu",
            major: "",
            typejob: "",
            queryjob: "",
            isfemale: true,
            ismale: true,
            salary: false,
            amount: "",
            textsalary: "0",
            textother: "Thương lượng",
        }
        //res.send(JSON.stringify(req.query));
        var listtext = [];

        Postdb.findOne({ _id: req.query.id }, async function (err, data) {

            if (err) {
                response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
            } else {
                if (data !== null) {
                    for (var i = 0; i < data.job.length; i++) {
                        var t = Object.assign({}, text)
                        t.experience = await getexperiencename(data.job[i].require.experienceKey)
                        t.major = await getdepartmentname(data.job[i].info.majorKey)
                        t.typejob = await gettypejobname(data.job[i].info.typeKey)
                        t.queryjob = await getjobname(data.job[i].info.jobKey)
                        if (data.job[i].require.genderKey === 0) {
                            t.isfemale = true,
                                t.ismale = true

                        } else if (data.job[i].require.genderKey === 1) {
                            t.isfemale = false,
                                t.ismale = true

                        } else {
                            t.isfemale = true,
                                t.ismale = false
                        }
                        t.salary = data.job[i].info.salary.salary === null ? false : true
                        t.textsalary = data.job[i].info.salary.salary === null ? "" : String(data.job[i].info.salary.salary),
                            t.textother = data.job[i].info.salary.other === null ? "" : data.job[i].info.salary.other
                        t.amount = String(data.job[i].info.amount)
                        listtext.push(t)

                    }

                    response = { "error": false, "message": { "message": data, "text": listtext, "success": true } };
                }
                else response = { "error": true, "message": { "message": "Data is not found", "success": false } };
            }
            res.json(response);
        });

    })
router.route("/post/updatepost")
    .post(function (req, res) {
        var response = {};


        Postdb.findOne({ _id: req.body.id }, function (error, post) {
            if (error) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                if (post !== null) {
                    if (req.body.type === 1) {
                        post.getcv = req.body.getcv
                    }
                    else if (req.body.type === 2) {
                        post.title = req.body.title;
                        post.detail = req.body.detail;
                        post.contact = req.body.contact;
                        post.deadline = req.body.deadline;
                        post.job = req.body.job
                    }



                    // save the data
                    post.save(function (err) {
                        if (err) {
                            response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                        } else {
                            response = { "error": false, "message": { "message": "Update successful", "success": true } };
                        }
                        res.json(response);
                    })
                } else {
                    response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                    res.json(response);
                }
            }
        });

    })
router.route("/news/getallnews")
    .get(function (req, res) {
        var response = {};

        var news =
        {
            id: "",
            title: "",
            type: "",
            image: "",
            content: "",
            date: "",
            viewer: 0
        }
        //res.send(JSON.stringify(req.query));
        Newsdb.find({}, async function (err, data) {

            if (err) {
                response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
            } else {
                var arraytype1 = [];
                var arraytype2 = [];

                await data.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });

                for (var a = 0; a < data.length; a++) {
                    var n = Object.assign({}, news)
                    n.id = data[a]._id;
                    n.title = data[a].title;
                    n.content = data[a].content;
                    n.image = data[a].image;
                    n.viewer = data[a].viewer;
                    n.type = data[a].type;
                    n.date = await covertdate(data[a].date);

                    if (n.type === 1) {
                        arraytype1.push(n);
                    }
                    else if (n.type === 2) { arraytype2.push(n); }
                }

                if (req.query.page1 === 1)
                    arraytype1.splice(5);
                else if (req.query.page1 > 1)
                    arraytype1.splice(0, req.body.page1 * 5);
                if (req.query.page2 === 1)
                    arraytype1.splice(5);
                else if (req.query.page2 > 1)
                    arraytype2.splice(0, req.body.page2 * 5);
                response = { "error": false, "message": { "data1": arraytype1, "data2": arraytype2, "success": false } };
            }
            res.json(response);
        })
    })

router.route("/news/getlistnews")
    .get(function (req, res) {
        var response = {};

        var news =
        {
            id: "",
            title: "",
            type: "",
            image: "",
            date: "",
            viewer: 0
        }
        var num = 0;
        var numpage = 0;
        var type = parseInt(req.query.type);
        // console.log(type)
        //res.send(JSON.stringify(req.query));
        Newsdb.find({ type: req.query.type }, async function (err, data) {

            if (err) {
                // console.log(err)
                response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
            } else {
                var arraytype = [];


                num = data.length;
                numpage = Math.floor(num / 5) + num % 5 === 0 ? 0 : 1;

                await data.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });

                for (var a = 0; a < data.length; a++) {
                    var n = Object.assign({}, news)
                    n.id = data[a]._id;
                    n.title = data[a].title;
                    n.image = data[a].image;
                    n.viewer = data[a].viewer;
                    n.type = data[a].type;
                    n.date = await covertdate(data[a].date);
                    arraytype.push(n);

                }
                if (num > 5) {
                    if (req.query.page * 5 < num) {
                        if (req.query.page === 1)
                            arraytype.slice(0, 5);
                        else if (req.query.page > 1)
                            arraytype.slice((req.body.page - 1) * 5, req.body.page * 5 - 1);
                    }
                    else {
                        arraytype.slice(num - 5, num);
                    }
                }
                else {
                    arraytype.slice(0, num - 1);
                }
                response = { "error": false, "message": { "data": arraytype, "amount": numpage, "type": type, "success": false } };
            }
            res.json(response);
        })
    })

router.route("/news/getnews")
    .get(function (req, res) {
        var response = {};


        //res.send(JSON.stringify(req.query));


        Newsdb.findOne({ _id: req.query.id }, function (err, data) {

            if (err) {
                response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
            } else {
                if (data !== null)

                    response = { "error": false, "message": { "message": data, "success": true } };
                else response = { "error": true, "message": { "message": "Data is not found", "success": false } };
            }
            res.json(response);
        });

    })


router.route("/cv/createcv")
    .post(function (req, res) {
        var db = new CVdb();
        var response = {};

        db.cvname = req.body.cvname;
        db.userid = req.body.userid;

        db.maincv = req.body.maincv;
        db.resume = req.body.resume;



        db.date = dateFormat(req.body.date, "yyyy-mm-dd HH:MM:ss");




        db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = { "error": true, "message": { "message": err, "success": false } };
            } else {
                response = { "error": false, "message": { "message": "Create cv successful !!", "success": true } };
            }
            res.json(response);
        });

    })

router.route("/cv/getusercv")
    .get(function (req, res) {
        var response = {};

        var cv = {
            id: "",
            cvname: "",
            userid: "",
            maincv: null,
            date: null,

        }
        //res.send(JSON.stringify(req.query));
        CVdb.find({ userid: req.query.userid }, async function (err, data) {
            // console.log(req.query.userid)
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {

                var data1 = [];
                for (var i = 0; i < data.length; i++) {
                    var ncv = Object.assign({}, cv);
                    ncv.id = data[i]._id;

                    ncv.cvname = data[i].cvname;
                    ncv.userid = data[i].userid;

                    ncv.date = await covertdate(data[i].date);
                    ncv.maincv = data[i].maincv;

                    await data1.push(ncv)


                }

                response = { "error": false, "message": { "message": data1, "success": true } };
            }
            res.json(response);
        });


    })
router.route("/cv/getdetailcv")
    .get(function (req, res) {
        var response = {};
        var cv = {
            id: "",
            date: null,

            userid: "",
            cvname: "",
            color: 1,
            image: "",
            resume: {}

        }

        CVdb.findOne({ _id: req.query.id }, async function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                var ncv = Object.assign({}, cv);
                ncv.id = data._id;

                ncv.cvname = data.cvname;
                ncv.userid = data.userid;

                ncv.date = await covertdate(data.date);
                ncv.image = await getavataruser(data.userid);
                ncv.resume = data.resume;

                response = { "error": false, "message": { "message": ncv, "success": true } };
            }
            res.json(response);
        });


    })
router.route("/cv/deletecv")
    .post(function (req, res) {

        var response = {};

        CVdb.remove({ _id: req.body.id }, function (err, result) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": { "message": "Delete cv successful !!", "success": true } };
            }
            res.json(response);
        });


    })
router.route("/cv/updatecv")
    .post(function (req, res) {
        var response = {};


        CVdb.findOne({ _id: req.body.id }, async function (error, cv) {
            if (error) {
                console.log(error)
                response = { "error": true, "message": "Error fetching data" };
            } else {
                if (cv !== null) {
                    if (req.body.type === 0)
                        cv.cvname = req.body.cvname
                    else if (req.body.type === 1) {

                        await CVdb.findOne({ userid: req.body.userid, maincv: true }, async function (error, cvdata) {
                            if (error) {

                                response = { "error": true, "message": "FOUND" };
                                res.json(response);
                            } else {
                                cvdata.maincv = false;

                                cvdata.save(function (err) {
                                    if (err) {
                                        response = { "error": true, "message": { "message": "Error save data maincv ", "success": false } };
                                        res.json(response);
                                    } else {

                                    }

                                })


                            }
                        })
                        cv.maincv = req.body.maincv;

                    }
                    else if (req.body.type === 2)
                        cv.resume = req.body.resume




                    await cv.save(function (err) {
                        if (err) {
                            console.log(err)
                            response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                        } else {
                            response = { "error": false, "message": { "message": "Update successful", "success": true } };
                        }
                        res.json(response);


                    })

                } else {
                    response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                    res.json(response);
                }
            }
        });

    })



// CV to Employer
// Get Name Recruiment and Num of CV
router.route("/cvte/createcvte")
    .post(async function (req, res) {
        var db = new CVtoEmployerdb();
        var response = {};


        db.candidateid = req.body.candidateid;
        db.recruimentid = req.body.recruimentid;
        db.employerid = req.body.employerid;
        db.position = req.body.position;
        db.active = true;

        db.date = dateFormat(req.body.date, "yyyy-mm-dd HH:MM:ss");

        await CVdb.findOne({ _id: req.body.cvid }, function (error, data) {
            if (error) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                if (data !== null) {
                    //    // console.log("OKOK",data)
                    db.data.resume = data.resume;
                    db.data.color = data.color;

                } else {
                    db.data.color = null;
                    db.data.image = null;
                    db.data.resume = null;
                }
            }
        });


        await db.save(async function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = { "error": true, "message": { "message": err, "success": false } };
            } else {
                response = { "error": false, "message": { "message": "Create CV to Employer successful !!", "success": true } };
            }
            await res.json(response);

            if (response.error == false) {
                //   // console.log("dasdas")
                await sendNotification_CV(db.recruimentid, db.employerid)
            }

        });



    })
router.route("/cvte/getdetailcv")
    .get(function (req, res) {
        var response = {};
        var cv = {
            id: "",
            color: 1,
            image: "",
            resume: {}

        }

        CVtoEmployerdb.findOne({ _id: req.query.id }, async function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                var ncv = Object.assign({}, cv);
                if (data !== null) {

                    ncv.id = data._id;
                    ncv.color = data.data.color;
                    ncv.image = await getavataruser(data.candidateid);
                    ncv.resume = data.data.resume;
                }

                response = { "error": false, "message": { "message": ncv, "success": true } };
            }
            res.json(response);
        });


    })
router.route("/cvte/checkuser")
    .get(function (req, res) {
        var response = {};

        CVtoEmployerdb.find({ candidateid: req.query.candidateid, recruimentid: req.query.recruimentid }, async function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                if (data.length >= 1)
                    response = { "error": false, "message": { "message": true, "success": true } };
                else
                    response = { "error": false, "message": { "message": false, "success": true } };
            }
            res.json(response);
        });


    })
router.route("/cvte/getcvtoemployer")
    .get(function (req, res) {
        var response = {};

        var cvte = {
            recruimentid: "",
            recruimenttitle: "",
            numOfCV: 0,


        }
        Postdb.find({ userID: req.query.userid }, async function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                var data1 = []
                for (var i = 0; i < data.length; i++) {
                    var ncvte = Object.assign({}, cvte);
                    ncvte.recruimentid = data[i]._id;
                    ncvte.recruimenttitle = data[i].title;
                    var find = await CVtoEmployerdb.find({ recruimentid: data[i]._id, active: true }, function (error, data) {
                        if (error) {
                            response = { "error": true, "message": { "success": false, "message": "Error fetch data account" } };
                            res.json(response);
                        } else {

                        }
                    })
                    ncvte.numOfCV = find.length;

                    await data1.push(ncvte)

                }

                response = { "error": false, "message": { "message": data1, "success": true } };
            }
            res.json(response);
        });


    })

router.route("/cvte/getcvinrecruiment")
    .get(function (req, res) {
        var response = {};

        var cv = {
            id: "",
            image: "",
            candidatename: "",
            position: [],
            date: null,
            candidateid: ""

        }
        CVtoEmployerdb.find({ recruimentid: req.query.recruimentid, active: true }, async function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                var data1 = []
                for (var i = 0; i < data.length; i++) {
                    var ncv = Object.assign({}, cv);
                    ncv.id = data[i]._id
                    ncv.candidatename = data[i].data.resume.profile.name;
                    ncv.image = await getavataruser(data[i].candidateid);
                    ncv.candidateid = data[i].candidateid;
                    //       // console.log("NAME ",getcandidatename(data[i].cvid))
                    ncv.position = data[i].position;
                    ncv.date = await covertdate(data[i].date);


                    await data1.push(ncv)

                }

                response = { "error": false, "message": { "message": data1, "success": true } };
            }
            res.json(response);
        });


    })
router.route("/cvte/deletecvte")
    .post(function (req, res) {

        var response = {};

        CVtoEmployerdb.remove({ _id: req.body.id }, function (err, result) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": { "message": "Delete cvte successful !!", "success": true } };
            }
            res.json(response);
        });


    })

router.route("/cvte/deactivecv")
    .post(function (req, res) {
        var response = {};
        CVtoEmployerdb.findOne({ recruimentid: req.body.recruimentid, candidateid: req.body.candidateid }, function (error, data) {
            if (error) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                if (data !== null) {
                    data.active = false;

                    data.save(function (err) {
                        if (err) {
                            response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                        } else {
                            response = { "error": false, "message": { "message": "Delete CV successful", "success": true } };
                        }
                        res.json(response);
                    })
                } else {
                    response = { "error": true, "message": { "message": "Error fetching data", "success": false } };
                    res.json(response);
                }
            }
        });

    })
router.route("/comment/createcmt")
    .post(function (req, res) {
        var db = new Commentdb();
        var response = {};

        db.userid = req.body.userid;
        db.recruimentid = req.body.recruimentid;
        db.content = req.body.content;

        db.date = dateFormat(req.body.date, "yyyy-mm-dd HH:MM:ss");




        db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = { "error": true, "message": { "message": err, "success": false } };
            } else {
                response = { "error": false, "message": { "message": "Create comment successful !!", "success": true } };
            }
            res.json(response);
        });

    })
router.route("/comment/getcmt")
    .get(function (req, res) {

        var response = {};

        var comment = {
            id: "",
            image: "",
            recruimentid: "",
            content: "",
            date: null,
            username: ""

        }
        Commentdb.find({ recruimentid: req.query.recruimentid }, async function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                data.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });
                var data1 = []
                for (var i = 0; i < data.length; i++) {
                    var ncomment = Object.assign({}, comment);
                    ncomment.id = data[i]._id
                    ncomment.username = await getusername(data[i].userid);
                    ncomment.image = await getavataruserall(data[i].userid);
                    //       // console.log("NAME ",getcandidatename(data[i].cvid))
                    ncomment.content = data[i].content;
                    ncomment.recruimentid = data[i].recruimentid;
                    ncomment.date = await covertdate(data[i].date);


                    await data1.push(ncomment)

                }

                response = { "error": false, "message": { "message": data1, "success": true } };
            }
            res.json(response);
        });

    })
router.route("/comment/deletecmt")
    .post(function (req, res) {

        var response = {};

        Commentdb.remove({ _id: req.body.id }, function (err, result) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": { "message": "Delete comment successful !!", "success": true } };
            }
            res.json(response);
        });


    })
router.route("/cvpublic/activecv")
    .post(async function (req, res) {

        var response = {};
        var db = new CVPublicdb();
        console.log(req.body.userid)
        await CVPublicdb.findOne({ userid: req.body.userid }, async function (error, data) {
            if (error) {

            } else {
                if (data !== null) {
                    let idcv = await getmaincv(data.userid);
                    console.log(data.userid, idcv)
                    if (idcv !== null) {

                        data.active = req.body.active;
                        data.dep_id = req.body.dep_id;
                        data.job = req.body.job;
                        data.save(function (err) {
                            if (err) {
                                response = { "error": true, "message": { "message": "Error save data cvpublic ", "success": false } };

                            } else {
                                response = { "error": false, "message": { "message": "save data cvpublic success", "success": true } };
                            }
                            res.json(response);
                        })
                    }
                    else {

                        response = { "error": false, "message": { "message": "You don't have any main CV or still not set main CV ", "success": false } };
                        res.json(response);



                    }


                }
                else {
                    db.userid = req.body.userid;
                    db.job = req.body.job;
                    db.dep_id = req.body.dep_id;
                    db.active = req.body.active;
                    db.like = 0;
                    db.save(function (err) {
                        // save() will run insert() command of MongoDB.
                        // it will add new data in collection.
                        if (err) {
                            response = { "error": true, "message": { "message": err, "success": false } };
                        } else {
                            response = { "error": false, "message": { "message": "Create CV to Employer successful !!", "success": true } };
                        }
                        res.json(response);
                    });
                }
            }

        })



    })
router.route("/cvpublic/getcv")
    .post(async function (req, res) {
        var db = new CVPublicdb();
        var response = {};
        var cvpublic =
        {
            id: "",
            username: "",
            userid: "",
            image: "",
            job: "",
            cvid: "",

        }
        let query = {
            "$and": [{ "job": { "$regex": req.body.job, "$options": 'i' } }, { dep_id: req.body.dep_id, active: true }]
        };
        await CVPublicdb.find(query, async function (error, data) {
            if (error) {
                response = { "error": true, "message": { "message": "fetch data CVpublic fail", "success": false } };
            } else {

                let data1 = [];

                data = data.reverse();

                for (var i = 0; i < data.length; i++) {
                    let idcv = await getmaincv(data[i].userid);
                    if (idcv !== null) {
                        var ncvpub = Object.assign({}, cvpublic);
                        ncvpub.id = data[i]._id
                        ncvpub.username = await getusername(data[i].userid);
                        ncvpub.image = await getavataruserall(data[i].userid);
                        //       // console.log("NAME ",getcandidatename(data[i].cvid))
                        ncvpub.userid = data[i].userid;
                        ncvpub.job = data[i].job;
                        ncvpub.cvid = idcv;


                        await data1.push(ncvpub)
                    }
                }
                // data1.push(data1[0]);
                // data1.push(data1[0]);
                // data1.push(data1[0]);
                // data1.push(data1[0]);
                // data1.push(data1[0]);
                // data1.push(data1[0]);
                // data1.push(data1[0]);
                // data1.push(data1[0]);
                // data1.push(data1[0]);
                // data1.push(data1[0]);
                // data1.push(data1[0]);
                let num = data1.length;
                let arraytype = [];

                // // console.log(num,numpage,Math.floor(num/10),(num%10===0 ?0:1))

                let numpage = Math.floor(num / 10) + (num % 10 === 0 ? 0 : 1);


                if (num > 10) {
                    if (req.body.page * 10 < num) {
                        if (req.body.page === 1)
                            arraytype = await data1.slice(0, 10);
                        else if (req.body.page > 1)
                            arraytype = await data1.slice(0, req.body.page * 10);

                    }
                    else {

                        arraytype = data1.slice(0, num);

                    }
                }
                else {

                    arraytype = await data1.slice(0, num);

                }
                response = { "error": false, "message": { "message": arraytype, "amount": numpage, "success": true } };
            }
            res.json(response);

        })



    })
router.route("/cvpublic/getinfo")
    .get(async function (req, res) {
        var db = new CVPublicdb();
        var response = {};
        var cvpublic =
        {
            id: "",
            job: "",
            dep_id: "",
            dep_name: "",
            active: null

        }


        await CVPublicdb.findOne({ userid: req.query.userid }, async function (error, data) {
            if (error) {
                response = { "error": true, "message": { "message": "fetch data CVpublic fail", "success": false } };
            } else {
                let idcv = await getmaincv(req.query.userid);

                // console.log("AA",data)
                if (data !== null) {
                    var ncvpub = Object.assign({}, cvpublic);
                    if (idcv === null) {
                        if (data.active === true) {
                            // console.log("OK")
                            data.active = false
                            await data.save(function (err) {
                                if (err) {
                                    response = { "error": true, "message": { "message": "Error save data cvpublic ", "success": false } };

                                } else {

                                }

                            })
                        }
                    }
                    var ncvpub = Object.assign({}, cvpublic);
                    ncvpub.id = data._id;
                    ncvpub.job = data.job;
                    // console.log("OK2")
                    ncvpub.dep_id = data.dep_id;
                    ncvpub.dep_name = await getdepartmentname(data.dep_id);
                    ncvpub.active = data.active;

                }
                else {
                    ncvpub = {};
                }
                response = { "error": false, "message": { "message": ncvpub, "cv": idcv === null ? 0 : 1, "success": true } };
            }
            await res.json(response);

        })



    })
router.route("/cvpublic/getdepartment")
    .get(async function (req, res) {

        var response = {};
        var dept =
        {
            key: null,
            name: "",
            amount: 0


        }

        await Departmentdb.find({ "name": { "$regex": req.query.name, "$options": 'i' } }, async function (error, data) {
            if (error) {
                response = { "error": true, "message": { "message": "fetch data CVpublic department fail", "success": false } };
            } else {
                let data1 = [];
                await data.sort(function (a, b) {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                });
                for (var i = 0; i < data.length; i++) {
                    var ndept = Object.assign({}, dept);
                    ndept.key = data[i].key
                    ndept.name = data[i].name;
                    ndept.amount = await countcv(data[i].key);



                    await data1.push(ndept)
                }
                response = { "error": false, "message": { "message": data1, "success": true } };
            }
            res.json(response);

        })



    })

router.route("/setting/enable")
    .post(async function (req, res) {
        var db = new CVPublicdb();
        var response = {};
        //// console.log("as")


        await Userdb.findOne({ userid: req.body.userid }, async function (error, data) {
            if (error) {
                response = { "error": true, "message": { "message": "fetch data Setting fail", "success": false } };
                res.json(response);
            } else {
                if (data !== null) {
                    if (data.type === 1) {
                        switch (req.body.notitype) {
                            case 0:
                                // // console.log("1")
                                data.detailemployer.setting.receivecv_noti = req.body.data
                                break;
                            case 1:

                                break;
                            default:
                                break;
                        }
                    }
                    else if (data.type === 0) {
                        switch (req.body.notitype) {
                            case 0:
                                // // console.log("2")
                                data.detailcandidate.setting.recruimentposted_noti = req.body.data
                                break;
                            case 1:

                                break;
                            default:
                                break;
                        }
                    }
                    //// console.log("3")
                    await data.save(function (err) {

                        if (err) {
                            response = { "error": true, "message": { "message": err, "success": false } };
                        } else {
                            response = { "error": false, "message": { "message": "Setting Success", "success": true } };
                        }
                        res.json(response);
                    });
                } else {
                    response = { "error": false, "message": { "message": "Can't find data ", "success": true } };
                    res.json(response);
                }


            }


        })




    })

router.route("/follower/follow")
    .post(async function (req, res) {
        var db = new Followerdb();
        var response = {};
        if (req.body.isfollow === true) {

            var checkfollower = await Followerdb.findOne({ candidateid: req.body.candidateid, employerid: req.body.employerid }, async function (err, data) {

            });
            if (checkfollower === null) {

                db.candidateid = req.body.candidateid;
                db.employerid = req.body.employerid;

                db.save(function (err) {
                    // save() will run insert() command of MongoDB.
                    // it will add new data in collection.
                    if (err) {
                        response = { "error": true, "message": { "message": err, "success": false } };
                    } else {
                        response = { "error": false, "message": { "message": "Follow successful !!", "success": true } };
                    }
                    res.json(response);
                });
            }
            else {
                response = { "error": false, "message": { "message": "Already follow", "success": true } };
                res.json(response);
            }
        }
        else {
            Followerdb.remove({ candidateid: req.body.candidateid, employerid: req.body.employerid }, function (err, result) {
                if (err) {
                    response = { "error": true, "message": err };
                } else {
                    response = { "error": false, "message": { "message": "Unfollow successful !!", "success": true } };
                }
                res.json(response);
            });
        }

    })

router.route("/noti/send")
    .get(async function (req, res) {

        let arraydevice = ["70ab0e93-8435-45ae-860b-c872a26090f0"];
        var firstNotification = new OneSignal.Notification({
            contents: {
                en: "Có một ứng viên vừa gửi CV cho bạn"

            }
        });

        firstNotification.setTargetDevices(arraydevice);
        firstNotification.setParameter('headings', { "en": "Tuyển dụng." });
        firstNotification.setParameter('data', { "type": 1, "data": { "recruimentid": "5d6f82a7eb2111285c502064" } });
        await myClient.sendNotification(firstNotification, function (err, httpResponse, data) {
            if (err) {
                console.log('Something went wrong...');


            } else {
                console.log("success");

            }
        });

    })



async function sendNotification_CV(recruimentid, em_id) {
    let arraydevice = [];
    var firstNotification = new OneSignal.Notification({
        contents: {
            en: "Có một ứng viên vừa gửi CV cho bạn"

        }
    });
    var find = await Userdb.findOne({ userid: em_id, type: 1 }, function (error, data) {
        if (error) {

        } else {

        }
    })
    //   // console.log(find)
    if (find.type !== undefined) {
        if (find.detailemployer.setting.receivecv_noti == true && find.detailemployer.setting.player_id !== null) {
            arraydevice.push(find.detailemployer.setting.player_id)
            firstNotification.setTargetDevices(arraydevice);
            firstNotification.setParameter('headings', { "en": "Tuyển dụng." });
            firstNotification.setParameter('data', { "type": 1, "data": { "recruimentid": recruimentid } });
            await myClient.sendNotification(firstNotification, function (err, httpResponse, data) {
                if (err) {
                    // console.log('Something went wrong...');


                } else {
                    // console.log("success");

                }
            });
        }
    }


    //  await res.json(response);
}





async function sendNotification_Recruiment(recruimentid, company, employerid) {
    let arraydevice = [];
    let arrayuser = [];
    var firstNotification = new OneSignal.Notification({
        contents: {
            en: company.trim() + " vừa đăng tuyển dụng ."

        }
    });

    await Followerdb.find({ employerid: employerid }, async function (error, data) {
        if (error) {

        } else {

            for (var i = 0; i < data.length; i++) {
                await arrayuser.push(data[i].candidateid)
            }
            for (var i = 0; i < arrayuser.length; i++) {
                await Userdb.findOne({
                    userid: arrayuser[i], type: 0
                    ,
                    "detailcandidate.setting.recruimentposted_noti": true

                }, async function (error, data) {
                    if (error) {

                    } else {
                        //  // console.log("1",data)
                        if (data !== null && data.detailcandidate.setting.player_id !== null)
                            await arraydevice.push(data.detailcandidate.setting.player_id)

                    }
                })
            }
            arraydevice = await arraydevice.filter(function (item, pos) {
                return arraydevice.indexOf(item) == pos;
            })
            if (arraydevice.length > 0) {

                //    // console.log("ARRAY", arraydevice)
                firstNotification.setTargetDevices(arraydevice);
                firstNotification.setParameter('headings', { "en": "Tuyển dụng." });
                firstNotification.setParameter('data', { "type": 5, "data": { "recruimentid": recruimentid } });
                await myClient.sendNotification(firstNotification, function (err, httpResponse, data) {
                    if (err) {
                        // console.log('Something went wrong...');


                    } else {
                        // console.log("success");

                    }
                });

            }
        }
    })




    //  await res.json(response);
}
router.route("/addprovince")
    .post(async function (req, res) {


        var response = {};


        for (var data of req.body.data) {
            var db = new Provincedb();
            db.key = data.key;
            db.name = data.name;

            await db.save().then(() => { }).catch((er) => { response = er; return; });

        }
        res.json(response);




    });
router.route("/addgender")
    .post(async function (req, res) {


        var response = {};


        for (var data of req.body.data) {
            var db = new Genderdb();
            db.key = data.key;
            db.name = data.name;

            await db.save().then(() => { }).catch((er) => { response = er; return; });

        }
        res.json(response);




    });
router.route("/addjobtype")
    .post(async function (req, res) {


        var response = {};


        for (var data of req.body.data) {
            var db = new Typejobdb();
            db.key = data.key;
            db.name = data.name;

            await db.save().then(() => { }).catch((er) => { response = er; return; });

        }
        res.json(response);




    });

router.route("/addexperience")
    .post(async function (req, res) {


        var response = {};


        for (var data of req.body.data) {
            var db = new Experiencedb();
            db.key = data.key;
            db.name = data.name;

            await db.save().then(() => { }).catch((er) => { response = er; return; });

        }
        res.json(response);




    });
router.route("/addjob")
    .post(async function (req, res) {


        var response = {};


        for (var data of req.body.data) {
            var db = new Jobdb();
            db.key = data.key;
            db.name = data.name;

            await db.save().then(() => { }).catch((er) => { response = er; return; });

        }
        res.json(response);




    });
router.route("/adddepartment")
    .post(async function (req, res) {


        var response = {};


        for (var data of req.body.data) {
            var db = new Departmentdb();
            db.key = data.key;
            db.name = data.name;

            await db.save().then(() => { }).catch((er) => { response = er; return; });

        }
        res.json(response);




    });
router.route("/addnews")
    .post(async function (req, res) {


        var response = {};


        for (var data of req.body.data) {
            var db = new Newsdb();
            db.title = data.title;
            db.type = data.type;
            db.image = data.image;
            db.content = data.content;

            db.date = dateFormat(data.date, "yyyy-mm-dd HH:MM:ss");;
            db.viewer = data.viewer;


            await db.save().then(() => { }).catch((er) => { response = er; return; });

        }
        res.json(response);




    });
// router.route("/deletefile")
//     .get(function (req, res) {

//         var response = {};
//         fs.unlink("./userimage/"+"5a917f7c71440b1a40b97cba.png", (err) => {
//             if (err) {
//                 // console.log("failed to delete local image:"+err);
//             } else {
//                 // console.log('successfully deleted local image');                                
//             }
//         });
//         res.json(response);




//     })
// router.route("/sendnoti/send")
//     .get(async function (req, res) {
//         var response = {};
//         // var firstNotification = new OneSignal.Notification({
//         //     contents: {
//         //         en: "Send",
//         //         tr: "Xu Woan"
//         //     }
//         // });

//         // firstNotification.setTargetDevices(["191c0b7b-a38b-4644-a2dd-4d0a2ec4404e"]);
//         // firstNotification.setParameter('data', { "abc": "123", "foo": "bar" });
//         // await myClient.sendNotification(firstNotification, function (err, httpResponse, data) {
//         //     if (err) {
//         //         // console.log('Something went wrong...');
//         //         response = { "error": true, "message": err };

//         //     } else {
//         //         // console.log(data);
//         //         response = { "error": false, "message": { "message": "Send Notification successful !!", "success": true } };
//         //     }
//         // });
//         await res.json(response);
//         // await sendNotification_CV("ID from server", "5a5c0c7b1e58172d489cd1a6")
//         await sendNotification_Recruiment("5aeb29deeedac541924c7e30","Xu Com", "5a5c0c7b1e58172d489cd1a6")




//     })


app.use('/', router);