const fs = require("fs");
const data = require("./data.json");

const obj = {
  Fname: "Jatin",
  Lname: "s",
  Designation: "SE",
};

let isExist;

data.map((d, i) => {
  if (d.Fname === obj.Fname) {
    console.log("Data Exists");
    isExist = true;
  } else {
    return (isExist = false);
  }
});

if (!isExist) {
  data.push(obj);

  fs.writeFile(`./data.json`, JSON.stringify(data), () => {
    console.log("Data inserted");
  });
}
