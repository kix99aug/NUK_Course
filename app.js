(async () => {
    const phantom = require('phantom'), browser = await phantom.create(), page = await browser.createPage(), course = require('./course.json'),
        numbers = [
            "011110100001100001101101101101101101101101100001100001011110",
            "001000111000001000001000001000001000001000001000001000111110",
            "011110100001100001000001000010000100001000010000100001111111",
            "011110100001100001000010001100000010000001100001100001011110",
            "000100000100001100010100100100100100111111000100000100001111",
            "111111100000100000101110110001000001000001100001100001011110",
            "001110010001100000100000101110110001100001100001100001011110",
            "111111100010100010000100000100001000001000001000001000001000",
            "011110100001100001100001011110010010100001100001100001011110",
            "011100100010100001100001100011011101000001000001100010011100"
        ],
        pData = [
            "Account=" + process.argv[2] + "&Password=" + process.argv[3] + "&B1=%B5n%A1%40%A1%40%A4J",
            "&agree=agree&" + "Cono1=" + course.Cono1 + "&Coname1=" + course.Coname1 + "&LKind1=" + course.LKind1 + "&Yclass1=" + course.Yclass1 + "&TWeek1=" + course.TWeek1 + "&TCard1=" + course.TCard1 + "&Num1=" + course.Num1 + "&Notup1=False&Limit1=False&Limit21=1&" + "Cono2=" + course.Cono2 + "&Coname2=" + course.Coname2 + "&LKind2=" + course.LKind2 + "&Yclass2=" + course.Yclass2 + "&TWeek2=" + course.TWeek2 + "&TCard2=" + course.TCard2 + "&Num2=" + course.Num2 + "&Notup2=False&Limit2=False&Limit22=1&" + "Cono3=" + course.Cono3 + "&Coname3=" + course.Coname3 + "&LKind3=" + course.LKind3 + "&Yclass3=" + course.Yclass3 + "&TWeek3=" + course.TWeek3 + "&TCard3=" + course.TCard3 + "&Num3=" + course.Num3 + "&Notup3=False&Limit3=False&Limit23=1&" + "Cono4=" + course.Cono4 + "&Coname4=" + course.Coname4 + "&LKind4=" + course.LKind4 + "&Yclass4=" + course.Yclass4 + "&TWeek4=" + course.TWeek4 + "&TCard4=" + course.TCard4 + "&Num4=" + course.Num4 + "&Notup4=False&Limit4=False&Limit24=1&" + "Cono5=" + course.Cono5 + "&Coname5=" + course.Coname5 + "&LKind5=" + course.LKind5 + "&Yclass5=" + course.Yclass5 + "&TWeek5=" + course.TWeek5 + "&TCard5=" + course.TCard5 + "&Num5=" + course.Num5 + "&Notup5=False&Limit5=False&Limit25=1&" + "Cono6=" + course.Cono6 + "&Coname6=" + course.Coname6 + "&LKind6=" + course.LKind6 + "&Yclass6=" + course.Yclass6 + "&TWeek6=" + course.TWeek6 + "&TCard6=" + course.TCard6 + "&Num6=" + course.Num6 + "&Notup6=False&Limit6=False&Limit26=1&" + "Cono7=" + course.Cono7 + "&Coname7=" + course.Coname7 + "&LKind7=" + course.LKind7 + "&Yclass7=" + course.Yclass7 + "&TWeek7=" + course.TWeek7 + "&TCard7=" + course.TCard7 + "&Num7=" + course.Num7 + "&Notup7=False&Limit7=False&Limit27=1&" + "Cono8=" + course.Cono8 + "&Coname8=" + course.Coname8 + "&LKind8=" + course.LKind8 + "&Yclass8=" + course.Yclass8 + "&TWeek8=" + course.TWeek8 + "&TCard8=" + course.TCard8 + "&Num8=" + course.Num8 + "&Notup8=False&Limit8=False&Limit28=1&" + "Cono9=" + course.Cono9 + "&Coname9=" + course.Coname9 + "&LKind9=" + course.LKind9 + "&Yclass9=" + course.Yclass9 + "&TWeek9=" + course.TWeek9 + "&TCard9=" + course.TCard9 + "&Num9=" + course.Num9 + "&Notup9=False&Limit9=False&Limit29=1&" + "Cono10=" + course.Cono10 + "&Coname10=" + course.Coname10 + "&LKind10=" + course.LKind10 + "&Yclass10=" + course.Yclass10 + "&TWeek10=" + course.TWeek10 + "&TCard10=" + course.TCard10 + "&Num10=" + course.Num10 + "&Notup10=False&Limit10=False&Limit210=1"
        ];

    page.on("onResourceRequested", (requestData) => {
        console.info('Requesting', requestData.url)
    });

    while (true) {
        await page.open('https://course.nuk.edu.tw/Sel/SelectMain1.asp', 'POST', pData[0]);
        await page.open('https://course.nuk.edu.tw/Sel/Main0195.asp', 'POST', "Prgid=CO0200");
        await page.open("https://course.nuk.edu.tw/Sel/Certify_Image.asp");
        let ctext = await page.evaluate(function (numbers) {
            var image = document.querySelector("img");
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d");
            var captcha = "";
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            for (var i = 0; i < 4; i++) {
                var dots = ctx.getImageData(10 * i + 2, 0, 6, 10).data;
                var isBlack = "";
                for (var j = 0, length = dots.length; j < length; j += 4) {
                    isBlack = isBlack + ((dots[j] == 255) ? 0 : 1);
                }
                for (var k = 0; k < 10; k++) {
                    if (isBlack == numbers[k]) captcha += k.toString();
                }
            }
            return captcha;
        }, numbers);
        await page.open('https://course.nuk.edu.tw/Sel/AddScript.asp', 'POST', "total_count=10&Beg_Time=&Certify=" + ctext + pData[1]);
        let plain = await page.property('plainText');
        console.log(plain);
        if ((plain.search("成功") > -1) && (plain.search("錯誤") == -1)) break;
    }
    browser.exit();
    return;
})();