var request = require("request");

function getRepoContributors(repoOwner, repoName, cb) { // convention for asynchronous callback func
  const apiEndPoint = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors"



}

function readHTML (url, print) {
  request(url, function(err, response, body) {
    if (err) {
      throw err;
    }
  print(body);
  });
}

function printHTML (htmlData){
  console.log(htmlData);
}

readHTML("http://www.example.com", printHTML)

// test
getRepoContributors("lighthouse-labs", "laser_shark", (err, result) => {
  console.log("Errors:", err);
  console.log("Result:", result);
});


