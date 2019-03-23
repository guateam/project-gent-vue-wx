<template>
    <div class="sys-notice">
        <v-layout column fill-height>
            <v-flex shrink class="primary">
                <v-layout align-center justify-space-between row fill-height>
                    <v-flex shrink>
                        <v-btn @click="$router.back()" icon>
                            <v-icon>arrow_back</v-icon>
                        </v-btn>
                    </v-flex>

                    <v-flex shrink>
                        <span class="title">系统通知</span>
                    </v-flex>

                    <v-flex shrink>
                        <v-btn dark disabled icon>
                            <v-icon></v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex grow>
                <v-layout row>
                    <v-flex xs12>
                        <v-tabs fixed-tabs color="primary">
                            <v-tab
                                    v-for="tab in ['全部', '个人', '群组']"
                                    :key="tab"
                            >
                                {{ tab }}

                            </v-tab>
                            <v-tab-item :key="'全部'">
                                <v-card flat>
                                    <v-list two-line>
                                        <template v-for="(item, index) in all">
                                            <v-subheader
                                                    v-if="item.header"
                                                    :key="index"
                                            >
                                                {{ item.header }}
                                            </v-subheader>

                                            <v-divider
                                                    v-else-if="item.divider"
                                                    :key="index"
                                                    :inset="item.inset"
                                            ></v-divider>

                                            <v-list-tile
                                                    v-else
                                                    :key="index"
                                                    avatar
                                            >
                                                <v-list-tile-avatar>
                                                    <v-icon>settings</v-icon>
                                                </v-list-tile-avatar>

                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                                    <v-list-tile-sub-title
                                                            v-html="item.subtitle"></v-list-tile-sub-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </template>
                                    </v-list>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item :key="'个人'">
                                <v-card flat>
                                    <v-list two-line>
                                        <template v-for="(item, index) in personal">
                                            <v-subheader
                                                    v-if="item.header"
                                                    :key="index"
                                            >
                                                {{ item.header }}
                                            </v-subheader>

                                            <v-divider
                                                    v-else-if="item.divider"
                                                    :key="index"
                                                    :inset="item.inset"
                                            ></v-divider>

                                            <v-list-tile
                                                    v-else
                                                    :key="index"
                                                    avatar
                                            >
                                                <v-list-tile-avatar>
                                                    <v-icon>person</v-icon>
                                                </v-list-tile-avatar>

                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                                    <v-list-tile-sub-title
                                                            v-html="item.subtitle"></v-list-tile-sub-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </template>
                                    </v-list>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item :key="'群组'">
                                <v-card flat>
                                    <v-list two-line>
                                        <template v-for="(item, index) in group">
                                            <v-subheader
                                                    v-if="item.header"
                                                    :key="index"
                                            >
                                                {{ item.header }}
                                            </v-subheader>

                                            <v-divider
                                                    v-else-if="item.divider"
                                                    :key="index"
                                                    :inset="item.inset"
                                            ></v-divider>

                                            <v-list-tile
                                                    v-else
                                                    :key="index"
                                                    avatar
                                            >
                                                <v-list-tile-avatar>
                                                    <v-icon>group</v-icon>
                                                </v-list-tile-avatar>

                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                                    <v-list-tile-sub-title
                                                            v-html="item.subtitle"></v-list-tile-sub-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </template>
                                    </v-list>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: 'SysNotice',
        data() {
            return {
                all: [],
                personal: [],
                group: [],
            }
        },
        methods: {
            initMessage() {
                this.$api.message.get_sys_message().then(res => {
                    if (res.data.code === 1) {
                        this.all = [];
                        this.personal = [];
                        this.group = [];
                        let all = res.data.data.all;
                        all.forEach(item => {
                            this.all.unshift({
                                divider: true,
                                inset: true
                            });  // 插入分割线
                            this.all.unshift(
                                {
                                    id: item.noticeID,
                                    userId: item.userID,
                                    target: item.target,
                                    title: item.name,
                                    subtitle: item.content,
                                    time: item.createtime,
                                }
                            );
                        });

                        let personal = res.data.data.personal;
                        personal.forEach(item => {
                            this.personal.unshift({
                                divider: true,
                                inset: true
                            });  // 插入分割线
                            this.personal.unshift(
                                {
                                    id: item.noticeID,
                                    userId: item.userID,
                                    target: item.target,
                                    title: item.name,
                                    subtitle: item.content,
                                    time: item.createtime,
                                }
                            );
                        });

                        let group = res.data.data.group;
                        group.forEach(item => {
                            this.group.unshift({
                                divider: true,
                                inset: true
                            });  // 插入分割线
                            this.group.unshift(
                                {
                                    id: item.noticeID,
                                    userId: item.userID,
                                    target: item.target,
                                    title: item.name,
                                    subtitle: item.content,
                                    time: item.createtime,
                                }
                            );
                        });

                    }
                })
            },  // 初始化消息
        },
        mounted() {
            this.initMessage();
        },
    }
</script>

<style scoped>
    .sys-notice {
        height: 100vh;
        width: 100vw;
        font-family: Helvetica, Arial, sans-serif;
    }
</style>