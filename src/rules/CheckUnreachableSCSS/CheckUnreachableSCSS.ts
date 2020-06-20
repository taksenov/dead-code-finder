import { IUsedClasses, IImports } from '../../models';

interface IUnreachableSCSS {
  unreachFilesCount: number;
  unreachFiles: string[];
}

/**
 * Правило для проверки наличия в кодовой базе SCSS файлов,
 * которые не достижимы (не импортированы ни в одном JS файле)
 *
 * @param {string[]} scssFilesArr
 * @param {IUsedClasses[]} usedSelectors
 * @returns {IUnreachableSCSS}
 */
const checkUnreachableSCSS: (
  s: string[],
  c: IUsedClasses[],
) => IUnreachableSCSS = (
  scssFilesArr: string[],
  usedSelectors: IUsedClasses[],
) => {
  let unreachFilesCount = 0;
  let unreachFiles: string[] = [];

  scssFilesArr.forEach(fileName => {
    let arrMain: IImports[] = [];

    usedSelectors.forEach(item => {
      const { imports } = item;

      let arr: IImports[] = [];

      imports.forEach(imprt => {
        const { stylesFilename } = imprt;

        let newStylesFilename = stylesFilename.replace('../', '/');
        newStylesFilename = newStylesFilename.replace('./', '/');

        if (!fileName.includes(newStylesFilename)) {
          return;
        }

        arr = [...arr, imprt];
      });

      arrMain = [...arrMain, ...arr];
    });

    if (arrMain.length === 0) {
      unreachFilesCount += 1;

      unreachFiles = [...unreachFiles, fileName];
    }
  });

  const result = { unreachFilesCount, unreachFiles };

  return result;
};

export default checkUnreachableSCSS;
