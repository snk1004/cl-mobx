import React from 'react'
import '../index.css'

import { Carousel, WingBlank } from 'antd-mobile';

class Banner extends React.Component {
    state = {
        BanArr: []
    };
    async componentDidMount() {
        
    }
    render() {
        const {Data} = this.props;
        let banArr = []
        Data.forEach(item=>{
            item.List.forEach(it=>{
                banArr.push(it.Url.split("{")[0]+3+it.Url.split("}")[1])
            })
        })
        return (
            <div className='show_banner' onClick={()=>{this.props.offBar(false)}}>
                <WingBlank>
                    <Carousel
                    autoplay={false}
                    selectedIndex
                    >
                    {
                        banArr && banArr.map((item,index)=>(
                            <img key={index} src={item} alt=''/>
                        ))
                    }
                    </Carousel>
                </WingBlank>
                <div className='p-btn'>
                    <span>3/{banArr.length}</span>
                    <span>询最低价</span>
                </div>
            </div>
        );
    }
}


export default Banner;