const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const isGetById = function (url) {
  if (url === undefined) {
    return false;
  }

  arr = url.split("/");
  /*  final = parseInt(arr[arr.length - 1], 10);
    console.log("final", final);  
    return final = typeof final == 'number' && !isNaN(final);*/

  console.log("final", arr.length > 2);
  return arr.length > 2;
}
server.use(middlewares);

server.use(router)

router.render = (req, res) => {
  console.log("RENDER", isGetById(req.url));

  if (isGetById(req.url)) {
    res.jsonp(res.locals.data);
  } else {
    res.jsonp({
      hasNext: true,
      items: res.locals.data
    });
  }

  if (req.originalMethod === "POST" && req.body) {

    if (req.url === '/customer') {
      req.body.id =  req.body.code ;
    }
  }
};

server.listen(3000, () => {
  console.log('JSON Server is running')
})
