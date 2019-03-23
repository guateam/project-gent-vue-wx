<template>
    <div class="browser">
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-btn icon @click="$router.back()">
                <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>{{title}}</span>
            </v-toolbar-title>
            <v-btn icon @click="jump_browser(url)">
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>
        <iframe onload="this.height=document.body.scrollHeight" :src="url" id="main-frame" height="100%"
                width="100%" frameborder="no"></iframe>
    </div>
</template>

<script>
    export default {
        name: "Browser",
        data() {
            return {
                url: '',
                title: '浏览器'
            }
        },
        methods: {
            jump_browser(url) {
                var plusReady = function (callback) {
                    if (window.plus) {
                        callback();
                    } else {
                        document.addEventListener('plusready', callback);
                    }
                };

                plusReady(function () {
                    plus.runtime.openURL(url)
                });
            }
        },
        mounted() {
            console.info(this.$route.query.url.indexOf('article://'))
            if (this.$route.query.url.indexOf('article://')!=-1) {
                let id = this.$route.query.url.substr(this.$route.query.url.indexOf('article://') + 10);
                this.$router.replace({name: 'article', query: {id: id}})
            }
            if (this.$route.query.url.indexOf('question://')!=-1) {
                let id = this.$route.query.url.substr(this.$route.query.url.indexOf('question://') + 11);
                this.$router.replace({name: 'question', query: {id: id}})
            }
            this.url = this.$route.query.url;
            this.title = this.$route.query.title;
            // let mainFrame = document.getElementById('main-frame');
            // let that = this;
            // if (mainFrame.attachEvent) {
            //     mainFrame.attachEvent("onload", function () {
            //         that.title = mainFrame.contentWindow.document.title;
            //     });
            // } else {
            //     that.title = mainFrame.contentWindow.document.title;
            // }
        }
    }
</script>

<style scoped>
    .browser {
        height: 100%;
        min-height: 20em;
    }
</style>