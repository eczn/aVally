const { EventEmitter } = require('events')
    , path = require('path')
    , resolve = require('./resolve')
    , fs = require('fs')

class Page extends EventEmitter {
    constructor(entry) {
        this.entry = entry; 
        this.entryResolve = resolve(this.entry); 

        // 初始化 
        this.info = this.getInfo(); 
    }
    
    /**
     * @description 从磁盘读取 index.json 
     * @returns { js: String, css: String } 
     */
    getInfo() {
        let info = null; 
        try {
            info = require(this.entry); 
        } catch (err){
            console.error('[ Error ] Page 错误: 未定义 index.json'); 
            console.error('Page 位置: ', this.entry); 
            process.exit(1);
        }

        return info; 
    }
}

module.exports = Page; 
