# 透過 Webpack 建立 React 開發環境

##### Tags: `Webpack`, `React`, `Prettier`, `EsLint`

##### Date: 2023/01/12

## 起頭

在開發一個新專案時，第一道難關就是建立開發環境，<br>
開始 React 專案的方式有很多種，<br>
像是一些常聽到的 toolchain 工具 : [CRA (create-react-app)](https://create-react-app.dev/)、[Vite](https://vitejs.dev/)，<br>
或是使用一些 Framework 如 : [Next.JS](https://nextjs.org/)、[Gatsby](https://www.gatsbyjs.com/)，<br>
詳細可以參考 [官網](https://beta.reactjs.org/learn/start-a-new-react-project) 上的介紹。<br><br>
而這篇文章所使用到的 [Webpack](https://webpack.js.org/) 也是其中之一，<br>
同時這也是我推薦每一位剛接觸前端的朋友可以嘗試的選項，<br>
原因是上述那些如 CRA 或 Next.JS 這些方便的開發工具，<br>
大多都是基於 Webpack 之上的一個產物，<br>
早點接觸 Webpack，<br>
有助於你理解它們在背後幫你處理了哪些麻煩事，<br>
另外若之後你想在專案的打包上做更彈性的調整，<br>
相信 Webpack 會是你的不二之選。<br>

## 工具介紹

工欲善其事，必先利其器，<br>
在開始之前，我們先來一覽等等會用到的工具<br>

| 工具     | 簡述                                                                           |
| -------- | ------------------------------------------------------------------------------ |
| npm      | Node.js 的套件管理工具                                                         |
| Webpack  | 打包工具，能夠將多個資源檔合併成一個檔案                                       |
| Babel    | JavaScript Compiler，能夠轉換一些如 JSX 的 JavaScript 寫法成瀏覽器讀得懂的語法 |
| Eslint   | JavaScript Linter，幫你進行靜態的的語法分析，抓出常見的錯誤                    |
| Prettier | 程式碼格式化工具，可確保你專案中的 Coding Style 一致                           |

## 建立開發環境

### 1. 安裝 EsLint 及 Prettier

[Install EsLint](https://eslint.org/docs/latest/user-guide/getting-started)

```shell
npm init @eslint/config
```

[Install Prettier](https://prettier.io/docs/en/install.html)

```shell
npm install --save-dev --save-exact prettier

npm install --save-dev eslint-config-prettier

echo {}> .prettierrc.json
```

最後整合 EsLint 和 Prettier 這兩者需再稍作一些調整，<br>
可以參考[官方文章](https://prettier.io/docs/en/related-projects.html#eslint-integrations) 的說明，<br>
我這邊是使用 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 來處理。<br>

整體的目的而言，<br>
就是讓 Coding Style 專心交給 Prettier 處理，<br>
而 其餘程式上的寫法檢查 就交給 EsLint 來協助，<br>
下方是產出的結果 ：

**.eslintrc.json**

```JSON
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended", "prettier"],
    "plugins": ["react"],
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
```

**.prettierrc.js**

```JavaScript
module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
};

```

### 2. 安裝 Webpack 及處理 Config 檔設定

[Install Webpack](https://webpack.js.org/guides/getting-started/#basic-setup)

```shell
npm install webpack webpack-cli --save-dev
```

安裝完成後，<br>
接下來我們要建立 Webpack 的 Config 檔，<br>
讓我們能彈性設置專案的打包方式，<br>

-   `entry` : 是指我們要執行打包的進入點。
-   `output` : 則是告訴 webpack 打包後的檔案要輸出到哪。

**webpack.config.js**

```JavaScript
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
```

建立 Config 完成後，<br>
我們分別去建立 `entry` 的 JavaScript 程式碼，
以及在我們 `output` 的 folder `dist` 下，
建立一個 html 來引入我們打包過後的 js 檔。

**/src/index.js**

```JavaScript
const root = document.getElementById("root");

const helloWebpack = document.createElement("h1");
helloWebpack.textContent = "Hello Webpack";

root.appendChild(helloWebpack);
```

**/dist/index.html**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hello React</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="./bundle.js"></script>
    </body>
</html>
```

之後就在我們的 package.json 中加入 bundle 的指令<br>

**package.json**

```json
{
    ...
    "scripts": {
        "build": "webpack --mode='production'",
    },
    ...
}
```

最後執行它，那麼設定一個最基本的 Webpack 就大功告成了～<br>
之後如果要做靜態網站的部署，<br>
就直接將 `dist` 這個 folder 拿去做 Hoisting 就可以了

```
npm run build
```

### 3. 優化我們的開發體驗，Webpack Dev Server

你們可能已經注意到了，<br>
每一次我們異動完 `entry` 的 js 後，<br>
都要再執行一次 `npm run build` 才能使我們的 html 拿到最新版本的 JavaScript，<br>
這一來一回也漸漸消磨我們的耐心，<br>
整個開發體驗多了不少煩躁感～<br>

為了解決這個問題，<br>
推薦大家使用 [Webpack Dev Server]() 這個工具，<br>
每一次我們更動完並按下儲存後，<br>
它就會自動將我們的程式碼打包一次輸出到 `output` 指定的位置，<br>
細節大家可以再去看看它的[文件](https://github.com/webpack/webpack-dev-server)，<br>
這邊就進行最基本的 Dev Server 配置

[Install Webpack](https://webpack.js.org/configuration/dev-server/)

```shell
npm install webpack webpack-cli --save-dev
```

首先在我們的 `webpack.config.js` 加入 Dev Server 的設定<br>

**webpack.config.js**

```JavaScript
const path = require("path");

module.exports = {
    ...,
    devServer: {
        compress: true,
        port: 9000,
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
};
```

並在 package.json 中加入啟動 Dev Server 的指令

**package.json**

```json
{
    ...
    "scripts": {
        "build": "webpack --mode='production'",
        "dev": "webpack serve --mode='development'"
    },
    ...
}
```

這樣你在本機開發上，<br>
只要執行 `npm run dev` 就可以享受舒適的開發體驗，<br>
而 `npm run build` 這個指令，就留到要部署的時候再去執行即可

### 4. 讓瀏覽器讀懂我們的 JavaScript，Babel

舉個例子，<br>
我們在開發時很常使用 module 的方式來管理程式碼，<br>
很常 `import` 來 `export` 去，<br>
但是瀏覽器本身其實是讀不懂 `import` 及 `export` 這兩個語法，<br>
那要怎麼辦呢？<br><br>

就好比一個日本人在你面前用日語自我介紹，而你一個字也聽不懂，<br>
這時後你可能就會拿出 Google Translate 來進行翻譯，<br>
轉換成你聽得懂的中文。<br><br>

而 Babel 正是扮演 Google Translate 這樣的角色，<br>
特別是現在 JavaScript 的語法一直推陳出新，<br>
而瀏覽器本身跟不上這個速度，<br>
那麼就可以使用 Babel 來將一些比較新穎的語法，<br>
專換成瀏覽器讀得懂的舊語法，<br>
這就是為何要使用 Babel 的原因。<br>

[Install Babel](https://babeljs.io/setup#installation)

```shell
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

安裝完之後，將 Babel 加入至我們的 webpack.config.js 中，<br>
並且建立 `.babelrc` 來設定我們的 babel

**webpack.config.js**

```JavaScript
const path = require("path");

module.exports = {
    ...,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
};
```

**.babelrc**

```json
{
    "presets": ["@babel/preset-env"]
}
```

#### Babel 和 EsLint 整合

這樣的話 Webpack 打包設定就差不多完成了，<br>
但是還有一點，就是我們開發環境的 EsLint 設定。<br>

在預設狀況下，EsLint 是以最新的 ECMAScript 標準來去審查我們的 Code，<br>
而這也會如瀏覽器一樣，不支援一些新語法，<br>
因次我們需要安裝 [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)，<br>
來讓 EsLint 透過 Babel 讀懂我們的程式碼

[Install @babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)

```shell
npm install --save-dev @babel/eslint-parser
```

接下來就是在我們的 `.eslintrc.json` 加入設定就可以了

```json
{
    ...,
    "parser": "@babel/eslint-parser",
    ...
}
```

### 5. 安裝 React

最後也是最重要的，<br>
在我們的專案加入 React 來開發，第一步當然就是先安裝啦～<br>

**Install React**

```shell
npm install react react-dom
```

接這寫一個簡單的 React 程式碼在我們的 `entry`

**/src/index.jsx**

```JavaScript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

**/src/app.jsx**

```JavaScript
import { useState } from "react";

const App = () => {
    const [liked, setLiked] = useState(false);

    if (liked) {
        return "Hello React";
    }

    return <button onClick={() => setLiked(true)}>Click Me</button>;
};

export default App;
```

另外我們也來調整一下 Webpack 的設定，
以符合 React 的開發，

**webpack.config.js**

```JavaScript
const path = require("path");

module.exports = {
    entry: "./src/index.jsx",
    ...,
    // 加入預設副檔名的解析順序
    resolve: {
        extensions: [".jsx", ".js"],
    },
    ...,
    module: {
        rules: [
            {
                // 多一個 jsx 的解析
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
};
```

如果直接執行 `npm run build`，<br>
那它會直接跳一個錯誤跟你說 `Support for the experimental syntax 'jsx' isn't currently enabled`，<br>
這是因為我們在 JavaScript 裡面使用 JSX 這種寫法，<br>
Webpack 讀不懂因此直接中斷打包。<br>

而要處理這種讀不懂的問題，<br>
就是找我們的 Babel 來協助了，而 [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react#docsNav) 就是我們會用到的工具<br>

**Install @babel/preset-react**

```shell
npm install --save-dev @babel/preset-react
```

安裝完成後，再把它加入 `.babelrc` 的設定中就可以了

```json
{
    "presets": [
        "@babel/preset-env",
        [
            "@babel/preset-react",
            {
                "runtime": "automatic"
            }
        ]
    ]
}
```

最後就是關於 EsLint 的一些設置，
讓 EsLint 知道我們有使用 JSX 這種語法

**.eslintrc.json**

```JSON
{
    ...,
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    ...
    "rules": {
        // React 17 之後，就不用每隻都要 import React 了
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
    }
}
```

## 結語

以上就完成了 React + Webpack + Babel 的基本配置了，<br>
之後如果需要加其他的配置，例如讓 [Webpack 讀懂 CSS](https://webpack.js.org/guides/asset-management/#loading-css) 或是 [Webpack 讀懂圖片檔](https://webpack.js.org/guides/asset-management/#loading-images)，<br>
相信對讀完此篇的各位也不是太難的問題，<br>
Happy Coding 🥳

## 參考資料

-   [EsLint](https://eslint.org/docs/latest/user-guide/getting-started)
-   [Prettier](https://prettier.io/docs/en/install.html)
-   [Webpack Guides](https://webpack.js.org/guides/)
-   [Babel Guides](https://babeljs.io/setup#installation)
