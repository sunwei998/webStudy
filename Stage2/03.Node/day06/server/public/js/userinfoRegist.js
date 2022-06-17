var btnEle = document.querySelector('.btn');
var ageEle = document.querySelector('.age');
var userAge_box=document.querySelector('.userAge');
ageEle.onblur=()=>{
    setData('age',ageEle.value)
}
btnEle.onclick = () => {
    console.log('in');
    $.ajax({
        type: 'get',
        url: 'http://localhost:520/checkInfo',
        data: {
            age: $('.age').val(),
            sex: $('input:radio:checked').val()
            
        },
        success: function (data) {
            if (!data) {
                var warningEle = document.querySelector('.warning3');
                if (!warningEle) {
                    var eleAdd = document.createElement('div');
                    eleAdd.setAttribute('class', 'warning3')
                    eleAdd.innerHTML = "&nbsp;<i class='iconfont icon-gantanhao'></i> <span>请完善信息</span>"
                    userAge_box.appendChild(eleAdd)
                }
            }
            if (data) {
                var warningEle = document.querySelector('.warning3');
                if(warningEle){
                    warningEle.remove();
                }
                var cookies = document.cookie.split(";");
                var domain = '.'+location.host;
                console.log(cookies);
                    for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain="+domain+"; path=/";
                    }
                if(cookies.length > 0)
                {
                    for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain="+domain+"; path=/";
                    }
                }
                location.href='http://localhost:520/loginPage';
                // alert('hello')
            }
        }
    }
    )
}