// 爬虫，爬取 黑马程序员的讲师图片(图片地址：https://web.itheima.com/teacher.html)
// 下载所有老师的照片，需要通过如下步骤实现：
// 1.发送http请求，获取整个网页内容 （可以使用axios库，更加简单）
// 2.通过cheerio库对网页内容进行分析
// 3.提取img标签的src属性
// 4.使用download库进行批量图片下载

// 引入http模块
const http = require('https')
const cheerio = require('cheerio')
const download = require('download')

const HOST = 'https://web.itheima.com/'
// 创建请求对象(此时未发送请求)
let res = http.request(HOST+'teacher.html', (res) => {
    // console.log(res)
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
        // console.log(html)
        // 使用cheerio解析html字符中数据
        let $ = cheerio.load(html)
        console.log($('.tea_main .tea_con .tea_txt img').attr('src')); // 这个只能获取到单张图片
        console.log($('.tea_main .tea_con .tea_txt img').length); 
        // 获取所有的图片元素
        // 方式一：
        // let imgs =[]
        // $('.tea_main .tea_con .tea_txt img').each((index, element) => {
        //     console.log(HOST+$(element).attr('src'))
        //     // console.log(element.attribs.src)
        //     imgs.push(encodeURI(HOST+$(element).attr('src')))
        // })
        // 方式二：
        // let imgs = $('.tea_main .tea_con .tea_txt img').map((index, element) =>  HOST+$(element).attr('src'))
         
        // 方式三：
        // 如果下载的文件地址有中文，一定要用encodeURI进行base64编码,否则download 会下载失败
        let imgs = Array.prototype.map.call($('.tea_main .tea_con .tea_txt img'), (element) => HOST+encodeURI($(element).attr('src')))
        
        console.log(imgs);
        // 下载所有图片
        Promise.all(imgs.map(url => download(url, 'dist'))).then(() => {
             console.log('所有图片下载完毕！');
         });
    })
})
// 将请求发出去
res.end();