import React, { useEffect,useState } from 'react'
import api from '@/api'
import './index.css'

export default function(){
    
    //使用hooks中的useEffect和useState实现组件挂载时发送请求，并保存数据到当前函数组件
    const [artists,setArtist] = useState([])

    useEffect(() => {
        api.getArtist('limit=10').then(res => res.json())
        .then(data => {
            if(data.code === 200){
                setArtist(data.artists)
            }
        })
    })
    return(
        <div className="footer">
            <div className="footer_content">
                <div className="footer_item">
                    <div className="title">热门歌手</div>
                    <div className="content">
                        {artists.map((item,index) => {
                            //点击跳转到all组件，并传递keywords和type值
                            return <a href={`/all?keywords=${item.name}&type=1`} key={index} >{item.name}</a>
                        })}
                    </div>
                </div>
                <div className="footer_item">
                    <div className="title">语言</div>
                    <div className="content">
                        <a href="/#">中文</a>
                        <a href="/#">English</a>
                    </div>
                </div>
                <div className="footer_item">
                    <div className="title">关注我们</div>
                    <div className="content">
                        <a href="/#">GitHub</a>
                        <a href="/#">微博</a>
                        <a href="/#">BiliBili</a>
                        <a href="/#">简书</a>
                        <a href="/#">Twitter</a>
                        <a href="/#">Instagram</a>
                        <a href="/#">Pinterest</a>
                    </div>
                </div>
                <div className="footer_item">
                    <div className="title">灵感来自</div>
                    <div className="content">
                        <a href="/#">Binaryify</a>
                        <a href="/#">Gouse Mohammed</a>
                    </div>
                </div>
            </div>
            <div className="mark">Copyright @2020</div>
        </div>
    )
}