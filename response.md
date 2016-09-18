### 响应头 (HTTP Response Header)

#### 常用响应头列表

名称 | 描述 | 要求
---- | ---- | ----
Content-Length | 响应体长度 (bytes, RFC 2616) | N
Content-Type | 响应体数据类型 (MIME)，如 application/json | Y
Connection | 请求连接状态，open 或 close | N
Date | 响应时间 (RFC 2616) | CY
Etag | 服务器端接收到的请求体 HASH 值，如请求体的 MD5 摘要值 | N
Server | 请求处理的服务器名称 | N
X-Request-Id | Qiniu MIX Service 服务对应每个请求的唯一 ID | Y

- Y, 必须

- CY, 条件约束必须

- N, 非必须
