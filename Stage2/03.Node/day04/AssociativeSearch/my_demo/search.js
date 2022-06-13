const inputEle = document.querySelector('input');
const containerEle = document.querySelector('.container');
inputEle.onkeyup = ()=>{
    const keyword = inputEle.value;
    if(keyword){
        $.ajax({
            type:'get',
            url:'http://localhost:3000/search',
            data:{
                keyword
            },
            success: function(newArr) {
                if(newArr.length > 0){
                    containerEle.style.display = 'block'
                    let addContent = '';
                    for (let i=0;i<newArr.length;i++){
                        addContent += `<div>${newArr[i]}</div>`
                    }
                    containerEle.innerHTML = addContent;
                }else{
                    containerEle.style.display = 'none'
                }
            }
        })
    }else{
        containerEle.innerHTML = '';
        containerEle.style.display = 'none'
    }
}