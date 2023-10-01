// 爬取新闻 （爬取的地址为 https://www.itcast.cn/newsvideo/newslist_1.shtml）
// 注意：教学视频是 该网站是前后端分离 的, 直接抓去json文件的请求，即可
// 现在网站又改为了不分离

// 引入http模块
const http = require('https')
const cheerio = require('cheerio')
const fs = require('fs')



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
        console.log(html);
        // 将HTML内容存储到文件中 (新起一个js文件，在那里进行调试)
        fs.writeFileSync('./html.txt', html); 

        // 使用cheerio解析html字符中数据
        let $ = cheerio.load(html)
        let long = $('.bcon .box_inner .bcon_left ul a').length
        let urls = $('.bcon .box_inner .bcon_left ul a'); //获取url
        let dates = $('.bcon .box_inner .bcon_left ul a li .bconli_left p').text().trim();
        let titles = $('.bcon .box_inner .bcon_left ul a li .bconli_right h2').text().trim();
        let contents = $('.bcon .box_inner .bcon_left ul a li .bconli_right p').text().trim();


        let HOST = 'https://www.itcast.cn'
        urls = Array.prototype.map.call(urls, (element) => HOST + $(element).attr('href'))
        dates = dates.split('\n').map(item => item.trim())
        titles = titles.split('\n').map(item => item.trim())
        contents = contents.split('\n').map(item => item.trim())



        let data = [];

        for (let i = 0; i < long; i++) {
            data.push({
                url: urls[i],
                date: dates[i],
                title: titles[i],
                content: contents[i]
            });
        }

        console.log(data);



    })
})
// 将请求发出去
res.end();