import http from 'node:http'

const host = "localhost"
const port = 3333
const server = http.createServer((req,res) => {
  res.writeHead(200, { 'Content-type': 'text/plain'})
  res.end('okay')
})



server.listen(port,host,() => console.log('funciondo'))