import request from "supertest"
import router, { users } from "../controller/user-router.js";
import app from "../app.js";

describe('GET /users', () => {
    it('should return all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
    });
});

describe('GET /users/:id', () => {
    it('should return a post with the given ID if the user doesnt exist send error', async () => {
        const postId = 1;
        const expectedPost = users.find(post => post.id === postId);
        const res = await request(app).get(`/users/${postId}`);
        if (!expectedPost) {
            expect(res.statusCode).toEqual(404);
        }else{
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(expectedPost);
        }
    });
});

