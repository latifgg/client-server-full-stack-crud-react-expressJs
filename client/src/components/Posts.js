import React from 'react'
import { Button, Card } from 'react-bootstrap';

function Posts({posts,handleDelete,handleEdit}) {
  return (
    <div>
    {posts.map((post) => (
        <Card key={post.id} className='m-3'>
          <Card.Header>{post.title}</Card.Header>
          <Card.Body>
            <Card.Text>
              {post.content}
            </Card.Text>
            <Button onClick={() => handleDelete(post.id)} variant="danger">Delete</Button>
            <Button onClick={() => handleEdit(post)} variant="warning">Edit</Button>
          </Card.Body>
        </Card>
      ))} 
    </div>
      
      )
}

export default Posts