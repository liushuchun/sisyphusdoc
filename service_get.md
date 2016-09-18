### 获取服务列表 (List Services)

#### 请求定义

    GET / HTTP/1.1
    Host: api-mix.qiniu.com
    Date: <date>
    Authorization: <AuthenticatingString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

该接口定义以下请求参数:

名称 | 描述 | 要求
---- | ---- | ----
page | 页数，默认为第 1 页 | N
perpage | 每页返回最大记录数，默认为 10  | N

##### 请求数据

> 该接口未定义请求数据

#### 响应定义

##### 该接口正确处理请求时返回如下 JSON 数据

```json
{
    "jobs": [
        {
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
                        "auth": { // one of following types
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
            "created_at": string,
            "updated_at": string,
            "deleted_at": string
        },
        ...
    ],
    "is_truncated": bool
}
```
