const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/exercises')
    .then(() => console.log("Connected to Mongo database..."))
    .catch((err) => console.log("Error:", err))


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 234,
        // match:/patter/
    },
    category: {
        type: String,
        enum: ["web", "mobile", "desktop", "network"]//if the categry is not one of these retutns an err
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator(v) {
                const result = Promise.resolve(v && v.length > 0);
                return result;
            },
            message: "tags must contain at least one element..."
        }
    },
    date: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: Number,
        min: 12,
        max: 123,
        required: function () { return this.isPublished; },
        get: v => (Math.round(v)),
        set: v => (Math.round(v))
    },
    isPublished: Boolean
})

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {

    const course = new Course({
        name: "Setter",
        author: "Akbarjon",
        category: "web",
        tags: ["web"],
        isPublished: true,
        price: 15.9
    })
    try {
        const result = await course.save();
    } catch (ex) {
        for (error in ex.errors) {
            console.log(ex.errors[error].message)
        }
    }

    //    const result = await course.validate()

    // course.validate(err => console.log(err))
}



async function getCourses() {
    //comarison operators: eq(equal) 
    //en(nor equal)
    //gt -> grater than
    //gte -> greater than or equal to
    //lt -> less than
    //lte -> less than or equal to
    // in
    //nin -> not in

    const courses = await Course
        // .find({author:"Akbarjon"})
        // .find(price:{$gte:10, $lte:20})//10<=price<=20
        .find({ id: '62f094849efef2a012e19774' })
        // .or([{ author: "Akbarjon" }, { isPublished: true }])
        // .and([{ author: "Mosh" }, { isPblisheed: true }])
        // .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, price: 1 });
    console.log(courses);
}



// async function updateCourse(id){
//     let course = Course.findById(id)
//     if(!course) return;

//     course.isPublished = true;
//     course.author = "Akbarjon";

//    const result = await course.save();
//    console.log(result)
// }
// updateCourse('5a68fe2142ae6a6482c4c9cb')

async function updateCourse(id) {
    const result = await Course.updateOne({ id: id }, {
        $set: {
            author: "Akbarjon",
            isPublished: false
        }
    })

    console.log(result)
}
// updateCourse('5a68fdc3615eda645bc6bdec')

async function deleteCourse(id) {
    // const result = await Course.deleteOne({id})
    const result = await Course.findByIdAndRemove(id);
    console.log(result)
}
// deleteCourse('5a68fdc3615eda645bc6bdec')
// createCourse()
getCourses()