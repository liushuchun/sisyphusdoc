### 检查迁移项目 (HEAD Transfer)

#### 请求定义

    HEAD /transfer/<Id> HTTP/1.1
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

> 该接口未定义响应数据

##### 该接口正确处理请求时返回 HTTP 状态码

- 如果请求客户端对当前迁移项目 (transfer) 有访问权限，返回 HTTP 状态码为 200

- 如果请求客户端对当前迁移项目 (transfer) 没有访问权限或迁移项目不存在，返回 HTTP 状态码为 404

##### 该接口返回 HTTP 状态码为 200 时设置以下 HTTP 头

名称 | 描述
---- | ----
X-Qiniu-Transfer-Project-Id | 项目 ID
X-Qiniu-Transfer-Type | 迁移任务类型
X-Qiniu-Transfer-Rate | 迁移任务执行进度
X-Qiniu-Transfer-Status | 迁移任务状态
X-Qiniu-Transfer-Last-Issued-At | 迁移任务最后一次执行时间
X-Qiniu-Transfer-Next-Issued-At | 迁移任务下一次执行时间
