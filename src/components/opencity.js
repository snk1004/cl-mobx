import React from 'react'
import { inject, observer } from 'mobx-react';
import '../index.css'

//better-scroll
import BScroll from 'better-scroll';

// 获取根组件 注入的数据 
@inject('getCity')
@observer

class openCity extends React.Component {
    state = {
        showSmall: false
    };
    componentDidMount(){
        const cityList = this.refs.cityList
        this.scroll = new BScroll(cityList,{
            click: true
        })
    }
    async takeCity(provinceid){
        let obj =  { provinceid };
        await this.props.getCity.getsmallCity(obj);
        await this.setState({
            showSmall: true
        })
    }
    render() {
        const {cityData,smallData} = this.props.getCity;
        return (
            <div className='show_City' ref='cityList'>
                <div>
                    <div className='location'>
                        <p>自动定位</p>
                        <p>北京</p>
                    </div>
                    <div className='o-list'>
                        <p>省市</p>
                        <ul>
                            {
                                cityData.map(item=>(
                                    <li key={item.CityID} id={item.CityID} onClick={()=>{this.takeCity(item.CityID)}}>{item.CityName}</li>
                                ))
                            }
                        </ul>
                    </div>
                    {this.state.showSmall?<div className='small' onClick={()=>{this.setState({showSmall: false})}}>
                        <ul>
                            {
                                smallData.map(item=>(
                                    <li key={item.CityID}>{item.CityName}</li>
                                ))
                            }
                        </ul>
                    </div>:null}
                </div>
            </div>
        );
    }
}


export default openCity;