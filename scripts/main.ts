// IDEA:
// Запуск = npx ts-node ./scripts/main.ts --input=/Users/taksenov/work/my/dead-code-finder/testApp/

// import * as fs from 'fs';
// import * as path from 'path';

import Params from './Params';
import collectFiles from './CollectFiles';

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
