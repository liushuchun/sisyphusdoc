#!/usr/bin/env node

const AWS = require('aws-sdk'),
    FS = require('fs'),
    PATH = require('path'),
    WALK = require('walk');

// config for qiniu s3 api service globally
AWS.config.update({
    endpoint: 'https://api-s3.qiniu.com',
    region: 'cn-south-1'
});

// init s3 client
var s3 = new AWS.S3({
    s3ForcePathStyle: true,
    params: {
        Bucket: "mixapi-static"
    }
}),
    walker,
    bookRoot = PATH.resolve(__dirname, '../_book'),
    bootStat;

bookStat = FS.lstatSync(bookRoot);
if (!bookStat.isDirectory()) {
    console.error("Book does not exist: ", bookRoot);
}

// // list buckets
// s3.listBuckets(function(err, data){
//     if (err != null) {
//         console.log("Error list buckets: ", err)
//         return
//     }

//     for (var bucket of data["Buckets"]) {
//         console.log(bucket.Name);
//     }
// })

walker = WALK.walk(bookRoot, { filters: ["deploy"] })
walker.on("directories", function(root, dstat, next){
    console.info(">>> Sync directory ", root);

    next();
})
walker.on("file", function(root, fstat, next){
    var fpath = PATH.join(root, fstat.name),
        fstream = FS.createReadStream(fpath),
        fprefix = root.replace(bookRoot, '').slice(1),
        params = {
            Key: PATH.join(fprefix, fstat.name),
            Body: fstream,
        };

    console.info("Syncing ", fpath);
    s3.putObject(params, function(err){
        if (err) {
            throw err;
        }

        console.info("  => Done!");
        next();
    });
})
walker.on("errors", function(root, err, next){
    console.error(root, err);
    next();
})

