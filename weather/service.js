
const koaRequest = require('koa2-request')

async function weatherApi (newBoxText){
    let url = `https://www.wjmwjh.top:8000/wx/weather/${newBoxText[1]}/${newBoxText[2]}`
    let weatherData = await koaRequest(encodeURI(url));
    let newWeatherData = JSON.parse(weatherData.body)
    let textWeather1 = []
    let textWeather2= []
    let textWeather3= []
    if (newWeatherData.msg === 'success') {
        const {data} = newWeatherData || {}
        const {real, predict} = data || {}
        const {detail} = predict || {}
        const {publish_time, weather, wind} = real || {}
        const {temperature, feelst, info, humidity} = weather || {}
        const {direct, power} = wind || {}
        textWeather1 = `实时：${publish_time}\n天气：${info}\n温度：${temperature}℃\n体感温度：${feelst}℃\n湿度：${humidity}%\n风向：${direct}\n风力：${power}`
        let one = detail[1]
        let two = detail[2]
        textWeather2 = `明天: ${one.date}\n天气：${one.day.weather.info}\n气温：${one.day.weather.temperature}℃\n明天稍晚天气：${one.night.weather.info}\n气温：${one.night.weather.temperature}℃`
        textWeather3 = `后天: ${two.date}\n天气：${two.day.weather.info}\n气温：${two.day.weather.temperature}℃\n后天稍晚天气：${two.night.weather.info}\n气温：${two.night.weather.temperature}℃`
    }
    return {textWeather1,textWeather2,textWeather3}
}

module.exports ={
    weatherApi
}
