const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Fetching the first api...")
        resolve(1)
    }, 2000);
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Fetching th second api...");
        resolve(2)
    }, 2000);
})

// all vs race
Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err))