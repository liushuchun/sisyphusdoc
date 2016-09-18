## 安装
=============
安装分为三个部分

1. 安装NSQ消息队列,Mongodb
2. 安装mixapi入口组件
3. 安装scheduler组件
4. 安装worker组件

大概的配置ip如下：

| 名字 | 外网IP | 内网IP | 端口 |
| :--:|:---:| :---:| :--: |
| NSQ | 115.231.180.95 | 172.30.250.167 | tcp:4160 http:4161| 
| mixapi|115.231.180.95| 172.30.250.167 | 9090 |
|scheduler|115.231.180.79| 172.30.250.79 | 9091 |
|Worker 1|115.231.180.108| 172.30.250.109 |  |
|Worker 2|115.231.180.95| 172.30.250.167 |   |

这样配置的原因是，scheduler任务比较繁重，所以需要单机干活。其他的mixapi相对比较轻量，所以可以布多服务。
总共有A,B,C上台机器：
|机器|服务|
|A:172.30.250.167 | Nsq,mixapi|
|B:172.30.250.79  | scheduler |
|C:172.30.250.109 | worker|


## NSQ,Mongodb安装

命令如下：

```
wget https://s3.amazonaws.com/bitly-downloads/nsq/nsq-0.3.5.linux-amd64.go1.4.2.tar.gz
tar -zxvf nsq-0.3.2.linux-amd64.go1.4.1.tar.gz
cd nsq-0.3.5.linux-amd64.go1.4.2/bin/
#绑定 4160端口
./nsqd --lookupd-tcp-address=127.0.0.1:4160
./nsqlookup
```

## 安装mixapi入口组件
先下载mixapi的文件
```
wget http://oa8dpdexh.bkt.clouddn.com/MIXAPI-SCHEDULER.2016-08-24-17-03-51.tar.gz
tar -zxvf MIXAPI-SCHEDULER.2016-08-24-17-03-51.tar.gz
cd _package


```
添加config/application.json文件。
application.json
```json
{
    "name": "mixapi",
    "mode": "test",
    "sections": {
        "development": {
            "domain": "https://api-mix.qiniu.com",
            "server": {
                "addr": "localhost",         //可以配置
                "port": 9090,             //可配置
                "ssl": false
            },
            "logger": {
                "output": "stdout",
                "level": "debug"
            },
            "mongo": {
                "host": "localhost:27017",
                "user": "root",
                "password": "",
                "database": "mixapi_dev",
                "mode": "Strong",
                "pool": 5,
                "timeout": 5
            },
            "account": {
                "host": "https://acc.qbox.me",
                "user": "bot-portal@qiniu.com",
                "passwd": "K674r2SbU%ur8!Qu",
                "client_id": "admin.qiniu.com",
                "client_secret": "admin.qiniu.com"
            },
            "access": {
                "master_hosts": [""],
                "memcached_hosts": [""],
                "access_key_id": "",
                "access_key_secret": ""
            },
            "uc": {
                "host": "http://uc.qbox.me"
            },
            "one": {
                "host": "http://api.qiniu.com"
            },
            "rs": {
                "rs_host": "http://rs.qbox.me",
                "rsf_host": "http://rsf.qbox.me",
                "up_region": "cn-south-1",
                "up_host": "http://upload.qiniu.com",
                "up_regions": {
                    "cn-south-1": "https://up-z0.qbox.me",
                    "cn-north-1": "https://up-z1.qbox.me"
                }
            },
            "redis": {
                "host": "127.0.0.1:6379",
                "password": "",
                "database": 0,
                "pool": 10,
                "pool_timeout": 3,
                "max_retries": 0,
                "read_timeout": 3000,
                "write_timeout": 5000
            },
            "cors": {
                "s3_bucket": [
                    {
                        "origin": "*",
                        "methods": ["*"],
                        "allow_headers": ["*"],
                        "expose_headers": ["X-Reqid"],
                        "max_age": 86400
                    }
                ]
            }
        },
        "test": {
            "domain": "https://api-mix.qiniu.com",
            "server": {
                "addr": "localhost",
                "port": 9090,
                "ssl": false
            },
            "logger": {
                "output": "stdout",
                "level": "info"
            },
            "mongo": {
                "host": "",
                "user": "",
                "password": "",
                "database": "",
                "mode": "Strong",
                "pool": 5,
                "timeout": 5
            },
            "account": {
                "host": "",
                "user": "",
                "passwd": "",
                "client_id": "",
                "client_secret": ""
            },
            "access": {
                "master_hosts": [""],
                "memcached_hosts": [""],
                "access_key_id": "",
                "access_key_secret": ""
            },
            "uc": {
                "host": ""
            },
            "one": {
                "host": ""
            },
            "rs": {
                "rs_host": "",
                "rsf_host": "",
                "up_region": "",
                "up_host": "",
                "up_regions": {

                }
            },
            "redis": {
                "host": "127.0.0.1:6379",
                "password": "",
                "database": 0,
                "pool": 10,
                "pool_timeout": 3,
                "max_retries": 0,
                "read_timeout": 3000,
                "write_timeout": 5000
            },
            "cors": {

            }
        },
        "production": {
            "domain": "https://api-mix.qiniu.com",
            "server": {
                "addr": "localhost",
                "port": 9090,
                "ssl": true,
                "ssl_cert": "/path/to/ssl/cert",
                "ssl_key": "/path/to/ssl/key"
            },
            "logger": {
                "output": "stdout",
                "level": "warn"
            },
            "mongo": {
                "host": "",
                "user": "",
                "password": "",
                "database": "",
                "mode": "Strong",
                "pool": 5,
                "timeout": 5
            },
            "account": {
                "host": "",
                "user": "",
                "passwd": "",
                "client_id": "",
                "client_secret": ""
            },
            "access": {
                "master_hosts": [""],
                "memcached_hosts": [""],
                "access_key_id": "",
                "access_key_secret": ""
            },
            "uc": {
                "host": ""
            },
            "one": {
                "host": ""
            },
            "rs": {
                "rs_host": "",
                "rsf_host": "",
                "up_region": "",
                "up_host": "",
                "up_regions": {

                }
            },
            "redis": {
                "host": "",
                "password": "",
                "database": 0,
                "pool": 10,
                "pool_timeout": 3,
                "max_retries": 0,
                "read_timeout": 3000,
                "write_timeout": 5000
            },
            "cors": {`
                `

            }
        }
    }
}


```

