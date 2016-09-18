### 错误定义

Qiniu MIX Service 服务遵从标准七牛云服务的错误定义。

#### 数据格式

当错误发生时，Qiniu MIX Service 服务返回如下 JSON 数据:

    {
        "code": "NoSuchBucket",
        "message": "The specified bucket does not exist.",
        "resource": "mybucket",
        "request_id": "56678dc86e2e4037e9000419"
    }

- HTTP Status Code: 3xx, 4xx or 5xx
- Content-Type: application/json

##### JSON 数据字段定义如下

名称 | 描述
---- | ----
code | 错误码
message | 错误信息
resource | 错误对应的请求资源
request_id | 错误对应的请求唯一 ID

#### 错误列表

HTTP 状态码 | 错误码 | 错误信息
----------- | ----- | ------
403 | AccessDenied | Access Denied
403 | AccountProblem | There is a problem with your AWS account that prevents the operation from completing successfully. Please use Contact Us.
400 | AmbiguousGrantByEmailAddress | The email address you provided is associated with more than one account.
400 | BadDigest | The Content-MD5 you specified did not match what we received.
409 | BucketAlreadyExists | The requested bucket name is not available.
409 | BucketAlreadyOwnedByYou | Your previous request to create the named bucket succeeded and you already own it.
409 | BucketNotEmpty | The bucket you tried to delete is not empty.
400 | CredentialsNotSupported | This request does not support credentials.
403 | CrossLocationLoggingProhibited | Cross-location logging not allowed.
400 | EntityTooSmall | Your proposed upload is smaller than the minimum allowed object size.
400 | EntityTooLarge | Your proposed upload exceeds the maximum allowed object size.
400 | ExpiredToken | The provided token has expired.
400 | IllegalVersioningConfigurationException | The versioning configuration specified in the request is invalid.
400 | IncompleteBody | You did not provide the number of bytes specified by the Content-Length HTTP header.
400 | IncorrectNumberOfFilesInPostRequest | POST requires exactly one file upload per request.
400 | InlineDataTooLarge | Inline data exceeds the maximum allowed size.
500 | InternalError | We encountered an internal error. Please try again.
403 | InvalidAccessKeyId | The AWS access key Id you provided does not exist in our records.
200 | InvalidAddressingHeader | You must specify the Anonymous role.
400 | InvalidArgument | Invalid Argument
400 | InvalidBucketName | The specified bucket is not valid.
409 | InvalidBucketState | The request is not valid with the current state of the bucket.
400 | InvalidDigest | The Content-MD5 you specified is not valid.
400 | InvalidEncryptionAlgorithmError | The encryption request you specified is not valid. The valid value is AES256.
400 | InvalidLocationConstraint | The specified location constraint is not valid.
403 | InvalidObjectState | The operation is not valid for the current state of the object.
400 | InvalidPart | One or more of the specified parts could not be found.
400 | InvalidPartOrder | The list of parts was not in ascending order.
403 | InvalidPayer | All access to this object has been disabled.
400 | InvalidPolicyDocument | The content of the form does not meet the conditions specified in the policy document.
416 | InvalidRange | The requested range cannot be satisfied.
400 | InvalidRequest | SOAP requests must be made over an HTTPS connection.
403 | InvalidSecurity | The provided security credentials are not valid.
400 | InvalidSOAPRequest | The SOAP request body is invalid.
400 | InvalidStorageClass | The storage class you specified is not valid.
400 | InvalidTargetBucketForLogging | The target bucket for logging does not exist, is not owned by you, or does not have the appropriate grants for the log-delivery group.
400 | InvalidToken | The provided token is malformed or otherwise invalid.
400 | InvalidURI | Couldn't parse the specified URI.
400 | KeyTooLong | Your key is too long.
400 | MalformedACLError | The XML you provided was not well-formed or did not validate against our published schema.
400 | MalformedPOSTRequest | The body of your POST request is not well-formed multipart/form-data.
400 | MalformedXML | The XML you provided was not well-formed or did not validate against our published schema.
400 | MaxMessageLengthExceeded | Your request was too big.
400 | MaxPostPreDataLengthExceededError | Your POST request fields preceding the upload file were too large.
400 | MetadataTooLarge | Your metadata headers exceed the maximum allowed metadata size.
405 | MethodNotAllowed | The specified method is not allowed against this resource.
200 | MissingAttachment | A SOAP attachment was expected, but none were found.
411 | MissingContentLength | You must provide the Content-Length HTTP header.
400 | MissingRequestBodyError | Request body is empty.
400 | MissingSecurityElement | The SOAP 1.1 request is missing a security element.
400 | MissingSecurityHeader | Your request is missing a required header.
400 | NoLoggingStatusForKey | There is no such thing as a logging status subresource for a key.
404 | NoSuchBucket | The specified bucket does not exist.
404 | NoSuchKey | The specified key does not exist.
404 | NoSuchLifecycleConfiguration | The lifecycle configuration does not exist.
404 | NoSuchUpload | The specified multipart upload does not exist.
404 | NoSuchVersion | The version ID specified in the request does not match an existing version.
501 | NotImplemented | A header you provided implies functionality that is not implemented.
403 | NotSignedUp | Your account is not signed up for the Amazon S3 service.
404 | NoSuchBucketPolicy | The specified bucket does not have a bucket policy.
409 | OperationAborted | A conflicting conditional operation is currently in progress against this resource. Try again.
301 | PermanentRedirect | The bucket you are attempting to access must be addressed using the specified endpoint.
412 | PreconditionFailed | At least one of the preconditions you specified did not hold.
307 | Redirect | Temporary redirect.
409 | RestoreAlreadyInProgress | Object restore is already in progress.
400 | RequestIsNotMultiPartContent | Bucket POST must be of the enclosure-type multipart/form-data.
400 | RequestTimeout | Your socket connection to the server was not read from or written to within the timeout period.
403 | RequestTimeTooSkewed | The difference between the request time and the server's time is too large.
400 | RequestTorrentOfBucketError | Requesting the torrent file of a bucket is not permitted.
403 | SignatureDoesNotMatch | The request signature we calculated does not match the signature you provided.
503 | ServiceUnavailable | Reduce your request rate.
503 | SlowDown | Reduce your request rate.
307 | TemporaryRedirect | You are being redirected to the bucket while DNS updates.
400 | TokenRefreshRequired | The provided token must be refreshed.
400 | TooManyBuckets | You have attempted to create more buckets than allowed.
400 | UnexpectedContent | This request does not support content.
400 | UnresolvableGrantByEmailAddress | The email address you provided does not match any account on record.
400 | UserKeyMustBeSpecified | The bucket POST must contain the specified field name.
