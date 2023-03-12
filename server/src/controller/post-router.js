import express from "express";
import { faker } from '@faker-js/faker';

const router = express.Router();

/// our fake database table
export let posts = [
    {
        id: faker.datatype.uuid(),
        title: "how i became popular",
        content: "Hello everyone! My name is Peter Parker and today I want to share with you my journey on how I became popular. It all started when I was bitten by a radioactive spider and gained superpowers. I soon discovered that with great power, comes great responsibility and decided to use my abilities to help others.",
        createdAt:new Date()
    },
    {
        id: faker.datatype.uuid(),
        title: "A Day in the Life of John Doe",
        content: "Hi everyone, my name is John Doe and today I want to give you a glimpse into my typical day. I start my day early, usually around 6am, with a cup of coffee and some quiet time to plan out my tasks for the day. Then I head to the gym for a quick workout to get my energy levels up. After the gym, I head to work where I work as a software engineer. I spend my day coding, debugging, and testing new software. I love my job because I get to solve complex problems and create new things every day.  In the evening, I usually relax by reading a good book or watching a movie. I also enjoy cooking, and I love to experiment with new recipes. I try to make time for my friends and family, and I enjoy spending time with them.Whether it's playing a game, having dinner, or just chatting, I always have a great time with them. And that's a typical day for me. I hope you enjoyed learning a bit about me. Thank you for reading!",
        createdAt:new Date()

    },
    {
        id: faker.datatype.uuid(),
        title: "John Doe's Passion Project",
        content: "John Doe spends his free time creating unique wood sculptures. He's driven by his passion for art and enjoys the challenge of transforming pieces of wood into beautiful works of art",
        createdAt:new Date()
    }
]

//get all posts
router.get('/', (req, res) => {
    res.status(200).send(posts);
});
//add a new post
router.post('/', (req, res) => {
    let newPost = req.body
    newPost.id = faker.datatype.uuid()
    
    posts.push(newPost)
    res.status(201).send(newPost); //send back the latest posts
});

//generate a fake post
router.post('/fake', (req, res) => {
    const newFakePost = {
        id:faker.datatype.uuid(),
        title:faker.lorem.words(5),
        content: faker.lorem.paragraph()
    }
    posts.push(newFakePost)
    res.status(201).send(posts.at(-1));
});

// Update an existing post by id
router.put('/:id', (req, res) => {
    // Get the requested post id from the URL parameter
    const requestedPostId = req.params.id;

    // Find the index of the post with the matching id
    const postIndex = posts.findIndex(post => post.id === requestedPostId);

    // Get the edited post  data from the request body
    const editedPost = req.body;

    // Set the id of the new post to the requested id
    editedPost.id = requestedPostId;

    // Update the post in the posts array
    posts[postIndex] = editedPost;

    // Send a success response with a message
    res.status(201).send({ message: `post with id  ${requestedPostId}   updated successfully` });
});

///delete post by id
router.delete('/:id', (req, res) => {
    const requestedPostId = req.params.id;
    posts = posts.filter(post => post.id !== requestedPostId);
    res.status(200).send({message : `${req.params.id} deleted`});
});

///get post by id
router.get('/:id', (req, res) => {
    const requestedPostId = req.params.id;
    const post = posts.find(post => post.id === requestedPostId);
    if (!post) {
        return res.status(404).send({ message: 'Post not found' });
    }
    res.status(200).send(post);
});


export default router;