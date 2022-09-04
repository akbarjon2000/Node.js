const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/exercises")
    .then(() => console.log("Connected into exercises network..."))
    .catch(err => console.log(err))


const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    isPublished:Boolean,
    date:Date,
    price:Number,
    tags:[String]
})

const Course = mongoose.model("Course", courseSchema);


async function getCourse(){
    return await Course
        // .find({isPublished:true, tags:{$in: ["frontend", "backend"]}})

        // .find({isPublished:true})
        // .or([{tag:"frontend"}, {tag:"backend"}])

        .find({isPublished:true})
.or([{price:{$gte: 15}}, {name: /.*by.*/i}])
        .sort("-price")
        .select({name:1, author:1, price:1})
   
}
async function run(){
    const courses = await getCourse();
    console.log(courses)
}
// run()

async function updateCourse(id){
    const course = Course.findById(id)
    if(!course) return;

    course.isPublished = true;
    course.author = "Akbarjon";

   const result = await course.save();
   console.log(result)
}
updateCourse('5a68fe2142ae6a6482c4c9cb')