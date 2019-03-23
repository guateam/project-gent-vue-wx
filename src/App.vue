<template>
    <v-app>
        <v-navigation-drawer temporary v-model="$store.state.drawer" app>
            <navigation-drawer></navigation-drawer>
        </v-navigation-drawer><!--侧边栏-->

        <v-content>
            <!--<router-view></router-view>-->
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive">
                    <!-- 这里是会被缓存的视图组件，比如 Home！ -->
                </router-view>
            </keep-alive>

            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </v-content>

        <v-snackbar v-model="$store.state.snackbar" bottom multi-line :timeout="3000">
            {{ $store.state.infoText }}
            <v-btn color="primary" flat @click="$store.commit('closeInfo')">
                关闭
            </v-btn>
        </v-snackbar>

        <v-dialog
                v-model="$store.state.login_state"
                persistent
                width="300"
                style="z-index: 9999 !important;"
        >
            <v-card
                    color="primary"
                    dark
            >
                <v-card-text>
                    加载中···
                    <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog
                v-model="update_state"
                width="500"
        >
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                        color="primary"
                >
                    {{update_title}}
                </v-card-title>

                <v-card-text>
                    {{update_notice}}
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="warning"
                            flat
                            @click="update_state = false"
                    >
                        取消
                    </v-btn>
                    <v-btn
                            color="success"
                            flat
                            @click="download"
                    >
                        确认升级
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    import NavigationDrawer from "./components/NavigationDrawer";

    export default {
        name: 'App',
        components: {
            NavigationDrawer,
        },
        data() {
            return {
                loading: 0,
                update_state: false,
                update_notice: '',
                update_title: '',
            }
        },
        methods: {
            DB() {
                let that = this;
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

                function getDataByKey(db, storeName, value) {
                    let transaction = db.transaction(storeName, 'readwrite');
                    let store = transaction.objectStore(storeName);
                    let request = store.get(value);
                    request.onsuccess = function (e) {
                        let data = e.target.result;
                        that.$store.commit('updateToken', data.token);
                        that.get_user()
                    };
                }

                openDB('user');
                setTimeout(function () {
                    getDataByKey(myDB.db, 'user', 1)
                }, 1000);
            },
            get_user() {
                this.$api.account.get_user_by_token().then(res => {
                    if (res.data.code === 1) {
                        this.$store.commit('refreshUserInfo', res.data.data);
                        this.$store.commit('login', this.$store.state);
                        this.loading = 0;
                        this.login_state = false;
                    } else if (this.loading < 3) {
                        this.loading++;
                        setTimeout(this.get_user(), 1000)
                    } else {
                        this.$store.commit('logout', this.$store.state);
                        this.$router.push({name: 'login'})
                    }
                })
            },
            update() {
                var plusReady = function (callback) {
                    if (window.plus) {
                        callback();
                    } else {
                        document.addEventListener('plusready', callback);
                    }
                };
                let that = this;
                plusReady(function () {
                    let u = navigator.userAgent;
                    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    this.$api.other.check_update().then(res => {
                        if (isAndroid) {
                            if (res.data.android.version > plus.runtime.version) {
                                that.update_state = true;
                                that.update_notice = res.data.notice;
                                that.update_title = res.data.title;
                            }
                        } else if (isiOS) {
                            if (res.data.ios.version > plus.runtime.version) {
                                that.update_state = true;
                                that.update_notice = res.data.android.notice;
                                that.update_title = res.data.android.title;
                            }
                        }
                    })
                });
            },
            download() {
                let u = navigator.userAgent;
                let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isAndroid) {
                    var plusReady = function (callback) {
                        if (window.plus) {
                            callback();
                        } else {
                            document.addEventListener('plusready', callback);
                        }
                    };
                    let that = this;
                    plusReady(function () {
                        let task = plus.downloader.createDownload('https://hanerx.tk/project-agent/release.apk', {
                            filename: "_doc/download/release.apk"
                        }, function (download, status) {
                            plus.runtime.openFile(download.filename);
                        });
                        task.start();
                    });
                }

            }
        },
        mounted() {
            // 获取用户信息
            this.update();

        },
        created() {
            this.DB();
            // setTimeout(this.get_user(), 1100);
            // 添加返回事件监听
        },
    }
</script>

<style>
    aside {
        z-index: 999 !important;
    }

    image {
        object-fit: cover !important;
    }
</style>
