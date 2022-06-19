function setData(key,value){

    let data = $.cookie('formData');

    if(data){
        data = JSON.parse(data);
    }else{
        data = {};
    }

    data[key] = value;
    $.cookie('formData',JSON.stringify(data))
}
