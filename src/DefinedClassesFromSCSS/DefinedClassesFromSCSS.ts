import * as fs from 'fs';

import scssParse from 'postcss-scss/lib/scss-parse';

/**
 * Собрирает все SCSS классы, из указанного файла, в массив
 *
 * @param {string} filepath
 * @returns {Array of strings}
 */
const definedClassesFromSCSS: (f: string) => string[] = (filepath: string) => {
  const sourceCode = fs.readFileSync(filepath, 'utf-8');
  const AST = scssParse(sourceCode);

  let selectors: string[] = [];

  AST.walkRules(/^\D/, (rule: any) => {
    const { parent } = rule;
    const { type: parentType } = parent;

    let { selector } = rule;

    if (parentType === 'root' || parentType === 'atrule') {
      selector = selector.replace(/\n/g, '');
      [, selector] = selector.split('.');

      selectors.push(...selector.split(','));
    }

    selectors = [...new Set(selectors)];
  });

  return selectors;
};

export default definedClassesFromSCSS;
