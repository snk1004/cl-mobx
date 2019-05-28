/* eslint-disable array-callback-return */
import { observable, action } from "mobx";
import { getBarData, getDetailData } from "../../services/index"

export default class Side {
    @observable barData = [];
    @observable detailData = [];
    @observable yearList = ['全部'];

    // 初始化
    constructor() {
        this.getBar()
        this.getDetail()
    }

    @action async getBar(MasterID) {
        getBarData(MasterID).then(res => {
            if (res.code === 1) {
                this.barData = res.data
            }
        })
    }

    // 获取详情数据
    @action async getDetail(SerialID) {
        await getDetailData(SerialID).then(res => {
            if (res.code === 1) {
                // this.detailData = res.data
                res.data.list.sort((a, b) => {
                    //排量升序
                    if (a.exhaust !== b.exhaust) {
                        return a.exhaust - b.exhaust
                    } else {
                        // 发动机功率升序
                        if (a.max_power !== b.max_power) {
                            return a.max_power - b.max_power
                        } else {
                            // //吸气方式
                            if (a.inhale_type !== b.inhale_type) {
                                if (a.inhale_type < b.inhale_type) {
                                    return -1;
                                } else {
                                    return 1
                                }
                            } else {
                                //年份降序
                                return b.market_attribute.year - a.market_attribute.year
                            }
                        }
                    }
                })
                let list = res.data.list;
                let arr = [];
                //    将排量，发动机功率，吸气方式相同的放在一个数组
                list.map(item=>{
                    if(arr.indexOf(item.exhaust_str+'/'+item.max_power_str +' '+item.inhale_type)===-1){
                        arr.push(item.exhaust_str+'/'+item.max_power_str+' '+item.inhale_type)
                    }
                })
                let newArr=[];
                arr.map(item =>{
                    newArr.push({
                        tit:item,
                        list:[]
                    })
                })
                newArr.map(item=>{
                    list.map(items=>{
                        if(item.tit===items.exhaust_str+'/'+items.max_power_str +' '+items.inhale_type){
                            item.list.push(items)
                        }
                    })
                })
                //    获取所有年份
                res.data.list.map(item=>{
                if(this.yearList.indexOf(item.market_attribute.year)===-1){
                    this.yearList.push(item.market_attribute.year)
                }
                })  
                res.data.list = [...newArr]
                this.detailData = res.data
            }
        })
    }
}
/* <ul key={item.car_id}>
    {item.exhaust_str&&item.max_power_str&&item.inhale_type ? <p>{item.exhaust_str}/{item.max_power_str}{item.inhale_type}</p> : <p></p>}
    <li>
        <p>{item.market_attribute.year}款 {item.car_name}</p>
        <p>{item.horse_power}马力{item.gear_num}档{item.trans_type}</p>
        <p>
            <span>指导价 {item.market_attribute.dealer_price_max}</span>
            <span>{item.market_attribute.dealer_price_min}万起</span>
        </p> 
        <button onClick={()=>{this.toQuo(item.car_id,item)}}>{detailData.BottomEntranceTitle}</button>
    </li>
</ul> */