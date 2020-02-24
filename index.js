const inquirer = require('inquirer')
const fs = require('fs')

class Employee {
  constructor (name, id, title, email) {
    this.name = name
    this.id = id
    this.title = title
    this.email = email
    function getName() {
      return name
    }
    function getId() {
      return id
    }
    function getEmail() {
      return email
    }
    function getRole() {
      return Employee
    }
  }
}

class Manager extends Employee {
  constructor(officeNumber) {
    super(name, id, title, email)
    this.officeNumber = officeNumber
    function getRole() {
      return Manager
    }
  }
}

class Engineer extends Employee {
  constructor(github) {
    super(name, id, title, email)
    this.github = github
    function getGithub() {
      return github
    }
    function getRole() {
      return Engineer
    }
  }
}

class Intern extends Employee {
  constructor(school) {
    super(name, id, title, email)
    this.school = school
    function getSchool() {
      return school
    }
    function getRole() {
      return Intern
    }
  }
}

inquirer.prompt([
{
  type: 'input',
  name: 'name',
  message: 'Please enter your name'
},
{
  type: 'input',
  name: 'email',
  message: 'Please enter your email'
},
{
  type: 'number',
  name: 'id',
  message: 'Please enter your ID'
},
{
  type: 'list',
  name: 'role',
  message: 'Please select your role in the project',
  choices: ['Manager', 'Engineer', 'Intern']
}
])
.then(({name, email, id, role}) => {
  switch (role) {
    case 'Manager':
      inquirer.prompt({
        type: 'number',
        name: 'officeNumber',
        message: 'Please enter your office number'
      })
      .then(({manName, manEmail, manId, officeNumber}) => {
        generateManHtml(name, email, id, officeNumber)
      })
      break
    case 'Engineer':
      inquirer.prompt({
        type: 'input',
        name: 'github',
        message: 'Please enter your github username'
      })
      .then(({engName, engEmail, engId, github}) => {
        generateEngHtml(name, email, id, github)
      })
      break
    case 'Intern':
      inquirer.prompt({
        type: 'input',
        name: 'school',
        message: 'Please enter the school you are attending'
      })
      .then(({intName, intEmail, intId, school}) => {
        generateIntHtml(name, email, id, school)
      })
      break
  }
})  

const generateManHtml = (name, email, id, officeNumber) => {
  fs.writeFile('index.html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

  <h1>My Team</h1>

  <p>${name}</p>
  <p>${email}</p>
  <p>${id}</p>
  <p>${officeNumber}</p>
  
</body>
</html>
  `, error => error ? console.error(error) : console.log('success'))
}

const generateEngHtml = (name, email, id, github) => {
  fs.writeFile('index.html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

  <h1>My Team</h1>

  <p>${name}</p>
  <p>${email}</p>
  <p>${id}</p>
  <p>${github}</p>
  
</body>
</html>
  `, error => error ? console.error(error) : console.log('success'))
}

const generateIntHtml = (name, email, id, school) => {
  fs.writeFile('index.html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

  <h1>My Team</h1>

  <p>${name}</p>
  <p>${email}</p>
  <p>${id}</p>
  <p>${school}</p>
  
</body>
</html>
  `, error => error ? console.error(error) : console.log('success'))
}