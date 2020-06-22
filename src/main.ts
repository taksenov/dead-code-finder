import Params from './utils/Params';
import collectFiles from './utils/CollectFiles';
import definedClassesFromSCSS from './utils/DefinedClassesFromSCSS';
import usedClassesFromJS from './utils/UsedClassesFromJS';

import checkUnreachableSCSS from './rules/CheckUnreachableSCSS';
import checkUnreachableSCSSClasses from './rules/CheckUnreachableSCSSClasses';

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

// Собрать информацию обо всех объявленных селекторах в проекте
let scssFilesArr: string[] = [];

scssFilesArr = collectFiles(inDir as string, '.scss');

const definedSelectors = scssFilesArr.flatMap((_, index) => {
  const result = definedClassesFromSCSS(scssFilesArr[index]);
  return result;
});

// Собрать из JS -файлов информацию обо всех импортированных SCSS файлах
// и обо всех использованных в них SCSS className
let tsxFilesArr: string[] = [];

tsxFilesArr = collectFiles(inDir as string, '.tsx');

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

// Поиск не достижимых SCSS файлов
const unreachableSCSS = checkUnreachableSCSS(scssFilesArr, usedSelectors);
const { unreachFilesCount = 0, unreachFiles = [] } = unreachableSCSS;
if (unreachFilesCount > 0) {
  console.warn('Внимание!'.toUpperCase());
  console.log('Обнаружены не используемые SCSS файлы:');
  console.log(' ');
  unreachFiles.forEach(file => console.log(file));
  console.log('____________________________________');
  console.log(' ');
}

// Поиск не достижимых SCSS классов
const unreachableSCSSClasses = checkUnreachableSCSSClasses(
  definedSelectors,
  usedSelectors,
);
if (unreachableSCSSClasses.length > 0) {
  console.warn('Внимание!'.toUpperCase());
  console.log('Обнаружены не используемые SCSS классы:');
  unreachableSCSSClasses.forEach(item => {
    const { selector, start, end, sourceFile } = item;
    console.log(' ');
    console.log(
      `  - Селектор: ${selector} [${start.line}:${start.column} - ${end.line}:${end.column}]`,
    );
    console.log(`    ${sourceFile}`);
    console.log(' ');
  });
  console.log('____________________________________');
  console.log(' ');
}
