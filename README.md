# Серверное приложение dead-code-finder

Используется `ts-node`

Команды запуска:

```
npm i
npx ts-node ./scripts/main.ts --help
```

## Разработка

### Поддерживаемая верстка в проекте

- В исследуемом проекте, для верстки проекта используется препроцессор
  Sass(SCSS). Используется подход реализующий CSS-modules. Все файлы стилей
  должны именоваться согласно документации: `*.module.scss`. Структура файлов
  SCSS должна быть следующей:

```scss
// MenuItem

// Variables
// =========

// Selectors
// =========

// MediaQueries
// ============
```

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
