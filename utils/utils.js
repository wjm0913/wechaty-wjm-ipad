

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 第三方 避免和 自己 写的 api 冲突
 * @param text
 * @returns {boolean}
 */
function excludeType(text) {
    if (text.includes('天气') || text.includes('问候胖子') || text.includes('停')) {
        return true
    } else {
        return false
    }
}

/**
 * @群成员 全部 或者 个人 默认@ 一个人
 * @param room
 * @param nameText
 * @param type
 * @returns {Promise<*|*>}
 */

async function check(room,nameText,type = false) {
    const members = await room.memberAll(); //获取所有群成员
    // 过滤要 @ 的人
    let  someMembers = members.filter(ele=>ele.payload.name === nameText)
    if (type) {
        return members
    }
    return someMembers
}




module.exports = {
    delay,
    excludeType,
    check
}


