
const koaRequest = require('koa2-request')
const config = require('../config/config')

async function tianApi (newBoxText){
    let url = `http://api.tianapi.com/txapi/robot/index?question=${newBoxText}&key=${config.tianApiKey}`
    let tianApiText = await koaRequest(encodeURI(url))
    let newTianApiText = JSON.parse(tianApiText.body)
    if (newTianApiText.code == 200) {
        return newTianApiText.newslist[0].reply
    }
    return '机器人明明检修中...'
}

module.exports ={
    tianApi
}