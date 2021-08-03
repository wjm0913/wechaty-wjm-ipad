const {excludeType, check, delay, excludeTypeOlympicGames} = require("../utils/utils");
const {getOlyMedalsData} = require("./service");


class OlympicGames {
    constructor(bot, msg) {
        this.bot = bot
        this.msg = msg
    }
    async GroupMessage(contact, room, content, alias) {
        if (excludeTypeOlympicGames(content)) return
        const topic = await room.topic();               // 群名称
        let someMembers = await check( room, await contact.name())
        let roomSay = await this.bot.Room.find({
            topic: topic                                // 设置要 操作群的的 topic
        });
        if (await this.msg.mentionSelf()) {
            let strData = await getOlyMedalsData()
            let str = `地区 · 金 · 银 · 铜 · 总`
            await delay()
            roomSay.say(`\n${str}\n${strData}`, ...someMembers)
        }
    }
}

module.exports={
    OlympicGames
}