import React from 'react'
import './index.css'
import '@/static/fontIcon/iconfont.css'
export default class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list:[]
        }
    }

    //当前组件props数据发送变化时，获取新的props数据
    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            list:nextProps.list
        })
    }

    //处理onClick事件，传递指定参数id给父组件
    handleClick = (params) => {
        this.props.getSong(params)
    }

    //处理
    render(){
        return(
            <div className="list">
                {this.state.list.map((item,index) => {
                        return <div key={index} className="listItem" onClick={()=>this.handleClick(item)}>
                            <span className="nums">{index + 1}</span>
                            <span className="iconfont icon-bofang"></span>
                            <span className="song">{item.name}</span>
                            <div className="info">
                                <span className="artist">{item.ar.map((childItem,index) => {
                                    return<span key={index}>{childItem.name}</span>
                                })}</span>
                                <span className="alias">{item.al.name}</span>
                            </div>
                        </div>
                })}
            </div>
            
        )
    }
}