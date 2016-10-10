var request = require("request");
var fs = require("fs");

function getRepoContributors(repoOwner, repoName, cb) { // convention for asynchronous callback func
  const apiEndPoint = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors"
  console.log(apiEndPoint);
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

// function readInfo (url) {
//   request(url, function(err, response, body) {
//     if (err) {
//       throw err;
//     }
//   console.log(body);
//   });
// }



function downloadImageByURL(url, filePath) {
  request(url, function(err, response, body) {
    if (err) {
      throw err;
    }

    var avatarArray = body.map(function (element, index, array){
      var fileName = element.login + ".jpg"
      var fileContent = request(element.avatar_url, function(err, response, body) {
        if (err) {
          throw err;
        }
        fs.writeFile(fileName, fileContent,  function(err) {
          if (err) {
            return console.error(err);
          }
          console.log("wrote to:" + fileName);
        });
    });
  console.log(avatarArray);
  //do another rquest to each url in the newarray
  });
});
}



// test
getRepoContributors("lighthouse-labs", "laser_shark", downloadImageByURL);



