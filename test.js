var request = require("request");
const apiEndPoint = "https://api.github.com/repos/" + "lighthouse-labs" + "/" + "laser_shark" + "/contributors";

var requestConfig = { // options for GET request
  url: apiEndPoint,
  method: 'GET',
  headers: {
    'User-Agent': 'request'
  },
  json: true
};

request(requestConfig, function(err, response, body) { // request API endpoint repo contributors
  console.log(body);
});