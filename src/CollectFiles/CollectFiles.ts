import * as fs from 'fs';
import * as path from 'path';

/**
 * Собрирает массив файлов, фильтруя их по расширению
 *
 * @param {string} base
 * @param {string} ext
 * @returns
 */
const collectFiles: (b: string, e: string) => string[] = (
  base: string,
  ext: string,
) => {
  try {
    let tempArr: string[] = [];

    const recurFunc = (base: string) => {
      const files = fs.readdirSync(base);

      files.forEach(item => {
        const localBase = path.join(base, item);
        const state = fs.statSync(localBase);

        if (state.isDirectory()) {
          recurFunc(localBase);
        } else {
          if (path.extname(localBase).toUpperCase() === ext.toUpperCase()) {
            tempArr.push(localBase);
          }
        }
      });
    };

    recurFunc(base);

    return tempArr;
  } catch (err) {
    console.error(err);
    throw new Error('HANDLE_COMBINE_FILES_ERROR');
  }
};

export default collectFiles;
