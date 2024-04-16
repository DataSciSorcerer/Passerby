<template>
    <div class="content">
        <div class="chat-content z-10">
            <div class="chat-message">
                <div :class="{ 'chat': true, 'chat-start': message.alignment === 'start', 'chat-end': message.alignment === 'end' }"
                    v-for="(message, index) in messages" :key="index">
                    <div class="chat-image avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" :src="message.avatar" />
                        </div>
                    </div>
                    <div class="chat-header">
                        {{ message.sender }}
                        <time class="text-xs opacity-50">{{ message.time }}</time>
                    </div>
                    <div class="chat-bubble">{{ message.message }}</div>
                    <div class="chat-footer opacity-50">
                        {{ message.timeDistance }}
                    </div>
                </div>
            </div>
            <div class="input-container z-10 pl-1 mb-4 mt-4">
                <input type="text" placeholder="Message....😊" class="input input-bordered w-full mr-2"
                    v-model="messageToSend" />
                <button class="btn btn-circle" @click="sendMessage">
                    <icon-send size="24" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue"
import { getDistanceDay } from "../../until/getDistanceDay.js"

//socketIO
const socket = inject('socket');

const messages = ref([
    {
        sender: 'Obi-Wan Kenobi',
        time: '12:45',
        message: 'You were the Chosen One!',
        timeDistance: 'Delivered',
        avatar: '../../../public/Logo.jpg',
        alignment: 'start'
    },
    {
        sender: 'Anakin',
        time: '12:46',
        message: 'I hate you!',
        timeDistance: 'Seen at 12:46',
        avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        alignment: 'end'
    }
])

const messageToSend = ref('')

const sendMessage = () => {
    const message = messageToSend.value.trim(); // 通过数据绑定获取输入框中的消息内容

};

onMounted(() => {

});
</script>

<style scoped>
.content {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.chat-content {
    width: 50%;
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;

}


@media only screen and (max-width: 600px) {
    .chat-content {
        width: 100%;
    }
}

@media only screen and (min-width: 601px) and (max-width: 700px) {
    .chat-content {
        width: 80%;
    }
}

@media only screen and (min-width: 701px) and (max-width: 800px) {
    .chat-content {
        width: 75%;
    }
}

@media only screen and (min-width: 701px) and (max-width: 800px) {
    .chat-content {
        width: 70%;
    }
}

@media only screen and (min-width: 801px) and (max-width: 900px) {
    .chat-content {
        width: 65%;
    }
}

@media only screen and (min-width: 901px) and (max-width: 1000px) {
    .chat-content {
        width: 60%;
    }
}

@media only screen and (min-width: 1001px) and (max-width: 1100px) {
    .chat-content {
        width: 55%;
    }
}

@media only screen and (min-width: 1001px) {
    .chat-content {
        width: 50%;
    }
}

.input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.chat-message {
    flex: 1;
    overflow-y: auto;
}

.chat-message::-webkit-scrollbar {
    width: 0;
}
</style>
