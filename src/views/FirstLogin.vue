<template>
    <div class="register">
        <div id="background">
            <div class="top">
                <v-btn @click="$router.push({name: 'topic'})" icon dark>
                    跳过
                </v-btn>
            </div>
            <v-container class="container">
                <v-layout justify-space-between column fill-height>
                    <v-flex shrink>
                        <v-layout justify-center>
                            <v-flex shrink>
                                <img src="../assets/logo.png" width="120" height="120">
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs1>
                        <v-layout align-center colunm fill-height>
                            <v-flex shrink>
                                <div class="head">
                                    <h1 class="white--text">欢迎加入我们!</h1>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex grow>
                        <form class="form">
                            <v-text-field
                                    dark
                                    v-model="formItem.nickname"
                                    label="你的昵称"
                            ></v-text-field>
                            <v-text-field
                                    dark
                                    v-model="formItem.description"
                                    label="个人简介"
                            ></v-text-field>
                            <div v-if="!headportrait">
                                <h2 style="color:lightgray;">设置头像</h2>
                                <Upload
                                        multiple
                                        type="drag"
                                        action="https://hanerx.tk:5000/api/upload/upload_picture"
                                        name="picture"
                                        :on-success="upload" :default-file-list="upload_list"
                                        :on-remove="remove"
                                >
                                    <div style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                        <p>点击上传头像</p>
                                    </div>
                                </Upload>
                            </div>
                            <div v-if="headportrait">
                                <h2 style="color:lightgray;">头像预览（点击重新上传）</h2>
                                <img :src="formItem.headportrait" style="width: 100%;height: auto;"
                                     alt="头像预览" @click="remove">
                            </div>
                        </form>
                        <v-btn @click="set_account_info" color="primary" block large>立即设置</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FirstLogin",
        data() {
            return {
                headportrait: false,
                upload_list: [],
                formItem: {
                    headportrait: undefined,
                    nickname: undefined,
                    description: undefined
                }
            }
        },
        methods: {
            upload(response, file, fileList) {
                this.upload_list = [{
                    name: file.name,
                    url: response.data
                }];
                this.formItem.headportrait = response.data;
                this.headportrait = true;
            },
            remove() {
                this.formItem.headportrait = undefined;
                this.headportrait = false;
                this.upload_list = []
            },
            set_account_info() {
                let data = {
                    token: this.$store.state.token,
                    nickname: this.formItem.nickname,
                    headportrait: this.formItem.headportrait,
                    description: this.formItem.description
                };
                this.$api.account.set_account_info(data).then(res => {
                    if (res.data.code === 1) {
                        this.$api.account.get_user_by_token().then(res => {
                            if (res.data.code === 1) {
                                this.$store.commit('refreshUserInfo', res.data.data);
                                this.$store.commit('login', this.$store.state);
                                // 跳转到之前的页面
                                this.$router.push({name: 'topic'})
                            }
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .register {
        height: 100vh;
        width: 100%;
    }

    .register, #background::before {
        background: url("../assets/background.jpg") 50% / cover no-repeat fixed;
    }

    #background {
        height: 100%;
        width: 100%;
        position: absolute;
        color: #A84631;
        border-radius: 20px;
        overflow: hidden;
        z-index: 2;
    }

    #background::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        filter: blur(3px);
        margin: -20px;
        z-index: -1;
    }

    .top {
        height: 10vh;
    }

    .container {
        padding: 2em;
        height: 90vh;
    }

    .form {
        margin-top: 4em;
    }

    .head {
        margin-top: 1em;
    }
</style>