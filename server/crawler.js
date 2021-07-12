/*
현재는 로컬에서 수동으로 돌리는 크롤러 
(디렉토리 별도로 생성해둠. 코드 리마인드용으로 업로드함.)
*/

const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs'); //파일 시스템 모듈
const puppeteer = require('puppeteer'); //Chromium 기반


const crawler = async () => {
    try {
        const browser = await puppeteer.launch({ headless: process.env.NODE_ENV === 'production'}); 
        const page1 = await browser.newPage();
        const page2 = await browser.newPage();

        await page1.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36");
        await page2.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36");
        
        //userAgent를 설정해서 봇이 아닌 사람이 한 것 처럼 속이는 방법
        
        await page1.goto('https://coronamask.kr/');
        await page2.goto('https://mask.shopping/large', {waitUntil: 'load',timeout: 0});
        //옵션 줘서 TimeoutError 해결

        const maskResults =await page1.evaluate(() => { 
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

        const randomMaskResults =await page2.evaluate(() => { 
            let result = [['image', 'price', 'name', 'link', 'sub']];
            let masklists = document.querySelectorAll('li.jsx-876603128');
            masklists.forEach((item) => {
                let img = item.querySelector('.thumb').style.backgroundImage;
                let price = item.querySelector('.price').innerText;
                let name = item.querySelector('.title').innerText;
                let link = item.querySelector('a').href;
                let sub = item.querySelector('.subtitle').innerText;
                result.push([img, price, name, link, sub]);
            });

            return result;
        });

        await page1.close();
        await page2.close();
        await browser.close();

        const str1 = stringify(maskResults); //이차원 배열을 문자열화 해서 새로운 csv 파일에 쓰기
        fs.writeFileSync('csv/mask.csv', str1);

        const str2 = stringify(randomMaskResults); 
        fs.writeFileSync('csv/randomMask.csv', str2);

        const csv=require('csvtojson');

        csv()
        .fromFile('csv/mask.csv')
        .then((jsonObj)=>{
            const maskJSON = JSON.stringify(jsonObj);
            fs.writeFileSync('C:\\Users\\tnqls\\Desktop\\toy-project\\corona-mask-market\\src\\masks.json', maskJSON);
        });

        csv()
        .fromFile('csv/randomMask.csv')
        .then((jsonObj)=>{
            const maskJSON = JSON.stringify(jsonObj);
            fs.writeFileSync('C:\\Users\\tnqls\\Desktop\\toy-project\\corona-mask-market\\src\\randomMasks.json', maskJSON);
        })
    
    } catch (e) {
        console.error(e);
    }

}
    
    
// crawler();