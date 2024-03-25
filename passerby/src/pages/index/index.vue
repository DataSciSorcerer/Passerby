<template>
    <div class="h-screen">
        <TopBar></TopBar>
        <router-view></router-view>
    </div>
</template>

<script setup>
import TopBar from "../../components/TopBar/TopBar.vue"
</script>
<style scoped>
</style>
