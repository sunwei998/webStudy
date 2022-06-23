const btnEle = document.querySelector('.btn')
const inputEle = document.querySelector('.chat-input')
const contentEle = document.querySelector('.content')
pageRefresh()
scrollToBottom()
inputEle.onkeyup = function (e) {
  if (e.keyCode === 13) {
    sendMessager()
  }
}
btnEle.onclick = sendMessager

function sendMessager() {
  if (inputEle.value) {
    // todo 发请求
    $.ajax({
      type: 'post',
      url: '/addContent',
      data: {
        content: inputEle.value
      },
      success: (data) => {
        // console.log('data: ', data)
        // ! 前端实时更新聊天记录
        let html = ''
        data.data.forEach((item) => {
          html=html+ `<div class='content-item'>
          <div class='big-box'>
              <div>
                  <img src='${item.avatarUrl}' class='avatar'/>
              </div>
              <div class='username'>${item.name}</div>
          </div>
          
          <div class='chat-content'> ${item.content} </div>
      </div>
      <div class='chatTime'>
          ${moment(item.createAt).locale('zh_cn').format('YYYYMMMMDo  aHH:mm:ss')}
      </div>`
        })
        contentEle.innerHTML=html
        scrollToBottom()
        // * 成功后,清空文本框
        inputEle.value = ''
      }
    })
  } else {
    alert('Content cannot be empty')
  }

}
// ! 自动跳到最后
function scrollToBottom(){
  const ele = document.querySelector('.content')
        // * scrollTop代表滚动的距离 ，scrollHeight代表整个div的高度，包括因为滚动隐藏的一部分
        // console.log( ele.scrollTop )
  ele.scrollTop = ele.scrollHeight
}

// ! 轮询
// ! 不停地向后端发送数据请求
function pageRefresh(){
  setInterval(()=>{
    $.ajax({
      type:'get',
      url:'/chat/refresh',
      success:(data)=>{
        let html = ''
        data.data.forEach((item) => {
          html=html+ `<div class='content-item'>
          <div class='big-box'>
              <div>
                  <img src='${item.avatarUrl}' class='avatar'/>
              </div>
              <div class='username'>${item.name}</div>
          </div>
          
          <div class='chat-content'> ${item.content} </div>
      </div>
      <div class='chatTime'>
          ${moment(item.createAt).locale('zh_cn').format('YYYYMMMMDo  aHH:mm:ss')}
      </div>`
        })
        contentEle.innerHTML=html
        // scrollToBottom()
      }
    })
  },1000)
}