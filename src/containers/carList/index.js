import React from 'react';
import { inject, observer } from 'mobx-react';
import '../../assets/index.css';
//better-scroll
import BScroll from 'better-scroll';

// 引入组件
import SHOWSPE from '../../components/showSpe';
import SIDEBAR from '../../components/sideBar';

import { Math } from 'core-js';
// 获取根组件 注入的数据 
@inject('getlist')
@inject('getside')
@observer

class Index extends React.Component {
    constructor() {
        super()
        this.state = {
            Spe: '',
            showSpe: false,
            comp: 0,
            showSide: false
        }
    }
    componentDidMount(){
        const carlist = this.refs.carList
        this.scroll = new BScroll(carlist,{
            click:true
        })
    }
    // 字母跳转
    speTo(it){
        // e.stopPropagation();
        this.scroll.scrollToElement(`#${it}`,500)
        this.setState({
            Spe: it
        })
    }
    // touch开始
    startTouch(event){
        event.preventDefault();
        const spe = this.refs.speList;
        let offsetmove= spe.offsetTop
        // 取触点的初始
        let moveY = event.targetTouches[0].pageY;
        this.setState({
            comp: moveY-offsetmove
        })
        this.comPos(this.state.comp)
    }
    // touch移动
    moveTouch(event){
        event.preventDefault();
        const spe = this.refs.speList;
        // touches是屏幕上所有的touch，取第一个
        let offsetmove= spe.offsetTop
        // 取触点的初始
        let moveY = event.targetTouches[0].pageY;
        this.setState({
            comp: moveY-offsetmove
        })
        this.comPos(this.state.comp)
        this.setState({
            showSpe: true
        })
    }
    // touch结束
    endTouch(){
        this.setState({
            showSpe: false
        })
    }
    // 计算 处理距离差 数据
    comPos(diff){
        const {SpeList} = this.props.getlist;
        let speArr = [];
        let sum = 0;
        const ceilDiff = Math.ceil(diff)-24;
        // eslint-disable-next-line array-callback-return
        SpeList.map((item,index) => {
            sum = index+2;
            speArr.push(item);
        })
        const pos = Math.ceil(ceilDiff/sum);
        this.speTo(SpeList[pos]);
    }
    // 显示侧边栏
    async showSideBar(MasterID){
        let obj =  { MasterID };
        await this.props.getside.getBar(obj);
        const showS = await this.state.showSide;
        await this.setState({
            showSide: !showS
        })
    }
    render() {
        const { carList , SpeList } = this.props.getlist;
        return <div className='car_list'>
                <div className='list' ref='carList'>
                <div>
                {
                    Object.keys(carList).map((item,index)=>(
                    <ul key={index} id={item}>
                        <h5>{item}</h5>
                        {carList[item].map((it,id)=>(
                            <li className='ins_li' key={id}>
                                <div data-ind={it.MasterID} onClick={()=>this.showSideBar(it.MasterID)}>
                                    <img src={it.CoverPhoto} alt=''/>
                                    <span>{it.Name}</span>
                                </div>
                            </li>
                        ))}
                        </ul>
                    ))
                }
                </div>
                </div>
                {this.state.showSpe?<SHOWSPE spe={this.state.Spe||'#'}/>:null}
                <div className='spe_list' ref='speList' onTouchStart={(e)=>{this.startTouch(e)}} onTouchMove={(e)=>{this.moveTouch(e)}} onTouchEnd={(e)=>{this.endTouch(e)}}>
                    <span onClick={()=>{this.speTo('A')}}>#</span>
                    {SpeList.map((it,ind) => (
                        <span key={ind} onClick={()=>{this.speTo(it)}}>{it}</span>
                    ))}
                </div>
                {this.state.showSide?<SIDEBAR/>:null}
            </div>
    }
}

export default Index;