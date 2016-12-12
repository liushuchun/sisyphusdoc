### 注册调度器 (PUT Scheduler)

该接口定义了迁移服务 (transfer) 注册服务，仅供调度器 (scheduler) 在启动时向迁移服务注册自己调用！

#### 请求定义

    PUT /scheduler HTTP/1.1
    Host: api-mix.qiniu.com
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

> 该接口未定义请求参数

##### 请求方向
> 调度器->迁移服务

##### 请求数据

调度器 (scheduler) 可以使用以下格式数据注册服务:

```json
{
    "type": enum(ScheduleType),
    "name": string,
    "desc": string,
    "apis": {
        "/stats": string, // get stats callback -> GET
        "/spec": string, // create job spec callback -> POST
        "/pause": string, // pause job callback -> POST
        "/resume": string, // resume job callback -> POST
        "/delete": string // delete job callback -> POST
    },
    "config": {
        "min_worker": integer,
        "max_worker": integer,
        "stats_interval": integer
    }
    "zone": enum(ZoneType)
}
```

#### 响应定义

##### 该接口正确处理请求时返回如下 JSON 数据

```json
{
    "id": string
}
```
