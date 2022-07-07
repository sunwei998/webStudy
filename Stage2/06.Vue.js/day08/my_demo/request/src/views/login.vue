<template>
  <div class="loginPage">
    <section>
      <div class="box">
        <!-- 背景圆 -->
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <!-- 登录框 -->
        <div class="container">
          <div class="form">
            <h2>用户登录</h2>
            <div class="inputBox remind_box">
              <input
                type="text"
                aria-hidden="true"
                placeholder="账户"
                class="username remind_input"
                name="username"
                v-model="username"
              />
            </div>
            <div class="inputBox remind_box2">
              <input
                type="password"
                aria-hidden="true"
                placeholder="密码"
                class="password remind_input2 cipher_a"
                name="password_a"
                v-model="password"
              />
            </div>
            <div class="inputBox">
              <button class="btn" @click="login">登录</button>
            </div>
            <p class="forget">没有账户?<a href="#"> 注册 </a></p>
          </div>
        </div>
      </div>
      <div class="mask" v-if="isShow">
        <img src="@/assets/loading.gif" alt="" width="30px" height="30px" />
        <span>Loading...</span>
      </div>
    </section>
  </div>
</template>

<script>
import { loginMethod } from '@/api/login';

export default {
  name: 'loginPage',
  data() {
    return {
      isShow: false,
      //   isShow: true,
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        this.isShow = true;
        const res = await loginMethod({ username: this.username, password: this.password });
        // console.log('res: ', res);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.$router.push('/restaurant');
      } catch (error) {
        alert(error.message);
      } finally {
        // ? 无论成功失败，都会将loading消失
        this.isShow = false;
      }
      // this.$axios.post('/api2/user/login');
      // this.$router.push('/restaurant');
    },
  },
};
</script>

<style lang="scss" scoped>
.mask {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
}
.mask span {
  margin-left: 10px;
}
section {
  /* 相对定位 */
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f1f4f9, #c1def4, rgb(238, 196, 203));
}

.box {
  position: relative;
  border-radius: 10px;
}

.box .circle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter属性为一个元素后面区域添加模糊效果 */
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  filter: hue-rotate(calc(var(--x) * 70deg));
  animation: animate 10s linear infinite;
  animation-delay: calc(var(--x) * -1s);
}

/* 背景圆动画 */

@keyframes animate {
  0%,
  100% {
    transform: translateY(-50px);
  }
  50% {
    transform: translateY(50px);
  }
}

.box .circle:nth-child(1) {
  top: -50px;
  right: -60px;
  width: 100px;
  height: 100px;
}

.box .circle:nth-child(2) {
  top: 150px;
  left: -100px;
  width: 120px;
  height: 120px;
  z-index: 2;
}

.box .circle:nth-child(3) {
  bottom: 50px;
  right: -60px;
  width: 80px;
  height: 80px;
  z-index: 2;
}

.box .circle:nth-child(4) {
  bottom: -80px;
  left: 100px;
  width: 60px;
  height: 60px;
}

.box .circle:nth-child(5) {
  top: -80px;
  left: 140px;
  width: 60px;
  height: 60px;
}

/* 登录框样式 */

.container {
  position: relative;
  width: 600px;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  border-radius: 20px;
  box-shadow: 0 0px 20px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.form {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px;
  padding-right: 20px;
}

/* 登录标题样式 */

.form h2 {
  position: relative;
  color: #00aaff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 5px;
  margin-bottom: 30px;
  cursor: pointer;
}

/* 登录标题的下划线样式 */

.form h2::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 0px;
  height: 3px;
  background: coral;
  transition: 0.5s;
}

.form h2:hover:before {
  width: 112px;
  /* color: coral; */
}

.form .inputBox {
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.form .inputBox input {
  width: 400px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border: none;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #666;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.form .inputBox input::placeholder {
  color: #666;
}

/* 登录按钮样式 */

.form .inputBox .btn {
  background: #fff;
  color: #666;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 20px;
  /* background-color: #d53f22; */
  border-radius: 10px;
  /* color: white; */
  cursor: pointer;
  border: none;
  /* margin-top: 20px; */
}

.forget {
  text-align: left;
  margin-top: 6px;
  color: green;
  letter-spacing: 1px;
  margin-top: 15px;
}

.forget a {
  color: coral;
  font-weight: 600;
  text-decoration: none;
}
.warning,
.warning2,
.warning3,
.warning998 {
  color: rgb(121, 120, 120);
  font-size: 14px;
}

.icon-gantanhao {
  color: #50a1ed;
}
.icon-tongguo {
  color: #41af3d;
}
</style>
