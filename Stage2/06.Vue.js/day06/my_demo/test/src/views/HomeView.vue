<template>
  <div class="home">
    <div class="header">Vue-router练习</div>
    <div class="exterior-container">
      <div class="left-content">
        <div class="first">
          <button
            @click="change('chartPage')"
            :class="['chartButton', { active: current === 'chartPage' }]"
          >
            Chart
          </button>
        </div>
        <div class="second">
          <button
            @click="change('listOrigin')"
            :class="['listOriginButton', { active: current === 'listOrigin' }]"
          >
            Todolist
          </button>
        </div>
        <div class="third">
          <button
            @click="change('listFinal')"
            :class="['listFinalButton', { active: current === 'listFinal' }]"
          >
            Advanced Todolist
          </button>
        </div>
      </div>
      <div class="right-content">
                <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      current: this.$route.name,
    };
  },
  methods: {
    change(v) {
      if (this.$route.path !== `/main/${v}`) {
        this.current = v;
        this.$router.push(v);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 800px;
  height: 500px;
//   background-color: bisque;
  margin: auto;
  margin-top: 50px;
}
.home .header {
  width: 100%;
  height: 50px;
  background-color: coral;
  text-align: center;
  line-height: 50px;
  letter-spacing: 3px;
  font-size: 24px;
  font-weight: bold;
}
.exterior-container {
  width: 100%;
  height: 450px;
//   background-color: plum;
  display: flex;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.left-content {
  width: 160px;
  height: 100%;
  background-color: rgb(68, 220, 167);
  display: flex;
//   border: 1px solid #ccc;
  border-top: none;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.right-content {
  flex: 1;
//   background-color: burlywood;
}
.left-content button {
  width: 120px;
  height: 36px;
  color: white;
  background-color: rgb(48, 177, 232);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}
.left-content .active{
    background-color: red;
}
</style>
