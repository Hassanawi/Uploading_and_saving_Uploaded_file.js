var http = require("http");
var formidable = require("formidable");
var fs = require("fs");

const port = 3000;
const hostname = "127.0.0.3";

http
  .createServer(function (req, res) {
    if (req.url == "/fileupload") {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        var oldPath = files.filetoupload.filepath;
        var newPath =
          "E:" + files.filetoupload.originalFilename;
        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err;
          res.write("File Uploaded");
          res.end();
        });
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        '<form action="fileupload" method="post" enctype="multipart/form-data">'
      );
      res.write('<input type="file" name="filetoupload">');
      res.write('<input type="submit">');
      res.write("</form>");
      return res.end();
    }
  })
  .listen(port, hostname, () => {
    console.log(`server is showig at http://${hostname}:${port}/`);
  });
