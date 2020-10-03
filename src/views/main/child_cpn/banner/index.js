import React from 'react'
import api from '@/api'
import './index.css'
import BannerCpn from '@/components/bannerCpn'

export default class Banner extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            banners:[],
            firstItem:{}
        }
    }

    //调用api.getBanners接口
    componentDidMount(){
        api.getBanners('type=0').then(res => res.json())
        .then(data => {
            this.setState({
                banners:data.banners,
                firstItem:data.banners[0]
            })
        })
    }

    //组件卸载前清除网络状态
    componentWillUnmount(){
        this.setState = (state,callback) => {
            return
        }
    }
    //判断banner具体参数来动态设置href链接参数
    getBannerType = (targetType,targetId,targetUrl) =>{
        if(targetUrl){
            return targetUrl
        }
        let type = ''
        switch(targetType){
            case 1:
                type = 'song'
                break
            case 10:
                type = 'album'
                break
            case 1004:
                type = 'mv'
                break
            default:
                break
        }
        return `https://music.163.com/#/${type}?id=${targetId}`
    }

    render(){
       
        //定义样式
        const contentStyle = {
            height: '400px',
            color: '#fff',
            lineHeight: '400px'
          };
        const imgStyle = {
            width:'900px'
        }
        
        return(
            <div className="banner">
                <BannerCpn
                 bannerItem = {
                    this.state.banners.map((item) => {
                        return<a style={contentStyle} key={item.targetId} href={this.getBannerType(item.targetType,item.targetId,item.url)}>
                                <img src={item.imageUrl} style={imgStyle} alt={item.typeTitle}></img>
                            </a>
                            
                    })
                 }
                 firstItem = {
                     <a style={contentStyle} key={this.state.firstItem.targetId} 
                     href={this.getBannerType(this.state.firstItem.targetType,this.state.firstItem.targetId,this.state.firstItem.url)}>
                         <img src={this.state.firstItem.imageUrl} style={imgStyle} alt={this.state.firstItem.typeTitle}></img>
                     </a>
                 }>
                </BannerCpn>
            </div>
        )
    }
}


