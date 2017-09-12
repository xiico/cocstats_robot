var https = require('https');
var mock = require('../modules/mock');

var minClanPoints = [54000];

module.exports = {
    searchClans: function (type, options, callBack, rank) {
        if (type == "clan")
            path = '/v1/clans/%23' + options.replace("#", "");
        else if (type == "global")
            path = '/v1/clans?minClanPoints=' + minClanPoints;
        else if (type == "player")
            path = '/v1/players/%23' + options.replace("#", "");
        else
            path = '/v1/locations/' + options +'/rankings/clans?limit=50';

        //console.log(path);

        https.get({
            host: 'api.clashofclans.com',
            path: path,//80U9PL8P 
            headers: { 'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImY3MjkzYmJhLTkyMDUtNDE1NS05MTU2LTA5MTZmMzE5ODY2NCIsImlhdCI6MTQ5OTk1MTcwMSwic3ViIjoiZGV2ZWxvcGVyLzhhZmQ5ZjJhLWQzNmEtYzdkMS1jZjgxLTRmZGExN2Q1ZWZlZCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEzOC4xOTcuMTAzLjE2MSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.sJubnJ4kwv5wLfO6CWL3v7433MI8cgoQzjif2hx80m_tusVmCylMZUJfE6LmccCUu2iRpbLZB7bmf1Q4I7JQpg' }
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
                    var parsed = JSON.parse(body);
                } catch (err) {
                    console.error('Unable to parse response as JSON', err);
                    return callBack(err);
                }

                if (parsed.items && parsed.items.length < 50) minClanPoints[0] -= 1000;
                if (parsed.items && parsed.items.length > 200) minClanPoints[0] += 1000;

                if (parsed.tag || parsed.items)
                    callBack(null, parsed, rank);
                else {
                    console.log('path:' + path, '\nbody: ' + body);
                    if (parsed.reason == "accessDenied.invalidIp") {
                        switch (type) {
                            case "global":
                            case "country":
                                parsed = mock.clans;
                                break;
                            case "clan":
                                parsed = mock.clan;
                                break;
                            case "player":
                                parsed = mock.player;
                                break;
                        
                            default:
                                break;
                        }
                    }
                    callBack(null, parsed, rank);
                }
            });
        }).on('error', function (err) {
            // handle errors with the request itself
            console.error('Error with the request:', err.message);
            callBack(err);
        });
    }
}