const fs = require("fs");
const util = require("util");

const dataPath = "public/data/";
const directories = [
  "posts",
  "categories",
  "authors",
  "invitados",
  "escritura-grupal",
];

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
  fs.writeFileSync(
    `${path}.js`,
    "export default " +
      util.inspect(
        { ...data },
        {
          showHidden: false,
          compact: false,
          depth: null,
        }
      )
  );
};

for (let i = 0; i < directories.length; i++) {
  const path = `${dataPath}${directories[i]}`;

  // If output file doesn't exist, create an empty one
  if (!fs.existsSync(`${path}.js`)) {
    fs.writeFileSync(`${path}.js`, "{}");
  }

  // If source folder has files run function
  if (fs.existsSync(path)) {
    multipleJsonFilesToOne(path);
  }
}
