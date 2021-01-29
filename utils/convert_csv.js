const csv = require('csvtojson');
const fs = require('fs');
let count = 0;

const readFilePath = 'sdc_csv_data';
const writeFilePath = 'sdc_json_data';

// const readFilePath = 'sdc_csv_trimmed';
// const writeFilePath = 'sdc_test_json';

const readPath = `./${readFilePath}/answers_photos.csv`;
const writePath = `./${writeFilePath}/answers_photos.json`;

// const readPath = `./${readFilePath}/answers.csv`;
// const writePath = `./${writeFilePath}/answers.json`;

// const readPath = `./${readFilePath}/characteristic_reviews.csv`;
// const writePath = `./${writeFilePath}/characteristic_reviews.json`;

// const readPath = `./${readFilePath}/characteristics.csv`;
// const writePath = `./${writeFilePath}/characteristics.json`;

// const readPath = `./${readFilePath}/features.csv`;
// const writePath = `./${writeFilePath}/features.json`;

// const readPath = `./${readFilePath}/photos.csv`;
// const writePath = `./${writeFilePath}/photos.json`;

// const readPath = `./${readFilePath}/product.csv`;
// const writePath = `./${writeFilePath}/product.json`;

// const readPath = `./${readFilePath}/questions.csv`;
// const writePath = `./${writeFilePath}/questions.json`;

// const readPath = `./${readFilePath}/related.csv`;
// const writePath = `./${writeFilePath}/related.json`;

// const readPath = `./${readFilePath}/reviews_photos.csv`;
// const writePath = `./${writeFilePath}/reviews_photos.json`;

// const readPath = `./${readFilePath}/reviews.csv`;
// const writePath = `./${writeFilePath}/reviews.json`;

// const readPath = `./${readFilePath}/skus.csv`;
// const writePath = `./${writeFilePath}/skus.json`;

// const readPath = `./${readFilePath}/styles.csv`;
// const writePath = `./${writeFilePath}/styles.json`;

let readStream = fs.createReadStream(readPath);
let writeStream = fs.createWriteStream(writePath);
readStream
  .pipe(
    csv({
      colParser: {
        id: function (colIdx) {
          count++;
          return count + '';
        }
      }
    })
  )
  .pipe(writeStream);

`sudo docker exec -i SDC sh -c 'mongoimport --db=SDC --collection=photos' < /home/thacken/projects/HRATX53/main/phase_2/SDC/ProductsAPI/sdc_json_data/photos.json`;
