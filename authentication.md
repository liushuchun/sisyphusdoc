### 请求认证 (Authentication)

Qiniu MIX Service 服务同时支持 QWS V4 和 QWS V2 请求签名认证，推荐优先选择具有更高安全性的 QWS V4 签名认证！

#### 认证方式

- **HTTP 认证头 (HTTP Authorization Header)**

    Qiniu MIX Service 服务支持基于 HTTP Authorization Header 的认证方式。

- **HTTP 请求参数 (HTTP Query String)**

    Qiniu MIX Service 服务支持基于 HTTP Query String 的认证方式。

#### 认证签名 V4

    CanonicalizedURI = [ "/" ] +
        <HTTP-Request-URI, from the protocol name up to the query string>

    CanonicalizedQueryString = URI-Encoding(<QueryParameter1>) + "=" + URI-Encoding(<Value1>) +
        "&" + URI-Encoding(<QueryParameter2>) + "=" + URI-Encoding(<Value2>) +
        ...
        "&" + URI-Encoding(<QueryParameterN>) + "=" + URI-Encoding(<ValueN>)

    CanonicalizedHeaders = Lowercase(<HeaderName1>) + ":" + TrimSpace(<Value1>) + "\n"
        Lowercase(<HeaderName2>) + ":" + TrimSpace(<Value2>) + "\n"
        ...
        Lowercase(<HeaderNameN>) + ":" + TrimSpace(<ValueN>) + "\n"

    SignedHeaders = Lowercase(<HeaderName1>) + ";" + Lowercase(<HeaderName2>) + ";" + ... + ";" + Lowercase(<HeaderNameN>)

    HashedPayload = Hex(HMAC-SHA256(<Playload>))

    CanonicalizedRequest = HTTP-Verb + "\n" +
        CanonicalizedURI + "\n" +
        CanonicalizedQueryString + "\n" +
        CanonicalizedHeaders + "\n" +
        SignedHeaders + "\n" +
        HashedPayload

    CanonicalizedTimestamp = ISO8601(...)

    CanonicalizedScope = <yyyymmdd>/<zone>/<service>/qws4_request

    StringToSign = QWS4-HMAC-SHA256 + "\n" +
        CanonicalizedTimestamp + "\n" +
        CanonicalizedScope + "\n" +
        Hex(HMAC-SHA256(CanonicalizedRequest))

    SigningKey = HMAC-SHA256("QWS4" + "<AccessKeySecret>", "<yyyymmdd>")
    SigningKey = HMAC-SHA256(SigningKey, "<zone>")
    SigningKey = HMAC-SHA256(SigningKey, "<service>")
    SigningKey = HMAC-SHA256(SigningKey, "qws4_request")

    Signature = HMAC-SHA256(SigningKey, UTF8-Encoding-Of(StringToSign))

    Authorization = "QWS4-HMAC-SHA256" + " " +
        "Credential=<AccessKeyId>/<CanonicalizedScope>" + "," +
        "SignedHeaders=<SignedHeaders>" + "," +
        "Signature=<Signature>"

##### QWS V4 认证签名的规则化流程

- 规则化请求 URI (CanonicalizedURI)

    - 以空字符开始 `CanonicalizedURI = ""`

    - 将请求中的 *HTTP Request-URI* 添加到规则化请求 URI 中 `CanonicalizedURI += "/applicate"`

    > 注意: 对于获取任务列表 (*List Jobs*) 请求，需要添加 "/" 到规则化请求 URI 中 `CanonicalizedURI += "/"`

- 规则化请求查询字串 (CanonicalizedQueryString)

    - 将请求参数的 Keys 和 Values 使用 URI-Encoding 编码

    - 将 URI-Encoding 编码后请求参数的 Keys 按字母序排序

    - 用英文等号 `=` 将请求参数对连接成一个字串，如 `URI-Encoding(Key) + "=" + URI-Encoding(Value)`

    > 注意: 如果请求参数 Key 对应的值不存在，则用空字串代替，如 `GET /?key` 应转换为 `URI-Encoding("key") + "=" + ""`

    - 用英文 `&` 将多个请求参数对连接成一个字串，如 `URI-Encoding(Key1) + "=" + URI-Encoding(Value1) + "&" + URI-Encoding(Key2) + "=" + URI-Encoding(Value2)`

- 规则化请求头 (CanonicalizedHeaders)

    - 将请求头名称 (Header Names) 转换为小写 (lowercase) 格式，如 `X-Qiniu-Date` 应转换为 `x-qiniu-date`

    - 将转换后的请求头名称 (Header Names) 按字母序排序

    - 如果同一请求头名称 (Header Name) 包含多个值，则使用英文逗号 `,` 将多个值合并成一个字串，并且移除每个值的前后空格，如 `x-qiniu-meta-username: Qiniu` 和 `x-qiniu-meta-username: Transfer` 应转换为 `x-qiniu-meta-username:Qiniu,Transfer`

    - 在每个规则化的请求头字串后面添加一个换行符 `\n` 字符 (U+000A)

    - 将所有规则化的请求头连接成一个字串

    > 注意: 以下请求头必须包含在规则化请求头字串中！

        - `Host`，请求域名

        - `Content-Type`，如果请求头包含该值

        - `X-Qiniu-*`，所有以 *X-Qiniu-* 开头的自定义请求头

