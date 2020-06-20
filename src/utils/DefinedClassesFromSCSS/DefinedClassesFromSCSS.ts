import * as fs from 'fs';

import scssParse from 'postcss-scss/lib/scss-parse';

import { ISelectors } from '../../models';

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
        {
          selector,
          start,
          end,
          parentType,
          sourceFile: filepath,
          isClassUsed: false,
        },
      ];
    }

    selectors = [...new Set(selectors)];
  });

  return selectors;
};

export default definedClassesFromSCSS;
