
console.log("Before");
// getUser(1)
//     .then(user =>getRepositories(user.user))
//     .then(repos => getCommits(repos[0]))
//     .then(commit => console.log("Commit:",commit))
//     .catch(err => console.log("Error:",err))
//  console.log("After");

 //Async and Await approach
async function displayCommit(){
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user);
        const commit = await getCommits(repos[0]);
        console.log(commit)
    } catch (error) {
        console.error(error)
    }

}
displayCommit()
 function getRepositories(username) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Calling github api...")
        resolve(["repo1", "repo2", "repo3"])
    }, 2000);
    })

 }

 function getUser(id){
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Reading a user from database...");
        resolve({id, user:"Akbarjon2000"});
    }, 2000)
    })

 }

 function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            console.log("Returning the first repo...");
            resolve(['commit']);
        }, 2000)
    })
 }