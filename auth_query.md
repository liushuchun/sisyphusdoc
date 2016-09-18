### 请求参数认证 (HTTP Query String)

客户端可以通过使用 HTTP Query String 请求参数指定认证信息，Qiniu MIX Service 服务只支持规则化的 URL 请求参数名称。如 `x-qiniu-algorithm` 应转换为 `X-Qiniu-Algorithm`，客户端使用非规则化的 URL 请求参数名称可能导致未知错误。

#### 认证签名 V4

详细签名流程请参考 [请求认证](authentication.md) 中 *认证签名 V4* 定义。

##### 请求参数认证方式必须应用以下约束

- `CanonicalizedHeaders` 必须包括 *host* 字段和所有自定义 *X-Qiniu-\** 请求头字段

- `CanonicalizedQueryString` 必须包括除 `X-Qiniu-Signature` 外所有 URL 请求参数 (Query String)

- `HashedPayload` 值固定为 **UNSIGNED-PAYLOAD**

##### 请求参数认证字段定义如下 (请求参数认证字段区分大小写)

> 注意: 为方便阅读示例中的参数值未进行 URL-Encoding 编码，实际使用中必须将值进行 URL-Encoding 编码！

参数名称 | 描述
------- | ----
X-Qiniu-Algorithm | 声明认证签名使用的算法，该值必须为 `QWS4-HMAC-SHA256`
X-Qiniu-Credential | 格式定义 `<AccessKeyId>/<yyyyMMdd>/<region>/<service>/qws4_request`，如 *WeyUtAXps-_5dIDvFWF-rKZ5XyzWf-BmOEI_vNtk/20060102/cn-south-1/mix/qws4_request*
X-Qiniu-Date | 按照 ISO 8601 格式的请求时间，如 20060102T150304Z
X-Qiniu-Expires | 声明资源的有效期，单位为秒 (second)；该值最大为 7 天，即 604800 秒。
X-Qiniu-SignedHeaders | 用以生成认证签名的请求头名字列表，按字母序排序，多个名字使用英文分号 `;` 分割。
X-Qiniu-Signature | 认证签名字串

#### 认证签名 V2

认证签名 V2 中，请求参数认证签名流程与请求头认证签名流程有一处不同，即使用资源有效期 (Expires) 代替认证签名时间 (Date 或 X-Qiniu-Date)。具体格式定义如下:

    CanonicalizedResource = [ "/" + Bucket ] +
        <HTTP-Request-URI, from the protocol name up to the query string> +
        [ subresource, if present. For example "?versioning" and "?location"]

    CanonicalizedHeaders = Lowercase(<HeaderName1>) + ":" + TrimSpace(<Value1>) + "\n"
        Lowercase(<HeaderName2>) + ":" + TrimSpace(<Value2>) + "\n"
        ...
        Lowercase(<HeaderNameN>) + ":" + TrimSpace(<ValueN>) + "\n"

    StringToSign = HTTP-Verb + "\n" +
        Content-MD5 + "\n" +
        Content-Type + "\n" +
        Expires + "\n" +
        CanonicalizedHeaders +
        CanonicalizedResource

    Signature = URL-Encoding-Of(Base64(HMAC-SHA1(AccessKeySecret, UTF8-Encoding-Of(StringToSign))))

- `StringToSign` 字串中的 *Date* 值使用 *Expires* 值替代

- `Signature` 必须进行 URL-Encoding 编码

##### 请求参数认证字段定义如下 (请求参数认证字段区分大小写)

> 注意: 为方便阅读示例中的参数值未进行 URL-Encoding 编码，实际使用中必须将值进行 URL-Encoding 编码！

参数名称 | 描述
------- | ----
AccessKeyId | 七牛 Access Key Id
Expires | 资源过期时间秒数，该值必须为距离 *January 1, 1970 00:00:00 UTC* 日期的绝对值；如过期日期为 *Mon Jan 02 2006 15:03:04 GMT*，*Expires* 值应为 1136185384
Signature | URL-Encoding 的认证签名字串
