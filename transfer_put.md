### 新建迁移项目 (PUT Transfer)

#### 请求定义

    PUT /transfer HTTP/1.1
    Host: api-mix.qiniu.com
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

> 该接口未定义请求参数

##### 请求数据

客户端可以使用以下格式数据指定新创建迁移项目 (transfer) 配置信息:

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
                "uid":integer,
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

#### 参数说明：
spec.source.type:

值 | 数据源 
---- | ----
 qiniu  | 七牛
 amazon | 亚马逊
 aliyun | 阿里oss
 upyun  | 又拍云
 url    | 静态链接

spec.source.config.zone:
数据源类型 | 区域编号 | 区域值 | 所对应region
qiniu    | 0       | 华东 |
qiniu    | 1       | 华北 |
qiniu    | 2       | 华南 | 
qiniu    | 3       | 北美 |
aliyun   | 0       | 华东1  |oss-cn-hangzhou
aliyun   | 1       |  华东2 |oss-cn-shanghai
aliyun   | 2       |  华北1 |oss-cn-qingdao
aliyun   | 3       |  华北2 |oss-cn-beijing
aliyun   | 4       |  华南1 |oss-cn-shenzhen
aliyun   | 5       |  香港 |oss-cn-hongkong
aliyun   | 6       |  美国硅谷 |oss-us-west-1
aliyun   | 7       |  美国佛吉尼亚 |oss-us-east-1
aliyun   | 8       |  新加坡 |oss-ap-southeast-1 


#### 响应定义

##### 该接口正确处理请求时返回如下 JSON 数据

```json
{
    "id": string
}
```
