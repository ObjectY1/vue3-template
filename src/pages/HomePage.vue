<script setup>

import {userLogout} from "../request/index.js";
import {ElMessage} from "element-plus";
import router from "../router/index.js";

const logout = () => {
  userLogout((data) => {
    ElMessage.success(data)
    localStorage.removeItem("token")
    router.push("/")
  })
}
</script>

<template>
  <div>
    <el-button @click="logout">退出登录</el-button>
  </div>
</template>

<style scoped>

</style>