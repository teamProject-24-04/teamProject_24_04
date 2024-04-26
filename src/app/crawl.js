const express = require('express');
const puppeteer = require('puppeteer');
const mysql = require('mysql');
const cors = require('cors'); // CORS 미들웨어 추가

const app = express();
const port = 3002;

// CORS 미들웨어 설정
app.use(cors());

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teamProject_24_04',
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Puppeteer 브라우저 인스턴스 생성
let browser;

// 상품 목록 가져오기
app.get('/products', async (req, res) => {
  try {
    // Puppeteer를 사용하여 웹 크롤링 수행
    if (!browser) {
      browser = await puppeteer.launch();
    }
    const page = await browser.newPage();

    // 원하는 페이지의 URL을 지정합니다.
    const url = 'https://m.bbqtown.co.kr/goods/goods_list.php?cateCd=080001&sort=&pageNum=10';
    await page.goto(url, { waitUntil: 'domcontentloaded' }); // 페이지 로드가 완료될 때까지 기다립니다.

    // 상품 정보를 가져오기 위한 CSS 선택자를 지정합니다.
    const productSelector = '.goods_prd_item2';

    // 상품 요소들을 선택합니다.
    const productElements = await page.$$(productSelector);

    // 상품 데이터를 담을 배열
    const products = [];

    // 각 상품의 정보를 추출합니다.
    for (const productElement of productElements) {
      const nameElement = await productElement.$('.prd_name');
      const name = await page.evaluate((element) => element.textContent.trim(), nameElement);

      const priceElement = await productElement.$('.price .c_price');
      const price = await page.evaluate((element) => element.textContent.trim(), priceElement);

      const imageElement = await productElement.$('.goods_prd_img .img_box img');
      let imageURL = await page.evaluate((element) => element.getAttribute('src'), imageElement);

      // 이미지 URL이 상대 경로인 경우 절대 경로로 변경합니다.
      if (!imageURL.startsWith('http')) {
        imageURL = new URL(imageURL, url).href;
      }

      // 상품 정보를 배열에 추가합니다.
      products.push({ name, price, imageURL });

      // 상품 정보를 MySQL 데이터베이스에 삽입합니다.
      const query = `INSERT INTO products (name, price, imageURL) VALUES (${mysql.escape(name)}, ${mysql.escape(price)}, ${mysql.escape(imageURL)})`;
      connection.query(query, (err, result) => {
        if (err) {
          console.error('Error inserting product into database:', err);
          return;
        }
        console.log('Product inserted into database:', result);
      });
    }

    // 클라이언트에 상품 데이터 응답
    res.json(products);
  } catch (error) {
    console.error('Error during web scraping:', error);
    res.status(500).json({ error: 'An error occurred during web scraping.' });
  }
});

// 상세 정보 가져오기
app.get('/product-details/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Puppeteer를 사용하여 웹 크롤링 수행
    if (!browser) {
      browser = await puppeteer.launch();
    }
    const page = await browser.newPage();

    // 여기에서 productId를 기반으로 해당 상품의 상세 정보 페이지에 접속하여 정보를 가져옴
    const productDetailUrl = `https://m.bbqtown.co.kr/goods/goods_view.php?goodsNo=${productId}`;
    await page.goto(productDetailUrl, { waitUntil: 'domcontentloaded' });

    // 이미지 URL 가져오는 코드 작성
    await page.waitForSelector('.js-smart-img'); // 이미지가 있는 클래스명으로 대기
    const imageElements = await page.$$('.js-smart-img'); // 이미지 요소들을 모두 가져옴

    // 이미지 URL들을 담을 배열
    const imageURLs = [];

    // 각 이미지의 URL을 추출하여 배열에 추가
    for (const imageElement of imageElements) {
      const imageURL = await page.evaluate((element) => element.getAttribute('src'), imageElement);
      imageURLs.push(imageURL);
    }

    // 가져온 이미지 정보를 프로덕트 테이블에 추가
    for (const imageURL of imageURLs) {
      const updateQuery = `INSERT INTO product_images (product_id, image_url) VALUES (${mysql.escape(productId)}, ${mysql.escape(imageURL)})`;
      connection.query(updateQuery, (err, result) => {
        if (err) {
          console.error('Error updating product images in database:', err);
          return;
        }
        console.log('Product images updated in database:', result);
      });
    }

    const productDetails = { id: productId, imageURLs };
    res.json(productDetails);
  } catch (error) {
    console.error('Error during fetching product details:', error);
    res.status(500).json({ error: 'An error occurred during fetching product details.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
