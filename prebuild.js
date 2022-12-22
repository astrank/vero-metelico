const fs = require("fs");

const dataPath = "public/data/";
const directories = ["posts", "categories", "authors", "invitados"];

const multipleJsonFilesToOne = (path) => {
  const fileNames = fs.readdirSync(path);
  let data = [];

  fileNames.map(async (fileName) => {
    if (!fileName.endsWith(".json")) {
      return false;
    }

    const fileContents = fs.readFileSync(`${path}/${fileName}`, "utf8");

    data.push(JSON.parse(fileContents));
  });

  /* Sort posts by date */
  data.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));

  fs.writeFileSync(`${path}.json`, JSON.stringify(data, null, 2));
};

for (let i = 0; i < directories.length; i++) {
  const path = `${dataPath}${directories[i]}`;

  // If output file doesn't exists, create an empty one
  if (!fs.existsSync(`${path}.json`)) {
    fs.writeFileSync(`${path}.json`, "{}");
  }

  // If source folder has files run function
  if (fs.existsSync(path)) {
    multipleJsonFilesToOne(path);
  }
}
