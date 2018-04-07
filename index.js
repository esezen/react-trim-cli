#!/usr/bin/env node
const program = require("commander");
const colors = require('colors');
const boxen = require('boxen');
const fs = require("fs");
const path = require("path");

const CURR_DIR = process.cwd();
program
  .command("new <projectName>")
  .description("Create a new project with mvc structure")
  .action(function(folderName, cmd) {
    if (fs.existsSync(`${CURR_DIR}/${folderName}`)) {
      console.log(boxen("This Directory " + `${CURR_DIR}/${folderName}`.bold.red + " Already Exists", {
        padding: 1, 
        borderColor: 'red' 
      }));

      return;
    }

    console.log("Creating a new React Trim app in " + (CURR_DIR + '/' + folderName + '/').bold.green + "\n");
    
    console.log(boxen('All Complete!'.bold.green, {
      padding: 1, 
      borderColor: 'green' 
    }));

    console.log("\nCommands to run within application directory:");

    console.log("\n   npm start".bold.blue);
    console.log("      Starts the development server.".bold)
    
    console.log("\n   npm run build".bold.blue);
    console.log("      Bundles the app into static files for production.".bold);

    console.log("\n   npm test".bold.blue);
    console.log("      Starts the test runner.".bold);
    
    console.log("\nTo begin, type the following:".bold);
    console.log("\n   cd " + (CURR_DIR + '/' + folderName + '/').bold.green);
    console.log("   npm install".bold.blue);

    fs.mkdirSync(`${CURR_DIR}/${folderName}`);
    const templatePath = `${__dirname}/src/templates/project/`;

    createDirectoryContents(templatePath, folderName);
  });

program
  .command("make:controller <name>")
  .description("Create a controller inside current folder")
  .action(function(name, cmd) {
    processAction(cmd._name.slice(5), name);
  });

program
  .command("make:model <name>")
  .description("Create a model inside current folder")
  .action(function(name, cmd) {
    processAction(cmd._name.slice(5), name);
  });
program
  .command("make:view <name>")
  .description("Create a view inside current folder")
  .action(function(name, cmd) {
    processAction(cmd._name.slice(5), name);
  });
program.parse(process.argv);
function processAction(command, name) {
  const projectRoot = findProjectRoot();
  if (projectRoot) {
    console.log("Creating a new %s named: %s", command, name);
    const templatePath = `${__dirname}/src/templates/single/`;
    switch (command) {
      case "controller":
        copySingleFile(templatePath + `Example.jsc`, name, ".jsc", projectRoot);
        break;
      case "model":
        copySingleFile(templatePath + `Example.jsm`, name, ".jsm", projectRoot);
        break;
      case "view":
        copySingleFile(templatePath + `Example.jsv`, name, ".jsv", projectRoot);
        break;
      default:
        break;
    }
  } else {
    console.log(boxen("You are not inside a react-trim project. Make sure a " + ".react-trim".bold.red + " file exists inside the root directory of your project.", {
      padding: 1, 
      borderColor: 'red' 
    }));
  }
}
function findProjectRoot() {
  let dirs = CURR_DIR.split("/");
  while (dirs.length > 1) {
    const filesToCreate = fs.readdirSync(dirs.join("/"));
    if (filesToCreate.find(i => i === ".react-trim")) {
      return dirs.join("/");
    }
    dirs.pop();
  }
  return null;
}
function copySingleFile(templatePath, newFilePath, extension, projectRoot) {
  let contents = fs.readFileSync(templatePath, "utf8");
  let folder = "";
  switch (extension) {
    case ".jsc":
      contents = contents.slice(0, 6) + newFilePath + contents.slice(13);
      folder = "Controllers";
      break;
    case ".jsm":
      contents = contents.slice(0, 6) + newFilePath + contents.slice(13);
      folder = "Models";
      break;
    case ".jsv":
      folder = "Views";
      break;
  }
  const writePath = `${projectRoot}/src/${folder}/${newFilePath}${extension}`;
  fs.writeFileSync(writePath, contents, "utf8");
}
function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(origFilePath);
    let contents = null;
    if (stats.isFile()) {
      if (file === "package.json") {
        contents = fs.readFileSync(origFilePath, "utf8");
        if (contents.slice(12, 22) === "react-trim") {
          contents = contents.slice(0, 47) + '\t"private": true,\n' + contents.slice(47);
          contents = contents.slice(0, 38) + "0.1.0" + contents.slice(43);
          contents = contents.slice(0, 12) + newProjectPath + contents.slice(22) + '\t';
        }
      } else {
        contents = fs.readFileSync(origFilePath);
      }
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents);
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
}
