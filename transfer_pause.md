### 暂停迁移项目 (POST Transfer)

迁移项目暂停后并不保证正在执行的迁移任务 (transfer jobs) 被关闭，亦不保证已产生的迁移任务队列 (transfer queue) 被回收！

#### 请求定义

    POST /transfer/<Id>?pause HTTP/1.1
    Host: api-mix.qiniu.com
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

该接口定义以下请求参数:

名称 | 描述 | 要求
---- | ---- | ----
pause | 指定暂停迁移任务 | Y

##### 请求数据

> 该接口未定义请求数据

#### 响应定义

> 该接口未定义响应数据

##### 该接口正确处理请求时返回 HTTP 状态码

- 服务器端正确处理请求时响应 HTTP 状态码为 204
