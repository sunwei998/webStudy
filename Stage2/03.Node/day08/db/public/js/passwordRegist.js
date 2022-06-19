var btnEle = document.querySelector('.btn');
var remind_box3_ele = document.querySelector('.remind_box3');
var remind_input3_ele=document.querySelector('.remind_input3');
remind_input3_ele.onblur=()=>{
    setData('password',remind_input3_ele.value)
}
btnEle.onclick = () => {
    console.log('in');
    $.ajax({
        type: 'get',
        url: 'http://localhost:520/checkPasswordDup',
        data: {
            password_a: $('.cipher_a').val(),
            password_b: $('.cipher_b').val()
        },
        success: function (data) {
            if (!data) {
                var warningEle = document.querySelector('.warning3');
                if (!warningEle) {
                    var eleAdd = document.createElement('div');
                    eleAdd.setAttribute('class', 'warning3')
                    eleAdd.innerHTML = "&nbsp;<i class='iconfont icon-gantanhao'></i> <span>密码不一致</span>"
                    remind_box3_ele.appendChild(eleAdd)
                }
            }
            if ((data) && ($('.cipher_a').val())) {
                var warningEle = document.querySelector('.warning3');
                if(warningEle){
                    warningEle.remove();
                }

                location.href='http://localhost:520/informationPage';
                // alert('hello')
            }
        }
    }
    )
}