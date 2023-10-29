import fs from 'fs/promises';

function hyphenate(name) {
  return name.toLowerCase().replace(/\s/g, '-');
}

function createPackagJson(root, nameProject) {
  const pojo = {
    type: 'module',
    name: nameProject,
    version: '1.0.0',
    description: '',
    main: 'src/main.js',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
    },
    keywords: [],
    dependencies: {},
    license: 'ISC',
    author: 'Jackson Rico',
    nodemonConfig: {
      events: {
        start: 'clear',
      },
    },
  };
  fs.writeFile(`${root}/package.json`, JSON.stringify(pojo, null, 2));
}

function createLibJs(root) {
  fs.writeFile(`${root}/src/lib.js`, '// aca va  mis funciones');
}
function createMainJs(root) {
  const content = `import lib from './lib.js';`;
  fs.writeFile(`${root}/src/main.js`, content);
}

function createReadme(root) {
  fs.writeFile(`${root}/README.md`, '# Titulo');
}

// Remove this line since 'fs' is already imported in the code above
// import fs from 'fs/promises';

async function main(nameProject) {
  const nameHyphenate = hyphenate(nameProject);
  try {
    await fs.access(nameHyphenate);
    console.error(`Directory ${nameHyphenate} already exists`);
    return fs.rm(nameHyphenate, { recursive: true });
  } catch (error) {
    // Directory does not exist, continue creating project
    console.log(`Creating project ${nameHyphenate}`);
  }
  await fs.mkdir(nameHyphenate);
  await fs.mkdir(`${nameHyphenate}/src`);
  createPackagJson(nameHyphenate, nameHyphenate);
  createLibJs(nameHyphenate);
  createMainJs(nameHyphenate);
  createReadme(nameHyphenate);
}

main('test project');
