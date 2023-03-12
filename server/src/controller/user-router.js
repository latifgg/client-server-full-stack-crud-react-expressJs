import  express  from "express";
import { faker } from '@faker-js/faker';

const router = express.Router();
/// our fake database table
export let users = [
    {
        id: faker.datatype.uuid(),
        name: "John Doe",
        email: "johndoe@hicoders.ch",
    },
    {
        id: faker.datatype.uuid(),
        name: "Peter Parker",
        email: "peter_parker@hicoders.ch",
    }
]
//get all users
router.get('/', (req, res) => {
    res.status(200).send(users);
});

//get user by id
router.get('/:id', (req, res) => {
    const requestedUserId = req.params.id;
    const user = users.find(user => user.id === requestedUserId);
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
});


export default router;