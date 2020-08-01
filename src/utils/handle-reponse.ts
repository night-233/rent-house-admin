import {message} from "antd";

/**
 * 处理http响应
 * @param request 请求promise
 * @param successCallBack 成功回调
 * @param failMsg 失败消息
 * @param loadingCallback 加载中回调
 */
export const handleResponse = (request, successCallBack, failMsg, loadingCallback?) => {
    loadingCallback && loadingCallback(true);
    debugger
    return request.then(data => {
        if(data){
            successCallBack(data);
        }
    }).catch(e => {
        if(failMsg instanceof  Object){
            console.error(failMsg.content + ":" + e);
            message.error(failMsg);
        }else{
            console.error(failMsg + ":" + e);
            message.error(failMsg);
        }
    }).then(() => loadingCallback && loadingCallback(false));
}
