const fs = require("node:fs");

function minvalue(jsonData) {
  let min = 10000;
  let text = "";
  for (let list of jsonData) {
    if (list.value < min) {
      min = list.value;
      text = list.txt;
    }
  }
  return `${text}:${min}`;
}

fs.readFile("data.json", (err, data) => {
  if (err === null) {
    const jsonData = JSON.parse(data);
    const str = minvalue(jsonData);
    fs.writeFile("output.txt", str, (err) => {
      if (err === null) {
      } else {
        console.log(err);
      }
    });
  } else {
    console.log(err);
  }
});
