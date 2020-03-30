/*
현재는 로컬에서 수동으로 돌리는 크롤러 
(디렉토리 별도로 생성해둠. 코드 리마인드용으로 업로드함.)
*/

const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs'); 
const puppeteer = require('puppeteer'); 


const crawler = async () => {
    try {
        const browser = await puppeteer.launch({ headless: process.env.NODE_ENV === 'production'}); 
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36");
        
        await page.goto('https://coronamask.kr/');

        const maskResults =await page.evaluate(() => { 
            let result = [['image', 'price', 'name', 'time', 'link']];
            let masklists = document.querySelectorAll('[data-controller="components--timer"]');
            masklists.forEach((item) => {
                let img = item.querySelector('[title="제품 이미지"]').style.backgroundImage;
                let price = item.querySelector('.text-green-600').innerText;
                let name = item.querySelector('a').firstElementChild.innerText;
                let time = item.querySelector('a .items-center .text-xs p').innerText.slice(-5);
                let link = item.querySelector('a').href;
                result.push([img, price, name, time, link]);
            });

            return result;
        });


        await page.close();
        await browser.close();

        const str = stringify(maskResults);
        fs.writeFileSync('csv/mask.csv', str);

        const csv=require('csvtojson');

        csv()
        .fromFile('csv/mask.csv')
        .then((jsonObj)=>{
            const maskJSON = JSON.stringify(jsonObj);
            fs.writeFileSync('C:\\Users\\tnqls\\Desktop\\toy-project\\corona-mask-market\\src\\masks.json', maskJSON);
        })
    
    } catch (e) {
        console.error(e);
    }

    
}
    
// crawler();