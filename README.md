# Серверное приложение dead-code-finder

Используется `ts-node`

Команды запуска:

```
npm i
npx ts-node ./src/main.ts --help
```

## Поддерживаемая архитектура

Работает с [модульным CSS](https://github.com/css-modules/css-modules) в
парадигме разработки предлагаемой
[Create React App](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet)

## Правила проверок

Поддерживаются правила:

- Правило для проверки наличия в кодовой базе SCSS файлов, которые не достижимы
  (не импортированы ни в одном JS файле)
- Правило для проверки наличия в кодовой базе классов которые объявленны в SCSS
  файлах, но не достижимы (не используются в JS файлах в которые импортируются
  их SCSS модули)

## Результат работы

Пример вывода в консоль:

```
ВНИМАНИЕ!
Обнаружены не используемые SCSS файлы:

/.../src/app/views/AppRouter/AppRouter.module.scss
/.../src/app/views/Extruders/Modal/components/ModalSettings/ModalSettings.module.scss
...
/.../src/app/views/Workpiece/Workload/components/WorkloadForm/WorkloadForm.module.scss
____________________________________

ВНИМАНИЕ!
Обнаружены не используемые SCSS классы:

  - Селектор: inputBorder [18:1 - 24:1]
    /.../src/app/shared/components/DateField/DateField.module.scss


  - Селектор: noBottomPadding [30:1 - 32:1]
    /.../src/app/shared/components/DateField/DateField.module.scss

  ...

  - Селектор: rightLabel [51:1 - 56:1]
    /.../src/app/shared/components/DateField/DateField.module.scss
```

## Разработка

### Commits

- Разработка: для унификации текста коммитов взяты теги из библиотеки
  [commitizen](http://commitizen.github.io/cz-cli/)

```
feat:         A new feature
fix:          A bug fix
docs:         Documentation only changes
style:        Changes that do not affect the meaning of the code
              (white-space, formatting, missing semi-colons, etc)
prettier:     ---//---
code-style:   ---//---
refactor:     A code change that neither fixes a bug or adds a feature
perf:         A code change that improves performance
test:         Adding tests, update tests, etc
chore:        Changes to the build process or auxiliary tools and libs
db:           Actions with Mongo DataBase
```

- В будущем можно попробовать автоматизировать чейндж логи и версионирование
  через данную библиотеку.
- В процессе разработки можно дополнять теги коммитов.
