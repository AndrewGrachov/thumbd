var config = require('./config').Config.config;
var descriptions;
if (config.descriptions) {
	descriptions = require(config.descriptions);
}

function parseSQSMessage(body) {
	try { // a JSON string message body is accepted.
		body = JSON.parse(body);
	} catch(e) {
		if (e instanceof SyntaxError) {
			// a Base64 encoded JSON string message body is also accepted.
			body = JSON.parse( new Buffer(job.Messages[0].Body, 'base64').toString('binary'));
		} else {
			// TODO: figure out if throwing is actually
			// the right thing to do here.
			throw e;
		}
	}
	return body;
}

module.exports = {
	defaultParser: function (body) {
		return parseSQSMessage(body);
	},
	s3ObjectCreate: function (body) {
		body = parseSQSMessage(body);
		return {
			resources: [],
			descriptions: descriptions
		}
	}
}