## 安装scheduler组件
```
wget http://oa8dpdexh.bkt.clouddn.com/MIXAPI-SCHEDULER.2016-08-24-17-03-51.tar.gz
tar -zxvf MIXAPI-SCHEDULER.2016-08-24-17-03-51.tar.gz
cd _package


```
添加 config/application.json文件
```json
{
    "name": "scheduler",
    "mode": "production",

     "sections": {
            "development": {
            "master":"http://172.30.250.167:9090",

            "scheduler":{
            "desc":"default desc",
            "type":"CRON",
            "name":"default",
            "apis": {
            "stats": "http://172.30.250.79:9091/stats",
            "spec": "http://172.30.250.79:9091/spec",
            "pause": "http://172.30.250.79:9091/pause",
            "resume": "http://172.30.250.79:9091/resume",
            "delete": "http://172.30.250.79:9091/delete"
            },

            "config": {
                "min_worker": 10,
                "max_worker": 20,
                "stats_interval": 20
            },
            "region":"default"
             },
             "nsq":{
                "host":"127.0.0.1",
                "port":4150,
                "topic":"qiniu",
                "channel":"default"
            },
            "interval":"@every 10s",
            "domain": "https://api-s3.qiniu.com",
            "server": {
                "addr": "localhost",
                "port": 9091,
                "ssl": false
            },
            "logger": {
                "output": "stdout",
                "level": "debug"
            },
            "mongo": {
                "host": "localhost:27017",
                "user": "root",
                "password": "",
                "database": "mixapi_scheduler_dev",
                "mode": "Strong",
                "pool": 5,
                "timeout": 5
            },
            "access": {
                "master_hosts": [""],
                "memcached_hosts": [""],
                "access_key_id": "",
                "access_key_secret": ""
            },
            "uc": {
                "host": "http://uc.qbox.me"
            },
            "one": {
                "host": "http://api.qiniu.com"
            },
            "rs": {
                "rs_host": "http://rs.qbox.me",
                "rsf_host": "http://rsf.qbox.me",
                "up_region": "cn-south-1",
                "up_host": "http://upload.qiniu.com",
                "up_regions": {
                    "cn-south-1": "https://up-z0.qbox.me",
                    "cn-north-1": "https://up-z1.qbox.me"
                }
            },
            "redis": {
                "host": "127.0.0.1:6379",
                "password": "",
                "database": 0,
                "pool": 10,
                "pool_timeout": 3,
                "max_retries": 0,
                "read_timeout": 3000,
                "write_timeout": 5000
            },
            "cors": {
                "s3_bucket": [
                    {
                        "origin": "*",
                        "methods": ["*"],
                        "allow_headers": ["*"],
                        "expose_headers": ["X-Reqid"],
                        "max_age": 86400
                    }
                ]
            }
        },
        "test": {
             "master":"http://172.30.250.167:9090",

            "scheduler":{
            "desc":"default desc",
            "type":"CRON",
            "name":"default",
            "apis": {
            "stats": "http://172.30.250.79:9091/stats",
            "spec": "http://172.30.250.79:9091/spec",
            "pause": "http://172.30.250.79:9091/pause",
            "resume": "http://172.30.250.79:9091/resume",
            "delete": "http://172.30.250.79:9091/delete"
            },

            "config": {
                "min_worker": 10,
                "max_worker": 20,
                "stats_interval": 20
            },
            "region":"default"
             },
             "nsq":{
                "host":"172.30.250.167",
                "port":4150,
                "topic":"qiniu",
                "channel":"default"
            },
            "interval":"@every 10s",
            "domain": "https://api-s3.qiniu.com",
            "server": {
                "addr": "localhost",
                "port": 9091,
                "ssl": false
            },
            "logger": {
                "output": "stdout",
                "level": "info"
            },
            "mongo": {
                "host": "localhost:27017",
                "user": "root",
                "password": "",
                "database": "mixapi_scheduler_dev",
                "mode": "Strong",
                "pool": 5,
                "timeout": 5
            },
            "account": {
                "host": "https://acc.qbox.me",
                "user": "bot-portal@qiniu.com",
                "passwd": "K674r2SbU%ur8!Qu",
                "client_id": "admin.qiniu.com",
                "client_secret": "admin.qiniu.com"
            },
            "access": {
                "master_hosts": [""],
                "memcached_hosts": [""],
                "access_key_id": "",
                "access_key_secret": ""
            },
            "uc": {
                "host": ""
            },
            "one": {
                "host": ""
            },
            "rs": {
                "rs_host": "",
                "rsf_host": "",
                "up_region": "",
                "up_host": "",
                "up_regions": {

                }
            },
            "redis": {
                "host": "127.0.0.1:6379",
                "password": "",
                "database": 0,
                "pool": 10,
                "pool_timeout": 3,
                "max_retries": 0,
                "read_timeout": 3000,
                "write_timeout": 5000
            },
            "cors": {

            }
        },
        "production": {
             "master":"http://172.30.250.167:9090",

            "scheduler":{
            "desc":"default desc",
            "type":"CRON",
            "name":"default",
            "apis": {
            "stats": "http://172.30.250.79:9091/stats",
            "spec": "http://172.30.250.79:9091/spec",
            "pause": "http://172.30.250.79:9091/pause",
            "resume": "http://172.30.250.79:9091/resume",
            "delete": "http://172.30.250.79:9091/delete"
            },

            "config": {
                "min_worker": 10,
                "max_worker": 20,
                "stats_interval": 20
            },
            "region":"default"
             },
             "nsq":{
                "host":"172.30.250.167",
                "port":4150,
                "topic":"qiniu",
                "channel":"default"
            },
            "interval":"@every 10s",
            "domain": "https://api-s3.qiniu.com",
            "server": {
                "addr": "localhost",
                "port": 9091,
                "ssl": true,
                "ssl_cert": "/path/to/ssl/cert",
                "ssl_key": "/path/to/ssl/key"
            },
            "logger": {
                "output": "stdout",
                "level": "warn"
            },
             "mongo": {
                "host": "localhost:27017",
                "user": "root",
                "password": "",
                "database": "mixapi_dev",
                "mode": "Strong",
                "pool": 5,
                "timeout": 5
            },
            "account": {
                "host": "",
                "user": "",
                "passwd": "",
                "client_id": "",
                "client_secret": ""
            },
            "access": {
                "master_hosts": [""],
                "memcached_hosts": [""],
                "access_key_id": "",
                "access_key_secret": ""
            },
            "uc": {
                "host": ""
            },
            "one": {
                "host": ""
            },
            "rs": {
                "rs_host": "",
                "rsf_host": "",
                "up_region": "",
                "up_host": "",
                "up_regions": {

                }
            },
            "redis": {
                "host": "",
                "password": "",
                "database": 0,
                "pool": 10,
                "pool_timeout": 3,
                "max_retries": 0,
                "read_timeout": 3000,
                "write_timeout": 5000
            },
            "cors": {

            }
        }
    }
}

```

## 安装worker
如上
添加配置文件：config/application.json
```json
{
    "name": "worker1",
    "mode": "production",

     "sections": {
            "development": {

            "logger": {
                "output": "stdout",
                "level": "debug"
            },
             "nsq":{
                "host":"172.30.250.167",
                "port":4150,
                "topic":"qiniu",
                "channel":"default"
                    },
            "scheduler_host":"http://172.30.250.79:9091"
        },
        "test": {

            "logger": {
                "output": "stdout",
                "level": "debug"
            },
             "nsq":{
                "host":"172.30.250.167",
                "port":4150,
                "topic":"qiniu",
                "channel":"default"
                    },
            "scheduler_host":"http://172.30.250.79:9091"
        },
        "production": {
            "logger": {
                "output": "stdout",
                "level": "debug"
            },
             "nsq":{
                "host":"172.30.250.167",
                "port":4150,
                "topic":"qiniu",
                "channel":"default"
                    },
            "scheduler_host":"http://172.30.250.79:9091"
        }
    }
}

```