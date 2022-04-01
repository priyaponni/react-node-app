import express from 'express'
import cors from 'cors'
import { getUsers, generateUsers, getUser, editUser } from './models/user.js';
const app = express()
const port = 8000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

generateUsers();

app.get('/api/hello', (req, res) => {
  res.send({data: 'Hello World!'})
})

app.get('/api/users', async (req, res) => {
  const users = await getUsers(req, res);
  console.log(users);
  res.send({data: users});
})

app.get('/api/user/:id', async (req, res) => {
  const user = await getUser(req.params.id, req, res);
  res.send({data:user});
});

app.put('/api/user/:id', async (req, res) => {
  console.log('inside PUT');
  const result = await editUser(req.params.id, req, res);
  res.send({data: result});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})