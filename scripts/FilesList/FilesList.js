const fs = require('fs');
const path = require('path');
// const Parameters = require('./Parameters');
import Parameters from '../Params';

const execParams = process.argv;
const checkParams = new Parameters();

// инициализация и проверка параметров
const helpParam = checkParams.handleCheckHelpParam('--help', execParams);
if (helpParam.status === true) {
  console.log(helpParam.body);
  process.exit();
}
const inputParam = checkParams.handleCheckWorkParams('--input=', execParams);
const outputParam = checkParams.handleCheckWorkParams('--output=', execParams);
const deleteParam = checkParams.handleCheckWorkParams('--delete', execParams);
if (!inputParam.status || !outputParam.status) {
  console.log(
    'Не указаны обязательные параметры "--input" и "--output". Воспользуйтесь параметром "--help" для справки',
  );
  process.exit();
}
if (outputParam.status) {
  if (fs.existsSync(outputParam.body) === false) {
    fs.mkdirSync(outputParam.body);
  } else if (fs.readdirSync(outputParam.body).length !== 0) {
    console.log(`Каталог --output=${outputParam.body} должен быть пустым`);
    process.exit();
  }
}
// инициализация и проверка параметров

// установка переменных из параметров
const inDir = inputParam.body;
const outDir = outputParam.body;
const isDelete = deleteParam.status;
// установка переменных из параметров

// handlers for file sorting programs ============================================================
let dirsArr = [];
let copyPromices = [];

/**
 * Вспомогательная функция, набивает массив промисами обрабатывающими поток чтения-записи
 *
 * @param {string} source               --откуда копировать
 * @param {string} dest                 --куда копировать
 */
function copyFile(source, dest) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(source).pipe(fs.createWriteStream(dest));

    stream.on('close', () => {
      resolve();
    });
    stream.on('error', () => {
      reject(new Error('COPY_FILE_ERROR'));
    });
  });
} //copyFile

const handleCombineMusicCollection = (base, outBase) => {
  return new Promise((resolve, reject) => {
    try {
      const recurFunc = (base, outBase) => {
        const files = fs.readdirSync(base);

        let firstLetterTemp = '';
        let dirTemp;
        let tempDirFileName;

        files.forEach(item => {
          let localBase = path.join(base, item);
          let state = fs.statSync(localBase);

          if (state.isDirectory()) {
            recurFunc(localBase, outBase);
          } else {
            if (path.extname(localBase).toUpperCase() === '.MP3') {
              firstLetterTemp = path
                .basename(localBase)
                .slice(0, 1)
                .toUpperCase();

              if (dirsArr.indexOf(firstLetterTemp) === -1) {
                dirsArr.push(firstLetterTemp);
                dirTemp = path.resolve('' + outBase, './' + firstLetterTemp);
                tempDirFileName = path.resolve('' + dirTemp, './' + item);
                fs.mkdirSync(dirTemp);
                copyPromices.push(copyFile(localBase, tempDirFileName));
              } else {
                dirTemp = path.resolve('' + outBase, './' + firstLetterTemp);
                tempDirFileName = path.resolve('' + dirTemp, './' + item);
                copyPromices.push(copyFile(localBase, tempDirFileName));
              }
            }
          }
        });
      };

      recurFunc(base, outBase);
    } catch (err) {
      console.error(err);
      reject(new Error('HANDLE_COMBINE_MUSIC_COLLECTION_ERROR'));
    }
  });
}; //handleCombineMusicCollection

const handleDeleteFilesInInputDir = (base, deleteFlag) => {
  return new Promise((resolve, reject) => {
    try {
      if (!deleteFlag) {
        resolve();
        return;
      }
      const recurFunc = base => {
        let files = fs.readdirSync(base);

        files.forEach(item => {
          let localBase = path.join(base, item);
          let state = fs.statSync(localBase);
          if (state.isFile()) {
            fs.unlinkSync(localBase);
          } else if (state.isDirectory()) {
            recurFunc(localBase);
          }
        });
      };
      recurFunc(base);

      resolve(base);
    } catch (err) {
      console.error(err);
      reject(new Error('HANDLE_DELETE_FILES_IN_INPUT_DIR_ERROR'));
    }
  });
}; //handleDeleteFilesInInputDir

const handleDeleteInputDir = base => {
  return new Promise((resolve, reject) => {
    try {
      if (!base) {
        resolve();
        return;
      }

      const cleanEmptyFoldersRecursively = folder => {
        var files = fs.readdirSync(folder);

        if (files.length > 0) {
          files.forEach(function (file) {
            var fullPath = path.join(folder, file);
            cleanEmptyFoldersRecursively(fullPath);
          });

          // re-evaluate files; after deleting subfolder
          // we may have parent folder empty now
          files = fs.readdirSync(folder);
        }

        if (files.length === 0) {
          fs.rmdirSync(folder);
          return;
        }
      };

      cleanEmptyFoldersRecursively(base);
      resolve(base);
    } catch (err) {
      console.error(err);
      reject(new Error('HANDLE_DELETE_INPUT_DIR_ERROR'));
    }
  });
};
// handlers for file sorting programs ============================================================

// main code thread ==============================================================================
handleCombineMusicCollection(inDir, outDir);

Promise.all(copyPromices).then(() => {
  handleDeleteFilesInInputDir(inDir, isDelete).then(data => {
    handleDeleteInputDir(data);
  });
});
// main code thread ==============================================================================