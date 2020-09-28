import React ,{useState} from 'react'
import './index.css'

//引入公共组件
import Player from '@/components/player'

//引入当前页面的子组件
import Banner from './child_cpn/banner'
import MvList from './child_cpn/mvList'
import Newsong from './child_cpn/newsong'
import Toplist from './child_cpn/toplist'
import Hot from './child_cpn/hot'
import High from './child_cpn/high'
import Playlist from './child_cpn/playList'
import Footer from './child_cpn/footer'


export default function(){
    const [song,setSong] = useState('')

    //使用useState()保存子组件NewSong传递的数据
    const handleSong = (params) => {
        setSong(params)
    }

    return(
        <div>
            <Player song={song}></Player> 
            <div className="main">
                {/*传递父组件的数据给子组件Player*/}
        
                <div className="content">
                    <div className="left">
                        <Banner></Banner>
                        {/*接收子组件Newsong传递的数据*/}
                        <Newsong getSong = {handleSong}></Newsong>
                        <Toplist></Toplist>
                        <Playlist getSong = {handleSong}></Playlist>
                    </div>
                    <div className="right">
                        <MvList></MvList>
                        <Hot></Hot>
                        <High></High>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
