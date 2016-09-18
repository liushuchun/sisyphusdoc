### 更新迁移项目 (PATCH Transfer)

> 注意: 迁移项目创建后只能修改基本信息和调度器 *timing* 配置项，不能修改迁移任务 (transfer job) 的定义!

#### 请求定义

    PATCH /transfer/<Id> HTTP/1.1
    Host: api-mix.qiniu.com
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

> 该接口未定义请求参数

##### 请求数据

客户端可以使用以下格式数据指定更新迁移项目 (transfer) 配置信息:

```json
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
                "start_time": integer,
                "end_time": integer
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
                "zone":integer,
                "domain":string, // bucket的自定义域名
                "bucket": string,
                "urls": [
                    string,
                    ...
                ]
            }
        }
        "target":{
             "zone":integer,
             "bucket":string,
             "ack":string,
             "sck":string
        }
    },
    "schedule": {
        "type": enum(ScheduleType),
        "cron": {
            "timing": string,
            "command": string
        },
        "worker_num":integer
    }
    },
    "priority": integer
}
```

#### 响应定义

##### 该接口正确处理请求时返回如下 JSON 数据

```json
{
    "id": string
}
```
