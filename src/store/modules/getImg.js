import { observable, action } from "mobx";
import { getImgData } from "../../services/index"

export default class Side{ 
    @observable ImgData = [];

    // 初始化
    constructor(){
        this.getimgdata()
    }

    // 获取详情数据
    @action async getimgdata( SerialID ){
        getImgData( SerialID ).then(res=>{
                if(res.code === 1){
                this.ImgData = res.data
            }
        })
    }
}   