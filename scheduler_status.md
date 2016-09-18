### 用于同步scheduler的状态到迁移服务接口端(Update scheduler status)

> 注意：该接口是用来间歇性同步scheduler的状态。

#### 请求定义
```
    POST /scheduler/<Id> HTTP/1.1
    Host: api-mix.qiniu.com
    Date: <date>
    Authorizatio:<AuthenticationString>
```

> 请参考 [请求头 (HTTP Request Header)](request.md)

#### 请求参数
> 该接口未定义请求参数

#### 请求方向

> scheduler->mixapi

#### 响应定义

>该接口未实现

#### 该接口正确处理请求时返回HTTP 状态码

- 服务端正确处理请求时响应HTTP 状态吗为 501


