/* eslint-disable prefer-object-spread */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-useless-constructor */

import * as fs from 'fs';

import {
  parse as parseToTree,
  TSESTreeOptions,
  TSESTree,
  AST,
} from '@typescript-eslint/typescript-estree';
import Traverser from 'eslint/lib/shared/traverser';

// Настройки (опции) для парсинга
const opts = {
  range: true,
  loc: false,
  tokens: false,
  comment: false,
  useJSXTextNode: false,
  jsx: true,
};

/**
 * Парсинг исходного кода (.js, .ts, .tsx, .jsx) в AST дерево формата eslint
 *
 * @param {string} source
 * @param {TSESTreeOptions} [options]
 * @returns {AST<TSESTreeOptions>}
 */
const parseSource = (
  source: string,
  options?: TSESTreeOptions,
): AST<TSESTreeOptions> => {
  try {
    const program = parseToTree(source, options);

    return program;
  } catch (error) {
    console.log(error);
    throw new Error('TS_PARSER_ERROR');
  }
};

/**
 * Собирает информацию об используемых SCSS классах, из указанного файла, в массив
 *
 * @param {string} filepath
 */
// TODO: Типизировать вывод функции
const usedClassesFromTSX: (f: string) => any[] = (filepath: string) => {
  const sourceCode = fs.readFileSync(filepath, 'utf-8');

  const AST = parseSource(sourceCode, opts);

  const traverser = new Traverser();

  const visited: any[] = [];

  traverser.traverse(AST, {
    enter: (node: TSESTree.Node) => {
      if (node.type === 'JSXAttribute') {
        const { name } = node;
        const { type, name: innerName } = name;

        if (type === 'JSXIdentifier' && innerName === 'className') {
          // TODO: Собрать информаци об использованном внутри классе.
          // IDEA: Обязательно нужно учесть использование classnames

          // JSXExpressionContainer"
          // "MemberExpression"
          // "Identifier"
          // "styles"
          // "Identifier"
          // "noHorizontalMarginsForMobile"
          // false

          console.log('NODE JSXElement=', node);
        }
      }

      visited.push(node.type);
    },
    visitorKeys: Object.assign({}, Traverser.DEFAULT_VISITOR_KEYS, {
      ClassDeclaration: Traverser.DEFAULT_VISITOR_KEYS.ClassDeclaration.concat([
        'experimentalDecorators',
      ]),
    }),
  });

  // console.log('visited=', visited);
  return visited;
};

export default usedClassesFromTSX;
