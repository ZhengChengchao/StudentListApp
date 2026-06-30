# StudentListApp

This is a small Express.js student list application for the school module C237 Software Application Development.

## Module

- **C237 Software Application Development**

## Description

StudentListApp is a minimal web app that demonstrates basic Express routing and EJS view rendering. It provides pages to view the student list, add a student, and view individual student details.

## Features

- List students
- Add a student (form)
- View a student's details

## Project structure

- `app.js` - main application entry
- `package.json` - project metadata and dependencies
- `views/` - EJS templates
  - `index.ejs` - home / student list
  - `addStudent.ejs` - form to add a student
  - `student.ejs` - individual student view

## Prerequisites

- Node.js (v14+ recommended)
- npm

## Install

Install dependencies:

```bash
npm install
```

## Run

Start the app with:

```bash
node app.js
# or, if you prefer automatic restarts during development:
npx nodemon app.js
```

Then open http://localhost:3000 (or the port shown in the console).

## Notes

- This project uses EJS for server-side rendering.
- Adjust the port in `app.js` if needed.

## Author

- Student: (Your name here)

## License

- MIT (replace if your institution requires a different license)
