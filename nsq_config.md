# NSQ 分布式配置
NSQ 是实时的分布式消息处理平台，其设计的目的是用来大规模地处理每天数以十亿计级别的消息。它具有分布式和去中心化拓扑结构，该结构具有无单点故障、故障容错、高可用性以及能够保证消息的可靠传递的特性。

# 安装
NSQ 的安装主要有两种方式：
1. 下载官方已经编译好的二进制文件，下载地址（支持Linux、Darwin、Freebsd和Windows）。
2. 下载源代码后自己编译（通过gpm帮助下载依赖包）

这里我们使用官方编译好文件来进行安装

下载和解压官方压缩包后，里面的文件主要有：

* nsqd （守护进程；接收，缓存和投递消息给客户端）
* nsqlookupd （守护进程；为消费者提供运行时发现服务，来查找指定话题（topic）的生产者 nsqd）
* nsqadmin（提供 Web 页面用来实时的管理你的 NSQ 集群。它通过和 nsqlookupd 实例交流，来确定生产者）

NSQ的工具：
* nsq_pubsub
* nsq_stat
* nsq_tail
* nsq_to_file
* nsq_to_http
* nsq_to_nsq
* to_nsq

# 配置
解压官方提供的压缩包，解压后可以得到一个nsq目录，在nsq目录内则是bin目录，所有nsq脚本都在bin目录中；
`tar -zxvf nsq-X.X.X.linux-amd64.goX.X.X.tar.gz`

将nsq目录移动到/usr/local/下

`sudo mv nsq /usr/local/`
在`/usr/local/nsq`目录下创建`config`，`log`目录和`data`目录
`sudo mkdir config log data`
官方提供了三个主要程序的配置文件示例
```
nsqd.cfg.example
nsqlookupd.cfg.example
nsqadmin.cfg.example

```

你可以到官方源码的[contrib]:https://github.com/nsqio/nsq/tree/master/contrib 目录下载这三个文件；

# 命令行启动NSQ

在PATH中增加nsq脚本路径

`export PATH=$PATH:/usr/local/nsq/bin`

通过以下命令加载配置文件来启动NSQ：
```
nsqd -config=/usr/local/nsq/config/nsqd.cfg
nsqlookupd -config= /usr/local/nsq/config/nsqlookupd.cfg
nsqadmin -config=/usr/local/nsq/config/nsqadmin.cfg
```
如果nsqlookupd有多个服务，nsqd.cfg的配置可以如下修改:
```
nsqlookupd_tcp_addresses = [
    "127.0.0.1:4160″,
    "192.168.1.*:4160″,
    ….
]
```

如果需要支持分布式，其他配置文件中的参数，请按照如上方式进行对应修改；


# 部署
以下假设我们要在两台机器上部署NSQ:

192.168.30.10(简称master)

192.168.30.11(简称sec-master)。

其中nsqlookupd部署到两台机器，nsq两台机器上都部署，以冗余nsqd来实现容灾。

以下假设nsq工具集的路径已包含在${PATH}环境变量中。

## master部署
当程序未指定—config参数时，程序会尝试从配置文件中读取配置信息。配置文件是以cfg为扩展名，且与程序名同名的文本文件。


### nsqadmin.cfg
```nsqadmin.cfg
## <addr>:<port> to listen on for HTTP clients
http_address = "0.0.0.0:4171"

## graphite HTTP address
graphite_url = ""

## proxy HTTP requests to graphite
proxy_graphite = false

## prefix used for keys sent to statsd (%s for host replacement, must match nsqd)
statsd_prefix = "nsq.%s"

## format of statsd counter stats
statsd_counter_format = "stats.counters.%s.count"

## format of statsd gauge stats
statsd_gauge_format = "stats.gauges.%s"

## time interval nsqd is configured to push to statsd (must match nsqd)
statsd_interval = "60s"

## HTTP endpoint (fully qualified) to which POST notifications of admin actions will be sent
notification_http_endpoint = ""


## nsqlookupd HTTP addresses
nsqlookupd_http_addresses = [
    "192.168.30.10:4161"
]

## nsqd HTTP addresses (optional)
nsqd_http_addresses = [
    "192.168.30.10:4151",
    "192.168.30.11:4151",
]

```


