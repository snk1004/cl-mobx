import React from 'react'
import { inject, observer } from 'mobx-react';
// 引入组件
import Banner from '../../components/imgbanner';
import './imglist.css';

// 获取根组件 注入的数据
@inject('getImg')
@observer

class Imglist extends React.Component {
    constructor() {
        super()
        this.state = {
            showBan: false
        }
    }
    async componentDidMount(){
        let SerialID = sessionStorage.getItem('ind');
        const obj = { SerialID };
        await this.props.getImg.getimgdata(obj)
    }
    showBanner(){
        this.setState({
            showBan: true
        })
    }
    offBar(mode){
        console.log(mode)
        this.setState({
            showBan:mode
        })
      }
    render() {
        const {ImgData} = this.props.getImg;
        return <div className='imgs_box'>
                {this.state.showBan? <Banner Data={ImgData} offBar={mode=>this.offBar(mode)}></Banner> :null}
                <div className='tit'>
                    <p>
                        <span>颜色</span>
                        <span>
                            <img src={require('../../assets/jiantouxia.png')} alt=''/>
                        </span>
                    </p>
                    <p>
                        <span>车款</span>
                        <span>
                            <img src={require('../../assets/jiantouxia.png')} alt=''/>
                        </span>
                    </p>
                </div>
                <div className='img-default'>
                    {
                        ImgData && ImgData.map((item,index) => (
                            <ul key={item.Id}>
                                {item.List&&item.List.map((it,ind)=>(
                                    <li key={ind} onClick={()=>this.showBanner()}> 
                                        <img src={it.Url.split("{")[0]+3+it.Url.split("}")[1]} alt=''/>
                                        {ind === 0?<div className='car-open'>
                                            <p>{item.Name}</p>
                                            <p>{item.Count}张 ></p>
                                        </div>:null}
                                    </li>
                                ))}
                            </ul>
                        ))
                    }
                </div>
            </div>
    }
}

export default Imglist;