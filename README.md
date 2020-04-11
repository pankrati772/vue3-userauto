# userauto2.0

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### vue3.0框架打包问题
1.  新建vue.config.js文件在项目的根目录下
2.  在文件中输入内容
```
//vue.config.js
module.exports = {
    // 基本路径
    publicPath: './' //之前是 baseUrl 从 Vue CLI 3.3 起已弃用，请使用publicPath。
  }

```