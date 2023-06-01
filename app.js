// npm install express mysql bcrypt body-parser express-session
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');


const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889',
    database: 'carparking'
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const session = require('express-session');
app.use(session({
    secret: 'qwer',
    resave: true,
    saveUninitialized: true,

    cookie:{
        path:'/',
        httpOnly:true,
        secure:false,
        maxAge:300 * 1000
    }

}));

app.get('/', (req, res) => {
    res.send('啟動成功');
});

// 登入路由
app.post('/login', (req, res) => {
    const { member_ac, member_pass } = req.body;

    // console.log(member_ac); 
    // console.log(member_pass); 

    // 檢查使用者是否存在
    connection.query('SELECT * FROM member WHERE member_ac = ?', [member_ac], (error, results) => {

        if (error) throw error;

        if (results.length === 0) {
            // 使用者不存在
            res.status(401).json({ message: '使用者名稱或密碼錯誤-1' });
        } else {
            // 使用者存在，檢查密碼是否正確
            bcrypt.compare(member_pass, results[0].member_pass, (err, result) => {

                if (err) throw err;

                if (member_pass == results[0].member_pass) {
                    // 密碼正確，登入成功
                    req.session.member_ac = member_ac;
                    res.status(200).json({ message: '登入成功' }); //跳轉page
                } else {
                    // 密碼錯誤
                    res.status(401).json({ message: '使用者名稱或密碼錯誤-2' }); //跳轉page
                }
            });
        }
    });
});


app.listen(3000, () => {
    console.log('伺服器已啟動3000');
});