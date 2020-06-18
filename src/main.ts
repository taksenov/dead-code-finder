// IDEA:
// Запуск
// macOS = npx ts-node ./src/main.ts --input=/Users/taksenov/work/my/dead-code-finder/testApp/
// linux = npx ts-node ./src/main.ts --input=/home/taksenov/work/my/dead-code-finder/testApp/

// import * as fs from 'fs';
// import * as path from 'path';

import Params from './Params';
import collectFiles from './CollectFiles';
// import definedClassesFromSCSS from './DefinedClassesFromSCSS';
import usedClassesFromJS from './UsedClassesFromJS';

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

// let scssFilesArr: string[] = [];
let tsxFilesArr: string[] = [];

// scssFilesArr = collectFiles(inDir as string, '.scss');
// console.log(scssFilesArr);

// const selectors = definedClassesFromSCSS(scssFilesArr[0]);
// console.log(selectors);

tsxFilesArr = collectFiles(inDir as string, '.tsx');
console.log(tsxFilesArr);

const selectors = usedClassesFromJS(tsxFilesArr[0]);
console.log(selectors[0].imports);
console.log(selectors[0].classes);
