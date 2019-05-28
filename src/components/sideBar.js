import React from 'react'
import { inject, observer } from 'mobx-react';
import './comp.css'
import {Link} from "react-router-dom"

//better-scroll
import BScroll from 'better-scroll';

@inject('getside')
@observer
class SideBar extends React.Component {
    state = {
        
    };
    componentDidMount(){
        const sidebox = this.refs.sidebox
        this.scroll = new BScroll(sidebox,{
            click:true,
            probeType: 3
        })
    }
    async toDetail(SerialID){
        sessionStorage.setItem('toDeID',SerialID)
    }
    render() {
        const {barData} = this.props.getside;
        return (
            <div className='side_bar slideInRight' ref='sidebox'>
                <div>
                {
                    barData.map((item,index)=>(
                        <ul key={index}>
                            <h5 id={item.GroupId}>{item.GroupName}</h5>
                            {
                                item.GroupList.map((it,ind)=>(
                                    <Link to={{pathname:"/detail"}} key={ind}>
                                        <li onClick={()=>this.toDetail(it.SerialID)}>
                                            <img src={it.Picture} alt=''/>
                                            <dd>
                                                <p>{it.AliasName}</p>
                                                <span>{it.DealerPrice}</span> 
                                            </dd>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    ))
                }
                </div>
            </div>
        );
    }
}


export default SideBar;