class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    hello() {
        console.log(`Hello my name is ${this.name} and i am ${this.age} years old`)
    }
}

module.exports = User