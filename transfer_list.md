## list
------------------------

#### 请求定义

    GET /transferlist/?uid=12355&page=1&size=10  HTTP/1.1
    Host: api-mix.qiniu.com
    Date: <date>
    Authorization: <AuthenticationString>


#### 请求参数

> uid是用户的uid,page是对应的页，size是每页多少数据

### 正确返回数据
```json
{
    ["id":string,
     "name":string,
     "desc":string,
     "spec":{
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
                        "secret": "***"
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


    ],
    [
    ...
    ],
    [
    ...
    ]

}

```

### 错误
如其他。


