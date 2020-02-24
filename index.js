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

const questions = [{
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
}]

const questionsEng = {
  type: 'input',
  name: 'github',
  message: 'Please enter your github username'
}

const questionsInt = {
  type: 'input',
  name: 'school',
  message: 'Please enter the school you are attending'
}

inquirer.prompt(questions)
.then(({name, email, id}) => {
  inquirer.prompt({
    type: 'number',
    name: 'officeNumber',
    message: 'Please enter your office number'
  })
  .then(({manName, manEmail, manId, officeNumber}) => {
    generateManHtml(name, email, id, officeNumber)
    userInput()
  }) 
})

const userInput = () => {
  inquirer.prompt({
    type: 'list',
    name: 'role',
    message: 'Please select your role in the project, or select [Done] when all team members have been added',
    choices: ['Engineer', 'Intern', 'Done']
  })
  .then(({ role }) => {
    switch (role) {
    case 'Engineer':
      questions.push(questionsEng)
      inquirer.prompt(questions)
      .then(({ name, email, id, github }) => {
        generateEngHtml(name, email, id, github)
        userInput()
      })
      break
    case 'Intern':
      questions.push(questionsInt)
      inquirer.prompt(questions)
      .then(({ name, email, id, school }) => {
        generateIntHtml(name, email, id, school)
        userInput()
      })
      break
    case 'Done':
      generateEndHtml()
      break
    }  
  })
}

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

  <h4>Manager</h4>
  <p>${name}</p>
  <p>Email: ${email}</p>
  <p>ID: ${id}</p>
  <p>Office Number: ${officeNumber}</p>
  <hr>
  `, error => error ? console.error(error) : null)
}

const generateEngHtml = (name, email, id, github) => {
  fs.appendFile('index.html', `
  <h4>Engineer</h4>
  <p>${name}</p>
  <p>Email: ${email}</p>
  <p>ID: ${id}</p>
  <p>GitHub: ${github}</p>
  <hr>
  `, error => error ? console.error(error) : null)
}

const generateIntHtml = (name, email, id, school) => {
  fs.appendFile('index.html', `
  <h4>Intern</h4>
  <p>${name}</p>
  <p>Email: ${email}</p>
  <p>ID: ${id}</p>
  <p>School: ${school}</p>
  <hr>
  `, error => error ? console.error(error) : null)
}

const generateEndHtml = () => {
  fs.appendFile('index.html', `
  </body>
  </html>
  `, error => error ? console.error(error) : null)
}