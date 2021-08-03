
const koaRequest = require('koa2-request')


async function getOlyMedalsData (){
    let url = `https://api.cntv.cn/olympic/getOlyMedals?serviceId=pcocean&itemcode=GEN-------------------------------`
    let getOlyMedals = await koaRequest(encodeURI(url))
    let d = JSON.parse(getOlyMedals.body)
    const { data } = d || {}
    const { medalsList } = data || {}
    let d0 = medalsList.slice(0,10);
    let str = ''
    d0.map(ele=>{
        str += `${ ele.countryname } · ${ ele.gold } · ${ ele.silver } · ${ ele.bronze } · ${ele.count}\n`
    })
    return str
}

module.exports ={
    getOlyMedalsData
}
