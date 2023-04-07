#!/usr/bin/env node

const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const data = require("./data.json");

const inputArr = process.argv.slice(2);

const command = inputArr[0];
const filePath = inputArr[1];
const sheetname = inputArr[2];
const jsonData = inputArr[3] ? inputArr[3] : null;
const jsonFile = inputArr[3] ? require(jsonData) : data;

// syntax => node excel.js command filePath jsonData? sheetname

switch (command) {
  case "j2e":
    excelWriter(filePath, jsonFile, sheetname);
    break;

  case "e2j":
    excelReader(filePath, sheetname);
    break;

  default:
    console.log(
      "Please write something\nsyntax => node excel.js command(j2e / e2j) filePath jsonData? sheetname"
    );
    break;
}

function excelWriter(filePath, json, sheetName) {
  // workbook -> filePath, worksheet -> name, json data
  // new worksheet
  let newWB = xlsx.utils.book_new();
  // json data -> excel format convert
  let newWS = xlsx.utils.json_to_sheet(json);
  xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
  const isExist = fs.existsSync("XLSX Files");
  const isFile = fs.lstatSync("XLSX Files").isFile();
  if (!isExist && !isFile) {
    fs.mkdirSync("XLSX Files");
  }
  let newPath = path.join("XLSX Files", filePath);
  xlsx.writeFile(newWB, newPath);
  console.log("Successful !!!😊");
}

// excelWriter("abc.xlsx", data, "sheet-1")

function excelReader(filePath, sheetName) {
  let newPath = path.join("XLSX Files", filePath);
  if (fs.existsSync(newPath)) {
    let wb = xlsx.readFile(newPath);
    let excelData = wb.Sheets[sheetName];
    let result = xlsx.utils.sheet_to_json(excelData);
    console.log(result);
  } else {
    console.log(`No such file exists with filename: ${filePath}`);
  }
}

// excelReader("abc.xlsx", "sheet-1");
