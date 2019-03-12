import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // User's token.
    token: Cookies.get('token'),
    userInfo: {
      id: null, // 用户的唯一标识,用于向后台传参
      head_portrait: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',  // 用户头像
      nickname: null,  // 用户昵称
      level: null,  // 用户等级
      exp: {value: null, percent: null},  // 经验值
      group: {text: '', value: null},  // 用户组
      answer: null,  // 回答
      follow: null,  // 关注
      fans: null,  // 粉丝
      collection: null,  // 收藏
    },
    drawer: false,  // 侧边栏开关
    login: false, //是否登录检查
    infoText: '',  // 弹出提示的文字
    snackbar: false,  // 是否弹出提示
  },
  mutations: {
    showInfo(state, text) {
      state.infoText = text;
      state.snackbar = true;
    },  // 弹出提示
    closeInfo(state) {
      state.snackbar = false
    },  // 关闭提示
    // Update user's token with `$store.commit('updateToken', token);`.
    updateToken(state, token) { state.token = token },
    // Remove user's token.
    removeToken(state) { state.token = null },
    // Refresh user's information.
    refreshUserInfo(state, data) {
      state.userInfo = data;
    },
    // Clear user's information.
    clearUserInfo(state) {
      state.userInfo = {
        head_portrait: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      }
    },
    drawer(state) {
      state.drawer = !state.drawer;
    },  // 开关侧边栏
    login(state){
      state.login=true
    },
    logout(state){
      state.login=false
    }
  },
  actions: {

  }
})
