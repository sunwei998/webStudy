var btnEle = document.querySelector('.btn');
var remind_box2_ele=document.querySelector('.remind_box2')
btnEle.onclick = () => {
    console.log('in');
    $.ajax({
        type: 'get',
        url: 'http://localhost:520/checkLogin',
        data: {
            username: $('.username').val(),
            password: $('.password').val()
        },
        success: function (data) {
            if (!data) {
                var warningEle = document.querySelector('.warning3');
                if (!warningEle) {
                    var eleAdd = document.createElement('div');
                    eleAdd.setAttribute('class', 'warning3')
                    eleAdd.innerHTML = "&nbsp;<i class='iconfont icon-gantanhao'></i> <span>用户名或密码错误</span>"
                    remind_box2_ele.appendChild(eleAdd)
                }
            }
            if ((data)&&($('.username').val())) {
                var warningEle = document.querySelector('.warning3');
                if(warningEle){
                    warningEle.remove();
                }

                location.href='http://localhost:520/successPage';
                // alert('hello')
            }
        }
    }
    )
}