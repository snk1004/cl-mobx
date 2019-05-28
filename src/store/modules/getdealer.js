import { observable, action } from "mobx";
import { getDealer } from "../../services/index"

export default class Side{ 
    @observable dealData = [];

    // 初始化
    constructor(){
        this.getdealerData()
    }

    // 获取详情数据
    @action async getdealerData( carId ){
        getDealer( carId ).then(res=>{
                if(res.code === 1){
                this.dealData = res.data;
            }
        })
    }
}   