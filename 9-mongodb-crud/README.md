# Question 9: MongoDB CRUD API

Express and Mongoose API for creating, reading, updating, and deleting students.

## Run

1. Start MongoDB locally.
2. Run `npm install` in this folder.
3. Run `npm start`.

The API listens on `http://localhost:5000`. Set `MONGODB_URI` or `PORT` to override the defaults.

## Endpoints

- `GET /` - API status and student endpoint
- `GET /students` - list students
- `GET /students/:id` - read one student
- `POST /students` - create with JSON `{ "name": "Asha", "course": "Node.js" }`
- `PUT /students/:id` - replace/update student fields
- `DELETE /students/:id` - delete student
