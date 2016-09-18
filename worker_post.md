### 启动处理器 (POST Worker)

该接口定义了调度器 (scheduler) 创建处理器的服务，仅供调度器实现参考！

> 注意: 处理器启动后配置信息无法修改！

#### 请求定义

    POST /scheduler HTTP/1.1
    Host: <WorkerHost>
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

> 该接口未定义请求参数

##### 请求数据

调度器 (scheduler) 可以使用以下格式数据启动处理器:

```json
{
    "transfer_id": string,
    "stats": {
        "host": string,
        "interval": integer, // in second
    },
    "queue": {
        "host": string,
        "name": string
    },
    "config": {
        "read_timeout": integer, // in second
        "write_timeout": integer, // in second
        "throttle": integer, // in Mbytes
        "max_mem": integer // in Mbytes
    }
}
```

#### 响应定义

##### 该接口正确处理请求时返回如下 JSON 数据

```json
{
    "id": string
}
```
