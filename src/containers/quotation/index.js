import React from 'react'
import { inject, observer } from 'mobx-react';
import './index.css'
import {Checkbox} from 'antd-mobile';

import ShowCity from '../../components/opencity'
const CheckboxItem = Checkbox.CheckboxItem;

//获取根组件 注入的数据
@inject('getDeal')
@inject('getside')
@observer

class Quotation extends React.Component {
    constructor() {
        super()
        this.state = {
            showCITY: true
        }
    }
    async componentDidMount(){
        const carId = sessionStorage.getItem('carID');
        const cityId = '201';
        const obj = { carId,  cityId};
        this.props.getDeal.getdealerData(obj);    
    }
    openCIty(){
        this.setState({
            showCITY: true
        })
    }
    onChange(v){
        console.log(v)
    }
    render() {
        const {dealData} = this.props.getDeal;
        return <div className='quo_box'>
                {this.state.showCITY?<ShowCity/>:null}
                <header>
                    <p>可向多个商家咨询最低价，商家及时回复</p>
                </header>
                <div className='content'>
                    <div className='quo-type'>
                        <img src='http://img2.bitautoimg.com/autoalbum/files/20180802/883/0255378836_3.jpg' alt=''/>
                        <li>
                            {/* <h5>{dealTit && dealTit}</h5> */}
                            {/* <p>2019款 {detailData && detailData.list[quoid].car_name}</p> */}
                        </li>
                        <span></span>
                    </div>
                    <div className='person-info'>
                        <p>个人信息</p>
                        <ul>
                            <li>
                                <span>姓名</span>
                                <input type='text' placeholder='请输入姓名'/>
                            </li>
                            <li>
                                <span>手机</span>
                                <input type='text' placeholder='请输入手机'/>
                            </li>
                            <li onClick={()=>{this.openCIty()}}>
                                <span>城市</span>
                                <input type='text' value='北京' readOnly="readonly"/>
                                <span className='openCity'></span>
                            </li>
                        </ul>
                        <div className='quo-btn'>
                            <span>询最低价</span>
                        </div>
                    </div>
                    <div className='dealer-info'>
                        <p>选择报价经销商</p>
                        {
                            dealData.list&&dealData.list.map((item,index)=>(
                                <ul key={index}>
                                    <li>
                                        <CheckboxItem key={index} onChange={() => this.onChange(item)}/>
                                        <p>
                                            <span className='p-tit'>{item.dealerShortName}</span>
                                            <span className='p-price'>{item.promotePrice.slice(0,2)}.万</span>
                                        </p>
                                        <p>
                                            <span>{item.address}</span>
                                            <span>售{item.saleRange}</span>
                                        </p>
                                    </li>
                                </ul>
                            ))
                        }
                    </div>
                </div>
            </div>
    }
}

export default Quotation;