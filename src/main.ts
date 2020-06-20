// IDEA:
// Запуск
// macOS = npx ts-node ./src/main.ts --input=/Users/taksenov/work/my/dead-code-finder/testApp/
// linux = npx ts-node ./src/main.ts --input=/home/taksenov/work/my/dead-code-finder/testApp/

// import * as fs from 'fs';
// import * as path from 'path';

import Params from './utils/Params';
import collectFiles from './utils/CollectFiles';
import definedClassesFromSCSS from './utils/DefinedClassesFromSCSS';
import usedClassesFromJS from './utils/UsedClassesFromJS';

// import checkUnreachableSCSS from './rules/CheckUnreachableSCSS';

import { IUsedClasses } from './models';

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

let scssFilesArr: string[] = [];
let tsxFilesArr: string[] = [];

scssFilesArr = collectFiles(inDir as string, '.scss');
// console.log(scssFilesArr);

const definedSelectors = definedClassesFromSCSS(scssFilesArr[0]);
console.log(definedSelectors);

tsxFilesArr = collectFiles(inDir as string, '.tsx');
// console.log(tsxFilesArr);

let usedSelectors: IUsedClasses[] = tsxFilesArr
  .map((_, index) => {
    return usedClassesFromJS(tsxFilesArr[index]);
  })
  .filter(item => {
    const { imports = [], classes = [] } = item;

    if (imports.length > 0 && classes.length > 0) {
      return true;
    }

    return false;
  });

// const usedSelectors = usedClassesFromJS(tsxFilesArr[0]);
// console.log(usedSelectors[0].imports);
// console.log(usedSelectors[0].classes);
// usedSelectors.forEach((item)=> ())

// console.log(usedSelectors);

// // Поиск не достижимых SCSS файлов
// const unreachableSCSS = checkUnreachableSCSS(scssFilesArr, usedSelectors);
// const { unreachFilesCount = 0, unreachFiles = [] } = unreachableSCSS;
// if (unreachFilesCount > 0) {
//   console.warn('Внимание!');
//   console.log('Обнаружены не используемые SCSS файлы:');
//   unreachFiles.forEach(file => console.log(file));
//   console.log('____________________________________');
// }
