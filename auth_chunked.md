### 分块传输认证 (HTTP Chunked Transfer)

分块传输认证仅针对 [新建对象](object_put.md) 过程中的 [分块传输模式](object_put_chunked.md) 有效，且只支持 QWS V4 认证方式。

#### 传输步骤定义

1, 客户端按照以下 **认证签名** 的定义生成认证签名，并将其作为 *ChunkHashSeed* 初始化值

2, 客户端生成当前上传块并按照以下 **分块签名** 的定义计算当前上传块的 HASH 值

3, 客户端用当前上传块的 HASH 值更新 *ChunkHashSeed* 值作为后续块 HASH 计算的 Seed，并重复步骤 2 和 3

4, 客户端发送最后一个大小为 0 的块和对应的 HASH 值完成上传

#### 分块格式定义

    string(Hexadecimal(<Chunk-Size)) + ";chunk-signature=" + <Chunk-Signature> + "\r\n" + <Chunk-Bytes> + "\r\n"

- `string(Hexadecimal(<Chunk-Size))`，指定当前上传块的大小，以十六进制表示；如当前上传块为 65536 (bytes)，则十六进制字串为 "10000"。

- `<Chunk-Signature>`，按照 **分块签名** 的定义计算当前上传块的签名字串

#### 认证签名

    CanonicalizedURI = [ "/" + Bucket ] +
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

    HashedPayload = "STREAMING-QWS4-HMAC-SHA256-PAYLOAD"

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

    Signature = Hex(HMAC-SHA256(SigningKey, UTF-8-Encoding-Of(StringToSign)))

    Authorization = "QWS4-HMAC-SHA256" + " " +
        "Credential=<YourAccessKeySecret>/<CanonicalizedScope>" + "," +
        "SignedHeaders=<SignedHeaders>" + "," +
        "Signature=<Signature>"

#### 分块签名

> 注意: *CanonicalizedTimestamp* 和 *CanonicalizedScope* 的值与 **认证签名** 中对应的值相同，*ChunkHashSeed* 的初始值为 **认证签名** 中 *Signature* 值。

    CanonicalizedTimestamp = ISO8601(...)

    CanonicalizedScope = <yyyymmdd>/<zone>/<service>/qws4_request

    ChunkHashSeed = <Signature>

    StringToSign = QWS4-HMAC-SHA256-PAYLOAD + "\n" +
        CanonicalizedTimestamp + "\n" +
        CanonicalizedScope + "\n" +
        ChunkHashSeed + "\n" +
        Hex(HMAC-SHA256("")) + "\n" +
        Hex(HMAC-SHA256(CurrentChunkBytes))

    SigningKey = HMAC-SHA256("QWS4" + "<AccessKeySecret>", "<yyyymmdd>")
    SigningKey = HMAC-SHA256(SigningKey, "<zone>")
    SigningKey = HMAC-SHA256(SigningKey, "<service>")
    SigningKey = HMAC-SHA256(SigningKey, "qws4_request")

    chunk-signature = Hex(HMAC-SHA256(SigningKey, UTF-8-Encoding-Of(StringToSign)))

#### 分块传输示例

假设上传的对象内容为 65KB 文本文件，内容全部为字母 "a", 并且 Access Key Id 和 Access Key Secret 定义如下:

名称 | 值
---- | ----
Id | WeyUtAXps-_5dIDvFWF-rKZ5XyzWf-BmOEI_vNtk
Secret | wHKb0KxX0iddrKM35WRbEzCRxOPDq6vqewgla87L

- 请求

> 注意: 为方便阅读 *Authorization* 字段添加了换行符和缩进格式，实际请求中不能包含换行符

