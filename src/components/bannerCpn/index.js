import React from 'react'
import './index.css'
export default class BannerCpn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentIndex:0
        }
    }
    //组件挂载完成后一段时间执行
    componentDidMount(){
        this.bannerItems = document.getElementsByClassName('banner-item')[0]
        setTimeout(() => {
            this.startTimer()       //开启定时器
        },100)
    }

    //简单的动画函数，实现偏移量累加到指定偏移量
    move(obj,speed,target,callback){
        clearInterval(obj.clock)
        //获取当前left
        if(obj.style.left === ''){
            obj.style.left = 0
        }
        var current = parseInt(obj.style.left)
         //如果current大于target参数，则偏移量应该为负数
        if(current > target){
            speed = -speed
        }

        //开启定时器
        obj.clock = setInterval(() => {
            //获取当前位置oldValue和加上位移量的位置newValue，使用parseInt()取有效整数
            var newValue = parseInt(obj.style.left) + speed
            
            //如果位移量小于0并且新位置小于目标值(证明位移多了)
            //如果位移量大于0并且新位置大于目标值(证明位移多了)
            if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)){
                //纠正新位置为目标值
                newValue = target
            }
            
            //改变当前位置
            obj.style.left = newValue + 'px'

            //如果新位置等于目标值，关闭定时器，并且执行传入的回调函数参数(如果存在的话)
            if(newValue === target){
                clearInterval(obj.clock)
                callback && callback(obj)
            }
        },60)
    }

    //自动轮播
    startTimer(index=0){
        this.clock = setInterval(() => {
            index++
            index %= this.bannerItems.childElementCount
            this.setState({
                currentIndex:index
            },() => {
                console.log(this.state.currentIndex)
                this.move(this.bannerItems,30,-900*this.state.currentIndex,()=>{
                    this.resetIndex(index)
                })
            })
        },4000)
    }

    //在抵达最后一张的前一张，重置偏移量为第一张
    resetIndex(index){
        if(index >= this.bannerItems.childElementCount-1){
            this.bannerItems.style.left = 0
        }
    }

    handleMove = (direct) => {

        clearInterval(this.clock)
        if(direct === 'left'){
            //当前位置减一，并修改state内的currentIndex
            let newIndex = this.state.currentIndex-1

            //如果小于等于0，就证明已经是第一张了，此时强制为0
            if(newIndex <= 0){
                newIndex = 0
            }
            this.setState({
                currentIndex:newIndex
            },()=>{
                this.resetIndex()
                //调用move函数，并在到达指定位置后回调，重新开启自动轮播
                this.move(this.bannerItems,30,-900*this.state.currentIndex,()=>{
                    this.startTimer()
                })
            })
        }
        if(direct === 'right'){
            let newIndex = this.state.currentIndex +1
            //如果是最后一张则回到第一张的位置，重置偏移量和index
            if(newIndex >= this.bannerItems.childElementCount-1){
                this.bannerItems.style.left = 0
                newIndex = 0
            }
            this.setState({
                currentIndex:newIndex
            },()=>{
                this.resetIndex()
                this.move(this.bannerItems,30,-900*this.state.currentIndex,()=>{
                    this.startTimer()
                })
            })
        }
    }
    render(){
        return(
            <div className="bannerCpn" ref={this.bannerCpn}>
                <div className="banner-item">
                    {this.props.bannerItem}
                    {this.props.firstItem}
                </div>
                <div className="leftPointer" onClick={() => this.handleMove('left')}>
                    <div className="pointer"></div>
                </div>
                <div className="rightPointer" onClick={() => this.handleMove('right')}>
                    <div className="pointer"></div>
                </div>
            </div>
        )
    }
}