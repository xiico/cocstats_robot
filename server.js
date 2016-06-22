var http = require('http');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');

//models
var Clan = require('./models/clan');
var Member = require('./models/member');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

function saveDataToDataBase(error, obj) {
    Clan.find({ tag: { $in: search } }, function (err, clans) {
        if (err)
            throw err;
        if (clans) {
            res.render('index', {
                user: req.user, // get the user out of session and pass to template
                url: req.url,
                clans: clans,
                clanRoles: clanRoles
            }); // load the index.ejs file
        }
        else
        {
            Clan.insert(obj);
        }
    });
}

setInterval(getClanInfo,6000);


function getClanInfo(cb) {

    http.get({
        host: 'api.clashofclans.com',
        path: '/v1/clans/%2323YY0LJQQP',//80U9PL8P 
        headers: {'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImY5NDBlOTYxLWQ2MTMtNGI3Ni05MDBhLTlhNTI2NGNlYzZhNyIsImlhdCI6MTQ2NjQ2NTM4Miwic3ViIjoiZGV2ZWxvcGVyLzhhZmQ5ZjJhLWQzNmEtYzdkMS1jZjgxLTRmZGExN2Q1ZWZlZCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ1LjU1LjIyMS4yMjUiXSwidHlwZSI6ImNsaWVudCJ9XX0.4SWOJT3Qac_XTB2Y2ay9dgQ7f8L6j5C59nzwXGQPqyJ1Mkxs4V2xzVqXPacp10ywvDmrOid9tb_2q-bsW_czLA'}
    }, function (res) {
        // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
        res.setEncoding('utf8');

        // incrementally capture the incoming response body
        var body = '';
        res.on('data', function (d) {
            body += d;
        });

        // do whatever we want with the response once it's done
        res.on('end', function () {
            try {
                console.log(body);
                var parsed = JSON.parse(body);
            } catch (err) {
                console.error('Unable to parse response as JSON', err);
                return cb(err);
            }

            // pass the relevant data back to the callback
            cb(null, parsed);
        });
    }).on('error', function (err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        cb(err);
    });
}