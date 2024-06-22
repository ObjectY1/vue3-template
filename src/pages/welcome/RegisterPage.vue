<script setup>
import {reactive, ref} from "vue";
import {EditPen, Lock, Message, User} from "@element-plus/icons-vue";
import router from "../../router/index.js";
import {sendRegisterEmail, userRegister} from "../../request/index.js";
import {ElMessage} from "element-plus";

const formModel = reactive({
  email: '',
  userAccount: '',
  userPassword: '',
  checkPassword: '',
  code: ''
})

const codeTime = ref(0)

const formRef = ref()

const validateUserAccount = (rule, value, callback) => {
  if(value === '') {
    callback(new Error("请输入用户名"))
  } else if(!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)){
    callback(new Error("用户名不能包含特殊字符"))
  } else {
    callback()
  }
}

const validatePassword = (rule, value, callback) => {
  if(value === ''){
    callback(new Error("请再次输入密码"))
  }else if(value !== formModel.userPassword) {
    callback(new Error("两次输入的密码不一致"))
  }else {
    callback()
  }
}

const rules = {
  userAccount: [
    { validator: validateUserAccount, trigger: ['blur','change'] },
  ],
  userPassword: [
    { required: true, message: "请输入密码" }
  ],
  checkPassword: [
    { validator: validatePassword, trigger: ['blur','change'] }
  ],
  email: [
    { required: true, message: "请输入邮件",trigger: ['blur'] },
    { type: 'email', message: "请输入正确的邮件", trigger: ['blur','change'] }
  ],
  code: [
    { required: true, message: "请输入验证码" }
  ]
}
const sendRegisterMail = () => {
  codeTime.value = 60
  sendRegisterEmail(formModel.email, (data) => {
    ElMessage.success(data)
    const code = setInterval(() => {
      codeTime.value --;
      if(codeTime.value <= 0) {
        clearInterval(code)
      }
    }, 1000)
  }, (data) => {
    ElMessage.warning(data)
    codeTime.value = 0
  })
}

const register = () => {
  formRef.value.validate((valid) => {
    if(valid){
      userRegister(formModel, (data) => {
        ElMessage.success(data)
        router.push("/")
      }, (data) => {
        ElMessage.warning(data)
      })
    }
  })
}
</script>

<template>
  <div style="text-align: center; margin: 0 20px">
    <div style="margin-top: 100px">
      <div style="font-size: 25px; font-weight: bold">注册</div>
      <div style="font-size: 14px;color: grey">注册新用户</div>
    </div>
    <el-form :model="formModel" :rules="rules" ref="formRef" style="margin-top: 20px">
      <el-form-item prop="userAccount">
        <el-input v-model="formModel.userAccount" maxlength="10" type="text" placeholder="请输入账号">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="userPassword">
        <el-input v-model="formModel.userPassword" maxlength="10" type="password" placeholder="请输入密码">
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input v-model="formModel.checkPassword" maxlength="10" type="password" placeholder="请重复输入密码">
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="formModel.email" type="text" placeholder="请输入邮箱">
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="12" style="width: 100%">
          <el-col :span="17">
            <el-input v-model="formModel.code" maxlength="10" type="text" placeholder="请输入验证码">
              <template #prefix>
                <el-icon><EditPen /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-button type="success" @click="sendRegisterMail" :disabled="codeTime !== 0">
              {{ codeTime > 0 ? `请稍后 ${codeTime} 秒` : '获取验证码' }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div style="margin-top: 80px">
      <el-button @click="register" style="width: 270px" type="warning" plain>立即注册</el-button>
    </div>
    <div style="margin-top: 20px">
      <span style="font-size: 14px;line-height: 15px;color: grey">已有帐号？</span>
      <el-link style="translate: 0 -1px" @click="router.push('/')">立即登录</el-link>
    </div>
  </div>

</template>

<style scoped>

</style>