nsqd.cfg
```
## enable verbose logging
verbose = false

## unique identifier (int) for this worker (will default to a hash of hostname)
# id = 5150

## <addr>:<port> to listen on for TCP clients
tcp_address = "0.0.0.0:4150"

## <addr>:<port> to listen on for HTTP clients
http_address = "0.0.0.0:4151"

## <addr>:<port> to listen on for HTTPS clients
# https_address = "0.0.0.0:4152"

## address that will be registered with lookupd (defaults to the OS hostname)
# broadcast_address = ""

## cluster of nsqlookupd TCP addresses
nsqlookupd_tcp_addresses = [
    "127.0.0.1:4160"
]

## duration to wait before HTTP client connection timeout
http_client_connect_timeout = "2s"

## duration to wait before HTTP client request timeout
http_client_request_timeout = "5s"

## path to store disk-backed messages
# data_path = "/var/lib/nsq"

## number of messages to keep in memory (per topic/channel)
mem_queue_size = 10000

## number of bytes per diskqueue file before rolling
max_bytes_per_file = 104857600

## number of messages per diskqueue fsync
sync_every = 2500

## duration of time per diskqueue fsync (time.Duration)
sync_timeout = "2s"


## duration to wait before auto-requeing a message
msg_timeout = "60s"

## maximum duration before a message will timeout
max_msg_timeout = "15m"

## maximum size of a single message in bytes
max_msg_size = 1024768

## maximum requeuing timeout for a message
max_req_timeout = "1h"

## maximum size of a single command body
max_body_size = 5123840


## maximum client configurable duration of time between client heartbeats
max_heartbeat_interval = "60s"

## maximum RDY count for a client
max_rdy_count = 2500

## maximum client configurable size (in bytes) for a client output buffer
max_output_buffer_size = 65536

## maximum client configurable duration of time between flushing to a client (time.Duration)
max_output_buffer_timeout = "1s"


## UDP <addr>:<port> of a statsd daemon for pushing stats
# statsd_address = "127.0.0.1:8125"

## prefix used for keys sent to statsd (%s for host replacement)
statsd_prefix = "nsq.%s"

## duration between pushing to statsd (time.Duration)
statsd_interval = "60s"

## toggle sending memory and GC stats to statsd
statsd_mem_stats = true


## message processing time percentiles to keep track of (float)
e2e_processing_latency_percentiles = [
    100.0,
    99.0,
    95.0
]

## calculate end to end latency quantiles for this duration of time (time.Duration)
e2e_processing_latency_window_time = "10m"


## path to certificate file
tls_cert = ""

## path to private key file
tls_key = ""

## set policy on client certificate (require - client must provide certificate,
##  require-verify - client must provide verifiable signed certificate)
# tls_client_auth_policy = "require-verify"

## set custom root Certificate Authority
# tls_root_ca_file = ""

## require client TLS upgrades
tls_required = false

## minimum TLS version ("ssl3.0", "tls1.0," "tls1.1", "tls1.2")
tls_min_version = ""

## enable deflate feature negotiation (client compression)
deflate = true

## max deflate compression level a client can negotiate (> values == > nsqd CPU usage)
max_deflate_level = 6

## enable snappy feature negotiation (client compression)
snappy = true

```

### nsqlookupd.cfg

一般情况下nsqlookupd不需要配置文件，我们使用它的缺省配置即可，如果需要它在特殊端口上监听或修改某些配置，可以修改配置文件

