const fs = require("fs")
const path = require("path")

// fs.mkdir(path.join(__dirname, "/smth"), {}, err => {
//     if (err) throw err
//     console.log("new dir created")
// })

// fs.writeFile(path.join(__dirname, "/smth", "/exapmle.txt"), "hello world", "utf8", err => {
//     if (err) throw err
//     console.log("file created")
// })

// fs.appendFile(path.join(__dirname, "/smth", "/example.txt"), "salom", "utf8", err => {
//     if (err) throw err
//     console.log("file created")
// })


fs.readFile(path.join(__dirname, "/smth", "example.txt"), "utf8", (err, data) => {
    if (err) throw err
    console.log(data)
})

fs.rename(path.join(__dirname, "/smth/example.txt"), "misol.txt", err => {
    if (err) throw err
})