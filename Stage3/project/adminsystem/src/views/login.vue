<template>
  <div class="container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h3>用户登录</h3>
      <el-form-item
        label="用户名"
        prop="name"
      >
        <el-input v-model="ruleForm.name" />
      </el-form-item>

      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input v-model="ruleForm.password" />
      </el-form-item>

      <el-form-item>
        <el-button
          v-loading.fullscreen.lock="loading"
          type="primary"
          @click="submitForm('ruleForm')"
        >
          登录
        </el-button>
        <el-button @click="resetForm('ruleForm')">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { set } from '@/common/util';
// eslint-disable-next-line import/no-cycle
import { userLogin } from '@/api/user';

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
            // todo 将用户态放入vuex和localstorage中
            this.saveUser({ user: result.user });
            set('user', result.user);
            // todo 跳转到admin页面
            this.$router.push('admin');
          } catch (error) {
            this.$message.error(error.message);
            this.ruleForm.name = '';
            this.ruleForm.password = '';
          } finally {
            this.loading = false;
          }
          return null;
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
   background: linear-gradient(to bottom, #f1f4f9, #c1def4, rgb(238, 196, 203));
}
.demo-ruleForm{
  position: relative;
  width: 480px;
  height: 360px;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  backdrop-filter: blur(5px);
  border-radius: 20px;
  box-shadow: 0 0px 20px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.el-form-item{
  margin-bottom: 0;
}
::v-deep .el-form-item__label{
  text-align: left;
}
::v-deep .el-form-item__content{
  display: flex;
  justify-content: space-between;
  margin: 0;
}
::v-deep .el-input__inner{
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border: none;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #666;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}
.demo-ruleForm h3{
  color: #00aaff;
}
.demo-ruleForm h3::before {
  content: "";
  position: absolute;
  left: 195px;
  top: 60px;
  width: 0px;
  height: 3px;
  background: coral;
  transition: 0.5s;
}

.demo-ruleForm h3:hover:before {
  width: 88px;
  /* color: coral; */
}

</style>