- 认证签名请求头列表 (SignedHeaders)

    - 用英文分号 `;` 连接的所有规则化请求头 *CanonicalizedHeaders* 的名字 (Header Names) 列表，如 `content-type;host;x-qiniu-content-sha256;x-qiniu-date`

    - 请求头名字必须以字母序排序

- 认证签名的请求体 HASH 值 (HashedPayload)

    - 如果客户端需要对请求体做签名认证，该值的计算过程为 `Hex(HMAC-SHA256(<Payload Bytes>))`

    - 如果客户端不需要对请求体做签名认证，该值应为 `UNSIGNED-PAYLOAD`

    - 如果客户端指定 *Content-Encoding: qws-chunked* 请求头，该值固定为 `STREAMING-QWS4-HMAC-SHA256-PAYLOAD`

- 规则化请求字串 (CanonicalizedRequest)

    > 请按照以下格式拼接规则化签名字串，如果请求中不包含对应的值则用空字串 ("") 代替，但行末的换行符 (\n) 不能省略！

    ```
    HTTP-Verb + "\n" +
    CanonicalizedURI + "\n" +
    CanonicalizedQueryString + "\n" +
    CanonicalizedHeaders + "\n" +
    SignedHeaders + "\n" +
    HashedPayload
    ```

- 规则化请求时间 (CanonicalizedTimestamp)

    - 按照 [ISO 8601](https://www.w3.org/TR/NOTE-datetime) 格式化的时间，如 20060102T150304Z

- 规则化请求作用域 (CanonicalizedScope)

    - 按照 `<yyyymmdd> + "/" + <zone> + "/" + <service> + "/qws4_request"` 格式化的字串

    - `<yyyymmdd>`，必须与 *CanonicalizedTimestamp* 日期一致

    - `<zone>`，请求对应的数据中心，如 *cn-south-1*, *cn-north-1*

    - `<service>`，请求对应的服务名称，如 *mob*

- 规则化签名字串 (StringToSign)

    > 请按照以下格式拼接规则化签名字串，如果请求中不包含对应的值则用空字串 ("") 代替，但行末的换行符 (\n) 不能省略！

    ```
    QWS4-HMAC-SHA256 + "\n" +
    CanonicalizedTimestamp + "\n" +
    CanonicalizedScope + "\n" +
    Hex(HMAC-SHA256(CanonicalizedRequest))
    ```

- 生成签名私串 (SigningKey)

    > 注意: 必须按照以下顺序生成签名私串，即后面的签名必须使用上一步签名值！

    - 对 `CanonicalizedScope` 的日期签名: `DateSigningKey = HMAC-SHA256("QWS4" + "<AccessKeySecret>", "<yyyymmdd>")`

    - 对 `CanonicalizedScope` 的 < zone > 签名: `ZoneSigningKey = HMAC-SHA256(DateSigningKey, "<zone>")`

    - 对 `CanonicalizedScope` 的 < service > 签名: `ServiceSigningKey = HMAC-SHA256(ZoneSigningKey, "<service>")`

    - 对 `CanonicalizedScope` 的 "qws4_request" 签名: `SigningKey = HMAC-SHA256(ServiceSigningKey, "qws4_request")`

- 生成签名

    - Signature = Hex(HMAC-SHA256(SigningKey, StringToSign))

##### QWS V4 认证签名示例

假设请求体为空，并且 Access Key Id 和 Access Key Secret 定义如下:

名称 | 值
---- | ----
Id | WeyUtAXps-_5dIDvFWF-rKZ5XyzWf-BmOEI_vNtk
Secret | wHKb0KxX0iddrKM35WRbEzCRxOPDq6vqewgla87L

- 请求

> 注意: 为方便阅读 *Authorization* 字段添加了换行符和缩进格式，实际请求中不能包含换行符。

```
GET /transfer/myjobid HTTP/1.1
Host: api-mix.qiniu.com
Date: Mon, 02 Jan 2006 15:04:05 GMT

Authorization: QWS4-HMAC-SHA256 Credential=WeyUtAXps-_5dIDvFWF-rKZ5XyzWf-BmOEI_vNtk/20060102/cn-south-1/mix/qws4_request,
    SignedHeaders=date;host;x-qiniu-content-sha256,
    Signature=80552f6b3632423fad2db5176badcd627eed2087cbd801cf06d4a9983bd4688d
X-Qiniu-Content-Sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

- 规则化请求字串

> 注意: 为方便阅读换行处添加了换行符

```
GET\n
/transfer/myjobid\n
\n
date:Mon, 02 Jan 2006 15:04:05 GMT\n
host:api-mix.qiniu.com\n
x-qiniu-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\n
\n
date;host;x-qiniu-content-sha256\n
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

- 规则化签名字串

> 注意: 为方便阅读换行处添加了换行符

```
WS4-HMAC-SHA256\n
Mon, 02 Jan 2006 15:04:05 GMT\n
20130524/cn-south-1/mix/qws4_request\n
3a5aae01842069b322e956a8c016e723beb9728fbcc3f8ad298cef1686d9876a
```

- 签名私串

```
[]byte{0x60, 0xe5, 0x48, 0xfd, 0xe8, 0xbb, 0x7b, 0x4d, 0x4d, 0x36, 0x17, 0xd7, 0xa4, 0xbf, 0xb8, 0xcd, 0xa5, 0xa, 0xf4, 0xca, 0x7e, 0xb1, 0xd8, 0xd5, 0x77, 0xf4, 0x52, 0xd4, 0xa4, 0x4e, 0xc3, 0x34}
```

- 签名字串

```
80552f6b3632423fad2db5176badcd627eed2087cbd801cf06d4a9983bd4688d
```

#### 认证签名 V2

    CanonicalizedResource = [ "/" ] +
        <HTTP-Request-URI, from the protocol name up to the query string> +
        [ subresource, if present. For example "?versioning" and "?location"]

    CanonicalizedQwsHeaders = Lowercase(<QwsHeaderName1>) + ":" + TrimSpace(<Value1>) + "\n"
        Lowercase(<QwsHeaderName2>) + ":" + TrimSpace(<Value2>) + "\n"
        ...
        Lowercase(<QwsHeaderNameN>) + ":" + TrimSpace(<ValueN>) + "\n"

    StringToSign = HTTP-Verb + "\n" +
        Content-MD5 + "\n" +
        Content-Type + "\n" +
        Date + "\n" +
        CanonicalizedQwsHeaders +
        CanonicalizedResource

    Signature = Base64(HMAC-SHA1(AccessKeySecret, UTF8-Encoding-Of(StringToSign)))

    Authorization = "QWS" + " " + AccessKeyId + ":" + Signature

##### QWS V2 认证签名的规则化流程

- 规则化请求资源 (CanonicalizedResource)

    - 以空字符开始 `CanonicalizedResource = ""`

    - 将请求中的 *HTTP Request-URI* 添加到规则化请求资源中 `CanonicalizedResource += "/applicate"`

    > 注意: 对于获取应用列表 (*List Applicates*) 请求，需要添加 "/" 到规则化请求资源中 `CanonicalizedResource += "/"`

    - 如果请求中包含子资源 (sub resource)，则将其添加到规则化请求资源中 `CanonicalizedResource += "?delete"`

    > 注意: 多个子资源必须按照请求 *Key* 字母排序后再连接，如 `CanonicalizedResource += "?uploads&location"`

- 规则化 *X-Qiniu-\** 请求头 (CanonicalizedQwsHeaders)

    - 将请求头名字 (Header Names) 转换为小写 (lowercase) 格式，如 `X-Qiniu-Date` 应转换为 `x-qiniu-date`

    - 将请求头 (Header Names) 名字按字母序排序

    - 如果同一请求头名字 (Header Name) 包含多个值，则使用英文逗号 , 将多个值合并成一个字串，并且移除值的前后空格，如 `x-qiniu-meta-username: Qiniu` 和 `x-qiniu-meta-username: Transfer` 应转换为 `x-qiniu-meta-username:Qiniu,Transfer`

    - 在每个规则化的请求头字串后面添加一个换行符 `\n` 字符 (U+000A)

    - 将所有规则化的请求头连接成一个字串

- 规则化签名字串 (StringToSign)

    > 请按照以下格式拼接规则化签名字串，如果请求中不包含对应的值则用空字串 ("") 代替，但行末的换行符 (\n) 不能省略！

    ```
    HTTP-Verb + "\n" +
    Content-MD5 + "\n" +
    Content-Type + "\n" +
    Date + "\n" +
    CanonicalizedQwsHeaders +
    CanonicalizedResource
    ```

    - `Content-MD5` 值仅计算请求体

- 生成签名

    - Signature = Base64(HMAC-SHA1(AccessKeySecret, StringToSign))

##### QWS V2 认证签名示例

假设请求体为空，并且 Access Key Id 和 Access Key Secret 定义如下:

名称 | 值
---- | ----
Id | WeyUtAXps-_5dIDvFWF-rKZ5XyzWf-BmOEI_vNtk
Secret | wHKb0KxX0iddrKM35WRbEzCRxOPDq6vqewgla87L

- 请求

```
GET /transfer/myjobid HTTP/1.1
Host: api-mix.qiniu.com
Date: Mon, 02 Jan 2006 15:04:05 GMT

Authorization: QWS WeyUtAXps-_5dIDvFWF-rKZ5XyzWf-BmOEI_vNtk:4+SXv0N2piq2S5vjEifeq7125L8=
```

- 规则化签名字串

```
GET\n
\n
\n
Mon, 02 Jan 2006 15:04:05 GMT\n
/transfer/myjobid
```

- 签名字串

```
4+SXv0N2piq2S5vjEifeq7125L8=
```
