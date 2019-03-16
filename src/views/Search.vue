<template>
    <div>
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-btn icon @click="$router.back()">
                    <v-icon large color="white">keyboard_arrow_left</v-icon>
                </v-btn>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">内容搜索</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
            </div>
        </div>
        <div class="line"></div>
        <v-toolbar
                color="#ffd633"
                prominent
                tabs
                flat
        >
            <v-combobox
                    v-model="model"
                    :items="items"
                    :loading="isLoading"
                    :search-input.sync="search"
                    clearable
                    item-text="content"
                    item-value="content"
                    label="搜索你想要的内容"
                    solo
                    no-data-text="无相关内容"
                    persistent-hint
                    class="elevation-0"
                    flat
                    dense
                    @keyup.enter="done(search)"
            >
            <template v-slot:no-data>
                    <v-list-tile>
                        <v-list-tile-title>
                            <strong v-text="info_word"></strong>
                        </v-list-tile-title>
                    </v-list-tile>
                </template>
            </v-combobox>
            <v-toolbar-title class="title"><v-btn icon @click="done(search)">
                <v-icon color="white" >search</v-icon>
            </v-btn></v-toolbar-title>
        </v-toolbar>
        <v-flex xs12 style="margin-top: 2em">
            <h4 style="margin-left: 1em">热门搜索</h4>
            <div class="hotbox" v-for="(it,idx) in hot" @click="done(it.content)">
                <v-icon v-if="idx == 0" small color="red">
                    whatshot
                </v-icon>
                    {{it.content}}
                <v-icon small style="float:right;margin-right: 2em">
                    call_made
                </v-icon> 
            </div>
        </v-flex>
        <v-flex xs12 style="margin-top: 2em">
            <h4 style="margin-left: 1em">历史记录</h4>
            <div class="hotbox" v-for="it in history_search" v-if="!it.close">
                <div style="display:inline-block;width:85%" v-text="it.content"  @click="done(it.content)"></div> 
                <v-icon @click="it.close = true" small style="float:right;margin-right: 2em">
                    close
                </v-icon> 
            </div>
        </v-flex>
    </div>
</template>

<script>
    var uid = ""
    export default {
        name: "Search",
        data() {
            return {
                isLoading: false,
                items: [

                ],
                hot:[],
                history_search:[],
                model: null,
                search: null,
                counter:2,
                info_word:"请输入搜索内容"
            }
        },
        watch: {
            search(val) 
            {
                var that = this
                // Items have already been loaded
                // if (this.items.length > 0) return
                if (val == ""){
                    that.info_word = "请输入搜索内容"
                    return
                }
                if (!that.isLoading)that.counter = 2

                if(that.counter > 0 && !that.isLoading && uid == ""){
                    uid = setInterval(()=>{
                        that.counter-=1
                        if(that.counter ==0){
                            if(that.search == ""){
                                that.info_word = "请输入搜索内容"
                            }else{
                                that.info_word = "正在加载..."
                            }
                            clearInterval(uid);
                            uid = ""
                            if(that.search == "")return
                            that.isLoading = true
                            that.$api.algorithm.auto_complete(that.search).then(res => {
                                if (res.data.code === 1) {
                                    that.items= res.data.data;
                                    that.isLoading = false;
                                    that.counter = 2;
                                    if(that.items.length == 0 && that.search != ""){
                                        that.info_word = "无匹配项"
                                    }
                                }
                            })
                        }
                    },300)
                }
                // Lazily load input items
                // fetch('https://api.coinmarketcap.com/v2/listings/')
                //     .then(res => res.json())
                //     .then(res => {
                //         this.items = res.data
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
                //     .finally(() => (this.isLoading = false))
            }
        },
        methods:{
            done(txt){
                if(txt == "" || txt == null) return
                this.$router.push({name:'search-results',query:{search:txt}})
            }
        },
        mounted(){
            this.$api.homepage.get_hot_search().then(res => {
                if (res.data.code === 1) {
                    this.hot= res.data.data;
                }
            })

            this.$api.homepage.get_history_search().then(res => {
                if (res.data.code === 1) {
                    this.history_search = res.data.data;
                }
            })
        }
    }
</script>

<style scoped>
    .head {
        z-index: 400;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        margin-bottom: 1em;
        background-color: #ffd633;
    }

    .line {
        z-index: 400;
        width: 100%;
        height: 4em;
        background-color: #eee;
    }

    .hotbox {
        padding: 0.5em;
        line-height: 1.5;
        margin: 6px;
        width: 100%;
        border-bottom: 1px #eee solid;
    }
    .load-more-normal {
        text-align: center;
        height: 60px;
        line-height: 60px;
    }

    .load-more-hide {
        height: 0;
    }
</style>
