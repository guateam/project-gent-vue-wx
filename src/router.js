import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        // 重定向到话题
        {path: '/', name: 'index', redirect: {name: 'topic'}},
        // 话题
        {path: '/topic', name: 'topic', component: () => import('./views/Topic.vue')},
        // 告示板
        {path: '/board', name: 'board', component: () => import('./views/Board.vue')},
        // 登录
        {path: '/login', name: 'login', component: () => import('./views/Login.vue')},
        // 忘记密码
        {path: '/forget-password', name: 'forget-password', component: () => import('./views/ForgetPassword.vue')},
        // 设定新密码
        {path: '/set-new-password', name: 'set-new-password', component: () => import('./views/SetNewPassword.vue')},
        // 注册
        {path: '/register', name: 'register', component: () => import('./views/Register.vue')},
        // 设置
        {path: '/settings', name: 'settings', component: () => import('./views/Settings.vue')},
        // 学院
        {
            path: '/school',
            name: 'school',
            component: () => import('./views/School.vue'),
        },
        // 点赞
        {
            path: '/approval',
            name: 'approval',
            component: () => import('./views/Approval.vue')
        },
        // 系统通知
        {
            path: '/sys-notice',
            name: 'sys-notice',
            component: () => import('./views/SysNotice.vue')
        },
        // at我的
        {
            path: '/call',
            name: 'call',
            component: () => import('./views/Call.vue')
        },
        // 评论和回复
        {
            path: '/reply',
            name: 'reply',
            component: () => import('./views/Reply.vue')
        },
        // 查看用户详情
        {
            path: '/detail',
            name: 'detail',
            component: () => import('./views/UserDetails.vue')
        },
        // 用户个人页
        {
            path: '/account',
            name: 'account',
            redirect: {name: 'user-info'},
            meta: {requireLogin: true},  // 需要登录
            component: () => import('./views/Account.vue'),
            children: [
                // 实名认证
                {
                    path: 'real-name',
                    name: 'real-name',
                    meta: {requireLogin: true},
                    component: () => import('./views/RealNameVerify.vue')
                },
                // 专家认证
                {
                    path: 'specialist-verify',
                    name: 'specialist-verify',
                    meta: {requireLogin: true},
                    component: () => import('./views/SpecialistVerify.vue')
                },
                // 企业认证
                {
                    path: 'company-verify',
                    name: 'company-verify',
                    meta: {requireLogin: true},
                    component: () => import('./views/CompanyVerify.vue')
                },
                // 用户信息
                {
                    path: 'user-info',
                    name: 'user-info',
                    meta: {requireLogin: true},
                    component: () => import('./views/UserInfo.vue')
                },
                // 用户基本详情
                {
                    path: '/user-detail',
                    name: 'user-detail',
                    meta: {requireLogin: true},
                    component: () => import('./views/UserDetail.vue'),
                    children: [
                        // 实名认证
                    ]
                },
                {
                    path: 'verified',
                    name: 'verified',
                    meta: {requireLogin: true},
                    component: () => import('./views/Verified.vue')
                },

                // 历史发布
                {
                    path: 'historical-post',
                    name: 'historical-post',
                    meta: {requireLogin: true},
                    component: () => import('./views/HistoricalPost.vue')
                },
                // 粉丝列表
                {
                    path: 'fan-list',
                    name: 'fan-list',
                    meta: {requireLogin: true},
                    component: () => import('./views/FanList.vue')
                },
                // 我的钱包
                {
                    path: 'wallet',
                    name: 'wallet',
                    meta: {requireLogin: true},
                    component: () => import('./views/Wallet.vue')
                },
                {
                    path: 'history',
                    name: 'history',
                    meta: {requireLogin: true},
                    component: () => import('./views/History.vue')
                },
                {
                    path: 'browser',
                    name: 'browser',
                    component: () => import('./views/Browser.vue')
                },
                {
                    path: 'qr-code',
                    name: 'qr-code',
                    component: () => import('./views/QRCode.vue')
                }
            ],
        },
        // 新聊天页
        {
            path: '/chat',
            name: 'chat',
            component: () => import('./views/Chat.vue'),
        },
        // 群聊
        {
            path: '/group-chat/:id/:title',
            name: 'group-chat',
            component: () => import('./views/GroupChat.vue')
        },
        // 群聊设置
        {
            path: '/group-settings/:id/:title',
            name: 'group-settings',
            component: () => import('./views/GroupSettings.vue')
        },
        // 消息
        {
            path: '/message',
            name: 'message',
            meta: {requireLogin: true},  // 需要登录
            component: () => import('./views/Message.vue'),
            // children: [
            //   {
            //     path: 'chat',
            //     name: 'Chat',
            //     component: () => import('./views/Chat.vue'),
            //     children: [
            //       {
            //         path: 'chat-setting',
            //         name: 'chat-setting',
            //         component: () => import('./views/ChatSetting.vue')
            //       },
            //     ]
            //   },
            //   {
            //     path: 'group-chat',
            //     name: 'group-chat',
            //     component: () => import('./views/GroupChat.vue'),
            //     children: [
            //       {
            //         path: 'group-chat-setting',
            //         name: 'group-chat-setting',
            //         component: () => import('./views/GroupChatSetting.vue')
            //       },
            //     ]
            //   },
            // ]
        },
        // 告示板详情
        {
            path: '/board-detail',
            name: 'board-detail',
            component: () => import('./views/BoardDetail.vue'),
            children: []
        },
        // 发布需求
        {
            path: '/requirement-publish',
            name: 'requirement-publish',
            component: () => import('./views/RequirementPublish.vue'),
            children: []
        },
        // 需求审核
        {
            path: '/requirement-check',
            name: 'requirement-check',
            component: () => import('./views/RequirementCheck.vue'),
            children: []
        },// 需求审核详情页
        {
            path: '/requirement-check-detail',
            name: 'requirement-check-detail',
            component: () => import('./views/RequirementCheckDetail.vue'),
            children: []
        },
        // 历史发布（需求）
        {
            path: '/requirement-history',
            name: 'requirement-history',
            component: () => import('./views/RequirementHistory.vue'),
            children: []
        },
        // 文章页
        {
            path: '/article',
            name: 'article',
            component: () => import('./views/Article.vue'),
            children: []
        },
        // 文章阅读
        {
            path: '/article-read',
            name: 'article-read',
            component: () => import('./views/ArticleRead.vue'),
        },
        // 评论组件
        {
            path: '/comment',
            name: 'comment',
            component: () => import('./views/Comment.vue')
        },
        // 评论回复组件
        {
            path: '/comment-detail',
            name: 'comment-detail',
            component: () => import('./views/CommentDetail.vue')
        },
        // 收藏
        {
            path: '/collection',
            name: 'collection',
            meta: {requireLogin: true},
            component: () => import('./views/Collection.vue')
        },
        // 问题页
        {
            path: '/question',
            name: 'question',
            component: () => import('./views/Question.vue')
        },
        // 回答页
        {
            path: '/answer',
            name: 'answer',
            component: () => import('./views/Answer.vue')
        },
        // 问题发布页
        {
            path: '/question-publish',
            name: 'question-publish',
            meta: {requireLogin: true},
            component: () => import('./views/QuestionPublish.vue')
        },
        // 回答发布页
        {
            path: '/answer-publish',
            name: 'answer-publish',
            meta: {requireLogin: true},
            component: () => import('./views/AnswerPublish.vue')
        },
        // 文章发布页
        {
            path: '/article-publish',
            name: 'article-publish',
            meta: {requireLogin: true},
            component: () => import('./views/ArticlePublish.vue')
        },
        // 创作中心
        {
            path: '/creation-manager',
            name: 'creation-manager',
            meta: {requireLogin: true},
            component: () => import('./views/CreationManager.vue')
        },
        // 创作中心
        {
            path: '/corporate_center',
            name: 'corporate_center',
            meta: {requireLogin: true},
            component: () => import('./views/CorporateCenter.vue')
        },
        // 搜索
        {
            path: '/search',
            name: 'search',
            meta: {requireLogin: true},
            component: () => import('./views/Search.vue')
        },
        // 搜索结果
        {
            path: '/search-results',
            name: 'search-results',
            meta: {requireLogin: true},
            component: () => import('./views/SearchResults.vue')
        },
        // 咨询
        {
            path: '/advisory',
            name: 'advisory',
            meta: {requireLogin: true},
            component: () => import('./views/Advisory.vue')
        },
        // 添加咨询
        {
            path: '/advisory-publish',
            name: 'advisory-publish',
            meta: {requireLogin: true},
            component: () => import('./views/AdvisoryPublish.vue')
        },
        // 咨询管理
        {
            path: '/advisory-list',
            name: 'advisory-list',
            meta: {requireLogin: true},
            component: () => import('./views/AdvisoryList.vue')
        },
        // 点赞通知页
        {
            path: '/like',
            name: 'like',
            component: () => import('./views/Like.vue')
        },
        {
            path: '/callme',
            name: 'callme',
            component: () => import('./views/Callme.vue')
        },
        // 评论通知
        {
            path: '/commentnotice',
            name: 'commentnotice',
            component: () => import('./views/CommentNotice.vue')
        },
        // 系统通知
        {
            path: '/system-notification',
            name: 'system-notification',
            component: () => import('./views/SystemNotification.vue')
        },
        {
            path: '/first-login',
            name: 'first-login',
            component: () => import('./views/FirstLogin.vue')
        },
        {
            path: '/sign-board',
            name: 'sign-board',
            component: () => import('./views/SignBoard.vue')
        },
        // 积分详情
        {
            path: 'exp-detail',
            name: 'exp-detail',
            meta: {requireLogin: true},
            component: () => import('./views/ExpDetail.vue')
        },
        // 激活账号
        {
            path: 'activate-account',
            name: 'activate-account',
            meta: {requireLogin: true},
            component: () => import('./views/ActivateAccount.vue')
        },
        // 提现
        {
            path: 'check-out',
            name: 'check-out',
            meta: {requireLogin: true},
            component: () => import('./views/CheckOut.vue')
        },
        // 充值
        {
            path: 'recharge',
            name: 'recharge',
            meta: {requireLogin: true},
            component: () => import('./views/Recharge.vue')
        },
        // 咨询详情
        {
            path: '/advisory-detail',
            name: 'advisory-detail',
            meta: {requireLogin: true},
            component: () => import('./views/AdvisoryDetail.vue')
        },
        // 回答咨询
        {
            path: '/advisory-answer',
            name: 'advisory-answer',
            meta: {requireLogin: true},
            component: () => import('./views/AdvisoryAnswer.vue')
        },
        // 举报
        {
            path: '/report',
            name: 'report',
            meta: {requireLogin: true},
            component: () => import('./views/Report.vue')
        }
    ],
});
