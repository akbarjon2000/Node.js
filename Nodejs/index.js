// const Logger = require("./logger")

// const logger = new Logger()

// logger.on("message", data => {
//     console.log("Logging: ", data)
// })

// logger.log('GET', "/admin/dashboard")
// logger.log('POST', "/product/add")
// logger.log('GET', "/product/delete")

const http = require("http");
const path = require("path")
const fs = require("fs");


// const server = http.createServer((req, res) => {
//     if (req.url === "/") {
//         fs.readFile(path.join(__dirname, "public", "index.html"), (err, content) => {
//             if (err) throw err
//             res.writeHead(200, { "Content-Type": "text/html" })
//             res.end(content)
//         })
//     }
//     else if (req.url === "/about") {
//         fs.readFile(path.join(__dirname, "public", "about.html"), (err, content) => {
//             if (err) throw err
//             res.writeHead(200, { "Content-Type": "text/html" })
//             res.end(content)
//         })
//     }
//     else {
//         res.end("<h1>404 not found</h1>")
//     }
// })




const port = process.env.PORT || 3000;


server.listen(port, () => console.log(`sever running on port ${port}`))

