/**
 * Created by asheshvidyut on 27/11/16.
 */
var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var uuid = require('uuid');
var Sequelize = require('sequelize');
var sequelize = require('../config/database');
var Code = require('../models/code.js')(sequelize, Sequelize);

/* GET home page. */
router.post('/', function(req, res, next) {
    //save to s3
    AWS.config.update({region: 'us-east-1',  signatureVersion: 'v4'});
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang || 'text';
    var s3 = new AWS.S3({region: 'us-east-1'});
    var bucketName = 'codehireclub';
    var uid = uuid.v1();
    var keyName = uid + '.' + lang;
    s3.createBucket({Bucket: bucketName}, function() {
        var params = {Bucket: bucketName, Key: keyName, Body: code};
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log(err);
                res.send({fuck: 'false first'});
            }
            else {
                params = {Bucket: "testcasehireclub", Key: uid, Body: input};
                s3.putObject(params, function(err, data) {
                   if (err) {
                       console.log(err);
                       res.send({fuck: 'false sec'});
                   }
                   else {
                       console.log("S3 upload done");
                       //save to sqs
                       var queueUrl = "https://sqs.ap-south-1.amazonaws.com/624003939571/code";
                       var messageBody = keyName;
                       var params = {QueueUrl: queueUrl, MessageBody: messageBody};
                       var sqs = new AWS.SQS();
                       sqs.sendMessage(params, function (err, data){
                           if (err)
                               console.log(err);
                           else{
                               console.log("SQS queueing done");
                               //storing in db
                               Code.create({code: code, lang: lang, keyname: uid}).then(function (Code) {
                                   console.log(Code);
                                   res.send({result: 'success', url: uid});
                               });
                           }
                       });
                   }
                });
            }
        });
    });
});

module.exports = router;
