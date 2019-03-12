<template>
    <div class="chatinput">
        <div class="box">
            <input type="text" class="chat" placeholder="评论" autofocus v-model="word">
            <!--<span class="iconfont emoji-icon">collections</span>-->
            <v-icon class="emoji-icon" color="#999">collections</v-icon>
            <button :class="word?'enSend':'disSend'" :disabled="!word" @click="send">发送</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChatInput",
        data () {
            return {
                word: ''
            }
        },
        methods: {
            send () {
                this.word = ''
            }
        }
    }
</script>

<style scoped>
    .box{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
        background-color: #eee;
        z-index: 200;
        display: flex;
        justify-content: flex-end;
    }
    .chat{
        height: 40px;
        margin: 5px 15px;
        padding: 0 10px;
        border: 0;
        border-radius: 5px;
        flex: 1;
    }
    .chat::-webkit-input-placeholder{
        color: #999;
        font-size: 16px;
    }
    .emoji-icon{
        font-size: 30px;
        margin-top: 10px;
        color: #333;
    }
    .disSend{
        line-height: 30px;
        margin: 7px 10px;
        padding: 0 0.1rem;
        border: 1px solid #999;
        border-radius: 1px;
        box-sizing: border-box;
        color: #999;
        background-color: #eee
    }
    .enSend{
        line-height: 30px;
        margin: 7px 10px;
        padding: 0 5px;
        border: 1px solid blue;
        border-radius: 5px;
        box-sizing: border-box;
        color: #fff;
        background-color: blue;
    }
</style>
