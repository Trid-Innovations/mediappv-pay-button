// https://www.mocklab.io/docs/mocking-api.html
const fs = require('fs');

const hostname = process.env.REMOTE_MOCK_HOSTNAME;

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function (filename) {
      fs.readFile(dirname + filename, 'utf-8', function (err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

fetch(`${hostname}/__admin/mappings/reset`, {
  method: 'POST'
})
  .then((response) => {
    // Find All json stubs and create them in wiremock
    readFiles(
      __dirname + '/mappings/',
      function (filename, content) {
        if (filename.endsWith('.json')) {
          console.log(
            `creating a stub for [${filename}] in [ ${hostname}/__admin/mappings ]`
          );
          fetch(`${hostname}/__admin/mappings`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: content
          }).catch((error) => {
            console.error(
              `error creating stub for : [filename=${filename}] -`,
              error
            );
          });
        }
      },
      function (err) {
        throw err;
      }
    );
  })
  .catch((error) => {
    console.error('error while reseting wiremock:', error);
  });
