<template>
    <div class='input-container'>
        <div class='input-icon'>
            <slot name='icon'></slot>
        </div>
        <input class='input'>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style >

    .input-container{
        position:relative;
    }

    .input-icon{
        position:absolute;
        height:30px;
        width:30px;
        left:0;
        top:0;
    }
    .input{
        width:100%;
        height:30px;
        outline:none;
        padding:0 30px
    }
</style>