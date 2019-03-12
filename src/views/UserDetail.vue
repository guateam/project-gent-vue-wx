<template>
    <div class="user-detail">
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-btn icon @click="$router.back()">
                <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>账户详情</span>
            </v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>
        <div class="main">
            <div class="box" style="height: 6em" @click="head_dialog=true">
                <div>头像</div>
                <div style="width: 5em;height: 5em;overflow: hidden;border-radius: 50%;">
                    <img :src="head_portrait" alt="img" style="width: 100%;height: 100%;border-radius: 50%">
                </div>
            </div>
            <v-divider></v-divider>
            <div class="box" @click="nickname_dialog=true">
                <div>用户名</div>
                <div>{{nickname}}</div>
            </div>
            <v-divider></v-divider>
            <div class="box">
                <div>用户组</div>
                <div>{{group}}</div>
            </div>
            <v-divider></v-divider>
            <div class="box">
                <div>UID</div>
                <div>{{uid}}</div>
            </div>
            <v-divider></v-divider>
            <div class="box">
                <div>邮箱</div>
                <div>{{email}}</div>
            </div>
            <v-divider></v-divider>
            <div class="box" @click="$router.push({name:'verified',query:{state:$store.state.userInfo.state === 2}})">
                <div>实名认证</div>
                <div>{{verify}}</div>
            </div>
            <v-divider></v-divider>
            <div class="box" @click="description_dialog=true">
                <div>签名</div>
                <div>{{description}}</div>
            </div>
            <v-divider></v-divider>
        </div>
        <v-dialog
                v-model="head_dialog"
                width="500"
        >
            <v-card>
                <v-card-title
                        class="headline primary"
                        primary-title
                >
                    编辑头像
                </v-card-title>

                <v-card-text>
                    <div v-if="!headportrait">
                        <h2>设置头像</h2>
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
                        <h2>头像预览（点击重新上传）</h2>
                        <img :src="formItem.headportrait" style="width: 100%;height: auto;"
                             alt="头像预览" @click="remove">
                    </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="error"
                            flat
                            @click="close_dialog"
                    >
                        取消
                    </v-btn>
                    <v-btn
                            color="success"
                            flat
                            @click="send()"
                            :disabled="!headportrait"
                    >
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
                v-model="nickname_dialog"
                width="500"
        >
            <v-card>
                <v-card-title
                        class="headline primary"
                        primary-title
                >
                    编辑昵称
                </v-card-title>

                <v-card-text>
                    <v-text-field
                            label="Solo"
                            placeholder="输入你的昵称"
                            solo
                            v-model="formItem.nickname"
                    ></v-text-field>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="error"
                            flat
                            @click="close_dialog"
                    >
                        取消
                    </v-btn>
                    <v-btn
                            color="success"
                            flat
                            @click="send()"
                            :disabled="formItem.nickname===''"
                    >
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
                v-model="description_dialog"
                width="500"
        >
            <v-card>
                <v-card-title
                        class="headline primary"
                        primary-title
                >
                    编辑签名
                </v-card-title>

                <v-card-text>
                    <v-textarea
                            solo
                            name="input-7-4"
                            label="请输入签名"
                            v-model="formItem.description"
                    ></v-textarea>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="error"
                            flat
                            @click="close_dialog"
                    >
                        取消
                    </v-btn>
                    <v-btn
                            color="success"
                            flat
                            @click="send()"
                            :disabled="formItem.description===''"
                    >
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "user-detail",
        data() {
            return {
                nickname: '',
                head_portrait: 'https://www.asgardusk.com/images/none.png',
                group: '',
                email: '',
                verify: '未实名',
                description: '',
                tag: '',
                uid: '',
                head_dialog: false,
                headportrait: false,
                nickname_dialog: false,
                description_dialog: false,
                upload_list: [],
                formItem: {
                    nickname: undefined,
                    description: undefined,
                    headportrait: undefined,
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
            close_dialog() {
                this.head_dialog = false;
                this.nickname_dialog = false;
                this.description_dialog = false;
                this.formItem = {
                    nickname: this.nickname,
                    description: this.description,
                    headportrait: this.head_portrait,
                };
                this.headportrait = false;
            },
            send() {
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
                                this.get_user_info();
                                this.close_dialog();
                            }
                        });
                    }
                })
            },
            get_user_info() {
                this.nickname = this.$store.state.userInfo.nickname;
                this.head_portrait = this.$store.state.userInfo.head_portrait;
                this.group = this.$store.state.userInfo.group.text;
                this.uid = this.$store.state.userInfo.user_id;
                this.email = this.$store.state.userInfo.email;
                this.verify = this.$store.state.userInfo.state === 2 ? '已实名' : '未实名';
                this.description = this.$store.state.userInfo.description;
            }
        },
        mounted() {
            this.get_user_info();
            this.formItem = {
                nickname: this.nickname,
                description: this.description,
                headportrait: this.head_portrait,
            }
        }
    }
</script>

<style scoped>
    .bigbox {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 200;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
    }

    .main {
        width: 100%;
        background-color: white;
    }

    .box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 3em;
        padding-left: 1em;
        padding-right: 1em;
    }
</style>
