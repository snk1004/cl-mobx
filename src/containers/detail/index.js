import React from 'react'
import { inject, observer } from 'mobx-react';
import {Link} from "react-router-dom"
import './detail.css'

// 获取根组件 注入的数据 
@inject('getside')
@observer

class Detail extends React.Component {
    constructor() {
        super()
        this.state = {
            tabYear: 0,
            modelList: []
        }
    }
    async componentDidMount(){
        let SerialID = sessionStorage.getItem('toDeID');
        let obj =  { SerialID };
        await this.props.getside.getDetail(obj);
        const {detailData} = await this.props.getside;
        await this.setState({
            modelList: detailData.list
        })
    }
    toImgs(ind){
        sessionStorage.setItem('ind',ind);
    }
    toQuo(ind,data){
        sessionStorage.setItem('carID',ind);
        this.props.history.push({
            pathname: '/quotation',
            data: data
        });
    }
    async tabYear(year,ind){
        const newList = [];
        if(year === '全部'){
            const deList = this.props.getside.detailData.list;
            await this.setState({modelList: deList})
            console.log('modelList',this.state.modelList)
        }else{
            const forData = this.props.getside.detailData.list
            await forData.forEach(item =>{
                item.list.forEach(it =>{
                    if(it.market_attribute.year === year){
                        newList.push(it)
                    }
                })
                item.list = newList
            })
            const deList = this.props.getside.detailData.list;
            await this.setState({modelList: deList})
        }
        await this.setState({tabYear: ind})        
    }
    render() {
        const {detailData, yearList} = this.props.getside;
        return <div className='detail_box' ref='detailBox'>
                    <div className='dt_top' onClick={()=>this.toImgs(detailData.SerialID)}>
                        <Link to={{pathname: "/imglist"}}>
                            <img src={detailData.CoverPhoto} alt=''/>
                        </Link>
                        <span>{detailData.pic_group_count}张图片</span>
                    </div>
                    <div className='info'>
                        <div className='info-price'>
                            <p>{detailData.market_attribute && detailData.market_attribute.dealer_price}</p>
                            <span>指导价 {detailData.market_attribute && detailData.market_attribute.official_refer_price}</span>
                        </div>
                        <div className='floor-price' onClick={()=>{this.toQuo(detailData.list[0].car_id,detailData.list[0])}}>
                            <span>{detailData.BottomEntranceTitle}</span>
                        </div>
                    </div>
                    <div className='car-list'>
                        <div className='car-type'>
                            {
                                yearList.map((item,index)=>(
                                    <span className={index===this.state.tabYear?'active':null} key={index} onClick={()=>this.tabYear(item,index)}>{item}</span>
                                ))
                            }
                        </div>
                        <div className='car-class'>
                            {
                                this.state.modelList && this.state.modelList.map((item,index) => (
                                    <div className='car-model' key={index}>
                                        {item.list.length?<p>{item.tit}</p>:null}
                                        <div>
                                            {
                                                item.list && item.list.map((it,ind)=>(
                                                    <ul key={ind}>
                                                        <li className='model-li'>
                                                            <p>{it.market_attribute && it.market_attribute.year}款 {it.car_name&&it.car_name}</p>
                                                            <p>{it.horse_power && it.horse_power}马力{it.gear_num && it.gear_num}档{it.trans_type && it.trans_type}</p>
                                                            <p>
                                                                <span>指导价 {it.market_attribute && it.market_attribute.dealer_price_max}</span>
                                                                <span>{it.market_attribute && it.market_attribute.dealer_price_min}万起</span>
                                                            </p> 
                                                            <button onClick={()=>{this.toQuo(it.car_id,it)}}>{detailData.BottomEntranceTitle}</button>
                                                        </li>
                                                    </ul>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='price-btn' onClick={()=>{this.toQuo(detailData.list[0].car_id,detailData.list[0])}}>
                        <p>询问底价</p>
                        <p>本地经销商为你报价</p>
                    </div>
            </div>
    }
}

export default Detail;