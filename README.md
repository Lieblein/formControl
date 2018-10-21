# `HTC Project Stub (react-redux)`

### Из коробки в стабе проекта вы найдёте для себя:

* готовую архитектуру redux приложения
* поддержку стандарта `es6` (stage-0 es-2015)
*  фиксированный `кодстайл ts и pcss` файлов
*  поддержку `post-css`
    - `calc`
    - `custom-media`
    - `custom-properties`
    - `import`
    - `nested`
    - `url`
    - `mixins`
* `superagent` для запросов к серверу
* `роутинг` (react-router)
* `redux-dev-tools`
* `react hot module replacement`
* `unit`-тесты
* уверенность в предстоящем проекте

## npm команды
- `npm run start` - для разработки
- `npm run build` - сборка билда
- `npm run test` - запуск тестов
- `npm run lint` - проверка кодстайла `ts и css`
- `npm run lint-ts` - проверка кодстайла `ts` + `tsx`
- `npm run lint-css` - проверка кодстайла `только css`

## Дополнительная информация
- `webpack` как система сборки
- сборка проекта сгенерирует вам каталог `build` в котором будет `index.html` (см. документацию к webpack `html-webpack-plugin`) и каталог `assets` с ресурсами приложения

## Unit-тесты
Для написания unit-тестов в проекте есть [jest](https://jestjs.io/docs/en/getting-started) + [enzyme](http://airbnb.io/enzyme/docs/api/).
При наличии тестов рекомендуется настроить их запуск перед commit-ом. Для этого поправьте скрипт для `precommit`-а в `package.json`.
```json
"scripts": {
    "precommit": "npm run test && lint-staged",
    "test": "jest --silent",
    "test-log": "jest",
    ...
  },
```
Пример простого теста для главной страницы на данном стеке (`./src/components/page-main/page-main.test.jsx`):
```jsx
import React from 'react';
import { mount } from 'enzyme';

import PageMain from './page-main';

describe('PageMain', () => {
    test('.page-main should exists', () => {
        const wrapper = mount(<PageMain />);
        const page = wrapper.find('.page-main');
        expect(page.length).toBe(1);
    });
});
```

# `ATTENTION`
 Если у вас есть предложения по улучшению проекта - оформляем `merge-request` с указанием в ревью как `минимум 2х разработчиков` вашего, или более высокого уровня.
 `Только после` прохождения ревью, мэйнтейнеры стаба сливают изменения в мастер.
