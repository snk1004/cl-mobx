import { autorun } from "mobx";
// 引入模块
import GetList from './modules/getList';
import GetsideBar from './modules/getsideBar';
import GetImg from './modules/getImg';
import GetDealer from './modules/getdealer';
import GetCity from './modules/getCity';

const getlist = new GetList();
const getside = new GetsideBar();
const getImg = new GetImg();
const getDeal = new GetDealer();
const getCity = new GetCity();

// 追踪数据变化
autorun(() => {
    // console.log('getlist...', getside);
});

export default {
    getlist,
    getside,
    getImg,
    getDeal,
    getCity
}