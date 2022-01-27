const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

//connect to mongodb & listen to requests
const dbURI = 'mongodb+srv://swisblog:test1234@nodetuts.mcacf.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req,res, next) => {
    console.log('new request made');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

// //mongoose and mongo sandbox routes
// app.get('/add-blog', (req,res) => {
//     const blog = new Blog({
//         title:'new blog 2',
//         snippet:'about my new blog',
//         body:'more about my new blog',
//     });
//     blog.save()
//     .then((results)=>{
//         res.send(results)
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// });

// app.get('/all-blogs', (req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>console.log(err));
// });

// app.get('/single-blog', (req,res)=>{
//     Blog.findById('615b76533f328207078428f8')
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>console.log(err));
// });


app.get('/', (req,res) => {
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs',blogRoutes);


//404 page
app.use((req,res) => {
    res.status(404).render('404', {title: '404'});
});