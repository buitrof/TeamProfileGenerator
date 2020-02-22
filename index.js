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
  type: 'input',
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
        type: 'input',
        name: 'officeNumber',
        message: 'Please enter your office number'
      })
      .then(({name, email, id, role, officeNumber}) => {
        generateHtml(name, email, id, role, officeNumber)
      })
      break
    case 'Engineer':
      inquirer.prompt({
        type: 'input',
        name: 'github',
        message: 'Please enter your github username'
      })
      .then(({name, email, id, role, github}) => {
        generateHtml(name, email, id, role, github)
      })
      break
    case 'Intern':
      inquirer.prompt({
        type: 'input',
        name: 'school',
        message: 'Please enter the school you are attending'
      })
      .then(({name, email, id, role, school}) => {
        generateHtml(name, email, id, role, school)
      })
      break
  }
})  

const generateHtml = (name, email, id, role, officeNumber, github, school) => {
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

  <h1>Hello World!</h1>

  <p>${name}</p>
  
</body>
</html>
  `, error => error ? console.error(error) : console.log('success'))
}

async function userInput(name, email, id, role) {
  const response = await new Promise((resolve, reject) => {
    if (role === 'Manager') {
      inquirer.prompt({
        type: 'input',
        name: 'officeNumber',
        message: 'Please enter your office number'
      })
    } else if (role === 'Engineer') {
      inquirer.prompt({
        type: 'input',
        name: 'github',
        message: 'Please enter your github username'
      })
    } else {
      inquirer.prompt({
        type: 'input',
        name: 'school',
        message: 'Please enter the school you are attending'
      })
    }
  })
   console.log(response)
}