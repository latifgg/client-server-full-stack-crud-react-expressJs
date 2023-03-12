import request from "supertest"
import jest from "jest"
import app from "../app.js";
import { posts } from "../controller/post-router.js";

describe('GET /posts', () => {
    it('should return all posts', async () => {
        const res = await request(app).get('/posts');
        expect(res.statusCode).toBe(200);
    });
});

describe('GET /posts/:id', () => {
    it('should return a post with the given ID', async () => {
        const postId = 1;
        const expectedPost = posts.find(post => post.id === postId);
        const res = await request(app).get(`/posts/${postId}`);
        if (expectedPost === undefined || expectedPost === null) {
            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: 'Post not found' });
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(expectedPost);
        }
    });
});


describe('PUT /posts/:id', () => {
    it('should update a post by id', async () => {
        const postId = 1;
        const updatedPost = {
            id: postId,
            content: 'Updated post title',
            title: 'Updated post body'
        };

        const res = await request(app)
            .put(`/posts/${postId}`)
            .send(updatedPost);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe(`post with id  ${postId}   updated successfully`);
    });
});
