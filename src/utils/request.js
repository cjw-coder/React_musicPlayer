//封装fetch的get和post两种请求方式，并导出
import qs from 'querystring'
export function httpGet(url,params){
    if(params){
        const res = fetch(url+'?'+params)
        return res
    }
    const res = fetch(url)
    return res
}

export function httpPost(url,params){
    const res = fetch(url,{
        method:'post', 
        headers:{     
            'Content-type':'application/x-www-form/urlencoded',
            'Accept':'application/json,text/plain,*/*'
        },
        body:qs.stringify(params)
    })
    return res
}