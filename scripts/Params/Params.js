/**
 * Проверка параметров запуска
 *
 * @type {Class}
 * return {Object} = {status:@boolean, body:@string}
 */
class Parameters {
  _setParam(checkParam, params) {
    let checkLength, thisParam;
    checkLength = checkParam.length;
    thisParam = params.slice(checkLength);
    return thisParam;
  }

  _checkParams(checkParam, params, message) {
    let unknownResult;
    for (let i = 0, maxLength = params.length; i < maxLength; i++) {
      if (params[i].indexOf(checkParam) !== -1) {
        switch (checkParam) {
          case '--help':
            return {
              status: true,
              body: message,
            };
          case '--input=':
            return {
              status: true,
              body: this._setParam(checkParam, params[i]),
            };
          case '--output=':
            return {
              status: true,
              body: this._setParam(checkParam, params[i]),
            };
          case '--delete':
            return { status: true, body: 'DELETE_INPUT_FOLDER' };
          default:
            return { status: false, body: undefined };
        }
      } else if (params[i].indexOf(checkParam) === -1) {
        unknownResult = { status: false, body: undefined };
      }
    }

    return unknownResult;
  }

  handleCheckHelpParam(checkParam, execParams) {
    let obj = this._checkParams(
      checkParam,
      execParams,
      `Правила использования:
    --input=PATH_NAME    -- указывается полный путь к каталогу, который требует сортировки;
    --output=PATH_NAME   -- указывается полный путь к каталогу, в котором будет отсортированная музыка;
    --delete             -- удалить каталог input;
    --help               -- справка.

    Последовательность установки параметров любая.
    Параметр '--help' имеет максимальный приоритет.
    Не документированные параметры игнорируются.
    Сортируются файлы с расширением MP3.`,
    );

    return obj;
  }

  handleCheckWorkParams(checkParam, execParams) {
    let obj = this._checkParams(checkParam, execParams, '');

    return obj;
  }
}

export default Parameters;
