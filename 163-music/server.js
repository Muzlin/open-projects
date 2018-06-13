var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]
var qiniu = require('qiniu')

if (!port) {
  console.log(' 请指定端口号好不啦？\n e.g.:node server.js 8888 ')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var path = request.url
  var query = ''
  if (path.indexOf('?') >= 0) {
    query = path.substring(path.indexOf('?'))
  }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  if (path == '/uptoken') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json; charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin','*')
    response.removeHeader('Date')

    var config = JSON.parse(fs.readFileSync('./qiniu_config.json'))
    let {AK,SK,Bucket} = config

    var mac = new qiniu.auth.digest.Mac(AK, SK);
    var options = {
      scope: Bucket,
    }
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);

    response.write(`{
      "uptoken":"${uploadToken}"
    }`)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.end()
  }
})

server.listen(port)
console.log(`监听端口：${port} 成功 \n 请用在水中憋气一小时后用电视机打开http://localhost:${port}`)
