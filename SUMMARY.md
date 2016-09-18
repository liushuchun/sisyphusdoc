# Summary

* [Qiniu MIX Service](README.md)
* [简介](intro.md)
    * [快速开始](guide.md)
    * [七牛云内部迁移](guide_qiniu.md)
        * [上传迁移](guide_qiniu_upload.md)
        * [镜像迁移](guide_qiniu_mirror.md)
        * [冷存储迁移](guide_qiniu_line.md)
        * [异地灾备迁移](guide_qiniu_disaster.md)
    * [迁移至七牛云]()
        * [阿里云 (OSS) 迁移](guide_oss.md)
        * [亚马逊 (S3) 迁移](guide_s3.md)
        * [URLs 资源列表迁移](guide_urls.md)
* [API]()
    * [请求头](request.md)
    * [响应头](response.md)
    * [认证](authentication.md)
        * [Header 认证](auth_header.md)
        * [URL 参数认证](auth_query.md)
        * [Chunked 认证](auth_chunked.md)
    * [Service API]()
        * [获取服务列表 (List Services)](service_get.md)
    * [Scheduler API](scheduler.md)
        * [分发迁移任务 (POST Scheduler)](scheduler_post.md)
        * [获取迁移任务 (GET Scheduler)](scheduler_get.md)
        * [暂停迁移任务 (POST Scheduler)](scheduler_pause.md)
        * [恢复迁移任务 (POST Scheduler)](scheduler_resume.md)
        * [删除迁移任务 (DELETE Scheduler)](scheduler_delete.md)
    * [Worker API](worker.md)
        * [启动处理器 (POST Worker)](worker_post.md)
        * [更新处理器状态 (PATCH Worker)](worker_stats.md)
    * [Transfer API](transfer.md)
        * [对外 API]() 
            - [新建迁移 (PUT Transfer)](transfer_put.md)
            - [检查迁移 (HEAD Transfer)](transfer_head.md)
            - [获取迁移 (GET Transfer)](transfer_get.md)
            - [更新迁移 (PATCH Transfer)](transfer_patch.md)
            - [暂停迁移 (POST Transfer)](transfer_pause.md)
            - [恢复迁移 (POST Transfer)](transfer_resume.md)
            - [关闭迁移 (POST Transfer)](transfer_cancel.md)
            - [删除迁移 (DELETE Transfer)](transfer_delete.md)
        * [对内 API]()
            - [注册调度器 (PUT Scheduler)](scheduler_put.md)
            - [同步调度器状态 (POST Scheduler)](scheduler_status.md)
            - [注销调度器 (POST Scheduler)](scheduler_restart.md)
            
    * [Upload API](upload.md)
    * [Mirror API](mirror.md)
* [安装部署]()
    * [消息队列NSQ部署](nsq_config.md)
    * [API router部署](api_router.md)
    * [Scheduler部署](scheduler_deploy.md)
    * [Worker部署](worker_deploy.md)
* [SDK](qws_sdk.md)
    * [Java](aqs_sdk_java.md)
    * [Golang](qws_sdk_go.md)
    * [.NET](qws_sdk_net.md)
    * [Ruby](qws_sdk_ruby.md)
    * [Python](qws_sdk_python.md)
* [错误定义](errors.md)
* [参考资料]()