<template>
  <div>
    <div>
      <span>
        <p/>
      </span>
    </div>
    <div margin-top="10px">
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="100px">
        <el-form-item label="密码" prop="password1">
          <el-input
            v-model="form.password1"
            type="password"
            auto-complete="off"
            style="width:300px"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input
            v-model="form.password2"
            type="password"
            auto-complete="off"
            style="width:300px"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="form.newPassword"
            type="password"
            auto-complete="off"
            style="width:300px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleResetPassword">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { resetPassword } from '@/api/user'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.password2 !== '') {
          this.$refs.form.validateField('password2')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password1: '',
        password2: '',
        newPassword: '',
        userId: null
      },
      rules: {
        password1: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        password2: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            min: 8,
            message: '请输入新密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleResetPassword() {
      var user = {
        rawPassword: this.form.password1,
        newPassword: this.form.newPassword,
        userName: this.$store.getters.name,

        userId: this.$store.getters.userId
      }
      resetPassword(user).then(response => {
        this.resetForm('form')
        // this.form.password1 = ''
        // this.form.password2 = ''
        // this.form.newPassword = ''
        if (response.success === true) {
          this.$message({
            type: 'success',
            message: '更改成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '重置密码失败'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.el-input {
  width: '120';
}
</style>

