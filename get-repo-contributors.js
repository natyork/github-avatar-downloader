var request = require("request");
var fs = require("fs");

function getRepoContributors(repoOwner, repoName, cb) { // convention for asynchronous callback func
  const apiEndPoint = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors"
  var options = {
  url: apiEndPoint,
  method: 'GET',
  headers: {
    'User-Agent': 'request'
  },
  json: true
};

  cb(options);
}

function downloadImageByURL(url, filePath) {
  request(url, function(err, response, body) {
    if (err) {
      throw err;
    }

    var avatarArray = body.map(function (element, index, array){
      var fileName = "tmp/" + element.login + ".jpg"



      var fileContent = request(element.avatar_url, function(err, response, body) {
        if (err) {
          throw err;
        }
        console.log(typeof body);
      }).pipe(fs.createWriteStream(fileName));
    });
});
}



// test
getRepoContributors("lighthouse-labs", "laser_shark", downloadImageByURL);



