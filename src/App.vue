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
                    };
                }

                openDB('user');
                setTimeout(function () {
                    getDataByKey(myDB.db, 'user', 1)
                }, 1000);
            },
            get_user(){
                this.$api.account.get_user_by_token().then(res => {
                    if (res.data.code === 1) {
                        this.$store.commit('refreshUserInfo', res.data.data);
                        this.$store.commit('login', this.$store.state);
                        this.loading=0;
                    }else if(this.loading<3){
                        this.loading++;
                        this.get_user();
                    } else {
                        this.$store.commit('logout', this.$store.state);
                        this.$router.push({name:'login'})
                    }
                })
            }
        },
        mounted() {
            // 获取用户信息

        },
        created() {
            this.DB();
            setTimeout(this.get_user(), 1100);
            // 添加返回事件监听
        },
    }
</script>

<style>
    aside{
        z-index: 999!important;
    }
</style>
