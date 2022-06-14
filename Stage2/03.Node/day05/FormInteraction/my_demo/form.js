//? 启停按钮
var btnEle = document.querySelector('.btn');
var usernameEle = document.querySelector('.username');
var cipher_aEle = document.querySelector('.cipher_a');
var cipher_bEle = document.querySelector('.cipher_b');
var ageEle = document.querySelector('.age');
// console.log('ageEle: ', ageEle);

var remind_box_ele = document.querySelector('.remind_box')
// var remindInputEle = document.querySelector('.remind_input');
var flag_1 = false;
var flag_2 = false;
var flag_3 = false;
var flag_4;
var flag_5 = false;
var flag_6 = false;
usernameEle.onchange = function () {
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
    $.ajax({
        type: 'get',
        url: 'http://localhost:1999/checkNameDup',
        data: {
            name: $('.username').val()
        },
        success: function (data) {
            if (data) {
                var warning998Ele = document.querySelector('.warning998')
                if (warning998Ele) {
                    warning998Ele.remove();
                }
                var passEle = document.querySelector('.pass');
                passEle.remove();
                var eleAdd = document.createElement('div');
                eleAdd.setAttribute('class', 'warning998')
                eleAdd.innerHTML = "&nbsp;<i class='iconfont icon-gantanhao'></i> <span>用户名重复</span>"
                remind_box_ele.appendChild(eleAdd)
            } if (!data) {
                var warning998Ele = document.querySelector('.warning998')
                if (warning998Ele) {
                    warning998Ele.remove();
                }
            }
            // flag_4=data;
        }

    }
    )
    var len_1 = this.value;
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
    flag_1 = uPattern.test(len_1);
    btnEle.disabled = !(flag_1 && flag_2 && flag_3 && flag_4 && flag_5 && flag_6);
}
var warning998Ele = document.querySelector('.warning998');
if (!warning998Ele) {
    flag_4 = true;
}
if (warning998Ele) {
    flag_4 = false;
}
btnEle.disabled = !(flag_1 && flag_2 && flag_3 && flag_4 && flag_5 && flag_6);
cipher_aEle.onchange = function () {
    var len_2 = this.value;
    var uPattern = /^[a-zA-Z0-9_]{8,15}$/
    flag_2 = uPattern.test(len_2);
    btnEle.disabled = !(flag_1 && flag_2 && flag_3 && flag_4 && flag_5 && flag_6);
    console.log('按钮是否禁用？ ' + btnEle.disabled)
}
cipher_bEle.onchange = function () {
    var len_6 = this.value;
    var len_7 = cipher_aEle.value;
    flag_3 = len_6 === len_7 ? true : false;
    btnEle.disabled = !(flag_1 && flag_2 && flag_3 && flag_4 && flag_5 && flag_6);
    console.log('按钮是否禁用？ ' + btnEle.disabled)
}
ageEle.onchange = function () {
    if (ageEle.value) {
        flag_5 = true;
    } else {
        flag_5 = false;

    }
    btnEle.disabled = !(flag_1 && flag_2 && flag_3 && flag_4 && flag_5 && flag_6);

}
function check(radio) {
    if (radio) {
        flag_6 = true;
    } else {
        flag_6 = false;
    }
    btnEle.disabled = !(flag_1 && flag_2 && flag_3 && flag_4 && flag_5 && flag_6);
}
//? 输入检测提醒

var remind_box2_ele = document.querySelector('.remind_box2')
var remindInput2Ele = document.querySelector('.remind_input2');
remindInput2Ele.onblur = function () {
    var len_2 = this.value;
    var uPattern = /^[a-zA-Z0-9_]{8,15}$/
    if (len_2 && (uPattern.test(len_2))) {
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
    var len_4 = remindInput2Ele.value;
    var uPattern = /^[a-zA-Z0-9_]{8,15}$/
    if (len_3 && (uPattern.test(len_4))) {
        if (len_3 === len_4) {
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
}
// // 点击事件change
// $('input[type=radio][name=sex]').change(function () {
//     alert($('input:radio:checked').val())
// });

btnEle.onclick = () => {
    $.ajax({
        type: 'post',
        url: 'http://localhost:1999/enrollResult',
        data: {
            username: usernameEle.value,
            password_a: cipher_aEle.value,
            password_b: cipher_bEle.value,
            age: ageEle.value,
            sex: $('input:radio:checked').val(),
        },
        success: (data) => {
            if(!data){
            // console.log(typeof data);
            location.href=`http://localhost:1999/userinfo?username=${usernameEle.value}&age=${ageEle.value}&sex=${$('input:radio:checked').val()}`
            }else{
               alert(data) 
            }
        }
    })
}




