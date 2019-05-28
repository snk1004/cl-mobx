import { observable, action } from "mobx";
import {getListData} from '../../services/index';

export default class Index{ 
    @observable carList = [];
    
    @observable SpeList = []; 

    // 初始化
    constructor(){
        this.getData()
    }

    @action async getData(){
        // 收纳首页字母
        await getListData().then(res=>{
            if(res.code === 1){
                let speArr = [];
                let obj = {};
                for(var i=0;i<res.data.length;i++){
                    if(speArr.indexOf(res.data[i]['Spelling'].slice(0,1)) === -1){
                        speArr.push(res.data[i]['Spelling'].slice(0,1))
                    }
                }
                this.SpeList = speArr;
                speArr.forEach(item=>{
                    obj[item] = [];
                    // eslint-disable-next-line array-callback-return
                    res.data.map(it => {
                        if(item === it['Spelling'].slice(0,1)){
                            obj[item].push(it)
                        }
                    })
                })
                this.carList = obj;
            }
        })
    }
}   