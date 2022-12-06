const inquirer = require("inquirer");
const fs = require("fs");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is the name of your project?",
      name: "projectName",
    },
    {
      type: "input",
      message: "What is the project's description?",
      name: "description",
    },
    {
      type: "input",
      message: "What is the installation process?",
      name: "installation",
    },
    {
      type: "input",
      message: "What is your github username?",
      name: "gitHub",
    },
    {
      type: "input",
      message: "How do you use this project?",
      name: "usage",
    },
    {
      type: "input",
      message: "What credits would you like to give?",
      name: "credits",
    },
    {
      type: "input",
      message: "What licenses would you like to include?",
      name: "license",
    },
  ])
  .then((response) => {
    const fileName = "README.md";

    fs.writeFile(
      fileName,
      `# ${response.projectName}

## Description

${response.description}   

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

${response.installation}

## Usage

The website is live [${response.projectName.split(" ").join("-")}][https://${
        response.gitHub
      }.github.io/${response.projectName.split(" ").join("-")}/]

${response.usage}

## Credits

${response.credits}

## License

${response.license}`,
      (err) => (err ? console.error(err) : console.log("Success!"))
    );
  });
