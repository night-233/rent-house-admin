## Rent-House

后端源码: [https://github.com/harry-xqb/rent-house](https://github.com/harry-xqb/rent-house)

项目致力于打造一个完整的租房系统，采用现阶段流行技术实现。

## **项目介绍**
rent-house 项目是一套模仿自如的租房系统，前端基于React+TypeScript, 后端基于SpringBoot+Elasticsearch实现，采用Docker容器化部署。系统主要包含租房首页、房源搜索、房源展示、地图找房、房源周边检索、收藏栏、看房预约、用户中心、发布管理、账号管理等模块。

## 在线演示

租房网地址:  [http://house.touchfish.top](http://house.touchfish.top)  账号: 17811111111 密码: 123

后端swiger接口地址:  [http://rent-house.touchfish.top](http://rent-house.touchfish.top)  账号: admin 密码: 123

## 技术选型

#### 后端技术

| 技术           | 说明             | 官网                                                         |
| -------------- | ---------------- | ------------------------------------------------------------ |
| SpringBoot     | 容器+MVC框架     | https://spring.io/projects/spring-boot                       |
| SpringSecurity | 认证和授权框架   | [ https://spring.io/projects/spring-security](https://spring.io/projects/spring-security) |
| SpringDataJpa  | ORM框架          | https://docs.spring.io/spring-data/jpa/docs/current/reference/html/ |
| Elasticsearch  | 搜索引擎         | https://www.elastic.co/cn/                                   |
| Kibana         | Elastic可视化    | https://www.elastic.co/cn/kibana                             |
| Swagger-UI     | 文档生产工具     | https://github.com/swagger-api/swagger-ui                    |
| Redis          | 分布式缓存       | https://redis.io/                                            |
| Docker         | 应用容器引擎     | [https://www.docker.com](https://www.docker.com/)            |
| Druid          | 数据库连接池     | [ https://github.com/alibaba/druid](https://github.com/alibaba/druid) |
| Lombok         | 简化对象封装工具 | [ https://github.com/rzwitserloot/lombok](https://github.com/rzwitserloot/lombok) |
| Mysql          | 关系型数据库     | https://www.mysql.com/                                       |
| Kafka          | 消息队列         | http://kafka.apache.org/                                     |
| Zookeeper      | 注册中心         | https://zookeeper.apache.org/                                |

#### 前端技术

| 技术                   | 说明             | 官网                                                    |
| ---------------------- | ---------------- | ------------------------------------------------------- |
| React Hook             | 前端框架         | https://react.docschina.org/docs/hooks-intro.html       |
| React Router           | 路由框架         | https://reactrouter.com/                                |
| Redux                  | 全局状态管理框架 | https://redux.js.org/                                   |
| TypeScript             | JavaScript超集   | https://www.typescriptlang.org/                         |
| Ant Design             | 前端UI框架       | https://ant.design/index-cn                             |
| Nprogress              | 进度条控件       | https://www.npmjs.com/package/nprogress                 |
| Swiper                 | 轮播滑动插件     | https://swiperjs.com/                                   |
| Axios                  | 前端HTTP框架     | https://www.axios.com/                                  |
| React-Sticky           | 吸顶效果组件     | https://www.npmjs.com/package/react-sticky              |
| React-Custom-Scrollbar | 自定义滚动条     | https://github.com/malte-wessel/react-custom-scrollbars |

### 快速开始

对于想要学习前端的小伙伴， 只需以下几步即可启动前端项目

1. clone前端源码([前端源码]([https://github.com/night-233/rent-house-admin](https://github.com/night-233/rent-house-admin)))
2. 执行 yarn install
3. 执行 yarn start 

项目启动后默认打开: [localhost:3000](localhost:3000) 端口。 后端接口默认连接的是我个人服务器(可能有点慢)，如果使用了上面的Docker部署了开发环境，可在config-override.js中修改IP的地址为本地。

默认接口文档地址:  [http://rent-house.touchfish.top](http://rent-house.touchfish.top) 

#### 技术问答

## <img src="images/qrcode.jpg" alt="qrcode"  width="200" height="200"/>


##  天涯何处无芳草，给颗星星好不好┭┮﹏┭┮



## 项目界面展示

## ![用户首页](images/client-filter.jpg)



![image-20200707162953900](images/image-20200707162953900.png)

![image-20200707163051367](images/image-20200707163051367.png)


![image-20200707163359418](images/image-20200707163359418.png)

![user-center](images/user-center.jpg)

![forget-password](images/forget-password.jpg)

