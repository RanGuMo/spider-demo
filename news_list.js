// 爬取新闻 （爬取的地址为 https://www.itcast.cn/newsvideo/newslist_1.shtml）
// 注意：该网站是前后端分离 的

// 引入http模块
const http = require('https')
const cheerio = require('cheerio')


const URL = 'https://www.itcast.cn/newsvideo/newslist_1.shtml'
// 创建请求对象(此时未发送请求)
let res = http.request(URL, (res) => {
    //异步的响应
    let chunks = []
    //监听data事件，获取传递过来的数据片段
    //拼接数据片段 
    res.on('data', chunk => {
        chunks.push(chunk)
    })

    //监听end事件，获取数据完毕时触发
    res.on('end', () => { 
        let html = Buffer.concat(chunks).toString('utf-8') //拼接所有的chunk,并转换成字符串==>html字符串
        console.log(html)
      
    })
})
// 将请求发出去
res.end();