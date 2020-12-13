var windowWidth;
var windowHeight;
var ctx;
var canvas;
var windows = new Array();

function windowClass(tpx, tpy, w, h, bgc, ts) {
    this.topleftx = tpx;
    this.toplefty = tpy;
    this.width = w;
    this.height = h;
    this.bgcolor = bgc;
    this.onclick = null;
    this.typestr = ts;
    this.draw = windowDraw;
    this.parent = null;
    this.controls = new Array();
}

function label(tpx, tpy, bgc, txt, fs, fc, lw, txth) {
    ctx.font = fs;
    ctx.lineWidth = lw;
    var w = ctx.measureText(txt).width + 10;
    this.window = new windowClass(tpx, tpy, w, txth + 10, bgc, 'Label');
    this.text = txt;
    this.fontstr = fs;
    this.fontcolor = fc;
    this.fontheight = txth;
    this.linewidth = lw;
    this.window.draw = labelDraw;
    this.window.parent = this;
}

function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < windows.length; i++) {
        switch (windows[i].typestr) {
            case 'Window':
                windows[i].draw(windows[i]);
                break;
            case 'Label':
                windows[i].draw(windows[i].parent);
                break;
        }
    }
}

function windowDraw(w) {
    var gradient = ctx.createLinearGradient(w.topleftx, w.toplefty, w.topleftx + w.width, w.toplefty + w.height);
    var redcomp = parseInt(w.bgcolor.substr(1, 2), 16);
    var greencomp = parseInt(w.bgcolor.substr(3, 2), 16);
    var bluecomp = parseInt(w.bgcolor.substr(5, 2), 16);
    gradient.addColorStop(0.0, '#' + getlowcomp(redcomp) + getlowcomp(greencomp) + getlowcomp(bluecomp));
    gradient.addColorStop(0.5, w.bgcolor);
    gradient.addColorStop(1.0, '#' + gethighcomp(redcomp) + gethighcomp(greencomp) + gethighcomp(bluecomp));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(w.topleftx, w.toplefty + 10);
    ctx.arc(w.topleftx + 10, w.toplefty + 10, 10, Math.PI, (Math.PI * 270) / 180, false);
    ctx.lineTo(w.topleftx + w.width - 10, w.toplefty);
    ctx.arc(w.topleftx + w.width - 10, w.toplefty + 10, 10, (Math.PI * 270) / 180, Math.PI * 2, false);
    ctx.lineTo(w.topleftx + w.width, w.toplefty + w.height - 10);
    ctx.arc(w.topleftx + w.width - 10, w.toplefty + w.height - 10, 10, 0, Math.PI / 2, false);
    ctx.lineTo(w.topleftx + 10, w.toplefty + w.height);
    ctx.arc(w.topleftx + 10, w.toplefty + w.height - 10, 10, Math.PI / 2, Math.PI);
    ctx.closePath();
    ctx.fill();
}

function labelDraw(lbl) {
    windowDraw(lbl.window);
    ctx.strokeStyle = lbl.fontcolor;
    ctx.font = lbl.fontstr;
    ctx.lineWidth = lbl.linewidth;
    ctx.strokeText(lbl.text, lbl.window.topleftx + 5, lbl.window.toplefty + lbl.fontheight + 2);
}

function getlowcomp(value) {
    if (value > 0) {
        var x = Math.floor(value / 2);
        if (x <= 16)
            return '0' + x.toString(16);
        else
            return x.toString(16);
    } else {
        return '00';
    }
}

function gethighcomp(value) {
    if (value < 255) {
        var x = value + Math.floor(((255 - value) / 2));
        if (x <= 16)
            return '0' + x.toString(16);
        else
            return x.toString(16);
    } else {
        return 'FF';
    }
}

function findPos(obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return [curleft, curtop];
}

window.onresize = function () {
    canvas.width = windowWidth = document.all ? document.body.clientWidth - 10 : window.innerWidth - 10;
    canvas.height = windowHeight = document.all ? document.body.clientHeight - 30 : window.innerHeight - 30;
    draw();
}

function StartSQLServerCommander(canvasid) {
    canvas = document.getElementById(canvasid);
    ctx = canvas.getContext('2d');
    canvas.onclick = function (e) {
        var data;
        var currRadius = 150;
        var canvas = document.getElementById(e.target.id);
        var canvaspos = findPos(canvas);
        var clickx = e.pageX - canvaspos[0];
        var clicky = e.pageY - canvaspos[1];
        for (var i = 0; i < windows.length; i++) {
            if (windows[i].onclick != null && windows[i].topleftx < clickx && windows[i].topleftx + windows[i].width > clickx &&
                windows[i].toplefty < clicky && windows[i].toplefty + windows[i].height > clicky) {
                windows[i].onclick(windows[i], clickx, clicky);
                break;
            }
        }
    };
    canvas.width = windowWidth = document.all ? document.body.clientWidth - 10 : window.innerWidth - 10;
    canvas.height = windowHeight = document.all ? document.body.clientHeight - 30 : window.innerHeight - 30;
    Login();
    draw();
}

function Login() {
    var loginWindow = new windowClass((canvas.width / 2) - 200, (canvas.height / 2) - 200, 400, 400, '#0000A0', 'Window');
    windows.push(loginWindow);
    var usernamelabel = new label((canvas.width / 2) - 190, (canvas.height / 2) - 190, '#A0A0A0', 'User Name:', 'normal 12px Courier', '#000000', 1, 12);
    windows.push(usernamelabel.window);
    loginWindow.controls.push(usernamelabel.window);
    var passwordlabel = new label((canvas.width / 2) - 190, (canvas.height / 2) - 150, '#A0A0A0', 'Password:', 'normal 12px Courier', '#000000', 1, 12);
    windows.push(passwordlabel.window);
    loginWindow.controls.push(passwordlabel.window);
    var loginbutton = new label((canvas.width / 2) - ((ctx.measureText('Login').width + 10) / 2), (canvas.height / 2) - 100, '#A0A0A0', 'Login', 'normal 12px Courier', '#000000', 1, 12);
    loginbutton.window.onclick = function (w, x, y) { alert(x.toString() + ',' + y.toString() + ',' + w.topleftx.toString() + ',' + w.toplefty.toString()); };
    windows.push(loginbutton.window);
    loginWindow.controls.push(loginbutton.window);
}
