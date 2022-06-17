var btnEle = document.querySelector('.btn');
var usernameEle = document.querySelector('.username');
usernameEle.onblur=()=>{
    setData('username',usernameEle.value)
}
btnEle.onclick = () => {
    console.log('in');
    $.ajax({
        type: 'get',
        url: 'http://localhost:520/checkNameDup',
        data: {
            name: $('.username').val()
        },
        success: function (data) {
            if (data) {
                var remind_box_ele = document.querySelector('.remind_box')
                var warning998Ele = document.querySelector('.warning998')
                if (warning998Ele) {
                    warning998Ele.remove();
                }
                var eleAdd = document.createElement('div');
                eleAdd.setAttribute('class', 'warning998')
                eleAdd.innerHTML = "&nbsp;<i class='iconfont icon-gantanhao'></i> <span>用户名重复</span>"
                remind_box_ele.appendChild(eleAdd)
            }
            if ((!data)&&($('.username').val())) {
                var warning998Ele = document.querySelector('.warning998')
                if (warning998Ele) {
                    warning998Ele.remove();
                }
            location.href='http://localhost:520/passwordPage';
            }
        }
    }
    )
}

