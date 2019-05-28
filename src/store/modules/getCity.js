import { observable, action } from "mobx";
import { getCity , getSmall } from "../../services/index"

export default class Side{ 
    @observable cityData = [];
    @observable smallData = [];

    // 初始化
    constructor(){
        this.getCityfunc()
        this.getsmallCity()
    }

    // 获取详情数据
    @action async getCityfunc(){
        getCity().then(res=>{
                if(res.code === 1){
                this.cityData = res.data;
            }
        })
    }
    // 获取市区数据
    @action async getsmallCity(obj){
        getSmall(obj).then(res=>{
                if(res.code === 1){
                this.smallData = res.data;
            }
        })
    }
}   