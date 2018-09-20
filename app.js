const phantom = require('phantom');

function delay(sec) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('Success');
        }, sec * 1000);
    });
}

(async function () {
    const browser = await phantom.create();
    const page = await browser.createPage();
    await page.on("onResourceRequested", function (requestData) {
        console.info('Requesting', requestData.url)
    });
    const status = await page.open('https://course.nuk.edu.tw/Sel/login.asp');
    console.log(status);
    var content = await page.property('url');
    console.log(content);
    var script = await page.evaluate(
        function (username,password) {
            document.querySelectorAll("input")[1].value = username;
            document.querySelectorAll("input")[3].value = password;
            document.querySelector("form").submit();
        },process.argv[2],process.argv[3]);
    await delay(0.5).then(async function () {
        content = await page.property('url');
        console.log(content);
        page.evaluate(function () { document.querySelectorAll("a")[3].click(); });
        await delay(0.5).then(async function () {
            content = await page.property('url');
            console.log(content);
            var swit = true;
            while(swit == true) {page.evaluate(function () { document.querySelector("[name = header]").contentDocument.querySelector('[value = "加選"]').click(); });
            await delay(0.5).then(async function () {
                content = await page.property('url');
                console.log(content);
                page.evaluate(
                    function () {
                        selectpage = document.querySelector("[name = main]").contentDocument.querySelector('[name = main2]').contentDocument;
                        var form = selectpage.Hidden_Form;
                        form.cho_cono.value = "CCO413";
                        form.cho_name.value = "";
                        form.cho_lkind.value = "2";
                        form.cho_yclass.value = "A10707";
                        form.cho_week.value = "1,1,1";
                        form.cho_card.value = "7,8,9";
                        form.cho_num.value = "3";
                        form.cho_notup.value = "False";
                        form.cho_limit.value = "False";
                        form.cho_limit2.value = "1";
                        selectpage.Course_Form.agree.checked = true;
                        selectpage.Course_Form.B1.disabled = false;
                        for (var i = 0; i <= 0; i++) selectpage.Course_Form.querySelectorAll("table tbody tr td [name ^= Cono]")[i].click();
                    });
                await delay(0.5).then(async function () {
                    page.evaluate(function () {
                        selectpage = document.querySelector("[name = main]").contentDocument.querySelector('[name = main2]').contentDocument;
                        function AutoCaptcha() {
                            var image = selectpage.Course_Form.Certify_Image;
                            var canvas = selectpage.createElement('canvas');
                            var ctx = canvas.getContext("2d");
                            var numbers = [
                                "011110100001100001101101101101101101101101100001100001011110", "001000111000001000001000001000001000001000001000001000111110", "011110100001100001000001000010000100001000010000100001111111", "011110100001100001000010001100000010000001100001100001011110", "000100000100001100010100100100100100111111000100000100001111", "111111100000100000101110110001000001000001100001100001011110", "001110010001100000100000101110110001100001100001100001011110", "111111100010100010000100000100001000001000001000001000001000", "011110100001100001100001011110010010100001100001100001011110", "011100100010100001100001100011011101000001000001100010011100"
                            ];
                            var captcha = "";
                            canvas.width = image.width;
                            canvas.height = image.height;
                            canvas.hidden = true;
                            selectpage.body.appendChild(canvas);
                            ctx.drawImage(image, 0, 0);
                            for (var i = 0; i < 4; i++) {
                                var pixels = ctx.getImageData(10 * i + 2, 0, 6, 10).data;
                                var ldString = "";
                                for (var j = 0, length = pixels.length; j < length; j += 4) {
                                    ldString = ldString + ((pixels[j] == 255) ? 0 : 1);
                                }
                                for (var k = 0; k < 10; k++) {
                                    if (ldString == numbers[k]) captcha += k.toString();
                                }
                            }
                            selectpage.Course_Form.Certify.value = captcha;
                        }
                        AutoCaptcha();
                    })
                    await delay(0.5).then(async function () {
                    page.evaluate(function (){document.querySelector("[name = main]").contentDocument.querySelector('[name = main2]').contentWindow.validate();});
                        await delay(0.5).then(async function () {
                            content = await page.evaluate(function(){
                                return document.querySelector("[name = main]").contentDocument.querySelector("p").innerText;
                            });
                            console.log("選課結果"+content);
                            if (!content.search("失敗")) {
                                swit = false
                                browser.exit();
                                return;
                            }
                        })
                    })
                })
            })}
        })
    })
}());