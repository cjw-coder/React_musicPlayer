import {httpGet} from '@/utils/request'
import base from './base'

//接口对象api
const api = {
    getRegister(params){
        if(params){
            return httpGet(base.ownUrl + base.register,params)
        }   
        return httpGet(base.ownUrl + base.register)
    },
    getBanners(params){
        return httpGet(base.ownUrl + base.banner,params)
    },
    getNewsong(params){
        if(params){
            return httpGet(base.ownUrl + base.newsong,params)
        }   
        return httpGet(base.ownUrl + base.newsong)
    },
    getSongUrl(params){
        if(params){
            return httpGet(base.ownUrl + base.songUrl,params)
        }   
        return httpGet(base.ownUrl + base.songUrl)
    },
    getSongDetail(params){
        if(params){
            return httpGet(base.ownUrl + base.songDetail,params)
        }   
        return httpGet(base.ownUrl + base.songDetail)
    },
    getSearch(params){
        if(params){
            return httpGet(base.ownUrl + base.search,params)
        }   
        return httpGet(base.ownUrl + base.search)
    },
    getSearchSongs(params){
        return httpGet('https://music.163.com/#/song'+params)
    },
    getMv(params){
        if(params){
            return httpGet(base.ownUrl + base.mv,params)
        }   
        return httpGet(base.ownUrl + base.mv)
    },
    getMvUrl(params){
        if(params){
            return httpGet(base.ownUrl + base.mvUrl,params)
        }   
        return httpGet(base.ownUrl + base.mvUrl)
    },
    getToplist(){
        return httpGet(base.ownUrl + base.toplist)
    },
    getDetail(params){
        if(params){
            return httpGet(base.ownUrl + base.detail,params)
        }   
        return httpGet(base.ownUrl + base.detail)
    },
    getDetailUrl(params){
        if(params){
            return httpGet(base.ownUrl + base.detailUrl,params)
        }   
        return httpGet(base.ownUrl + base.detailUrl)
    },
    getHot(){
        return httpGet(base.ownUrl + base.hot)
    },
    getHigh(){
        return httpGet(base.ownUrl + base.high)
    },
    getArtist(params){
        if(params){
            return httpGet(base.ownUrl + base.artist,params)
        }   
        return httpGet(base.ownUrl + base.artist)
    }
}

export default api