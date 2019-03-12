<template>
    <div>
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-btn icon @click="$router.back()">
                <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>实名认证</span>
            </v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-container
                    fluid
                    grid-list-lg
            >
                <v-layout row wrap>
                    <v-flex xs12 v-if="!$route.query.state">
                        <v-card color="blue-grey darken-2" class="white--text">
                            <v-card-title primary-title>
                                <div>
                                    <div class="headline">实名认证</div>
                                    <span>上传身份证信息以认证个人信息</span>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn flat dark @click="$router.push({name:'real-name'})">立即上传</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 v-if="$store.state.userInfo.group.value===1&&$route.query.state">
                        <v-card color="primary" class="white--text">
                            <v-card-title primary-title>
                                <div>
                                    <div class="headline">专家认证</div>
                                    <span>上传相关证书以获得专家认证</span>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn flat dark @click="$router.push({name:'specialist-verify'})">立即上传</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 v-if="$store.state.userInfo.group.value===1&&$route.query.state">
                        <v-card color="blue light" class="white--text">
                            <v-card-title primary-title>
                                <div>
                                    <div class="headline">企业认证</div>
                                    <span>上传相关证明以获得企业认证</span>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn flat dark @click="$router.push({name:'company-verify'})">立即上传</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 v-if="$store.state.userInfo.group.value!==1&&$route.query.state">
                        <v-card color="blue light" class="white--text">
                            <v-card-title primary-title>
                                <div>
                                    <div class="headline">恭喜</div>
                                    <span>您已完成所有认证</span>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "verified"
    }
</script>

<style scoped>
    .bigbox {

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

    }
</style>
