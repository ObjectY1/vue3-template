<script setup>
import {reactive, ref} from "vue";
import {Lock, User} from "@element-plus/icons-vue";
import {userLogin} from "../../request/index.js";
import {ElMessage} from "element-plus";
import router from "../../router/index.js";

const form = reactive({
  userAccount: '',
  userPassword: ''
})

const formRef = ref()

const rules = {
  userAccount: [
    {required: true,message:'请输入用户名',trigger: ['blur','change']},
    {min: 1}
  ],
  userPassword: [
    {required: true,message:'请输入密码'}
  ]
}

function login(formEl){
  formRef.value.validate((valid) => {
    console.log(valid)
    console.log(formRef.value.userAccount)
    if(valid){
      userLogin(form, (data) => {
        localStorage.setItem("token", data)
        ElMessage.success("登录成功")
        router.push("/home")
      })
    }
  })

}
</script>

<template>
  <div style="text-align: center;margin: 0 20px">
    <div style="margin-top: 150px">
      <div style="font-size: 25px;font-weight: bold">登录</div>
      <div style="font-size: 18px;color: grey">请输入用户名和密码进行登录</div>
    </div>
    <div style="margin-top: 50px;">
      <el-form :model="form" :rule="rules" ref="formRef">
        <el-form-item prop="userAccount">
          <el-input v-model="form.userAccount" maxlength="10" type="text" placeholder="请输入用户名或邮箱">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input v-model="form.userPassword" maxlength="20" placeholder="请输入密码" type="password">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12" style="text-align: left">
            <el-checkbox label="记住我"></el-checkbox>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <el-link>忘记密码？</el-link>
          </el-col>
        </el-row>
      </el-form>
      <div style="margin-top: 40px">
        <el-button @click="login(formRef)" style="width: 270px" type="success" plain>立即登录</el-button>
        <el-divider>
          <span>没有账号</span>
        </el-divider>
        <el-button @click="router.push('/register')" style="width: 270px" type="warning" plain>立即注册</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>