```
## enable verbose logging
verbose = false


## <addr>:<port> to listen on for TCP clients
tcp_address = "0.0.0.0:4160"

## <addr>:<port> to listen on for HTTP clients
http_address = "0.0.0.0:4161"

## address that will be registered with lookupd (defaults to the OS hostname)
# broadcast_address = ""


## duration of time a producer will remain in the active list since its last ping
inactive_producer_timeout = "300s"

## duration of time a producer will remain tombstoned if registration remains
tombstone_lifetime = "45s"
```

## sec-master上配置
只需启动nsqd即可。
配置文件，除了id被设置成5152外，与master上全部相同。

nsqd.cfg
```
## enable verbose logging
verbose = false

## unique identifier (int) for this worker (will default to a hash of hostname)
# id = 5152

## <addr>:<port> to listen on for TCP clients
tcp_address = "0.0.0.0:4150"

## <addr>:<port> to listen on for HTTP clients
http_address = "0.0.0.0:4151"

## <addr>:<port> to listen on for HTTPS clients
# https_address = "0.0.0.0:4152"

## address that will be registered with lookupd (defaults to the OS hostname)
# broadcast_address = ""

## cluster of nsqlookupd TCP addresses
nsqlookupd_tcp_addresses = [
    "127.0.0.1:4160"
]

## duration to wait before HTTP client connection timeout
http_client_connect_timeout = "2s"

## duration to wait before HTTP client request timeout
http_client_request_timeout = "5s"

## path to store disk-backed messages
# data_path = "/var/lib/nsq"

## number of messages to keep in memory (per topic/channel)
mem_queue_size = 10000

## number of bytes per diskqueue file before rolling
max_bytes_per_file = 104857600

## number of messages per diskqueue fsync
sync_every = 2500

## duration of time per diskqueue fsync (time.Duration)
sync_timeout = "2s"


## duration to wait before auto-requeing a message
msg_timeout = "60s"

## maximum duration before a message will timeout
max_msg_timeout = "15m"

## maximum size of a single message in bytes
max_msg_size = 1024768

## maximum requeuing timeout for a message
max_req_timeout = "1h"

## maximum size of a single command body
max_body_size = 5123840


## maximum client configurable duration of time between client heartbeats
max_heartbeat_interval = "60s"

## maximum RDY count for a client
max_rdy_count = 2500

## maximum client configurable size (in bytes) for a client output buffer
max_output_buffer_size = 65536

## maximum client configurable duration of time between flushing to a client (time.Duration)
max_output_buffer_timeout = "1s"


## UDP <addr>:<port> of a statsd daemon for pushing stats
# statsd_address = "127.0.0.1:8125"

## prefix used for keys sent to statsd (%s for host replacement)
statsd_prefix = "nsq.%s"

## duration between pushing to statsd (time.Duration)
statsd_interval = "60s"

## toggle sending memory and GC stats to statsd
statsd_mem_stats = true


## message processing time percentiles to keep track of (float)
e2e_processing_latency_percentiles = [
    100.0,
    99.0,
    95.0
]

## calculate end to end latency quantiles for this duration of time (time.Duration)
e2e_processing_latency_window_time = "10m"


## path to certificate file
tls_cert = ""

## path to private key file
tls_key = ""

## set policy on client certificate (require - client must provide certificate,
##  require-verify - client must provide verifiable signed certificate)
# tls_client_auth_policy = "require-verify"

## set custom root Certificate Authority
# tls_root_ca_file = ""

## require client TLS upgrades
tls_required = false

## minimum TLS version ("ssl3.0", "tls1.0," "tls1.1", "tls1.2")
tls_min_version = ""

## enable deflate feature negotiation (client compression)
deflate = true

## max deflate compression level a client can negotiate (> values == > nsqd CPU usage)
max_deflate_level = 6

## enable snappy feature negotiation (client compression)
snappy = true

```

# 总结
NSQ的安装比较简便，不过在具体的运维过程中可能需要加强监控。还有守护进程需要多个机器，可以布置两台nsqlookupd,防止单点故障。




