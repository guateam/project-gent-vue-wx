<template>
    <div class="group-settings">
        <v-layout column fill-height>
            <v-flex shrink>
                <v-btn @click="$router.go(-1)" icon>
                    <v-icon>arrow_back</v-icon>
                </v-btn>
            </v-flex>

            <v-flex grow>
                <v-container fill-height>
                    <v-layout column fill-height>
                        <v-flex xs1>
                            <v-layout align-center row fill-height>
                                <v-flex shrink>
                                    <span class="title font-weight-bold">群聊</span>
                                </v-flex>

                                <v-flex grow>
                                    <div class="text-xs-right subheading grey--text">{{ title }}</div>
                                </v-flex>

                                <v-flex shrink>
                                    <v-icon>navigate_next</v-icon>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-divider></v-divider>

                        <v-flex xs4>
                            <v-container fill-height>
                                <v-layout justify-space-around column fill-height>
                                    <v-flex shrink>
                                        <v-layout>
                                            <v-flex v-for="member in (memberList.length > 3? memberList.slice(0, 4): memberList)" :key="member.userId" xs3>
                                                <v-avatar size="65">
                                                    <img
                                                        :src="member.avatar"
                                                    >
                                                </v-avatar>
                                            </v-flex>

                                            <v-flex v-if="memberList.length <= 3" xs3>
                                                <v-icon size="65">add_circle</v-icon>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>

                                    <v-flex shrink>
                                        <v-layout v-if="memberList.length > 3">
                                            <v-flex v-for="member in (memberList.length < 7)? memberList.slice(4): memberList.slice(4, 7)" :key="member.userId" xs3>
                                                <v-avatar size="65">
                                                    <img
                                                        :src="member.avatar"
                                                    >
                                                </v-avatar>
                                            </v-flex>

                                            <v-flex xs3>
                                                <v-icon size="65">add_circle</v-icon>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>

                        <v-divider></v-divider>

                        <v-flex xs1>
                            <v-layout align-center row fill-height>
                                <v-flex shrink>
                                    <span class="title font-weight-bold">我的昵称</span>
                                </v-flex>

                                <v-flex grow>
                                    <div class="text-xs-right subheading grey--text">{{ myGroupInfo.nickname }}</div>
                                </v-flex>

                                <v-flex shrink>
                                    <v-icon>navigate_next</v-icon>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-divider></v-divider>

                        <v-flex grow>
                            <!--管理选项-->
                        </v-flex>

                        <v-flex xs2>
                            <v-btn @click="exitGroup" color="error" block>退出群组</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: 'GroupSettings',

        data() {
            return {
                groupId: this.$route.params.id,
                title: this.$route.params.title,
                myGroupInfo: {
                    nickname: this.$store.state.userInfo.nickname,
                },  // 我的群组信息
                memberList: [],
            }
        },

        methods: {
            initMembers() {
                this.$api.group.get_group_members(this.groupId).then(res => {
                    if (res.data.code === 1) {
                        let data = res.data.data;
                        data.forEach(member => {
                            this.memberList.push({
                                userId: member.userID,
                                nickname: member.nickname,
                                avatar: member.headportrait,
                            })
                        })
                    }
                })
            },  // 初始化成员

            exitGroup() {
                this.$api.group.exit_group(this.groupId).then(res => {
                    if (res.data.code === 1) {
                        this.$router.push({name: 'message'});  // 返回消息页
                    } else {
                        this.$store.commit('showInfo', res.data.msg);  // 显示错误提示
                    }
                }).catch(error => {
                    this.$store.commit('showInfo', '网络错误，详细请看控制台');
                    window.console.log(error);
                })
            },  // 退出群组
        },

        mounted() {
            this.initMembers()
        }
    }
</script>

<style scoped>
    .group-settings {
        height: 100vh;
        width: 100vw;
        font-family: Helvetica, Arial, sans-serif;
    }
</style>