```
PUT /mydocs/chunked.docx HTTP/1.1
Host: api-mix.qiniu.com
Date: Mon, 02 Jan 2006 15:04:05 GMT
Content-Encoding: qws-chunked

Authorization: QWS4-HMAC-SHA256 Credential=WeyUtAXps-_5dIDvFWF-rKZ5XyzWf-BmOEI_vNtk/20060102/cn-south-1/mix/qws4_request,
    SignedHeaders=content-encoding;content-length;host;x-qiniu-content-sha256;x-qiniu-date;x-qiniu-decoded-content-length;x-qiniu-storage-class,
    Signature=50a559a3588b3e17c3da9dd3709a78ee9f1eda5506dd35c250f732b993082e63

X-Qiniu-Content-Sha256: STREAMING-QWS4-HMAC-SHA256-PAYLOAD
X-Qiniu-Decoded-Content-Length: 66560
```

- SigningKey

```
[]byte{0x95, 0x77, 0xd, 0x68, 0x6a, 0x13, 0x26, 0x45, 0xbd, 0x7d, 0x83, 0x37, 0x94, 0x5e, 0x75, 0xa9, 0xa8, 0xb4, 0xac, 0xae, 0x8d, 0x21, 0x3c, 0x67, 0x66, 0xcd, 0x39, 0x6f, 0xf7, 0xc, 0x54, 0x5f}
```

- ChunkHashSeed 初始值

```
50a559a3588b3e17c3da9dd3709a78ee9f1eda5506dd35c250f732b993082e63
```

- 分块签名

本示例将 65KB 的文件分为 64KB 和 1KB 两个块，具体每个块的签名过程如下:

##### 第 1 块 (Chunk 1)

第 1 块大小为 64KB，即 65536 个字母 "a"。

- 规则化签名字串

```
QWS4-HMAC-SHA256-PAYLOAD
Mon, 02 Jan 2006 15:04:05 GMT
20060102/cn-south-1/mix/qws4_request
50a559a3588b3e17c3da9dd3709a78ee9f1eda5506dd35c250f732b993082e63
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
bf718b6f653bebc184e1479f1935b8da974d701b893afcf49e701f3e2f9f9c5a
```

- 第 1 块签名

```
b51dc0b604326ed0bf66c04eb1a3db1a77a7993b10f6d64d010141c30b55ced1
```

- 第 1 块请求数据

```
10000;chunk-signature=b51dc0b604326ed0bf66c04eb1a3db1a77a7993b10f6d64d010141c30b55ced1\r\n<65536-bytes>\r\n
```

##### 第 2 块 (Chunk 2)

第 2 块大小为 1KB，即 1024 个字母 "a"。

- 规则化签名字串

```
QWS4-HMAC-SHA256-PAYLOAD
Mon, 02 Jan 2006 15:04:05 GMT
20060102/cn-south-1/mix/qws4_request
b51dc0b604326ed0bf66c04eb1a3db1a77a7993b10f6d64d010141c30b55ced1
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
2edc986847e209b4016e141a6dc8716d3207350f416969382d431539bf292e4a
```

- 第 2 块签名

```
e797173de26f45957dd4975da4d64e2db774499121c64f4c0e8dd06282745a10
```

- 第 2 块请求数据

```
400;chunk-signature=e797173de26f45957dd4975da4d64e2db774499121c64f4c0e8dd06282745a10\r\n<1024-bytes>\r\n
```

##### 第 3 块 (Chunk 3)

第 3 块大小为 0，即最后一块。

- 规则化签名字串

```
QWS4-HMAC-SHA256-PAYLOAD
Mon, 02 Jan 2006 15:04:05 GMT
20060102/cn-south-1/mix/qws4_request
e797173de26f45957dd4975da4d64e2db774499121c64f4c0e8dd06282745a10
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

- 第 3 块签名

```
8cfaf9e48b74b7188b2f042d4ef63231774de572d4f88690f5fc61491eb46293
```

- 第 3 块请求数据

```
0;chunk-signature=8cfaf9e48b74b7188b2f042d4ef63231774de572d4f88690f5fc61491eb46293\r\n\r\n
```
