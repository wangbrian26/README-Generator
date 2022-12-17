const inquirer = require("inquirer");
const fs = require("fs");

renderLicenseTableOfContents = (license) => {
  if (license !== "None") {
    return `\n- [License](#license)`;
  }
  return "";
};

renderLicenseSection = (license, projectLicense) => {
  if (license !== "None") {
    return `\n\n## License \n${license}\n\n${projectLicense}`;
  }
  return "";
};

renderLicenseBadge = (license, licenseName) => {
  if (license !== "None") {
    return `\n\n![${license}](https://img.shields.io/badge/License%3A-${licenseName}-green)`;
  }
  return "";
};

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "name",
    },
    {
      type: "input",
      message: "What year was this project made?",
      name: "year",
    },
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
      message: "How do you use this project?",
      name: "usage",
    },
    {
      type: "list",
      message: "What license would you like to include?",
      choices: [
        "Apache License 2.0",
        "GNU GPLv3",
        "GNU GPLv2",
        "MIT",
        "ISC License",
        "Boost",
        "None",
      ],
      name: "license",
    },
    {
      type: "input",
      message: "Who contributed to this project?",
      name: "contributions",
    },
    {
      type: "input",
      message:
        "What are some features of this application that you want to highlight?",
      name: "features",
    },
    {
      type: "input",
      message:
        "What are some tests for your application that other people can replicate?",
      name: "tests",
    },
    {
      type: "input",
      message: "What is your github username?",
      name: "gitHub",
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email",
    },
  ])
  .then((response) => {
    let projectLicense = "";
    if (response.license == "Apache License 2.0") {
      projectLicense = `Copyright [${response.year}] [${response.name}]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.`;
    } else if (response.license == "GNU GPLv3") {
      projectLicense = `GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.`;
    } else if (response.license == "GNU GPLv2") {
      projectLicense = ` GNU GENERAL PUBLIC LICENSE
                       Version 2, June 1991

 Copyright (C) 1989, 1991 Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.`;
    } else if (response.license == "MIT") {
      projectLicense = `MIT License

Copyright (c) [${response.year}] [${response.name}]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
    } else if (response.license == "ISC License") {
      projectLicense = `ISC License

Copyright (c) [${response.year}] [${response.name}]

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.`;
    } else if (response.license == "Boost") {
      projectLicense = `Boost Software License - Version 1.0 - August 17th, 2003

Permission is hereby granted, free of charge, to any person or organization
obtaining a copy of the software and accompanying documentation covered by
this license (the "Software") to use, reproduce, display, distribute,
execute, and transmit the Software, and to prepare derivative works of the
Software, and to permit third-parties to whom the Software is furnished to
do so, all subject to the following:

The copyright notices in the Software and this entire statement, including
the above license grant, this restriction and the following disclaimer,
must be included in all copies of the Software, in whole or in part, and
all derivative works of the Software, unless such copies or derivative
works are solely in the form of machine-executable object code generated by
a source language processor.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.`;
    } else if (response.license == "None") {
    }
    const fileName = `./generated-readme/${response.projectName}-README.md`;
    const licenseName = response.license.split(" ").join("-");
    fs.writeFile(
      fileName,
      `# ${response.projectName} ${renderLicenseBadge(
        response.license,
        licenseName
      )}

## Description

${response.description}   

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)${renderLicenseTableOfContents(response.license)}
- [Contributions](#contributions)
- [Features](#features)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${response.installation}

## Usage

The website is live [${response.projectName.split(" ").join("-")}][https://${
        response.gitHub
      }.github.io/${response.projectName.split(" ").join("-")}/]

${response.usage}${renderLicenseSection(response.license, projectLicense)}
      
## Contributions

${response.contributions}

## Features

Here are some of the highlight features of this application: 

${response.features}

## Tests

Here are some tests that you can run to try out the application:

${response.tests}

## Questions

If you have any questions or would like to see any of my other projects, please visit my github: 

[Github][https://github.com/${response.gitHub}]

Please email me at ${response.email}`,
      (err) => {
        if (err) throw err;
      }
    );
  });
