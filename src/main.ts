// IDEA:
// Запуск
// macOS = npx ts-node ./src/main.ts --input=/Users/taksenov/work/my/dead-code-finder/testApp/
// linux = npx ts-node ./src/main.ts --input=/home/taksenov/work/my/dead-code-finder/testApp/

// import * as fs from 'fs';
// import * as path from 'path';

import Params from './Params';
import collectFiles from './CollectFiles';
import definedClassesFromSCSS from './DefinedClassesFromSCSS';

const execParams = process.argv;
const checkParams = new Params();

const helpParam = checkParams.handleCheckHelpParam('--help', execParams);
if (helpParam.status === true) {
  console.log(helpParam.body);
  process.exit();
}

const inputParam = checkParams.handleCheckWorkParams('--input=', execParams);
if (!inputParam.status) {
  console.log(
    'Не указан обязательный параметр "--input". Воспользуйтесь параметром "--help" для справки',
  );
  process.exit();
}

const inDir = inputParam.body;

let filesArr: string[] = [];

filesArr = collectFiles(inDir as string, '.scss');
console.log(filesArr);

const selectors = definedClassesFromSCSS(filesArr[0]);
console.log(selectors);
