<template>
    <div class="group-chat">
        <v-layout column fill-height>
            <v-flex shrink>
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
                        <v-btn @click="$router.push({name: 'group-settings', params: {id: groupId, title: title}})"
                               icon>
                            <v-icon>group</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex grow>
                <v-container fill-height>
                    <v-layout>
                        <v-flex class="chat-area" id="chat-area">
                            <v-layout v-for="row in chatData" :key="row.id" class="chat-row" justify-start
                                      :reverse="row.type === 1" row>
                                <v-flex shrink>
                                    <v-avatar size="50">
                                        <img :src="row.avatar" alt="avatar" style="object-fit: cover">
                                    </v-avatar>
                                </v-flex>

                                <v-flex class="text-area" shrink>
                                    <div :class="row.type === 1 && 'text-xs-right'">{{ row.nickname }}</div>

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

            <v-flex class="input-area" shrink>
                <v-container>
                    <v-layout>
                        <v-flex>
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
        name: 'GroupChat',
        data() {
            return {
                groupId: this.$route.params.id,  // 群组对应id
                title: this.$route.params.title,  // 标题(群组名称)
                message: '',  // 输入内容
                topHeight: document.body.clientHeight * 0.07,
                bottomHeight: document.body.clientHeight * 0.1,
                chatData: [
                    // {
                    //     id: 1,
                    //     type: 2,  // 收到的消息
                    //     nickname: '其他人',  // 昵称
                    //     avatar: this.$store.state.userInfo.head_portrait,  // 头像
                    //     content: 'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.',
                    // },
                    // {
                    //     id: 3,
                    //     type: 2,  // 收到的消息
                    //     nickname: '不一样的其他人',  // 昵称
                    //     avatar: this.$store.state.userInfo.head_portrait,  // 头像
                    //     content: 'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.',
                    // },
                    // {
                    //     id: 2,
                    //     type: 1,  // 发出的消息
                    //     nickname: '拉拉人',
                    //     avatar: this.$store.state.userInfo.head_portrait,
                    //     content: 'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.',
                    // }
                ],  // 聊天内容
                timer: undefined,
            }
        },
        methods: {
            sendMessage() {
                if (this.message === '') {
                    return
                }  // 判断消息不为空, 允许空格
                let data = {
                    token: this.$store.state.token,
                    group_id: this.groupId,
                    content: this.message,
                };  // 构造请求数据
                this.$api.group.send_group_message(data).then(res => {
                    if (res.data.code !== 1) {
                        this.$store.commit('showInfo', res.data.msg);
                    } else {
                        // this.chatData.push({
                        //     content: this.message,
                        //     time: new Date(),
                        //     nickname: this.$store.state.userInfo.nickname,
                        //     avatar: this.$store.state.userInfo.head_portrait,
                        //     type: 1,
                        // });
                        this.get_more_message();
                        this.message = '';
                        this.scrollToBottom();
                    }
                });  // 发送请求
            },  // 发送消息
            sendImage() {
                this.$refs.upload.click()
            },  // 发送图片
            initWindow() {
                let chat = document.getElementById('chat-area');
                chat.setAttribute('style', 'top: ' + this.topHeight + 'px; bottom: ' + this.bottomHeight + 'px');
            },  // 初始化窗口 **重要**
            initMessage() {
                this.chatData = [];  // 清空数据
                this.$api.group.get_group_message(this.groupId).then(res => {
                    if (res.data.code === 1) {
                        let data = res.data.data;
                        data.forEach(row => {
                            this.chatData.push({
                                id: row.id,
                                time: row.time,
                                content: row.content,
                                avatar: row.headportrait,
                                nickname: row.nickname,
                                type: row.userID === this.$store.state.userInfo.user_id ? 1 : 2,
                            });
                        });
                        this.scrollToBottom();
                    }
                });
            },  // 初始化消息
            get_more_message() {
                this.$api.group.get_group_message(this.groupId).then(res => {
                    if (res.data.code === 1) {
                        let data = res.data.data;
                        data.forEach(row => {
                            let flag = true;
                            this.chatData.forEach(value => {
                                if (value.id === row.id) {
                                    flag = false;
                                }
                            });
                            if (flag) {
                                this.chatData.push({
                                    id: row.id,
                                    time: row.time,
                                    content: row.content,
                                    avatar: row.headportrait,
                                    nickname: row.nickname,
                                    type: row.userID === this.$store.state.userInfo.user_id ? 1 : 2,
                                });
                            }
                        });
                        this.scrollToBottom();
                    }
                });
            },
            scrollToBottom() {
                setTimeout(() => {
                    let div = document.getElementById('chat-area');
                    div.scrollTop = div.scrollHeight;
                }, 500)
            },  // 滚动到最下
            previewImg: function () {
                let fileObj = document.getElementById("file").files[0]; // js 获取文件对象
                let that = this
                let form = new FormData(); // FormData 对象
                form.append("picture", fileObj); // 文件对象

                this.$api.upload.upload_picture(form).then(res => {
                    if (res.data.code === 1) {
                        let data = {
                            token: that.$store.state.token,
                            group_id: that.groupId,
                            content: '<img src="' + res.data.data + '" class="chat-image">',
                        };
                        that.$api.group.send_group_message(data).then(res => {
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
            this.initMessage();
            this.timer = setInterval(this.get_more_message, 5000);
        },
        beforeDestroy() {
            window.clearInterval(this.timer);
        }
    }
</script>

<style>
    .group-chat {
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

</style>
<style>
    .chat-image {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
</style>
