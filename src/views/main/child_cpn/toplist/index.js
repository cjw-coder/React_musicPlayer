import React from 'react'
import {withRouter} from 'react-router-dom'
import api from '@/api'
import './index.css'
class Toplist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            toplist:[],
            coverImgId:0
        }
    }

    //调用api.getToplist接口
    UNSAFE_componentWillMount(){
        api.getToplist().then(res => res.json())
        .then(data => {
            if(data.code === 200){
                this.setState({
                    toplist:data.list
                })
            }
        })
    }
    componentWillUnmount(){
        this.setState = (state,callback) => {
            return
        }
    }
    //处理onMouseOver事件，传递当前元素id保存到状态coverImgId
    handleShow = (item) => {
        this.setState({
            coverImgId:item.coverImgId
        })
    }

    //样式是否显示，判断当前id和状态coverImgId
    isShow = (id) => {
        if(id === this.state.coverImgId){
            return true
        }
    }

    //处理onClick事件，跳转路由并携带参数
    handleClick = (item) => {
        this.props.history.push(`/detail?id=${item.id}`)
    }
    render(){
        //定义onMouseOver的相关元素样式
        const showStyle = {
            position: 'relative',
            height:'30px',
            bottom:'0px',
            background:'rgba(0,0,0,0.6)',
            textAlign:'center',
            lineHeight:'30px',
            color:'#fff',
            transition:'0.2s linear',
            transform:'translateY(-30px)'
        }
        
        return(
            <div className="found">
                <h2 className="title">
                <div></div>
                榜单
                <span>HOT</span>
                </h2>
                <div className="content">
                        {
                            this.state.toplist.map((item,index) => {
                                return <div className="contentItem" key={index} onMouseOver={()=>this.handleShow(item)} onClick={() =>this.handleClick(item)}>
                                    <img src={item.coverImgUrl} alt={item.name}/>
                                    <div style={this.isShow(item.coverImgId) ? showStyle : null}>{item.name}</div>
                                </div>
                            })
                        }
                </div>
        </div>
        )
    }
}
export default withRouter(Toplist)