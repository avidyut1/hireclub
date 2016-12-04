var AWS = require('aws-sdk');
var fs = require('fs');
var redis = require('redis');
var client = redis.createClient();
AWS.config.update({region: 'ap-south-1',  signatreVersion: 'v4'});
var sqs = new AWS.SQS();
var queueUrl = 'https://sqs.ap-south-1.amazonaws.com/624003939571/code';
var params = {QueueUrl: queueUrl};
var bucketName = 'codehireclub';
var testcaseBucketName = "testcasehireclub";

function getMessage(){
    sqs.receiveMessage(params, function (err, data){
        if (err) console.log(err);
        else {
            if (data) {
                if (data.Messages && data.Messages.length) {
                    console.log(data.Messages[0].Body);
                    var s3 = new AWS.S3();
                    var datasqs = data;
                    s3.getObject({Bucket: bucketName, Key: datasqs.Messages[0].Body}, function (err, data){
                        var code = data.Body.toString('utf-8');
                        fs.writeFile('code/'+datasqs.Messages[0].Body, code, function (err){
                            if (err){
                                console.log(err);
                                return;
                            }
                            s3.getObject({Bucket: testcaseBucketName, Key: datasqs.Messages[0].Body.split('.')[0]}, function (err, data){
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                var tc = data.Body.toString('utf-8');
                                fs.writeFile('code/'+datasqs.Messages[0].Body.split('.')[0], tc, function (err) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    sqs.deleteMessage({ReceiptHandle: datasqs.Messages[0].ReceiptHandle, QueueUrl: queueUrl}, function (err, data){
                                        if(err)
                                            console.log(err);
                                        else{
                                            //redis op
                                            client.publish('run', datasqs.Messages[0].Body);
                                        }
                                        getMessage();
                                    });
                                });
                            });
                        });
                    });
                }
                else{
                    getMessage();
                }
            }
        }
    });
}
getMessage();
