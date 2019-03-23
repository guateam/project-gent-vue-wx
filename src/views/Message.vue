<template>
    <div class="message">

        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-toolbar-side-icon @click="$store.commit('drawer')"></v-toolbar-side-icon>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>消息</span>
            </v-toolbar-title>

            <v-btn icon @click="$router.push({name:'search'})">
                <v-icon>search</v-icon>
            </v-btn>

            <v-tabs slot="extension" v-model="tabs" centered color="primary" slider-color="secondary">
                <v-tab v-for="(tab, tab_idx) in tabList" :key="tab_idx">{{ tab }}</v-tab>
            </v-tabs>
        </v-toolbar>

        <v-card>
            <v-tabs-items v-model="tabs">
                <v-tab-item :key="0">
                    <message-list :list="msgList"></message-list>
                </v-tab-item>
                <v-tab-item :key="1">
                    <FriendList :list="friList"></FriendList>
                </v-tab-item>
                <v-tab-item :key="2">
                    <Notice :list1="noticeList1"></Notice>
                </v-tab-item>
                <v-tab-item :key="3">
                    <GroupList :list="groupList"></GroupList>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
        <router-view></router-view>
    </div>
</template>

<script>
    import MessageList from "../components/MessageList"
    import FriendList from "../components/FriendList"
    import Notice from "../components/Notice"
    import GroupList from "../components/GroupList"

    export default {
        name: 'Message',

        components: {
            MessageList,
            FriendList,
            Notice,
            GroupList
        },

        data() {
            return {
                tabs: 0,
                tabList: ['私信', '好友', '通知', '群组'],
                msgList: [
                    {
                        title: '加载中...',
                        content: '加载中...',
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        userId: 3
                    },
                    {divider: true, inset: true},
                    {
                        title: '加载中...',
                        content: '加载中...',
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        userId: 2
                    }
                ],
                friList: [
                    {
                        action: 'account_box',
                        title: '加载中',
                        items: [
                            {
                                title: '加载中',
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                                content: '加载中'
                            }
                        ]
                    },
                    {
                        action: 'account_box',
                        title: '分组二',
                        active: true,
                        items: [
                            {
                                title: '加载中',
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                                content: '加载中'
                            },
                            {
                                title: '加载中',
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                                content: '加载中'
                            },
                            {
                                title: '加载中',
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                                content: '加载中'
                            }
                        ]
                    },
                    {
                        action: 'account_box',
                        title: '分组三',
                        items: [
                            {
                                title: '加载中',
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                                content: '加载中'
                            },
                        ]
                    },
                    {
                        action: 'account_box',
                        title: '分组四',
                        items: [
                            {
                                title: '加载中',
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                                content: '加载中'
                            },
                        ]
                    },
                    {
                        action: 'account_box',
                        title: '分组五',
                        items: [
                            {
                                title: '加载中',
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                                content: '加载中'
                            },
                        ]
                    },
                    {
                        action: 'account_box',
                        title: '分组六',
                        items: [
                            {
                                title: '加载中',
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                                content: '加载中'
                            },
                        ]
                    },
                    {
                        action: 'account_box',
                        title: '分组七',
                        items: [
                            {
                                title: '加载中',
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                                content: '加载中'
                            },
                        ]
                    }
                ],
                noticeList1: [
                    {
                        to: 'sys-notice',
                        icon: 'settings',
                        title: '系统消息',
                        subtitle: "加载中"
                    },
                    {divider: true, inset: true},
                    {
                        to: 'approval',
                        icon: 'thumb_up',
                        title: '赞我的',
                        subtitle: "加载中"
                    },
                    {divider: true, inset: true},
                    {
                        to: 'call',
                        icon: 'alarm',
                        title: '提到我的',
                        subtitle: "加载中"
                    },
                    {divider: true, inset: true},
                    {
                        to: 'reply',
                        icon: 'message',
                        title: '评论和回复',
                        subtitle: "加载中"
                    },
                    {divider: true, inset: true},
                    // {
                    //     icon: 'group',
                    //     title: '群组',
                    //     subtitle: "用户123邀请你加入清纯女大学生激情聊"
                    // }
                ],
                groupList: [
                    {
                        title: '加载中',
                        content: '加载中',
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        userId: 3
                    },
                    {divider: true, inset: true},
                    {
                        title: '加载中',
                        content: '加载中',
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        userId: 2
                    }
                ],
            }
        },

        methods: {
            // 获取消息列表
            getMessageList() {
                this.$api.message.get_message_list().then(res => {
                    if (res.data.code === 1) {
                        // 清空默认数据
                        this.msgList = [];
                        // 遍历数据
                        res.data.data.forEach(item => {
                            // 构造符合格式要求的消息列表
                            this.msgList.push({
                                title: item.nickname + '<span id="title-time" class="time--text">' + item.post_time + '</span>',
                                avatar: item.headportrait,
                                content: item.content.match(/<[^>]+>/)?'[图片]':item.content,
                                userID: item.user_id
                            });
                            // 添加分割线
                            this.msgList.push({divider: true, inset: true});
                        });
                        // 删除最后一条分割线
                        this.msgList.pop();
                    }
                })
            },
            get_friend_list() {
                this.$api.message.get_friend_list().then(res => {
                    if (res.data.code === 1) {
                        let data = [];
                        res.data.data.forEach(value => {
                            if (data[value['usergroup']] === undefined) {
                                data.push({
                                    action: 'account_box',
                                    title: value['group']['text'],
                                    items: [],
                                    id: value['usergroup']
                                })
                            }
                            data.forEach(item => {
                                if (item.id === value['usergroup']) {
                                    item.items.push(value);
                                }
                            })
                        });
                        data.sort((a, b) => {
                            if (a.id > b.id) {
                                return 1;
                            } else if (a.id < b.id) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                        this.friList = data;
                    }
                })
            },
            get_date(date) {
                let old = new Date(date);
                let now = new Date();
                let time = now.getTime() - old.getTime();
                if (time < 60 * 1000) {
                    return "刚刚"
                } else if (time > 60 * 1000 && time < 60 * 60 * 1000) {
                    return Math.round(time / 60 / 1000) + '分钟前'
                } else if (time > 60 * 60 * 1000 && time < 24 * 60 * 60 * 1000) {
                    return Math.round(time / 60 / 60 / 1000) + '小时前'
                } else if (time > 24 * 60 * 60 * 1000 && time < 10 * 60 * 60 * 1000) {
                    return Math.round(time / 24 / 60 / 60 / 1000) + '天前'
                } else {
                    return (old.getMonth() + 1) + '-' + (old.getDate())
                }
            },
            get_groups() {
                this.$api.group.get_groups().then(res => {
                    if (res.data.code === 1) {
                        let data = [];
                        res.data.data.forEach(value => {
                            data.push({
                                title: value['name'] + '<span id="title-time">' + this.get_date(value['last_message']['time']) + '</span>',
                                content: value['last_message']['nickname'] + ':' + (value['last_message']['content'].match(/<[^>]+>/)?'[图片]':value['last_message']['content']),
                                avatar: value['head_portrait'],
                                id: value['id'],
                                name: value['name'],
                            });
                            data.push({
                                divider: true, inset: true
                            })
                        });
                        this.groupList = data;
                    }
                })
            }
        },

        mounted() {
            this.getMessageList();
            this.get_friend_list();
            this.get_groups();
        },
    }
</script>

<style>
    #title-time {
        float: right;
        font-size: 13px;
    }
</style>
