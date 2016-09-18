### 删除调度器 (DELETE Scheduler)

该接口定义了迁移服务 (transfer) 删除调度器 (scheduler) 的服务，仅供迁移服务调用！

#### 请求定义

    POST /delete HTTP/1.1
    Host: <SchedulerHost>
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

该接口定义以下请求参数:

名称 | 描述 | 要求
---- | ---- | ----
transferId | 指定迁移服务 ID | Y

##### 请求数据

> 该接口未定义请求数据

#### 响应定义

> 该接口未定义响应数据

##### 该接口正确处理请求时返回 HTTP 状态码

- 调度器 (scheduler) 正确处理请求时响应 HTTP 状态码为 200
