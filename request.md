### 请求头 (HTTP Request Header)

Qiniu MIX Service 服务只支持规则化的 HTTP 请求头名称，如 `accept-encoding` 应转换为 `Accept-Encoding`，客户端使用非规则化的 HTTP 请求头名称可能导致未知错误。


#### 常用请求头列表

名称 | 描述 | 要求
---- | ---- | ----
Host | 参见 [Qiniu MIX Service 简介](intro.md) 中关于 *访问域名* 的说明 | Y
Authorization | 请求认证信息 | Y
Content-Length | 请求体长度 (bytes, RFC 2616)，PUT 类请求必须指定该值 | CY
Content-Type | 请求体数据类型，如 image/png；如果该值为空，系统默认为 application/octet-stream | N
Date | 请求时间 (RFC 2616)。如果客户端无法指定该值，必须通过 **X-Qiniu-Date** 指定请求对应的时间。 | CY
Expect | 请求客户端可以使用 *100-continue* 在发送请求体前确定当前请求是否能被正确执行，如在发送数据前验证请求头签名是否正确 | N
Content-MD5 | QWS V2 认证签名请求中对应的 Base64 编码的请求体 MD5 摘要值 (RFC 1864) | CY
X-Qiniu-Content-Sha256 | QWS V4 认证签名请求中对应的请求体 HMAC-SHA256 签名信息 | CY
X-Qiniu-Date | 请求时间 (RFC 2616)，如果请求头中同时出现 *Date* 和 *X-Qiniu-Date*，则 *X-Qiniu-Date* 具有更高优先级 | CY

- Y, 必须

- CY, 条件约束必须

- N, 非必须
