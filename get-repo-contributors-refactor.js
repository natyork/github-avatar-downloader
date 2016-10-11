var request = require("request");
var fs = require("fs");

function getRepoContributors(repoOwner, repoName, cb) { // cb is convention for asynchronous callback func
  const apiEndPoint = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

  var requestConfig = { // options for GET request
    url: apiEndPoint,
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    },
    json: true
  };

  request(requestConfig, function(err, response, body) { // request API endpoint repo contributors
    if (err) {
      throw err;
    }

    var dir = "./avatars/"; // directory where avatar image files will be written
    fs.stat(dir, function(err, stats) { // error handling to check if directory already exists, if not, it creates the directory
      if (err || !stats.isDirectory()) {
        fs.mkdir(dir, function(err) {
          if(err) {
            throw err;
          }
        });
      }
    });

    console.log(typeof body);

    body.map(function (element, index, array) { // body is an array of objects, each object contains info about repo contributors
      var fileP = dir + element.login + ".jpg";
      cb(element.avatar_url, fileP);
    });
  });
}

function downloadImageByURL(url, filePath) {
  var fileContent = request(url, function(err, response, body) {
    if (err) {
      throw err;
    }
  });

  fileContent.pipe(fs.createWriteStream(filePath));
}





var rName = process.argv[2];
var rOwner = process.argv[3];
getRepoContributors(rName, rOwner, downloadImageByURL);



