const http = require('http')
const url = require('url')

const requests = []

const server = http.createServer((req, res) => {
  const chunks = []
  req.on('data', d => chunks.push(d))
  req.on('end', () => {
    const { pathname, query } = url.parse(req.url, true)
    const data = chunks.join('')
    requests.push({
      redirect: query.r,
      url: req.url,
      headers: req.headers,
      body: data
    })
    if (pathname === '/' && query.r) {
      return res.writeHead(302, {
        'Location': query.r
      }).end();
    }
    if (pathname === '/logs') {
      return res.end(JSON.stringify(requests))
    }
    return res.writeHead(404).end();
  })
})

server.listen(process.env.PORT || 3000)
