<template>
  <div class="account">
    <v-toolbar dark flat color="primary" app dense scroll-off-screen v-if="showToolBar">
      <v-toolbar-side-icon v-if="title === ''" @click="$store.commit('drawer')"></v-toolbar-side-icon>
      <v-btn v-else :to="$route.query.redirect" icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title class="headline" style="margin: 0 auto">
        <span>{{ title }}</span>
      </v-toolbar-title>

      <v-btn :to="{name: 'settings', query: {redirect: this.$route.fullPath}}" icon> <v-icon>settings</v-icon> </v-btn>
    </v-toolbar>

    <router-view @changeTitle="val => { this.title = val }" @hiddenToolBar="showToolBar = false"></router-view>

  </div>
</template>

<script>

  export default {
    name: 'Account',
    components: {
    },

    data() {
      return {
        title: '',  // 标题
        showToolBar: true,  // 显示顶部
      }
    },
  }
</script>

<style>
  /*个人信息页的经验条圆角样式*/
  .v-progress-linear__bar__determinate {
    border-radius: 20px;
  }
</style>