<template>
  <div class="real-name-verify">
    <v-layout column fill-height>
      <v-flex shrink>
        <v-btn @click="$router.back()" icon>
        <!--<v-btn @click="$router.push($route.query.redirect || {name: 'account'})" icon>-->
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs4>
        <v-layout>
          <v-flex class="upload">
            <Upload
                :format="['jpg','jpeg','png']"
                type="drag"
                :data="{token: $store.state.token}"
                action="https://hanerx.tk:5000/api/upload/upload_identify_card_back">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击上传身份证正面照片</p>
              </div>
            </Upload>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs4>
        <v-layout>
          <v-flex class="upload">
            <Upload
                :format="['jpg','jpeg','png']"
                type="drag"
                action="https://hanerx.tk:5000/api/upload/upload_identify_card_front">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击上传身份证背面照片</p>
              </div>
            </Upload>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex grow>
        <v-card flat>
          <v-container>
            <v-layout>
              <v-flex>
                <v-text-field v-model="formData.name" single-line clearable label="姓名" type="text"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field v-model="formData.nation" single-line label="民族" type="text"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex>
                <v-text-field v-model="formData.cardId" single-line clearable label="证件号" type="text"></v-text-field>
              </v-flex>
              <v-flex shrink>
                <v-select v-model="formData.sex" single-line label="性别" :items="sex" style="width: 100px"></v-select>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex>
                <v-text-field v-model="formData.birthday" single-line clearable label="生日 YYYY-mm-dd" type="text"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex>
                <v-text-field v-model="formData.address" single-line clearable label="地址" type="text"></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout align-center justify-space-between row fill-height>
              <v-flex xs5>
                <v-btn @click="submit" block color="primary">提交</v-btn>
              </v-flex>
              <v-flex xs5>
                <v-btn @click="clear" block color="red" class="white--text">清空</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'RealNameVerify',
    data() {
      return {
        sex: ['男', '女'],  // 性别选择
        formData: {
          name: '',
          nation: '',
          birthday: '',
          sex: '',
          address: '',
          cardId: '',
        },  // 表单数据
      }
    },
    methods: {
      submit() {
        this.$store.commit('showInfo', '提交表单');
      },  // 提交
      clear() {
        this.formData = {
          name: '',
          nation: '',
          birthday: '',
          sex: '',
          address: '',
          cardId: '',
        };
      },  // 清空
    },
    mounted() {
      this.$emit('hiddenToolBar');  // 关闭顶部
    },
  }
</script>

<style scoped>
  .real-name-verify {
    height: 100vh;
    font-family: Helvetica, Arial, sans-serif;
    background: linear-gradient(0deg, white, whitesmoke 40%, #FFCC00);
  }
  .upload {
    padding: 0 16px;
  }
</style>