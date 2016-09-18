### Qiniu MIX Service 简介

Qiniu MIX Service 服务是七牛云存储针对客户解决方案提供的一系列 API 服务集合。主要包括以下应用场景:

- 将数据从外部迁移到七牛云存储，如从阿里云存储 (OSS) 迁移数据至七牛云存储，或从用户自己的存储网络迁移数据至七牛云存储。

- 将数据从七牛云内网迁移，如从七牛云存储迁移至七牛冷存储以降低存储费用，或从七牛华南数据中心迁移至华北数据中心以达到灾备的需求。

#### 访问域名

> 注意: Qiniu MIX Service 服务仅支持 RESTful API，且遵从新的认证签名算法。

Qiniu MIX Service 服务默认访问域名为 `https://mix-api.qiniu.com` (cn-south-1)，用户可以根据不同的数据中心选择最优的访问域名。

各个数据中心对应的访问域名列表如下：

- cn-south-1 (华南): `https://cn-south-1-mix.qiniu.com`

- cn-north-1 (华北): `https://cn-north-1-mix.qiniu.com`

#### 数据中心

Qiniu MIX Service 服务支持的数据中心列表如下：

- cn-south-1 (华南)

- cn-north-1 (华北)

#### 费用计算

Qiniu MIX Service 费用根据使用场景不同而有所区别，主要包括如下场景:

- 将数据从外部数据源迁移至七牛云存储，该类迁移产生的费用主要取决于外部数据源对读取数据字节和 API 请求次数的计费策略。如从阿里云存储 (OSS) 迁移数据至七牛云存储，费用主要包括 [OSS 价格总览](https://help.aliyun.com/document_detail/oss/billing/overview.html) 中 *流量费用细则* 和 *接口调用请求费用细则* 中产生的费用。

- 将数据从七牛云内部迁移，该类迁移产生的费用主要发生在跨区域传输产生的公网带宽费用，在相同区域内网传输免费。如从七牛云存储空间 (bucket) 迁移数据至同一区域内的七牛冷存储空间 (bucket) 是免费的，但从七牛云存储空间 (bucket) 迁移数据至不同区域的七牛冷存储空间 (bucket) 是需要收取公网带宽流量费。

- 所有的数据迁移服务都会产生操作类 API 请求费用 (PUT 请求)。

- 数据在七牛云内部迁移时，可能会产生数据请求类 API 请求费用 (LIST 请求)。
