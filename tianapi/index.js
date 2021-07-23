/** 2021/7/14/014
 *创建人:魏建明
 *描述: tianApi 接口
 */


const {check} = require("../utils/utils");
const {delay} = require("../utils/utils");
const {excludeType} = require("../utils/utils");
const { tianApi } = require('./service')


class TianApi {
    constructor(bot, msg) {
        this.bot = bot
        this.msg = msg
    }
    async GroupMessage(contact, room, content, alias) {
        if (excludeType(content)) return
        const topic = await room.topic();               // 群名称
        let someMembers = await check( room, await contact.name())
        let roomSay = await this.bot.Room.find({
            topic: topic                                // 设置要 操作群的的 topic
        });
        if (await this.msg.mentionSelf()) {
            let boxText = content.substr(7,content.length)
            let tianText = await tianApi(boxText)
            await delay()
            await roomSay.say(`${tianText}`,...someMembers)
        }
    }

    async FriendsNews(contact, room, content, alias) {
        console.log(content);
    }
}

module.exports = {
    TianApi
}
