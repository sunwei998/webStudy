//? 启停按钮
var btnEle = document.querySelector('.btn');
var usernameEle = document.querySelector('.username');
var cipher_aEle = document.querySelector('.cipher_a');
var cipher_bEle = document.querySelector('.cipher_b');
var flag_1 = false;
var flag_2 = false;
var flag_3=false;
usernameEle.onchange = function () {
    var len_1 = this.value;
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
    flag_1 = uPattern.test(len_1);
    btnEle.disabled = !(flag_1 && flag_2&&flag_3);
}
cipher_aEle.onchange = function () {
    var len_2 = this.value;
    var uPattern = /^[a-zA-Z0-9_]{8,15}$/
    flag_2 = uPattern.test(len_2);
    btnEle.disabled = !(flag_1 && flag_2&&flag_3);
    console.log('按钮是否禁用？ ' + btnEle.disabled)
}
cipher_bEle.onchange = function () {
    var len_6 = this.value;
    var len_7=cipher_aEle.value;
    flag_3 = len_6===len_7?true:false;
    btnEle.disabled = !(flag_1 && flag_2&&flag_3);
    console.log('按钮是否禁用？ ' + btnEle.disabled)
}
// btnEle.onclick = function () {
//     console.log('注册中...')
// }

//? 输入检测提醒
var remind_box_ele = document.querySelector('.remind_box')
var remindInputEle = document.querySelector('.remind_input');
remindInputEle.onblur = function () {
    var len_1 = this.value;
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
    if (uPattern.test(len_1)) {
        var warningEle = document.querySelector('.warning')
        if (warningEle) {
            warningEle.remove();
        }
        var passEle = document.querySelector('.pass');
        if (!passEle) {
            var passAdd = document.createElement('div');
            passAdd.setAttribute('class', 'pass')
            passAdd.innerHTML = "&nbsp;&nbsp;<i class='iconfont icon-tongguo'></i>"
            remind_box_ele.appendChild(passAdd)
        }
    } else {
        var passEle = document.querySelector('.pass');
        if (passEle) {
            passEle.remove();
        }
        var warningEle = document.querySelector('.warning');
        if (!warningEle) {
            var eleAdd = document.createElement('div');
            eleAdd.setAttribute('class', 'warning')
            eleAdd.innerHTML = "&nbsp;<i class='iconfont icon-gantanhao'></i> <span>非法输入</span>"
            remind_box_ele.appendChild(eleAdd)
        }
    }
}

var remind_box2_ele = document.querySelector('.remind_box2')
var remindInput2Ele = document.querySelector('.remind_input2');
remindInput2Ele.onblur = function () {
    var len_2 = this.value;
    var uPattern = /^[a-zA-Z0-9_]{8,15}$/
    if (uPattern.test(len_2)) {
        var warningEle = document.querySelector('.warning2')
        if (warningEle) {
            warningEle.remove();
        }
        var passEle = document.querySelector('.pass2');
        if (!passEle) {
            var passAdd = document.createElement('div');
            passAdd.setAttribute('class', 'pass2')
            passAdd.innerHTML = "&nbsp;&nbsp;<i class='iconfont icon-tongguo'></i>"
            remind_box2_ele.appendChild(passAdd)
        }
    } else {
        var passEle = document.querySelector('.pass2');
        if (passEle) {
            passEle.remove();
        }
        var warningEle = document.querySelector('.warning2');
        if (!warningEle) {
            var eleAdd = document.createElement('div');
            eleAdd.setAttribute('class', 'warning2')
            eleAdd.innerHTML = "&nbsp;<i class='iconfont icon-gantanhao'></i> <span>非法输入</span>"
            remind_box2_ele.appendChild(eleAdd)
        }
    }
}



var remind_box3_ele = document.querySelector('.remind_box3')
var remindInput3Ele = document.querySelector('.remind_input3');
remindInput3Ele.onblur = function () {
    var len_3 = this.value;
    var len_4=remindInput2Ele.value;
    if (len_3===len_4) {
        var warningEle = document.querySelector('.warning3')
        if (warningEle) {
            warningEle.remove();
        }
        var passEle = document.querySelector('.pass3');
        if (!passEle) {
            var passAdd = document.createElement('div');
            passAdd.setAttribute('class', 'pass3')
            passAdd.innerHTML = "&nbsp;&nbsp;<i class='iconfont icon-tongguo'></i>"
            remind_box3_ele.appendChild(passAdd)
        }
    } else {
        var passEle = document.querySelector('.pass3');
        if (passEle) {
            passEle.remove();
        }
        var warningEle = document.querySelector('.warning3');
        if (!warningEle) {
            var eleAdd = document.createElement('div');
            eleAdd.setAttribute('class', 'warning3')
            eleAdd.innerHTML = "&nbsp;<i class='iconfont icon-gantanhao'></i> <span>密码不一致</span>"
            remind_box3_ele.appendChild(eleAdd)
        }
    }
}
