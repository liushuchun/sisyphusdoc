### 更新处理器状态 (POST Worker)

该接口定义了处理器主动向调度器 (scheduler) 上报其当前状态的服务，仅供调度器实现参考！

#### 请求定义

    POST /stats HTTP/1.1
    Host: <StatsHost>
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

> 该接口未定义请求参数

##### 请求数据

处理器 (worker) 可以使用以下格式数据更新状态:

```json
{
    "transfer_id": string,
    "job_id": string,
    "job_rate": integer,
    "job_issued_at": string,
    "job_finished_at": string,
    "finished_jobs": integer,
    "start_time": string,
    "end_time": string
}
```

#### 响应定义

##### 该接口正确处理请求时返回如下 JSON 数据

```json
{
    "id": string
}
```
