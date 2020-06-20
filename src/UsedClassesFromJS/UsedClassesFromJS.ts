import * as fs from 'fs';

import {
  parse as parseToTree,
  TSESTreeOptions,
  TSESTree,
  AST,
} from '@typescript-eslint/typescript-estree';
import Traverser from 'eslint/lib/shared/traverser';

interface IUsedClasses {
  imports: IImports[];
  classes: IClasses[];
}

interface IImports {
  stylesFilename: string;
  importVariable: string;
  sourceFile: string;
}

interface IClasses {
  usedClassName: string;
  importStyleName: string;
  sourceFile: string;
}

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
 * @returns {Array of interface IUsedClasses}
 */
const usedClassesFromJS: (f: string) => IUsedClasses[] = (filepath: string) => {
  const sourceCode = fs.readFileSync(filepath, 'utf-8');
  const AST = parseSource(sourceCode, opts);
  const traverser = new Traverser();

  let classes: IClasses[] = [];
  let imports: IImports[] = [];
  let usedClasses: IUsedClasses[] = [];

  // Посетитель всех узлов AST
  traverser.traverse(AST, {
    enter: (node: TSESTree.Node) => {
      // Все импорты SCSS
      if (node.type === 'ImportDeclaration') {
        const { source, specifiers } = node;
        const { value = '' } = source;
        const stylesFilename = String(value);
        const [spec] = specifiers;
        const { local } = spec;
        const { name } = local;

        if (stylesFilename.includes('.scss')) {
          imports = [
            ...imports,
            { stylesFilename, importVariable: name, sourceFile: filepath },
          ];
        }
      }

      // SCSS Классы в JSX разметке
      if (node.type === 'MemberExpression') {
        const { object, property } = node;
        const { name: importStyleName } = object as TSESTree.Identifier;
        const { name: usedClassName } = property as TSESTree.Identifier;

        imports.forEach(item => {
          const { importVariable } = item;

          if (importStyleName === importVariable) {
            classes = [
              ...classes,
              { usedClassName, importStyleName, sourceFile: filepath },
            ];
          }
        });
      }
    },
    // eslint-disable-next-line prefer-object-spread
    visitorKeys: Object.assign({}, Traverser.DEFAULT_VISITOR_KEYS, {
      ClassDeclaration: Traverser.DEFAULT_VISITOR_KEYS.ClassDeclaration.concat([
        'experimentalDecorators',
      ]),
    }),
  });

  usedClasses = [...usedClasses, { imports, classes }];

  return usedClasses;
};

export default usedClassesFromJS;
