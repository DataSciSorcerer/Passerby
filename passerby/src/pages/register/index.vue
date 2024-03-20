<template>
    <!-- main -->
    <div class="content">
        <div class="form">
            <!-- Title -->
            <div class="title">
                <span class="z-10 mx-auto">{{ useLanguageStore.pages[currentPath][nowLanguage].title }}</span>
                <!-- <LottieAnimation :animation-data="snowman" :loop="true" class="text-1xl" /> -->
            </div>
            <!-- avatar -->
            <div class="avatar mx-auto">
                <div class="mask mask-squircle w-24">
                    <img :src="avatar" />
                </div>
            </div>
            <!-- input -->
            <input type="text" v-model="name" @input="inputAvatar" placeholder="Input your name"
                class="input input-bordered input-primary z-10" />
            <!-- button -->
            <div class="action">
                <div class="tooltip tooltip-bottom"
                    :data-tip=useLanguageStore.pages[currentPath][nowLanguage].tipRandom>
                    <button class="btn z-10" @click="randomAvatar">⭕</button>
                </div>
                <div class="tooltip tooltip-bottom" :data-tip=useLanguageStore.pages[currentPath][nowLanguage].tipSex>
                    <label class="swap swap-flip text-4xl">
                        <input type="checkbox" v-model="sex" @click="sexAvatar(true)" />
                        <div class="swap-on">👦🏻</div>
                        <div class="swap-off">👧🏻</div>
                    </label>
                </div>
                <div class="tooltip tooltip-bottom" :data-tip=useLanguageStore.pages[currentPath][nowLanguage].tipStart>
                    <button class="btn btn-outline z-10">➡️</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { storeToRefs } from 'pinia'
import { language } from "../../store/language"
import router from "../../router/index.js"
import { ref } from "vue"
import { randomAvatarChar } from '../../until/randonAvatarChar.js'


// Multi-language
const useLanguageStore = language();
const { nowLanguage } = storeToRefs(useLanguageStore) // 当前语言(响应式解构)
const currentPath = router.currentRoute.value.path.substring(7); // 当前路由


// Change avatar
const name = ref("");
const avatar = ref("https://joesch.moe/api/v1/Ebmaj9")
const sex = ref(true)


// Use random change avatar
const randomAvatar = () => {
    name.value = ""
    name.value = randomAvatarChar()
    avatar.value = "https://joesch.moe/api/v1/" + (sex.value ? "female" : "male") + "/" + name.value;
    console.log(avatar.value);
}


const sexAvatar = (updateSex = false) => {
    if (updateSex) {
        sex.value = !sex.value;
    }
    avatar.value = "https://joesch.moe/api/v1/" + (sex.value ? "female" : "male") + "/" + name.value;
    console.log(sex.value + name.value)
}


// Use input change avatar
const inputAvatar = () => {
    avatar.value = "https://joesch.moe/api/v1/" + (sex.value ? "female" : "male") + "/" + name.value;

    if (name.value == "") {
        avatar.value = "https://joesch.moe/api/v1/Ebmaj9"
    }
}
</script>


<style scoped>
.content {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form {
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: xx-large;
}

@media only screen and (max-width: 400px) {
    .form {
        width: 70%;
    }
}

@media only screen and (min-width: 401px) and (max-width: 500px) {
    .form {
        width: 65%;
    }
}

@media only screen and (min-width: 501px) and (max-width: 600px) {
    .form {
        width: 60%;
    }
}

@media only screen and (min-width: 601px) and (max-width: 700px) {
    .form {
        width: 55%;
    }
}

@media only screen and (min-width: 701px) and (max-width: 800px) {
    .form {
        width: 50%;
    }
}

@media only screen and (min-width: 701px) and (max-width: 800px) {
    .form {
        width: 45%;
    }
}

@media only screen and (min-width: 801px) and (max-width: 900px) {
    .form {
        width: 40%;
    }
}

@media only screen and (min-width: 901px) and (max-width: 1000px) {
    .form {
        width: 35%;
    }
}

@media only screen and (min-width: 1001px) and (max-width: 1100px) {
    .form {
        width: 30%;
    }
}

@media only screen and (min-width: 1001px) {
    .form {
        width: 27%;
    }
}

.title {
    font-family: "SNOW";
    font-weight: 700;
    font-size: xxx-large;
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
}

.action {
    display: flex;
    justify-content: space-between;
}
</style>