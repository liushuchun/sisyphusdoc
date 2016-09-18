### 关闭迁移项目 (POST Transfer)

迁移项目关闭后并不保证正在执行的迁移任务 (transfer jobs) 被关闭，亦不保证已产生的迁移任务队列 (transfer queue) 被回收！

> 注意: 迁移项目被关闭后将无法通过 [恢复迁移项目](transfer_resume.md) 接口重启！

#### 请求定义

    POST /transfer/<Id>?cancel HTTP/1.1
    Host: api-mix.qiniu.com
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

该接口定义以下请求参数:

名称 | 描述 | 要求
---- | ---- | ----
cancel | 指定关闭迁移任务 | Y

##### 请求数据

> 该接口未定义请求数据

#### 响应定义

> 该接口未定义响应数据

##### 该接口正确处理请求时返回 HTTP 状态码

- 服务器端正确处理请求时响应 HTTP 状态码为 204
