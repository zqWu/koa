
// DEBUG=koa:* iojs helloworld.js
// DEBUG=koa*,http iojs helloworld.js
var koa = require('./lib/application');
var app = module.exports = koa();
var debug = require('debug')('http');




// logger
function* logger(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  if ('test' != process.env.NODE_ENV) {
    debug('%s %s - %s', this.method, this.url, ms);
  }
}

app.use(logger);
app.use(logger);

app.use(function *(){
  this.body = 'Hello World\n';
});

if (!module.parent) app.listen(3000);