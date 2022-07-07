<template>
  <div class="notFound">
    <div class="box">
        404 NotFound
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFound',
};
</script>

<style lang="scss" scoped>
.notFound {
  width: 100vw;
  height: 100vh;
  background-color: #be9f22;
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 4rem;
  font-weight: bold;
}
.box{
 margin-top: 45vh;
}
</style>
