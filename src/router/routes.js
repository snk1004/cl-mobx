import Index from '../containers/carList/index';
import Detail from '../containers/detail/index';
import Imglist from '../containers/imgList/index';
import Quotation from '../containers/quotation/index';
const routes = [{
    path : '/index',
    component : Index
},{
    path : '/detail',
    component : Detail 
},{
    path : '/imglist',
    component : Imglist 
},{
    path : '/quotation',
    component : Quotation 
}]
export default routes