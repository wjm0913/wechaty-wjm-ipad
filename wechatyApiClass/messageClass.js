const ON_MESSAGE = Symbol('onMessage')
const {Weather} = require('../weather/index')
const {TianApi} = require('../tianapi/index')
const { TimedTask } = require('../timedTask/index')

class MessageClass {
    constructor(bot) {
        this.bot = bot
    }

    init() {
        this.bot.on('message', this[ON_MESSAGE].bind(this));
    }

    async [ON_MESSAGE](msg) {
        const contact = msg.talker(); // 发消息人
        const content = msg.text().trim(); // 消息内容
        const room = msg.room(); // 是否是群消息
        const alias = await contact.alias() || await contact.name(); // 发消息人备注
        const isText = msg.type() === this.bot.Message.Type.Text;
        if (msg.self()) {
            return;
        }
        let WeatherExample = new Weather(this.bot, msg)
        let TianApiExample = new TianApi(this.bot, msg)
        let TimedTaskExample = new TimedTask(this.bot)
        // 群消息
        if (room && isText) {
            // 天气
            await WeatherExample.GroupMessage(contact, room, content, alias, msg)
            // TianApi 只能机器人
            await TianApiExample.GroupMessage(contact, room, content, alias, msg)
            // 群成员 设定定时任务
            await TimedTaskExample.messageTimedTaskRoom(contact, room, content, alias, msg)
            const topic = await room.topic()
            console.log(`群名: ${topic} 发消息人: ${await contact.name()} 内容: ${content}`);
        } else if (isText) {
        //  好友消息
            await WeatherExample.FriendsNews(contact, room, content, alias, msg)
            await TianApiExample.FriendsNews(contact, room, content, alias, msg)
            console.log(`发消息人: ${alias} 消息内容: ${content}`);
        }
    }
}

module.exports = {
    MessageClass
}
