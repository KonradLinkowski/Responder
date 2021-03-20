const http = require('http')

const requests = []

const server = http.createServer((req, res) => {
  const data = []
  req.on('data', d => data.push(d))
  req.on('end', () => {
    const d = data.join('')
    requests.push({
      url: req.url,
      headers: req.headers,
      body: d
    })
    res.end(JSON.stringify(requests))
  })
})

server.listen(process.env.PORT || 3000)
