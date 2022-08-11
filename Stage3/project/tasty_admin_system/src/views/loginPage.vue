<template>
  <section>
    <div class="logo" @click="toAdmin" @keyup="toAdmin">
      <div class="nav">
      <img src="@/assets/tasty.png" alt="" width="60px" height="60px">
      </div>
      <h3>Tasty 后台管理系统</h3>
    </div>
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
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="80px"
          >
            <h2>用户登录</h2>
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="username" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" placeholder="password" />
            </el-form-item>

            <el-form-item>
              <el-button
                v-loading.fullscreen.lock="loading"
                type="primary"
                round
                @click="submitForm('ruleForm')"
                icon="el-icon-s-promotion"
              >
                登录
              </el-button>

              <el-popover placement="right" width="310" trigger="click">
                <el-table :data="gridData">
                  <el-table-column
                    width="120"
                    property="role"
                    label="角色"
                  ></el-table-column>
                  <el-table-column
                    width="130"
                    property="name"
                    label="用户名"
                  ></el-table-column>
                  <el-table-column
                    width="60"
                    property="pwd"
                    label="密码"
                  ></el-table-column>
                </el-table>
                <el-button slot="reference" round icon="el-icon-question">帮助</el-button>
              </el-popover>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';
import { set } from '@/common/util';
// eslint-disable-next-line import/no-cycle
import { userLogin } from '@/api/user/login';

export default {
  data() {
    return {
      loading: false,
      ruleForm: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 8,
            message: '长度在 3 到 8 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur',
          },
        ],
      },
      gridData: [{
        role: '管理员',
        name: 'admin',
        pwd: '随意',
      }, {
        role: '部门员工',
        name: 'employee',
        pwd: '随意',
      }, {
        role: '游客',
        name: 'visitor',
        pwd: '随意',
      }],
    };
  },
  methods: {
    ...mapMutations(['saveUser']),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            const result = await userLogin({
              username: this.ruleForm.name,
              password: this.ruleForm.password,
            });

            // ? 将用户态放入vuex和localstorage中
            this.saveUser(result);
            set('user', result);

            // ? 跳转到admin页面
            this.$router.push('admin');
          } catch (error) {
            // ? 自定义错误类型
            if (error.response.data.code === 'Username-Error') {
              this.$message.error('请根据帮助输入规定用户名');
            } else if (error.response.data.code === 'request-body-invalid') {
              this.$message.error('用户名或密码格式错误');
            } else {
              this.$message.warning('网络错误');
            }
          } finally {
            this.loading = false;
            // ? 清空input内容
            this.ruleForm.name = '';
            this.ruleForm.password = '';
          }
          return null;
        }
        return false;
      });
    },
    toAdmin() {
      this.$router.push('admin');
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  /* 相对定位 */
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(to right, #a8caba 0%, #5d4157 100%);
  // background: linear-gradient(to bottom, #f1f4f9, #dff1ff)
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
  //   z-index: 2;
}

.box .circle:nth-child(3) {
  bottom: 50px;
  right: -60px;
  width: 80px;
  height: 80px;
  //   z-index: 2;
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
  min-height: 360px;
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
::v-deep .form .el-form-item__content{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0 !important;
  // margin-top: 30px;
  // width: 100%;
  // padding: 20px 50px;
}
::v-deep .el-input__inner {
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
::v-deep button {
  margin-top: 20px;
  padding: 12px 8px;
}
.logo{
  width: 230px;
  height: 60px;
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
</style>
