/**
 * Интерфейс с описанием типов возвращаемого результат
 *
 * @interface IParamsResult
 */
interface IParamsResult {
  status: boolean;
  body?: string;
}

/**
 * Проверка параметров запуска
 *
 * @type {Class}
 * return {Object} = {status:@boolean, body:@string}
 */
class Parameters {
  private setParam = (checkParam: string | any[], params: string | any[]) => {
    let checkLength;
    let thisParam;

    checkLength = checkParam.length;
    thisParam = params.slice(checkLength);

    return thisParam;
  };

  private checkParams: (c: string, p: string[], m: string) => IParamsResult = (
    checkParam: string,
    params: string[],
    message: string,
  ) => {
    let result = { status: false, body: undefined };

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
              body: this.setParam(checkParam, params[i]),
            };
          case '--output=':
            return {
              status: true,
              body: this.setParam(checkParam, params[i]),
            };
          case '--delete':
            return { status: true, body: 'DELETE_INPUT_FOLDER' };
          default:
            return { status: false, body: undefined };
        }
      } else if (params[i].indexOf(checkParam) === -1) {
        result = { status: false, body: undefined };
      }
    }

    return result;
  };

  handleCheckHelpParam(
    checkParam: string,
    execParams: string[],
  ): IParamsResult {
    let obj = this.checkParams(
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

  handleCheckWorkParams(
    checkParam: string,
    execParams: string[],
  ): IParamsResult {
    let obj = this.checkParams(checkParam, execParams, '');

    return obj;
  }
}

export default Parameters;
