<template>
    <div class="company-verify">
        <v-layout column fill-height>
            <v-flex shrink>
                <v-layout align-center justify-space-between row fill-height>
                    <v-flex shrink>
                        <v-btn @click="$router.back()" icon>
                            <!--<v-btn @click="$router.push($route.query.redirect || {name: 'account'})" icon>-->
                            <v-icon>arrow_back</v-icon>
                        </v-btn>
                    </v-flex>

                    <v-flex shrink>
                        <span class="headline font-weight-bold">企业认证</span>
                    </v-flex>

                    <v-flex shrink>
                        <v-btn icon>
                            <v-icon>info</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex grow>
                <v-container fill-height>
                    <v-layout justify-center column fill-height>
                        <v-flex shrink>
                            <v-layout justify-center row>
                                <v-flex shrink>
                                    <!--需要替换成Logo-->
                                    <img src="../assets/logo.png" width="120" height="120">
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex shrink>
                            <span class="text font-weight-bold">通过认证 <br>入驻专+系统!</span>
                        </v-flex>

                        <v-flex shrink>
                            <p class="font-weight-light body-1">
                                专+团队认可的认证方式有: <br>
                                1. 中华人民共和国认可的营业执照 <br>
                                2. 中华人民共和国认可的经营许可证
                            </p>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex xs4>
                <v-container>
                    <Upload
                            :format="['jpg','jpeg','png']"
                            type="drag"
                            :data="{token: $store.state.token,license_type: 1}"
                            action="https://hanerx.tk:5000/api/enterprise/request_enterprise_upgrade"
                            name="license"
                            :on-success="back"
                    >
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击上传证书</p>
                        </div>
                    </Upload>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: 'CompanyVerify',
        methods: {
            back(response, file, fileList) {
                if (response.code === 1) {
                    this.$router.push({name: 'user-detail'});
                    this.$store.commit('showInfo', '上传成功！请等待审核');
                }
            }
        },
        mounted() {
            this.$emit('hiddenToolBar');
        },
    }
</script>

<style scoped>
    .company-verify {
        height: 100vh;
        width: 100vw;
        font-family: Helvetica, Arial, sans-serif;
        background: linear-gradient(0deg, white, whitesmoke 20%, #FFCC00);
    }

    .text {
        font-size: 3em;
    }
</style>