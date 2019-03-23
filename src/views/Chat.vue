<template>
    <div class="chat">
        <v-layout column fill-height>
            <v-flex shrink style="background-color: #ffd633">
                <v-layout align-center justify-space-between row fill-height>
                    <v-flex shrink>
                        <v-btn @click="$router.go(-1)" icon>
                            <v-icon>arrow_back</v-icon>
                        </v-btn>
                    </v-flex>

                    <v-flex shrink>
                        <span class="title font-weight-bold">{{ title }}</span>
                    </v-flex>

                    <v-flex shrink>
                        <v-btn icon @click="$router.push({name:'detail',query:{id:$route.query.id}})">
                            <v-icon>more_horiz</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex grow style="background-color: white;">
                <v-container fill-height>
                    <v-layout>
                        <v-flex class="chat-area" id="chat-area">
                            <v-layout v-for="row in chatData" :key="row.id" class="chat-row" justify-start
                                      :reverse="row.type === 1" row>
                                <v-flex shrink>
                                    <v-avatar size="50">
                                        <img :src="row.type === 1? myAvatar: userAvatar" alt="avatar"
                                             style="object-fit: cover">
                                    </v-avatar>
                                </v-flex>

                                <v-flex class="text-area" shrink>
                                    <v-card>
                                        <v-container v-html="row.content">

                                        </v-container>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>

            <v-flex class="input-area" shrink style="border-top: 2px #eee solid;background-color: #fff ">
                <v-container>
                    <v-layout>
                        <v-flex sx10>

                            <v-text-field
                                    v-model="message"
                                    append-outer-icon="send"
                                    prepend-icon="insert_photo"
                                    solo
                                    flat
                                    single-line
                                    label="发送消息"
                                    type="text"
                                    @click:append-outer="sendMessage"
                                    @click:prepend="sendImage"
                                    @click:focus="scrollToBottom"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <input
                        type="file"
                        class="photoFileIn my-0 py-0"
                        @change="previewImg()"
                        accept="image/*"
                        style="display: none"
                        ref="upload"
                        id="file"
                >
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: 'Chat',
        data() {
            return {
                userId: this.$route.query.id,  // 聊天对象id
                title: '加载中..',  // 标题(对方昵称)
                message: '',  // 输入内容
                topHeight: document.body.clientHeight * 0.07,
                bottomHeight: document.body.clientHeight * 0.1,
                chatData: [
                    // {
                    //     id: 1,
                    //     type: 1,  // 收到的消息
                    //     content: 'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.',
                    // },
                    // {
                    //     id: 2,
                    //     type: 2,  // 发出的消息
                    //     content: 'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.',
                    // }
                ],  // 聊天内容
                userAvatar: '',  // 对方头像
                myAvatar: this.$store.state.userInfo.head_portrait,  // 自己的头像
                timer: undefined,
            }
        },
        methods: {
            sendMessage() {
                if (this.message === '') {
                    return
                }
                let data = {
                    token: this.$store.state.token,
                    receiver: this.userId,
                    content: this.message,
                    message_type: 0,
                };
                this.$api.message.add_message(data).then(res => {
                    if (res.data.code !== 1) {
                        this.$store.commit('showInfo', res.data.msg);
                    } else {
                        // this.chatData.push({
                        //     content: this.message,
                        //     type: 1,
                        // });
                        this.get_more_message();
                        this.message = '';
                        this.scrollToBottom()
                    }
                });
            },  // 发送消息
            sendImage() {
                this.$refs.upload.click()
            },  // 发送图片
            initWindow() {
                let chat = document.getElementById('chat-area');
                chat.setAttribute('style', 'top: ' + this.topHeight + 'px; bottom: ' + this.bottomHeight + 'px');
            },  // 初始化窗口 **重要**
            initUserInfo() {
                this.$api.account.get_user(this.userId).then(res => {
                    if (res.data.code === 1) {
                        this.userAvatar = res.data.data.head_portrait;
                        this.title = res.data.data.nickname;
                    }
                })
            },  // 初始化用户数据
            initMessage() {
                this.chatData = [];  // 清空数据
                this.$api.message.get_chat_box(this.userId).then(res => {
                    if (res.data.code === 1) {
                        let data = res.data.data;
                        data.forEach(row => {
                            this.chatData.push({
                                id: row.messageID,
                                time: row.post_time,
                                content: row.content,
                                type: row.poster === this.userId ? 2 : 1,
                            });
                        });
                        this.scrollToBottom();
                    }
                });
            },  // 初始化消息
            get_more_message() {
                this.$api.message.get_chat_box(this.userId).then(res => {
                    if (res.data.code === 1) {
                        let data = res.data.data;
                        data.forEach(row => {
                            let flag = true;
                            this.chatData.forEach(value => {
                                if (value.id === row.messageID) {
                                    flag = false;
                                }
                            });
                            if (flag) {
                                this.chatData.push({
                                    id: row.messageID,
                                    time: row.post_time,
                                    content: row.content,
                                    type: row.poster === this.userId ? 2 : 1,
                                });
                            }
                        });
                        let div = document.getElementById('chat-area');
                        div.scrollTop = div.scrollHeight;
                    }
                });
                // console.info('tick')
            },
            scrollToBottom() {
                setTimeout(() => {
                    let div = document.getElementById('chat-area');
                    div.scrollTop = div.scrollHeight;
                }, 500)
            },  // 滚动到最下
            previewImg: function () {
                let fileObj = document.getElementById("file").files[0]; // js 获取文件对象

                let form = new FormData(); // FormData 对象
                form.append("picture", fileObj); // 文件对象

                this.$api.upload.upload_picture(form).then(res => {
                    if (res.data.code === 1) {
                        let data = {
                            token: this.$store.state.token,
                            receiver: this.userId,
                            content: '<img src="' + res.data.data + '" class="chat-image" style="width: 100%;object-fit: cover">',
                            message_type: 0,
                        };
                        this.$api.message.add_message(data).then(res => {
                            if (res.data.code === 1) {
                                this.get_more_message();
                            }
                        })
                    }
                })
            },
        },
        mounted() {
            this.initWindow();
            this.initUserInfo();
            this.initMessage();
            this.timer = setInterval(this.get_more_message, 5000);

        },
        beforeDestroy() {
            window.clearInterval(this.timer);
        }
    }
</script>

<style>
    .chat {
        height: 100vh;
        width: 100vw;
        font-family: Helvetica, Arial, sans-serif;
    }

    .chat-area {
        overflow: auto;
        position: absolute;
        width: 92%;
        padding: 16px 0;
    }

    .chat-image {
        width: 100%;
        object-fit: cover;
    }

    .chat-row {
        padding: 5px 0;
    }

    .text-area {
        padding: 0 16px;
    }

    .input-area .container {
        padding: 0 16px;
    }

    .v-input__control {
        height: 64px;
    }

    .v-input__slot {
        margin-top: 9px;
    }

    .v-input {
        display: flex;
        align-items: center;
    }
</style>
<style>
    .chat-image {
        width: 100%;
        object-fit: cover;
    }
</style>
