const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: [authorSchema],
    required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.updateOne({ _id: id }, {
    $set: {
      "author.name": "Akbarjon"
    }
  })
}

async function unsetAuthor(id) {
  const course = await Course.updateOne({ _id: id }, {
    $unset: {
      "author.name": ""
    }
  })
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.author.push(author);
  course.save();
}

async function updateAuthor(courseId, authorId, name) {
  let course = await Course.findById(courseId);
  let author = await course.author.filter(obj => obj.id === authorId);
  author[0].name = name;
  course.save();
}

async function removeAuthor(courseId, authorId) {
  let course = await Course.findById(courseId);
  const author = await course.author.id(authorId)
  author.remove();
  course.save()
}
// createCourse('Node Course', [new Author({ name: 'Mosh' }), new Author({ name: 'AKbarjon' })]);
// updateCourse("62f85f1d0151bb197e495ded")
// unsetAuthor("62f85f1d0151bb197e495ded")
// addAuthor("62f864f4562b8df3d1636997", new Author({ name: "Ibrohim" }))
// updateAuthor("62f864f4562b8df3d1636997", "62f8669b16b66f1c793dc515", "Alisher")
removeAuthor("62f864f4562b8df3d1636997", "62f8669b16b66f1c793dc515")

