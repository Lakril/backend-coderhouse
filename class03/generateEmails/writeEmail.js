// import fs from 'fs/promises';
// import path from 'path';
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// async function generateMail(status) {
//     const nameTemplate = `template${status.charAt(0).toUpperCase()}${status.slice(1)}.json`;
//     const filePath = `./mails/${nameTemplate}`;

//     const json = await fs.readFile(path.resolve(__dirname, filePath), 'utf8');
//     const template = JSON.parse(json);
//     console.log(template);
//   }

//   generateMail('promotion');

import fs from 'fs/promises';

async function generateMail(status) {
  const nameTemplate = `template${status.charAt(0).toUpperCase()}${status.slice(1)}.json`;
  const filePath = `./mails/${nameTemplate}`;

  const data = await fs.readFile(new URL(filePath, import.meta.url));
  const json = JSON.parse(data.toString());
  console.log(`${json.headline}\n${json.body}\n${json.signature}`);
}

generateMail('promotion');
