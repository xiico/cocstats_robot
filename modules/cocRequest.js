var https = require('https');

module.exports = {
    searchClans: function (type, options, callBack, rank) {
        if (type == "clan")
            path = '/v1/clans/%23' + options.replace("#", "");
        else if (type == "global")
            path = '/v1/clans?minClanPoints=' + options;
        else
            path = '/v1/locations/' + options +'/rankings/clans?limit=40';

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

                var sr = { "tag": "#YY0LJQQP", "name": "GilgaMesh", "type": "inviteOnly", "description": "Welcome to GilgaMesh...   Pinoy only... Rules 1. Be active in war... 2. enjoy lng... 3. Be loyal, love your clan... d kami gaano k active sa chat active naman kami sa war... matured only...                FB Group GilgaMesh (CoC)", "location": { "id": 32000185, "name": "Philippines", "isCountry": true, "countryCode": "PH" }, "badgeUrls": { "small": "https://api-assets.clashofclans.com/badges/70/Ay5USX9Dnhq3whEDbMrWfGJplOt3nCQ3l3lLrHmxrDI.png", "large": "https://api-assets.clashofclans.com/badges/512/Ay5USX9Dnhq3whEDbMrWfGJplOt3nCQ3l3lLrHmxrDI.png", "medium": "https://api-assets.clashofclans.com/badges/200/Ay5USX9Dnhq3whEDbMrWfGJplOt3nCQ3l3lLrHmxrDI.png" }, "clanLevel": 2, "clanPoints": 774, "requiredTrophies": 400, "warFrequency": "always", "warWinStreak": 0, "warWins": 4, "warTies": 0, "warLosses": 3, "isWarLogPublic": true, "members": 2, "memberList": [{ "tag": "#2U0VGVY20", "name": "xRYMTH", "role": "leader", "expLevel": 22, "league": { "id": 29000004, "name": "Silver League III", "iconUrls": { "small": "https://api-assets.clashofclans.com/leagues/72/QcFBfoArnafaXCnB5OfI7vESpQEBuvWtzOyLq8gJzVc.png", "tiny": "https://api-assets.clashofclans.com/leagues/36/QcFBfoArnafaXCnB5OfI7vESpQEBuvWtzOyLq8gJzVc.png", "medium": "https://api-assets.clashofclans.com/leagues/288/QcFBfoArnafaXCnB5OfI7vESpQEBuvWtzOyLq8gJzVc.png" } }, "trophies": 853, "clanRank": 1, "previousClanRank": 1, "donations": 0, "donationsReceived": 0 }, { "tag": "#2LPPUURLP", "name": "warnold", "role": "member", "expLevel": 18, "league": { "id": 29000000, "name": "Unranked", "iconUrls": { "small": "https://api-assets.clashofclans.com/leagues/72/e--YMyIexEQQhE4imLoJcwhYn6Uy8KqlgyY3_kFV6t4.png", "tiny": "https://api-assets.clashofclans.com/leagues/36/e--YMyIexEQQhE4imLoJcwhYn6Uy8KqlgyY3_kFV6t4.png" } }, "trophies": 696, "clanRank": 2, "previousClanRank": 2, "donations": 0, "donationsReceived": 0 }] };

                var rnk = {  "items": [    {      "tag": "#Y08PGP0C",      "name": "AMAZING BHO",      "type": "inviteOnly",      "location": {        "id": 32000120,        "name": "Italy",        "isCountry": true,        "countryCode": "IT"      },      "badgeUrls": {
                "small": "https://api-assets.clashofclans.com/badges/70/r4PgLiuk77lkmAhOqw6xU0Hubu0nsOGDpT5fxmV1Sqw.png",        "large": "https://api-assets.clashofclans.com/badges/512/r4PgLiuk77lkmAhOqw6xU0Hubu0nsOGDpT5fxmV1Sqw.png",        "medium": "https://api-assets.clashofclans.com/badges/200/r4PgLiuk77lkmAhOqw6xU0Hubu0nsOGDpT5fxmV1Sqw.png"      },      "clanLevel": 2,      "clanPoints": 55294,      "requiredTrophies": 4200,      "warFrequency": "never",      "warWinStreak": 0,
                "warWins": 0,      "isWarLogPublic": false,      "members": 50    },      {      "tag": "#928J9GCP",      "name": "대한민국•KOREA",      "type": "inviteOnly",      "location": {        "id": 32000216,        "name": "South Korea",        "isCountry": true,        "countryCode": "KR"  },              "badgeUrls": {        "small": "https://api-assets.clashofclans.com/badges/70/0Etfy9Lh3tcvL4avFAPSvslrvrF85MdnxLx2JeETdZs.png",        "large": "https://api-assets.clashofclans.com/badges/512/0Etfy9Lh3tcvL4avFAPSvslrvrF85MdnxLx2JeETdZs.png",        "medium": "https://api-assets.clashofclans.com/badges/200/0Etfy9Lh3tcvL4avFAPSvslrvrF85MdnxLx2JeETdZs.png"      },      "clanLevel": 8,      "clanPoints": 55242,      "requiredTrophies": 4200,      "warFrequency": "unknown",      "warWinStreak": 0,      "warWins": 121,
                "isWarLogPublic": false,      "members": 50    }  ],  "paging": {    "cursors": {}  }                };
                //parsed = sr;

                if (parsed.tag || parsed.items)
                    callBack(null, parsed, rank);
                else
                    console.log(body);
            });
        }).on('error', function (err) {
            // handle errors with the request itself
            console.error('Error with the request:', err.message);
            callBack(err);
        });
    }
}