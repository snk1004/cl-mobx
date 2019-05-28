import request from "../utils/request"
// 获取列表数据
export async function getListData() {
    let data = await request.get('https://baojia.chelun.com/v2-car-getMasterBrandList.html');
    return data
}
// 获取侧边栏数据
export async function getBarData(params) {
    let data = await request.get('https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html', {
        params: {...params}
    })
    return data
}
// 获取详情数据
export async function getDetailData(params) {
    let data = await request.get('https://baojia.chelun.com/v2-car-getInfoAndListById.html', {
        params: {...params}
    })
    return data
}
// 获取套图数据
export async function getImgData(params) {
    let data = await request.get('https://baojia.chelun.com/v2-car-getImageList.html', {
        params: {...params}
    })
    return data
}
// 获取经销商信息
export async function getDealer(params) {
    let data = await request.get('https://baojia.chelun.com/v2-dealer-alllist.html', {
        params: {...params}
    })
    return data
}
// 获取经销商信息
export async function getCity() {
    let data = await request.get('https://baojia.chelun.com/v1-city-alllist.html')
    return data
}
// 获取市区
export async function getSmall(params) {
    let data = await request.get('https://baojia.chelun.com/v1-city-alllist.html', {
        params: {...params}
    })
    return data
}