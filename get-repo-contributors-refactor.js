var request = require("request");
var fs = require("fs");

function getRepoContributors(repoOwner, repoName, cb) { // convention for asynchronous callback func
  const apiEndPoint = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors"

  var requestConfig = {
    url: apiEndPoint,
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    },
    json: true
  };

  request(requestConfig, function(err, response, body) {
    if (err) {
      throw err;
    }

    var dir = "./avatars/";
    fs.stat(dir, function(err, stats) {
      if (err || !stats.isDirectory()) {
        fs.mkdir(dir, function(err){
          if(err){
            throw err;
          }
        });
      }
    });

    console.log(dir);

    body.map(function (element, index, array){
      var fileP = dir + element.login + ".jpg"
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



