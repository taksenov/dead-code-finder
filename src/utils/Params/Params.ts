import {
  INPUT_PARAM,
  OUTPUT_PARAM,
  DELETE_PARAM,
  HELP_PARAM,
} from '../../constants';

/**
 * Интерфейс с описанием типов возвращаемого результат
 *
 * @interface IParamsResult
 */
interface IParamsResult {
  status: boolean;
  body: string | null;
}

/**
 * Проверка параметров запуска
 *
 * @type {Class}
 * return {Object} = {status:@boolean, body:@string}
 */
class Params {
  private setParam: (c: string, p: string) => string = (
    checkParam: string,
    params: string,
  ) => {
    const checkLength = checkParam.length;
    const thisParam = params.slice(checkLength);

    return thisParam;
  };

  private checkParams: (c: string, p: string[], m: string) => IParamsResult = (
    checkParam: string,
    params: string[],
    message: string,
  ) => {
    let result: IParamsResult = { status: false, body: null };

    for (let i = 0, maxLength = params.length; i < maxLength; i++) {
      if (params[i].indexOf(checkParam) !== -1) {
        switch (checkParam) {
          case HELP_PARAM:
            return {
              status: true,
              body: message,
            };
          case INPUT_PARAM:
            return {
              status: true,
              body: this.setParam(checkParam, params[i]),
            };
          case OUTPUT_PARAM:
            return {
              status: true,
              body: this.setParam(checkParam, params[i]),
            };
          case DELETE_PARAM:
            return { status: true, body: 'DELETE_INPUT_FOLDER' };
          default:
            return { status: false, body: null };
        }
      } else if (params[i].indexOf(checkParam) === -1) {
        result = { status: false, body: null };
      }
    }

    return result;
  };

  handleCheckHelpParam(
    checkParam: string,
    execParams: string[],
  ): IParamsResult {
    const obj = this.checkParams(
      checkParam,
      execParams,
      `Правила использования:
    ${INPUT_PARAM}PATH_NAME    -- указывается полный путь к каталогу, который требует проверки;
    ${HELP_PARAM}               -- справка.

    Последовательность установки параметров любая.
    Параметр '--help' имеет максимальный приоритет.
    Не документированные параметры игнорируются.`,
    );

    return obj;
  }

  handleCheckWorkParams(
    checkParam: string,
    execParams: string[],
  ): IParamsResult {
    const obj = this.checkParams(checkParam, execParams, '');

    return obj;
  }
}

export default Params;
