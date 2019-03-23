import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import api from './api'
import store from './store'
import Vuelidate from 'vuelidate'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueQuillEditor from 'vue-quill-editor'
import infiniteScroll from 'vue-infinite-scroll'
import 'iview/dist/styles/iview.css';


Vue.use(infiniteScroll);
import {
    Menu,
    MenuItem,
    Col,
    Row,
    Submenu,
    Icon,
    Form,
    Input,
    FormItem,
    Select,
    Option,
    Switch,
    Slider,
    Carousel,
    CarouselItem,
    Upload,
    Button,
    ButtonGroup,
    Scroll
} from 'iview';

Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('Col', Col);
Vue.component('Row', Row);
Vue.component('Submenu', Submenu);
Vue.component('Icon', Icon);
Vue.component('Form', Form);
Vue.component('Input', Input);
Vue.component('FormItem', FormItem);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('i-switch', Switch);
Vue.component('Slider', Slider);
Vue.component('Carousel', Carousel);
Vue.component('CarouselItem', CarouselItem);
Vue.component('Upload', Upload);
Vue.component('Button', Button);
Vue.component('ButtonGroup', ButtonGroup);
Vue.component('Scroll', Scroll);

Vue.use(VueQuillEditor);

Vue.config.productionTip = false;
// 把封装好的api挂载到 Vue.$api
Vue.prototype.$api = api;
Vue.use(Vuelidate);

// 配置全局守卫 登录验证
router.beforeEach((to, from, next) => {
    if (to.meta.requireLogin) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 判断是否在登录状态
            api.account.get_user_by_token().then(res => {
                if (res.data.code === 1) {
                    next()
                } else {
                    next({
                        name: 'login',
                        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    })
                }
            });

        } else {
            next({
                name: 'login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
});


function toEmotion(text, isNoGif) {
    var list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '愉快', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极', '嘿哈', '捂脸', '奸笑', '机智', '皱眉', '耶', '红包', '鸡'];

    if (!text) {
        return text;
    }

    text = text.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, function (word) {
        var newWord = word.replace(/\[|\]/gi, '');
        var index = list.indexOf(newWord);
        var backgroundPositionX = -index * 24
        var imgHTML = '';
        if (index < 0) {
            return word;
        }

        if (isNoGif) {
            if (index > 104) {
                return word;
            }
            imgHTML = `<i class="static-emotion" style="background:url(https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/default218877.gif) ${backgroundPositionX}px 0;"></i>`
        } else {
            var path = index > 104 ? '/img' : 'https://res.wx.qq.com/mpres/htmledition/images/icon';
            imgHTML = `<img class="static-emotion-gif" style="vertical-align: middle" src="${path}/emotion/${index}.gif">`
        }
        return imgHTML;
    });
    return text;
}

Vue.directive('emotion', {
    bind: function (el, binding) {
        el.innerHTML = toEmotion(binding.value)
    }
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
