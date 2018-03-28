#!/usr/bin/env node
var program = require("commander");
const fs = require("fs");
const path = require("path");

const CURR_DIR = process.cwd();
program
  .command("new <projectName>")
  .description("Create a new project with mvc structure")
  .action(function(folderName, cmd) {
    console.log("Creating a new project named: " + folderName);
    console.log("\n$cd " + folderName + "\n$npm install");
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
    console.log("You are not inside a react-trim project");
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
          contents =
            contents.slice(0, 47) + '"private": true,\n' + contents.slice(47);
          contents = contents.slice(0, 38) + "0.1.0" + contents.slice(43);

          contents =
            contents.slice(0, 12) + newProjectPath + contents.slice(22);
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
