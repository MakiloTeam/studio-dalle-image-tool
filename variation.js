import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const imageFilePath = path.join(__dirname, 'images', 'image.png');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

main()
  .then()
  .catch((error) => console.error(error))
  .finally(() => rl.close())

async function main() {
  let n = 1
  try {
    n = await askN();
  }
  catch(error) {
    throw new Error(error);
  }

  if ( ! fs.existsSync(imageFilePath) ) {
    throw new Error(`${imageFilePath} does not exist.`)
  }

  try {
    const image = await fs.createReadStream(imageFilePath);
    const size = '1024x1024';

    const response = await openai.createImageVariation(
      image,
      n,
      size
    );
    
    console.log(response.data);
  }
  catch (error) {
    if ( error.response ) {
      console.error(error.response.status);
      console.error(error.response.data);
    }
    else {
      throw new Error(error.message);
    }
  }
}

function askN() {
  return new Promise((resolve, reject) => {
    rl.question("Enter number of images to generate (between 1 and 10): ", (answer) => {
      const n = parseInt(answer);

      if ( isNaN(n) || (n < 1) || (n > 10) ) {
        reject(`Invalid value for n: ${answer}`);
      }
      else {
        resolve(n);
      }
    });
  });
}
