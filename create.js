import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter description of the image you want (max 1000 chars). The more detailed the description, the more likely you are to get the result that you want: ", (prompt) => {
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

  try {
    const size = '1024x1024';

    const response = await openai.createImage({
        prompt: prompt,
        n: n,
        size: size
      }
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
