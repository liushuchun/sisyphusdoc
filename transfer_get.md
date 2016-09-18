### 获取迁移项目 (GET Transfer)

#### 请求定义

    GET /transfer/<Id> HTTP/1.1
    Host: api-mix.qiniu.com
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

> 该接口未定义请求参数

##### 请求数据

> 该接口未定义请求数据

#### 响应定义

##### 该接口正确处理请求时返回如下 JSON 数据

```json
{
    "id": string,
    "project_id": string,
    "name": string,
    "desc": string,
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
                "auth": { // NOTE: CAN NOT retrieve sensitive data!
                    "basic": {
                        "username": string,
                        "password": "***"
                    },
                    "access_key": {
                        "id": string,
                        "secrent": "***"
                    },
                    "token": {
                        "access_token": "***",
                        "refresh_token": "***"
                    }
                },
                "bucket": string,
                "urls": [
                    string,
                    ...
                ]
            }
        }
    },
    "schedule": {
        "type": enum(ScheduleType),
        "cron": {
            "timing": string,
            "command": string
        }
    },
    "priority": integer,
    "status": enum(JobStatus),
    "rate": float,
    "last_issued_at": string,
    "next_issued_at": string
}
```
