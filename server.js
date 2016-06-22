var http = require('http');


function getTestPersonaLoginCredentials(cb) {

    http.get({
        host: 'personatestuser.org',
        path: '/email'
    }, function(res) {
        // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
        res.setEncoding('utf8');

        // incrementally capture the incoming response body
        var body = '';
        res.on('data', function(d) {
            body += d;
        });

        // do whatever we want with the response once it's done
        res.on('end', function() {
            try {
                var parsed = JSON.parse(body);
            } catch (err) {
                console.error('Unable to parse response as JSON', err);
                return cb(err);
            }

            // pass the relevant data back to the callback
            cb(null, {
                email: parsed.email,
                password: parsed.pass
            });
        });
    }).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        cb(err);
    });

}