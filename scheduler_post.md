### 启动调度器 (POST Scheduler)

该接口定义了迁移服务 (transfer) 向调度器 (scheduler) 推送任务定义 (job spec) 服务，仅供迁移服务下发任务定义！

#### 请求定义

    POST /spec HTTP/1.1
    Host: <SchedulerHost>
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

> 该接口未定义请求参数

##### 请求数据

迁移服务 (transfer) 将使用如下格式数据启动调度器 (scheduler):

```json
{
    "transfer_id": string,
    "schedule": {
        "type": enum(ScheduleType),
        "cron": {
            "timing": string,
            "command": string
        },
        "worker":{
            "max":integer,
            "min":integer
    }
    },
    "spec": {
        "options": {
            "overwrite_existing": boolean,
            "delete_source": boolean
        },
        "conditions": {
            "prefix": {
                "inclusions": [
                    string,
                    ...
                ],
                "exclusions": [
                    string,
                    ...
                ]
            }
            "datetime": {
                "start_time": string,
                "end_time": string
            }
        },
        "source": {
            "type": enum(SourceType),
            "config": {
                "auth": { // one of following types
                    "basic": {
                        "username": string,
                        "password": string
                    },
                    "access_key": {
                        "id": string,
                        "secrent": string
                    },
                    "token": {
                        "access_token": string,
                        "refresh_token": string
                    }
                },
                "bucket": string,
                "urls": [
                    string,
                    ...
                ]
            }
        }
    }
}
```

#### 响应定义

> 该接口未定义响应数据

##### 该接口正确处理请求时返回 HTTP 状态码

- 如果调度器 (scheduler) 正确处理任务定义 (job spec)，返回 HTTP 状态码为 200

- 如果调度器 (scheduler) 不能正确处理任务定义 (job spec)，返回 HTTP 状态码为 422
