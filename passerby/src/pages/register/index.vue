<template>
    <!-- main -->
    <div class="content">
        <div class="form" v-if="showForm">
            <!-- Title -->
            <div class="title">
                <span class="mx-auto">{{ useLanguageStore.pages[currentPath][nowLanguage].title }}</span>
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
                        <input type="checkbox" v-model="sex" @click="sexAvatar" />
                        <div class="swap-on">👦🏻</div>
                        <div class="swap-off">👧🏻</div>
                    </label>
                </div>
                <div class="tooltip tooltip-bottom" :data-tip=useLanguageStore.pages[currentPath][nowLanguage].tipStart>
                    <button class="btn btn-outline z-10" @click="toChat">➡️</button>
                </div>
            </div>
        </div>
        <div class="animation  z-10" v-if="!showForm" style="font-size: 80px;text-align: center;">
            <h1 class="mb-5" style="font-family: 'SNOW';">Matching</h1>
            <LottieAnimation :animation-data="matchHeart" :loop="true" />
            <button class="btn btn-outline btn-sm" @click="cancelMatch">Cancel</button>
        </div>

    </div>
</template>


<script setup>
import { storeToRefs } from 'pinia';
import { language } from "../../store/language";
import router from "../../router/index.js";
import { ref, onMounted, inject } from "vue";
import { avatarList, hashAvatar, randomAvatarChar } from "../../until/avatar.js";
import { LottieAnimation } from "lottie-web-vue"
import matchHeart from "../../../public/lottie/matchHeart.json"

const showForm = ref(true)

//socketIO
const socket = inject('socket');

// Multi-language
const useLanguageStore = language();
const { nowLanguage } = storeToRefs(useLanguageStore); // 当前语言(响应式解构)
const currentPath = router.currentRoute.value.path.substring(7); // 当前路由

// Change avatar
// false = female
const name = ref("");
const avatar = ref("/avatar/jenni.svg");
const sex = ref(true);

// Use random change avatar
const randomAvatar = () => {
    const sexValue = sex.value ? "female" : "male";
    name.value = randomAvatarChar();
    const hashValue = hashAvatar(name.value, avatarList[sexValue].length - 1);
    avatar.value = `/avatar/${avatarList[sexValue][hashValue]}.svg`;
};

// Use input change avatar
const inputAvatar = () => {
    const sexValue = sex.value ? "female" : "male";
    avatar.value = `../../../public/avatar/${avatarList[sexValue][hashAvatar(name.value, avatarList[sexValue].length - 1)]}.svg`;
};

// User into connect SocketIO
onMounted(() => {
    socket.emit("userInto", "Hello");
    console.log("yes")
});

// Match
const toChat = () => {
    showForm.value = false

    socket.emit("userMatch", {
        sex: sex.value ? "female" : "male",
        id: socket.id
    })

    socket.on("matchSuccess", (Info) => {
        console.log(Info)
        if(Info){
            router.push("/index/chat")
        }
    })
}

//Cancel match
const cancelMatch = () => {
    showForm.value = true

    socket.emit("userCancelMatch", {
        id: socket.id
    })
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