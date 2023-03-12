import { useEffect, useState } from 'react';
import * as postServices from './service/postService'
import { Button, Container, Form } from 'react-bootstrap';
import Posts from './components/Posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [postId, setPostId] = useState()

  const getPosts = async () => {
    try {
      const posts = await postServices.getPosts();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };
  const handleSubmit = async (title, content) => {
    if (isUpdating) {
      const updatedPost = { title, content };
      try {
        await postServices.updatePost(postId, updatedPost);
        const posts = await postServices.getPosts();
        setPosts(posts);
      } catch (error) {

      }
      setIsUpdating(false)
      


    }else {
      const newPost = { title, content };
      try {
        await postServices.createPost(newPost);
        const posts = await postServices.getPosts();
        setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleDelete = async (postId) => {
    await postServices.deletePost(postId)
    getPosts(); // fetch new data after deleting
  }
  const handleEdit = async (post) => {
    setIsUpdating(true)
    setTitle(post.title)
    setContent(post.content)
    setPostId(post.id)
  }
  const generateFakePost = async (post) => {
    await postServices.generateFakePost()
    const posts = await postServices.getPosts();
    setPosts(posts);

  }
  useEffect(() => {
    getPosts()
  }, [])

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error loading posts.</p>;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    handleSubmit(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <h1>Add new Post</h1>

        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Content:</Form.Label>
          <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
        </Form.Group>
        <Button className='m' type="submit" variant="primary">{isUpdating ? "Update" : "Submit"}  </Button>
      </Form>
      <Button onClick={() => generateFakePost()} className='mt-2' type="submit" variant="success">generate a fake post  </Button>

      <Posts posts={posts}  handleDelete={handleDelete}  handleEdit={handleEdit}/>
    </Container>
  );
}
export default App;