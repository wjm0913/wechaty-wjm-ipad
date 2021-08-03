
const schedule = require('node-schedule');
const {check} = require("../utils/utils");
const {excludeType} = require("../utils/utils");


class TimedTask {
    constructor(bot) {
        this.bot = bot
    }

    // 初始化 定时任务 每天的定时任务
    init() {
        console.log(11);
    }

    /**
     * 群成员 自己触发的定时任务
     * @param contact
     * @param room
     * @param content
     * @param alias
     * @param msg
     */
    async messageTimedTaskRoom(contact, room, content, alias, msg){
        let roomTimedTaskType = true // 以后可以在 数据库中获取
        let roomSay = await this.bot.Room.find({
            topic:  await room.topic()                                // 设置要 操作群的的 topic
        });
        // 首先判断 这个群是否开启了 群定时任务的功能
        if (roomTimedTaskType){
            if (content.includes('问候胖子')) {
                schedule.scheduleJob('userid','59 * * * * *',()=>{
                    roomSay.say( '胖子早')
                });
            }
            if (content.includes('停')) {
                schedule.cancelJob('userid');
            }
        }
    }



}



module.exports = {
    TimedTask
}
