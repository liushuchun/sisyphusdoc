### 调度器向API同步task任务状态

该接口会定义了同步任务状态的格式

#### 请求定义

    POST /scheduler/sync HTTP/1.1
    Host: api-mix.qiniu.com
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

> 该接口未定义请求参数

##### 请求数据

调度器 (scheduler) 可以使用以下格式数据注册服务:

```json
{
    "task_list":[
        "status":enum(TransferStatus),
        "job_done":int,
        "job_failed":int,
        "job_count":int
    ],


}
```

#### 响应定义

##### 该接口正确处理请求时返回状态头200 OK.

