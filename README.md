# React_musicPlayer

## 启动
```
  需要配合NeteaseCloudMusicApi-master项目使用
  开发环境: npm run start
  生产环境: npm run build
```

### 项目描述
```
基于React框架开发的web音乐播放网站，使用到的相关技术有fetch、react-router、react-hooks、antd等。
```


### 项目总结
```
该项目使用了react框架开发页面，页面组件采用函数声明和hooks实现，其子组件则为普通类组件。
整个项目由于不存在状态管理问题，因此并没有使用redux这样的状态管理库。
```

### 存在的问题
```
 1.组件和部分功能函数的分离处理的不是很好，结构有些臃肿。
 2.没有使用节流debounce处理请求问题
```
