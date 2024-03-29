<template>
  <div class="content">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Online users</div>
        <div class="stat-value text-primary">{{ numberOfOnlineUsers }}</div>
        <div class="stat-desc">21% more than last month</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue"

const numberOfOnlineUsers = ref(0)
const socket = inject('socket')

onMounted(() => {
  socket.on("adminUsercount", (count) => {
    numberOfOnlineUsers.value = count - 1
    console.log(count)
  })
})
</script>

<style scoped>
.content {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
