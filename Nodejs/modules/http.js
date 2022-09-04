const http = require("http");

http.createServer((req, res) => res.end("Hello Node.js")).listen(3000)
// const server = http.createServer((req, res) => {
//     res.write("hello Node.js")
//     res.end()
// })

// server.listen(3000, () => console.log("server listening on port 3000"))