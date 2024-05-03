const inquirer = require("inquirer");
const db = require("./config/connection.js");

const addDepartmentQuestions = [
  {
    type: "input",
    name: "departmentName",
    message: "What is the name of the department you would like to add?",
  },
];

const addEmployeeQuestions = [
  {
    type: "input",
    name: "firstName",
    message: "What is the first name of the employee you would like to add?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the last name of the employee you would like to add?",
  },
  {
    type: "input",
    name: "jobTitle",
    message: "What is the job title of the employee you would like to add?",
  },
  {
    type: "input",
    name: "departmentName",
    message: "What department is the employee part of?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of the employee?",
  },
  {
    type: "input",
    name: "manager",
    message: "Who is the manager of the employee?",
  },
];

const addRoleQuestions = [
  {
    type: "input",
    name: "jobTitle",
    message: "What is the job title of the role you would like to add?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of the role you would like to add?",
  },
  {
    type: "input",
    name: "departmentName",
    message: "What department is the role part of?",
  },
];

const menuQuestions = [
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "Add a Department",
      "View All Employees",
      "Add New Employee",
      "View All Roles",
      "Add a role",
      "Update Employee Role",
      "Exit",
    ],
  },
];

const viewDepartment = () => {
  db.promise()
    .query("SELECT * from department;")
    .then((res) => {
      console.table(res[0]);
      showList();
    });
};

const viewEmployees = () => {
  db.promise()
    .query("SELECT * from employee;")
    .then((res) => {
      console.table(res[0]);
      showList();
    });
};

const viewRoles = () => {
  db.promise()
    .query("SELECT * from role;")
    .then((res) => {
      console.table(res[0]);
      showList();
    });
};

const addDepartment = () => {
  inquirer.prompt(addDepartmentQuestions).then(({ departmentName }) => {
    db.promise()
      .query(`INSERT INTO department(name) VALUE ('${departmentName}');`)
      .then((res) => {
        console.log(`Added ${departmentName} to database`);
        showList();
      });
  });
};

const addEmployee = () => {
  inquirer
    .prompt(addEmployeeQuestions)
    .then(
      ({ firstName, lastName, jobTitle, departmentName, salary, manager }) => {
        db.promise()
          .query(`INSERT INTO employee(firstName) VALUE ('${firstName}');`)
          .query(`INSERT INTO employee(lastName) VALUE ('${lastName}');`)
          .query(`INSERT INTO employee(jobTitle) VALUE ('${jobTitle}');`)
          .query(
            `INSERT INTO employee(departmentName) VALUE ('${departmentName}');`
          )
          .query(`INSERT INTO employee(salary) VALUE ('${salary}');`)
          .query(`INSERT INTO employee(manager) VALUE ('${manager}');`)
          .then((res) => {
            console.log(`Added ${firstName} to database in employee table`);
            showList();
          });
      }
    );
};
const addRole = () => {
  inquirer
    .prompt(addRoleQuestions)
    .then(({ jobTitle, salary, departmentName }) => {
      db.promise()
        .query(`INSERT INTO role(jobTitle) VALUE ('${jobTitle}');`)
        .query(`INSERT INTO role(salary) VALUE ('${salary}');`)
        .query(`INSERT INTO role(departmentName) VALUE ('${departmentName}');`)
        .then((res) => {
          console.log(`Added ${departmentName} to database`);
          showList();
        });
    });
};

const listOptions = (response) => {
  switch (response.menuChoice) {
    case "View All Departments":
      viewDepartment();
      break;
    case "Add a Department":
      addDepartment();
      break;
    case "View All Employees":
      viewEmployees();
      break;
    case "Add New Employee":
      addEmployee();
      break;
    case "View All Roles":
      viewRoles();
      break;
    case "Add a Role":
      addRole();
      break;
    case "Update Employee Role":
      updateEmployeeRole();
      break;
    case "Exit":
      db.end();
      break;
    default:
      console.log("Please select a valid option");
      showList();
      break;
  }
};

const showList = () => {
  inquirer.prompt(menuQuestions).then((response) => {
    listOptions(response);
  });
};
