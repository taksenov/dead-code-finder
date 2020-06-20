import { IUsedClasses, ISelectors } from '../../models';

/**
 * Правило для проверки наличия в кодовой базе классов которые объявленны в SCSS файлах,
 * но не достижимы (не используются в JS файлах в которые импортируются их SCSS модули)
 *
 * @param {ISelectors[]} flatDefinedSelectors
 * @param {IUsedClasses[]} usedSelectors
 * @returns {IUnreachableSCSS}
 */
const checkUnreachableSCSSClasses: (
  s: ISelectors[],
  c: IUsedClasses[],
) => ISelectors[] = (
  flatDefinedSelectors: ISelectors[],
  usedSelectors: IUsedClasses[],
) => {
  let result = [...flatDefinedSelectors];

  usedSelectors.forEach(item => {
    const { classes } = item;

    classes.forEach(cls => {
      const { usedClassName, stylesFilename } = cls;

      let newStylesFilename = stylesFilename.replace('../', '/');
      newStylesFilename = newStylesFilename.replace('./', '/');

      result = result.map(item => {
        const { selector, sourceFile } = item;

        if (
          sourceFile.includes(newStylesFilename) &&
          selector === usedClassName
        ) {
          return { ...item, isClassUsed: true };
        }

        return { ...item };
      });
    });
  });

  result = [...result.filter(x => !x.isClassUsed)];

  return result;
};

export default checkUnreachableSCSSClasses;
