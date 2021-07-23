/** 2021/7/13/013
 *创建人:魏建明
 *描述: 天气 工具设置
 */


const {check} = require("../utils/utils");
const {weatherApi} = require("./service");

class Weather {
    /**
     *
     * @param bot 机器人
     * @param msg message msg 实例
     */
    constructor(bot, msg) {
        this.bot = bot
        this.msg = msg
    }

    /**
     * 群消息处理
     * @param contact 发消息人
     * @param room    群
     * @param content 内容
     * @param alias   备注
     * @constructor
     */
    async GroupMessage(contact, room, content, alias) {
        const topic = await room.topic();               // 群名称
        let nameText = await contact.name()
        // 当前的 说话的人
        let roomSay = await this.bot.Room.find({
            topic: topic                                // 设置要 操作群的的 topic
        });
        let someMembers = await check( room, await contact.name())
        if (await this.msg.mentionSelf()) {             // 判断 群里是否有人在 @ 我
            if (content.includes('天气')) {        // 内容是否包天气
                if (content.includes('加')) {
                    let boxText = content.substr(7, content.length)
                    let newBoxText = boxText.split('加')
                    let weatherText = await weatherApi(newBoxText)
                    roomSay.say(weatherText.textWeather1)
                    roomSay.say(weatherText.textWeather2)
                    roomSay.say(weatherText.textWeather3)
                    return
                }
                roomSay.say(`${nameText}，请问要查询哪里的天气的呢？\n格式：天气加省份加城市\n例如:@机器人明明天气加河北加迁安\n来自机器人明明...`,...someMembers)
            } else {
                // roomSay.say(`我现在只会查询天气！\n格式：天气加省份加城市\n例如:@机器人明明天气加河北加迁安\n...来自机器人明明...`)

            }

        }
    }

    FriendsNews(contact, room, content, alias) {
        console.log(content);
    }
}

module.exports = {
    Weather
}
