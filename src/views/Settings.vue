<template>
    <div class="settings">
        <v-layout row>
            <v-flex>
                <v-card>
                    <v-toolbar color="secondary" flat>
                        <v-btn icon light @click="$router.push($route.query.redirect || {name: 'index'})">
                            <v-icon color="grey darken-2">arrow_back</v-icon>
                        </v-btn>

                        <v-toolbar-title class="grey--text text--darken-4">设置</v-toolbar-title>
                    </v-toolbar>

                    <v-divider></v-divider>

                    <!--<v-list two-line>-->

                    <!--<v-subheader>通用</v-subheader>-->
                    <!--<v-list-tile>-->
                    <!--<v-list-tile-action>-->
                    <!--<v-checkbox v-model="checkboxOptions.bindContacts"></v-checkbox>-->
                    <!--</v-list-tile-action>-->

                    <!--<v-list-tile-content-->
                    <!--@click.prevent="checkboxOptions.bindContacts = !checkboxOptions.bindContacts">-->
                    <!--<v-list-tile-title>查看通讯录好友</v-list-tile-title>-->
                    <!--<v-list-tile-sub-title>开启后，他人也可以从通讯录中发现我的账号</v-list-tile-sub-title>-->
                    <!--</v-list-tile-content>-->
                    <!--</v-list-tile>-->

                    <!--<v-list-tile>-->
                    <!--<v-list-tile-action>-->
                    <!--<v-checkbox v-model="checkboxOptions.internalSound"></v-checkbox>-->
                    <!--</v-list-tile-action>-->

                    <!--<v-list-tile-content-->
                    <!--@click.prevent="checkboxOptions.internalSound = !checkboxOptions.internalSound">-->
                    <!--<v-list-tile-title>内置音效</v-list-tile-title>-->
                    <!--<v-list-tile-sub-title>应用内按钮点击音效</v-list-tile-sub-title>-->
                    <!--</v-list-tile-content>-->
                    <!--</v-list-tile>-->

                    <!--<v-list-tile>-->
                    <!--<v-list-tile-action>-->
                    <!--<v-checkbox v-model="checkboxOptions.noImageModel"></v-checkbox>-->
                    <!--</v-list-tile-action>-->

                    <!--<v-list-tile-content-->
                    <!--@click.prevent="checkboxOptions.noImageModel = !checkboxOptions.noImageModel">-->
                    <!--<v-list-tile-title>无图模式</v-list-tile-title>-->
                    <!--<v-list-tile-sub-title>使用非Wi-Fi网络时不下载图片</v-list-tile-sub-title>-->
                    <!--</v-list-tile-content>-->
                    <!--</v-list-tile>-->

                    <!--<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">-->

                    <!--<v-list-tile slot="activator">-->
                    <!--<v-list-tile-content>-->
                    <!--<v-list-tile-title>视频自动播放</v-list-tile-title>-->
                    <!--<v-list-tile-sub-title>仅Wi-Fi</v-list-tile-sub-title>-->
                    <!--</v-list-tile-content>-->
                    <!--</v-list-tile>-->

                    <!--<v-card>-->
                    <!--<v-toolbar color="secondary" flat>-->
                    <!--<v-btn icon light @click="dialog = false">-->
                    <!--<v-icon>close</v-icon>-->
                    <!--</v-btn>-->

                    <!--<v-toolbar-title class="grey&#45;&#45;text text&#45;&#45;darken-4">视频自动播放</v-toolbar-title>-->
                    <!--</v-toolbar>-->

                    <!--<v-divider></v-divider>-->

                    <!--<template v-for="(task, i) in networkOptions">-->
                    <!--<v-divider-->
                    <!--v-if="i !== 0"-->
                    <!--:key="`${i}-divider`"-->
                    <!--&gt;</v-divider>-->

                    <!--<v-list-tile :key="`${i}-${task.text}`">-->
                    <!--<v-list-tile-action>-->
                    <!--<v-checkbox-->
                    <!--v-model="task.done"-->
                    <!--color="info darken-3"-->
                    <!--&gt;-->
                    <!--<div-->
                    <!--slot="label"-->
                    <!--:class="task.done && 'grey&#45;&#45;text' || 'text&#45;&#45;primary'"-->
                    <!--class="ml-3"-->
                    <!--v-text="task.text"-->
                    <!--&gt;</div>-->
                    <!--</v-checkbox>-->
                    <!--</v-list-tile-action>-->

                    <!--<v-spacer></v-spacer>-->

                    <!--<v-scroll-x-transition>-->
                    <!--<v-icon-->
                    <!--v-if="task.done"-->
                    <!--color="success"-->
                    <!--&gt;-->
                    <!--check-->
                    <!--</v-icon>-->
                    <!--</v-scroll-x-transition>-->
                    <!--</v-list-tile>-->
                    <!--</template>-->

                    <!--</v-card>-->

                    <!--</v-dialog>-->


                    <!--<v-list-tile>-->
                    <!--<v-list-tile-content>-->
                    <!--<v-list-tile-title>字体大小</v-list-tile-title>-->
                    <!--<v-list-tile-sub-title>除回答与专栏正文页面以外的字体调节</v-list-tile-sub-title>-->
                    <!--</v-list-tile-content>-->
                    <!--</v-list-tile>-->

                    <!--</v-list>-->

                    <!--<v-divider></v-divider>-->

                    <!--<v-list two-line>-->

                    <!--<v-subheader>通知</v-subheader>-->

                    <!--<v-list-tile>-->
                    <!--<v-list-tile-title>消息设置</v-list-tile-title>-->
                    <!--</v-list-tile>-->

                    <!--<v-list-tile>-->
                    <!--<v-list-tile-title>推送通知设置</v-list-tile-title>-->
                    <!--</v-list-tile>-->

                    <!--<v-list-tile>-->
                    <!--<v-list-tile-title>屏蔽设置</v-list-tile-title>-->
                    <!--</v-list-tile>-->

                    <!--</v-list>-->

                    <!--<v-divider></v-divider>-->

                    <v-list two-line>

                        <v-subheader>安全</v-subheader>

                        <v-list-tile>
                            <v-list-tile-title @click="$router.push({name:'forget-password'})">密码修改</v-list-tile-title>
                        </v-list-tile>

                    </v-list>

                    <v-divider></v-divider>

                    <v-list two-line>

                        <v-subheader>其他</v-subheader>

                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title @click="dialog=true">清除缓存</v-list-tile-title>
                                <v-list-tile-sub-title v-if="size>0">{{size.toFixed(2)}}MB</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile @click="$router.push({name:'chat',query:{id:0}})">
                            <v-list-tile-title>问题反馈</v-list-tile-title>
                        </v-list-tile>

                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                        <v-list-tile>
                            <v-flex>
                                <v-btn v-if="$store.state.token" @click="logout" color="error" block>退出登录</v-btn>
                                <v-btn v-else color="primary"
                                       @click="$router.push({name: 'login', query: {redirect: '/topic'}})" block>立即登录
                                </v-btn>
                            </v-flex>
                        </v-list-tile>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                        <v-flex text-xs-center>
                            Gua Team Web Version 1.4.8 (44)
                        </v-flex>
                    </v-list>

                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <v-card>
                <v-card-title
                        class="headline primary"
                        primary-title
                >
                    是否清除缓存
                </v-card-title>

                <v-card-text>
                    清除缓存将导致您的账户登出，是否确认
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="error"
                            flat
                            @click="dialog=false"
                    >
                        取消
                    </v-btn>
                    <v-btn
                            color="success"
                            flat
                            @click="clear()"
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
        name: "Settings",
        data() {
            return {
                checkboxOptions: {
                    bindContacts: false,  // 绑定通讯录
                    internalSound: false,  // 内置音效
                    noImageModel: true,  // 无图模式
                },  // Checkbox选项
                dialog: false,
                networkOptions: [
                    {
                        done: false,
                        text: 'Foobar'
                    },
                    {
                        done: false,
                        text: '123'
                    }
                ],
                size: -1
            }
        },
        methods: {
            // 注销用户
            logout() {
                // 清除token
                import('js-cookie').then(Cookies => {
                    Cookies.remove('token')
                });
                this.$store.commit('removeToken');
                // 清除用户信息
                this.$store.commit('clearUserInfo');
                this.DB();
                // 跳回登录
                this.$router.push({name: 'login'});
            },
            DB() {
                let myDB = {
                    name: "project-agent", version: 1, db: null
                };

                function openDB(name) {
                    let version = 1;
                    let request = window.indexedDB.open(name, version);
                    request.onerror = function (e) {
                        window.console.log(e.currentTarget.error.message);
                    };
                    request.onsuccess = function (e) {
                        myDB.db = e.target.result;
                    };
                    request.onupgradeneeded = function (e) {
                        let db = e.target.result;
                        if (!db.objectStoreNames.contains("user")) {
                            db.createObjectStore("user", {keyPath: 'id', autoIncrement: true});
                        }
                    };
                }

                function clear(db, storeName) {
                    let transaction = db.transaction(storeName, 'readwrite');
                    let store = transaction.objectStore(storeName);
                    let request = store.clear();
                    request.onsuccess = function () {
                        window.console.info('clear')
                    };
                }

                openDB('user');
                setTimeout(function () {
                    clear(myDB.db, 'user')
                }, 1000);
            },
            clear() {
                var plusReady = function (callback) {
                    if (window.plus) {
                        callback();
                    } else {
                        document.addEventListener('plusready', callback);
                    }
                };
                let that = this;
                plusReady(function () {

                    plus.cache.clear(() => {
                        that.$router.push({name: 'login'})
                    })
                });
            },

            init_cache() {
                this.size = -1;
                let that = this;
                plus.cache.calculate(function (size) {
                    var sizeInt = parseInt(size);
                    that.size = sizeInt / (1024 * 1024);
                });

            },
        },
        mounted() {
            try {
                this.init_cache()
            } catch (e) {

            }
        }
    }
</script>
