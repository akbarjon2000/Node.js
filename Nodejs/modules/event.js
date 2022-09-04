const EventEmitter = require("events")

class NewEmitter extends EventEmitter { }


const newEmitter = new NewEmitter()


// Event Listener
newEmitter.on("click", () => {
    console.log("clicked")

})

newEmitter.emit("click")
newEmitter.emit("click")
newEmitter.emit("click")
newEmitter.emit("click")