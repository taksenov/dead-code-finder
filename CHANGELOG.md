## 0.0.7 - 2020-06-20

Функциональность версии основывается на следующей задаче:
[DCP-18](https://github.com/taksenov/dead-code-finder/issues/18)

Pull request: ([#22](https://github.com/taksenov/dead-code-finder/pull/22))

### Добавлено

- Разработка: добавлен функциональный компонент
  `src/rules/CheckUnreachableSCSSClasses/CheckUnreachableSCSSClasses.ts` правило
  для проверки наличия в кодовой базе классов которые объявленны в SCSS файлах,
  но не достижимы (не используются в JS файлах в которые импортируются их SCSS
  модули)

## 0.0.6 - 2020-06-20

Функциональность версии основывается на следующей задаче:
[DCP-16](https://github.com/taksenov/dead-code-finder/issues/16)

Pull request: ([#17](https://github.com/taksenov/dead-code-finder/pull/17))

### Добавлено

- Разработка: добавлен функциональный компонент
  `src/rules/CheckUnreachableSCSS/CheckUnreachableSCSS.ts` правило для проверки
  наличия в кодовой базе SCSS файлов, которые не достижимы (не импортированы ни
  в одном JS файле)

### Изменено

- Разработка: Модули, в зависимости от их логической нагрузки, разнесены по
  каталогам: `models`, `rules`, `utils`

### Удалено

- Разработка: удалены старые версии js-файлов, которые представляли собой идею
  реализации проекта и по сути являлись пре-альфа версией

## 0.0.5 - 2020-06-19

Функциональность версии основывается на следующей задаче:
[DCP-14](https://github.com/taksenov/dead-code-finder/issues/14)

Pull request: ([#15](https://github.com/taksenov/dead-code-finder/pull/15))

### Добавлено

- Библиотека:
  [@typescript-eslint/parser@3.3.0](https://github.com/typescript-eslint/typescript-eslint)
  для парсинга js, ts, jsx, tsx кода в AST
- Библиотека:
  [@typescript-eslint/experimental-utils@3.3.0](https://github.com/TypeStrong/ts-node)
  для получения типов TypeScript с последущим применением для типизации
  `shared libs` из `eslint`
- Библиотека:
  [@typescript-eslint/typescript-estree@3.3.0](https://github.com/typescript-eslint/typescript-eslint)
  парсер в AST
- Разработка: добавлен функциональный компонент
  `src/UsedClassesFromJS/UsedClassesFromJS.ts` собирает массив с объектами с
  информацией об импортированных SCSS файлах? а так же классах SCSS объявленных
  в JSX разметке

### Изменено

- Библиотека: [eslint@6.8.0](https://github.com/eslint/eslint) перемещено в
  раздел `dependency`, т.к. в проекте используется парсер и посетитель узлов AST

## 0.0.4 - 2020-06-17

Функциональность версии основывается на следующей задаче:
[DCP-12](https://github.com/taksenov/dead-code-finder/issues/12)

Pull request: ([#13](https://github.com/taksenov/dead-code-finder/pull/13))

### Добавлено

- Библиотека: [typescript@3.9.5](https://github.com/Microsoft/TypeScript) для
  написания строго типизированного (по возможности) кода
- Библиотека: [ts-node@8.10.2](https://github.com/TypeStrong/ts-node) для
  запуска кода написанного на TypeScript
- Библиотека: [postcss@7.0.32](https://github.com/postcss/postcss) родительская
  библиотека по отношению к `postcss-scss`
- Библиотека: [postcss-scss@2.1.1](https://github.com/postcss/postcss-scss) для
  парсинга и получения информации об объявленных в SCSS файлах классах
- Разработка: добавлен классовый компонент `src/Params` для парсинга параметров
  командной строки при запуске основного скрипта `main.ts`
- Разработка: добавлен функциональный компонент `src/CollectFiles` для
  рекурсивного сбора списка затребованных типов файлов в указанном каталоге.
  Собирает массив строк содержащих полные пути до требуемых файлов, фильтруемых
  по расширению
- Разработка: добавлен функциональный компонент `src/DefinedClassesFromSCSS`
  собирает массив с объектами с информацией об объявленных в SCSS файлах классах

## 0.0.3 - 2020-01-12

Функциональность версии основывается на следующей задаче:
[DCP-9](https://github.com/taksenov/dead-code-finder/issues/9)

Pull request: ([#10](https://github.com/taksenov/dead-code-finder/pull/10))

### Добавлено

- Разработка: добавлен каталог с документацией `docs`

## 0.0.2 - 2020-01-12

Функциональность версии основывается на следующей задаче:
[DCP-3](https://github.com/taksenov/dead-code-finder/issues/3)

Pull request: ([#4](https://github.com/taksenov/dead-code-finder/pull/4))

### Добавлено

- Разработка: добавлена локальная папка с проектом, для которого необходимо
  будет искать не используемый CSS и JS код. Т.к. папка содержит код из NDA
  проекта, то она заигнорена внутри `.gitignore`

## 0.0.1 - 2020-01-12

### Добавлено

- Разработка: добавлены настроечные файлы для поодержания разработки:
  `codeeditor`, `prettier`, `linter` и т.д.
