# Социальная AR-галерея с чат-ботом помощником 👋

Это будет приложение, в котором пользователи создают, делятся и взаимодействуют с дополненной реальностью (AR) — виртуальными объектами и фильтрами, наложенными на реальный мир, а также общаются через умного чат-бота.

Функции для реализации:

AR-отображение с использованием камеры телефона (Expo AR, ViroReact)

Интерактивный умный чат-бот помощник с ИИ, который помогает использовать app (например, GPT-подобный ассистент)

Возможность создать и настроить свои AR-объекты (простые фильтры, стикеры, 3D-модели)

Социальный функционал: публикации AR-контента, лайки, комментарии, подписки

Тёмная тема и минималистичный адаптивный UI (тренд дизайна 2025)

Голосовое управление/команды для взаимодействия с приложением (эксперимент)

## Backend:

AR-приложения и чат-бота Firebase Authentication для пользователей,
Cloud Storage для AR-активов,
Cloud Firestore для данных и
Cloud Functions для логики чат-бота и обработки AR-контента.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## linter prettier install

### Настройка ESLint:

Установите ESLint как dev-зависимость:

npm install eslint --save-dev.

Инициализируйте конфигурацию:

eslint --init

Выберите подходящий стиль, либо создайте файл .eslintrc.json.

### Настройка Prettier:

Установите Prettier: npm install --save-dev --save-exact prettier.

Создать файл .prettierrc.json для конфигурации форматирования (например, ширина табуляции, переносы строк).

{
"trailingComma": "es5",
"tabWidth": 2,
"semi": false,
"singleQuote": true,
"jsxSingleQuote": true,
"bracketSpacing": true,
"arrowParens": "always",
"printWidth": 80,
"endOfLine": "auto"
}

Объяснение параметров:

trailingComma: "es5" — добавлять висящие запятые там, где это допустимо по стандарту ES5.

tabWidth: 2 — ширина таба в пробелах.

semi: false — не ставить точку с запятой в конце строк.

singleQuote: true — использовать одинарные кавычки.

jsxSingleQuote: true — также использовать одинарные кавычки в JSX.

bracketSpacing: true — ставить пробелы внутри фигурных скобок.

arrowParens: "always" — всегда ставить скобки у стрелочных функций с одним аргументом.

printWidth: 80 — максимальная длина строки.

endOfLine: "auto" — переносы строк определяются автоматически в зависимости от ОС.

### Отключить правила ESLint, конфликтующие с Prettier:

Для этого установите eslint-config-prettier и добавьте "prettier" в extends ESLint конфиг.

npm install --save-dev eslint-config-prettier

Добавить в файл .eslintrc.json или eslint.config.js или eslint.config.mts в раздел extends строку "prettier" в самый конец массива:

"extends": [
"eslint:recommended",
"plugin:react/recommended",
"prettier"
]

или

в новой Flat конфигурации ESLint:

const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
...
eslintPluginPrettierRecommended,
]);

Это отключит все правила ESLint, которые могут конфликтовать с Prettier, и позволит использовать Prettier как основной форматировщик.

### Для удобства можно использовать eslint-plugin-prettier:

В новой Flat конфигурации ESLint - этого делать уже не нужно

Интегрирует Prettier правила в ESLint.

npm install --save-dev eslint-plugin-prettier

Добавьте в .eslintrc.json в раздел plugins:

"plugins": ["prettier"]

Если вы уже установили и настроили eslint-config-prettier, то установка eslint-plugin-prettier даст дополнительное удобство:

Prettier интегрируется в процесс линтинга, и ошибки форматирования будут видны вместе с другими ошибками ESLint.

Можно запускать исправление форматирования с помощью команды eslint с флагом --fix.

Это объединяет проверку и форматирование в одном инструменте.

### Настройте скрипты в package.json,

"lint": "eslint .",

"lint:fix": "eslint . --fix",

"format": "prettier --write ."

### Husky и lint-staged:

Автоматизируйте запуск линтера и форматтера перед коммитом с помощью Husky и lint-staged, чтобы проверить и поправить код автоматически.

Дополнительно:

### В редакторе кода (VS Code) установите расширения ESLint и Prettier

Для автоматического подсвечивания ошибок и форматирования.

### Настройте автоформатирование при сохранении файла в VS Code.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
