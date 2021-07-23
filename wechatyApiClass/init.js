

const config = require('../config/config')

const ON_SCAN = Symbol('onScan')
const ON_LOGIN = Symbol('onLogin')
const ON_LOGOUT = Symbol('onLogout')

class Init {
    constructor(bot) {
        this.bot = bot
    }
    init(){
        this.bot.on('scan', this[ON_SCAN].bind(this));
        this.bot.on('login', this[ON_LOGIN].bind(this));
        this.bot.on('logout', this[ON_LOGOUT].bind(this));
    }
    async [ON_SCAN](qrcode, status) {
        require('qrcode-terminal').generate(qrcode); // 在console端显示二维码
        const qrcodeImageUrl = [
            'https://wechaty.js.org/qrcode/',
            encodeURIComponent(qrcode),
        ].join('');
        console.log(qrcodeImageUrl);
    }

    async [ON_LOGIN](user) {
        console.log(`贴心小助理${user}登录了`);
        // await this.onRoom()
    }


    async onRoom() {
        //匹配规则可参考 schedule/index.js
        const time = "0 0 9 * * *";
        setInterval(async () => {
            const room = await this.bot.Room.find({
                topic: '六位帝皇玩儿'
            });
            room.say('胖子叽叽小！')
        },10000);
    }


    async [ON_LOGOUT](user) {
        console.log(`小助手${user} 已经登出`);
    }

}
module.exports = {
    Init
}
