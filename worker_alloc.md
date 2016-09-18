### worker alloc(分配任务给工作车间)

只针对VIP客户，特定分配给几个Worker干活，工作车间每间隔一段时间向scheduler请求任务，请求任务带有该工作车间剩余的worker数量，返回对应的nsq通道.
#### 请求定义

    PUT /alloc HTTP/1.1
    Host: api-mix.qiniu.com
    Date: <date>
    Authorization: <AuthenticationString>

##### 请求头

> 请参考 [请求头 (HTTP Request Header)](request.md)

##### 请求参数

> 该接口未定义请求参数

##### 请求数据

```
    {
        "left_worker":integer,
        "total_worker":integer,
        "cpu_num":integer
    }

```

#### 返回数据

```
    {
        "task_list":[
            {"nsq_topic":string,
            "nsq_channel":string,
            "worker_num":integer
            },
            {
            "nsq_topic":string,
            "nsq_channel":string,
            "worker_num":integer
        }
        ]

}
```

