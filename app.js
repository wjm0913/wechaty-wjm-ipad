
// import { PuppetPadlocal } from "wechaty-puppet-padlocal";
// import { Contact, log, Message, ScanStatus, Wechaty } from "wechaty";
const config = require('./config/config')
const { Wechaty } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-padlocal');
const {Init} = require("./wechatyApiClass/init");
const { MessageClass } = require('./wechatyApiClass/messageClass')
const {TimedTask} = require("./timedTask/index");


const puppet = new PuppetPadlocal({
    token: config.ipadKey
})
const bot = new Wechaty({
    name: "TestBot",
    puppet,
})

new Init(bot).init()
new MessageClass(bot).init()
new TimedTask(bot).init()
bot.start().then(() => console.log('开始登陆微信')).catch((e) => console.error(e));
