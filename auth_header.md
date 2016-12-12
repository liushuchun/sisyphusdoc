### 请求头认证 (HTTP Authorization Header)

客户端可以通过使用 HTTP Authorization Header 请求头指定认证信息。

#### 认证签名 V4

QWS V4 请求头认证信息格式定义如下:

> 注意: 为了便于阅读示例中添加了换行符和缩进格式，实际请求中无需添加换行符

    Authorization: QWS4-HMAC-SHA256 Credential=<Request credential>,
        SignedHeaders=<List of signed headers, separated by semicolon>,
        Signature=<Sign of request>

- `QWS4-HMAC-SHA256` 字段前后必须包含一个空格

- `Credential`, `SignedHeaders` 和 `Signature` 使用英文逗号 `,` 连接

##### 请求头认证信息字段定义

字段名称 | 描述
------- | ----
QWS4-HMAC-SHA256 | *QWS4* 声明请求使用 QWS V4 认证签名；*HMAC-SHA256* 声明认证签名算法为 HMAC-SHA256
Credential | 格式定义 `<AccessKeyId>/<yyyyMMdd>/<zone>/<service>/qws4_request`，如 *WeyUtAXps-_5dIDvFWF-rKZ5XyzWf-BmOEI_vNtk/20060102/cn-south-1/mix/qws4_request*
SignedHeaders | 用以生成认证签名的 HTTP 请求头名称列表，请求头名字必须是按字母序排序的小写格式，并且名字前后不能包含空格，多个名字使用英文分号 `;` 分割，如 `host;x-qiniu-date`
Signature | 请求认证签名的 64 位十六进制字串

##### 传统模式 (非 Chunked)

对于较小的对象 (object)，客户端可以选择计算整个上传内容的 HASH 值，然后通过单次 *PUT* 请求完成上传。详细签名流程请参考 [请求认证](authentication.md) 中 *认证签名 V4* 定义。

##### Chunked 模式

对于较大的对象 (object)，客户端选择计算整个上传内容的 HASH 值是非常困难的。这时可以选择将较大的对象分割成几个较小的块 (chunked)，然后分别计算每个块的 HASH 值并上传，最终完成上传。详细上传流程请参考 [分块传输认证](auth_chunked.md) 定义。

#### 认证签名 V2

QWS V2 请求头认证信息格式定义如下:

    Authorization: QWS <AccessKeyId>:<Signature>

- `QWS` 字段前后必须包含一个空格

- `<AccessKeyId>` 和 `<Signature>` 使用英文冒号 `:` 连接

##### 请求头认证信息字段定义

字段名称 | 描述
------- | ----
QWS | 声明请求使用 QWS V2 认证签名；QWS V2 认证签名统一使用 HMAC-SHA1 算法
Signature | 请求认证签名的 Base64 编码字串
