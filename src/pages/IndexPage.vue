<script setup>
import bg from '../assets/IndexBackground.png'
</script>

<template>
  <div style="width: 100vw;height: 100vh;overflow: hidden; display: flex">
    <div style="flex: 1;background-color: #1a1a1a">
      <el-image style="width: 100%;height: 100%" fit="cover"
          :src="bg"></el-image>
    </div>
    <div class="welcome-title">
      <div style="font-size: 35px;font-weight: bold">欢迎来到基于Vue3的前端模板项目</div>
      <div style="margin-top: 10px">你可以随便更改本项目来定制化属于你自己的项目</div>
    </div>
    <div class="right-card">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in-linear" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.right-card {
  width: 400px;
  z-index: 1;
  background-color: var(--el-bg-color);
}

.welcome-title {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: white;
  text-shadow: 0 0 10px black;
}
</style>