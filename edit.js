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
const maskFilePath = path.join(__dirname, 'images', 'mask.png');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter description of the image edit. The transparent areas of the mask indicate where the image should be edited, and the prompt should describe the full new image, not just the erased area: ", (prompt) => {
  main(prompt)
    .then()
    .catch((error) => console.error(error))
    .finally(() => rl.close())
});

async function main(prompt) {
  let n = 1
  try {
    n = await askN();
  }
  catch(error) {
    throw new Error(error);
  }

  if ( ! prompt ) {
    throw new Error(`Enter a prompt!`)
  }
  if ( ! fs.existsSync(imageFilePath) ) {
    throw new Error(`${imageFilePath} does not exist.`)
  }
  if ( ! fs.existsSync(maskFilePath) ) {
    throw new Error(`${maskFilePath} does not exist.`)
  }

  try {
    const image = await fs.createReadStream(imageFilePath);
    const mask = await fs.createReadStream(maskFilePath);
    const size = '1024x1024';

    const response = await openai.createImageEdit(
      image,
      mask,
      prompt,
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
