import * as fs from 'fs';

import scssParse from 'postcss-scss/lib/scss-parse';

interface ISelectors {
  selector: string;
  start: IPosition;
  end: IPosition;
  file: string;
  parentType: string;
}

interface IPosition {
  line: number;
  column: number;
}

/**
 * Собрирает все SCSS классы, из указанного файла, в массив
 *
 * @param {string} filepath
 * @returns {Array of interface ISelectors}
 */
const definedClassesFromSCSS: (f: string) => ISelectors[] = (
  filepath: string,
) => {
  const sourceCode = fs.readFileSync(filepath, 'utf-8');
  const AST = scssParse(sourceCode);

  let selectors: ISelectors[] = [];

  AST.walkRules(/^\D/, (rule: any) => {
    const { parent, source } = rule;
    const { start, end } = source;
    const { type: parentType } = parent;

    let { selector } = rule;

    if (parentType === 'root' || parentType === 'atrule') {
      selector = selector.replace(/\n/g, '');
      [, selector] = selector.split('.');
      [selector] = selector.split(' ');

      selectors = [
        ...selectors,
        { selector, start, end, parentType, file: filepath },
      ];
    }

    selectors = [...new Set(selectors)];
  });

  return selectors;
};

export default definedClassesFromSCSS;
