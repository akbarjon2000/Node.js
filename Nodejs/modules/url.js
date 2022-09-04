const url = require("url")

const newUrl = new URL("http://akbarjon.ru:3000/users/users.html?name=Akbarjon&status=active&age=23")

console.log(newUrl.href)
console.log(newUrl.host)
console.log(newUrl.hostname)
console.log(newUrl.port)
console.log(newUrl.pathname)
console.log(newUrl.search)