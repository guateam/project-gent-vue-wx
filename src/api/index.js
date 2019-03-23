import base from './base'
import qs from 'qs'
import axios from './http'
import store from '../store'


const index = {
    homepage: {

        get_recommend(page, token = store.state.token) {
            return axios.get(`${base.homepage}/get_recommend`, {params: {token: token, page: page}})
        },  // 根据用户推荐首页内容

        get_category() {
            return axios.get(`${base.homepage}/get_category`)
        },  // 获取分类

        get_classify(tag, type, page) {
            return axios.get(`${base.homepage}/classify_by_tag`, {params: {tag: tag, type: type, page: page}})
        },  //获取特定tag下的问题或者文章

        classify_all_tag(type) {
            return axios.get(`${base.homepage}/classify_all_tag`, {params: {type: type}})
        },  //获取特定tag下的问题或者文章

        get_hot_search() {
            return axios.get(`${base.homepage}/get_hot_search`)
        }, //获取热搜

        get_history_search(token = store.state.token) {
            return axios.get(`${base.homepage}/get_history_search`, {params: {token: token}})
        }, //获取热搜
    },
    account: {

        update_password(account, psw) {
            return axios.get(`${base.account}/update_password`, {params: {account: account, password: psw}})
        },  // 设置新密码

        send_check_code(account) {
            return axios.get(`${base.account}/send_check_code`, {params: {account: account}})
        },  // 发送验证码
        send_check_code_2(account, aim) {
            return axios.get(`${base.account}/send_check_code`, {params: {account: account, aim: aim}})
        },  // 发送验证码,验证码修改数据库的用户和发送的设备不一致时（手机绑定邮箱或邮箱绑定手机）
        check_code(account, code) {
            return axios.get(`${base.account}/check_code`, {params: {account: account, check_code: code}})
        },  // 检查验证码

        login(data) {
            return axios.post(`${base.account}/login`, qs.stringify(data))
        },  // 用户登录
        login_by_message(code, account) {
            return axios.get(`${base.account}/check_code_login`, {params: {account: account, code: code}})
        },
        register(data) {
            return axios.post(`${base.account}/register`, qs.stringify(data))
        },  // 用户注册

        get_user_by_token() {
            return axios.get(`${base.account}/get_user_by_token`, {params: {token: store.state.token}})
        },  // 根据token获取用户信息

        get_user(id) {
            return axios.get(`${base.account}/get_user`, {params: {user_id: id}})
        },  // 根据token获取用户信息

        get_collections(token = store.state.token) {
            return axios.get(`${base.account}/get_collections`, {params: {token: token}})
        },  // 获取收藏记录

        add_user_action(target, target_type, token = store.state.token) {
            return axios.get(`${base.account}/add_user_action`, {
                params: {
                    token: token,
                    target_id: target,
                    action_type: target_type
                }
            })
        },  // 添加用户行为

        get_account_balance() {
            return axios.post(`${base.account}/get_account_balance`, qs.stringify({token: store.state.token}))
        },  // 获取钱包余额

        get_history_pay() {
            return axios.post(`${base.account}/history_pay`, qs.stringify({token: store.state.token}))
        },  // 获取付款记录

        get_my_follow(token = store.state.token) {
            return axios.get(`${base.account}/get_my_follow`, {params: {token: token}})
        },  // 获取关注列表
        get_history() {
            return axios.get(`${base.account}/get_history`, {params: {token: store.state.token}})
        },
        get_user_group() {
            return axios.get(`${base.account}/get_user_group`)
        },
        follow_user(id) {
            return axios.get(`${base.account}/follow_user`, {params: {user_id: id, token: store.state.token}})
        },  // 关注
        un_follow_user(id) {
            return axios.get(`${base.account}/un_follow_user`, {params: {user_id: id, token: store.state.token}})
        },  // 取关
        get_user_follow_state(id) {
            return axios.get(`${base.account}/get_user_follow_state`, {params: {user_id: id, token: store.state.token}})
        },  // 用户是否被关注
        get_user_questions_by_id(user_id) {
            return axios.get(`${base.account}/get_user_questions_by_id`, {params: {user_id: user_id}})
        },  // 获取用户问题
        get_user_answers_by_id(user_id) {
            return axios.get(`${base.account}/get_user_answers_by_id`, {params: {user_id: user_id}})
        },  // 获取用户回答
        get_user_articles_by_id(user_id) {
            return axios.get(`${base.account}/get_user_articles_by_id`, {params: {user_id: user_id}})
        },  // 获取用户文章
        set_account_info(data) {
            return axios.post(`${base.account}/set_account_info`, qs.stringify(data))
        },
        bind_phonenumber(phonenumber) {
            return axios.get(`${base.account}/bind_phonenumber`, {
                params: {
                    token: store.state.token,
                    phonenumber: phonenumber
                }
            })
        },
        bind_email(email) {
            return axios.get(`${base.account}/bind_email`, {params: {token: store.state.token, email: email}})
        },
        recharge(data) {
            return axios.post(`${base.account}/add_account_balance`, qs.stringify(data))
        },  //充值
        checkout() {
            return axios.post(`${base.account}/add_account_balance`, qs.stringify(data))
        },  //提现
        set_verify_info(data) {
            return axios.post(`${base.account}/set_verify_info`, qs.stringify(data))
        },
        set_exp_change(value, description, token = store.state.token) {
            return axios.get(`${base.account}/set_exp_change`, {
                params: {
                    value: value,
                    description: description,
                    token: token
                }
            })
        }
    },
    message: {

        get_message_list(token = store.state.token) {
            return axios.get(`${base.message}/get_message_list`, {params: {token: token}})
        },  // 获取聊天列表

        get_friend_list(token = store.state.token) {
            return axios.get(`${base.message}/get_friend_list`, {params: {token: token}})
        },

        get_chat_box(id) {
            return axios.get(`${base.message}/get_chat_box`, {params: {token: store.state.token, user_id: id}})
        },  // 获取聊天信息

        add_message(data) {
            return axios.post(`${base.message}/add_message`, qs.stringify(data))
        },  // 发送消息

        get_agree_list() {
            return axios.get(`${base.message}/get_agree_list`, {params: {token: store.state.token}})
        },  // 获取点赞信息

        get_at_list() {
            return axios.get(`${base.message}/get_at_list`, {params: {token: store.state.token}})
        },  // 获取@信息

        get_sys_message() {
            return axios.get(`${base.message}/get_sys_message`, {params: {token: store.state.token}})
        },  // 获取系统信息

        get_comment_and_reply() {
            return axios.get(`${base.message}/get_comment_and_reply`, {params: {token: store.state.token}})
        },  // 获取系统信息
    },
    questions: {

        get_answer_list(id) {
            return axios.get(`${base.questions}/get_answer_list`, {params: {question_id: id}})
        },  // 获取问题的回答列表

        get_question(id) {
            return axios.get(`${base.questions}/get_question`, {params: {question_id: id}})
        },  // 获取问题详情

        follow_question(id, token = store.state.token) {
            return axios.get(`${base.questions}/follow_question`, {params: {question_id: id, token: token}})
        },  // 关注问题
        un_follow_question(id, token = store.state.token) {
            return axios.get(`${base.questions}/un_follow_question`, {params: {question_id: id, token: token}})
        },  // 取消关注问题
        get_follow(id, token = store.state.token) {
            return axios.get(`${base.questions}/get_follow`, {params: {question_id: id, token: token}})
        },  // 判断是否已关注

        get_my_questions(token = store.state.token) {
            return axios.get(`${base.questions}/get_my_questions`, {params: {token: token}})
        },  // 获取发布过的问题
        add_question(data) {
            return axios.post(`${base.questions}/add_question`, qs.stringify(data))
        },
        add_priced_question(data) {
            return axios.post(`${base.questions}/add_priced_question`, qs.stringify(data))
        },
        get_question_comment(question_id) {
            return axios.get(`${base.questions}/get_question_comment`, {params: {question_id: question_id}})
        },
        add_question_comment(question_id, content, token = store.state.token) {
            let data = {
                question_id: question_id,
                token: token,
                content: content
            };
            return axios.post(`${base.questions}/add_question_comment`, qs.stringify(data))
        },
        get_priced_answer_list(question_id, token = store.state.token) {
            return axios.get(`${base.questions}/get_priced_answer_list`, {
                params: {
                    question_id: question_id,
                    token: token
                }
            })
        },
        pay_question(question_id, token = store.state.token) {
            return axios.get(`${base.questions}/pay_question`, {params: {question_id: question_id, token: token}})
        },
        adopt_answer(answer_id, token = store.state.token) {
            return axios.get(`${base.questions}/adopt_answer`, {params: {answer_id: answer_id, token: token}})
        }
    },
    school: {

        get_recommend_article(page, token = store.state.token) {
            return axios.get(`${base.school}/get_recommend_article`, {params: {token: token, page: page}})
        }  // 获取学院文章
    },
    answer: {

        get_answer(id) {
            return axios.get(`${base.answer}/get_answer`, {params: {answer_id: id}})
        },  // 获取回答详情

        get_answer_comment_list(id) {
            return axios.get(`${base.answer}/get_answer_comment_list`, {params: {answer_id: id}})
        },  // 获取回答的评论

        get_user_answers(token = store.state.token) {
            return axios.get(`${base.answer}/get_user_answers`, {params: {token: token}})
        },  // 获取发布过的回答

        collect_answer(id, token = store.state.token) {
            return axios.get(`${base.answer}/collect_answer`, {params: {token: token, answer_id: id}})
        },  // 关注回答
        un_collect_answer(id, token = store.state.token) {
            return axios.get(`${base.answer}/un_collect_answer`, {params: {token: token, answer_id: id}})
        },
        get_collect_state(id, token = store.state.token) {
            return axios.get(`${base.answer}/get_collect_state`, {params: {token: token, answer_id: id}})
        },
        add_answer(data) {
            return axios.post(`${base.answer}/add_answer`, qs.stringify(data))
        },
        add_answer_comment(answer_id, content, token = store.state.token) {
            let data = {
                answer_id: answer_id,
                content: content,
                token: token
            };
            return axios.post(`${base.answer}/add_answer_comment`, qs.stringify(data))
        },
        get_answer_agree_state(answer_id, token = store.state.token) {
            return axios.get(`${base.answer}/get_answer_agree_state`, {params: {answer_id: answer_id, token: token}})
        },
        disagree_answer(answer_id, token = store.state.token) {
            return axios.get(`${base.answer}/disagree_answer`, {params: {answer_id: answer_id, token: token}})
        },
        un_disagree_answer(answer_id, token = store.state.token) {
            return axios.get(`${base.answer}/un_disagree_answer`, {params: {answer_id: answer_id, token: token}})
        },
        agree_answer(answer_id, token = store.state.token) {
            return axios.get(`${base.answer}/agree_answer`, {params: {answer_id: answer_id, token: token}})
        },
        un_agree_answer(answer_id, token = store.state.token) {
            return axios.get(`${base.answer}/un_agree_answer`, {params: {answer_id: answer_id, token: token}})
        }
    },
    article: {
        get_user_articles(token = store.state.token) {
            return axios.get(`${base.article}/get_user_articles`, {params: {token: token}})
        },
        get_article_allowed_group(token = store.state.token) {
            return axios.get(`${base.article}/get_article_allowed_group`, {params: {token: token}})
        },
        add_article(data) {
            return axios.post(`${base.article}/add_article`, qs.stringify(data))
        },
        get_tag_articles(tag_id) {
            return axios.get(`${base.article}/get_tag_articles`, {params: {tag_id: tag_id}})
        },
        get_article_info(id) {
            return axios.get(`${base.article}/get_article_info`, {params: {article_id: id}})
        },
        get_article_comment(id) {
            return axios.get(`${base.article}/get_article_comment`, {params: {article_id: id}})
        },
        pay_article(article_id, token = store.state.token) {
            return axios.get(`${base.article}/pay_article`, {params: {article_id: article_id, token: token}})
        },
        get_paid(article_id, token = store.state.token) {
            return axios.get(`${base.article}/get_paid`, {params: {article_id: article_id, token: token}})
        },
        collect_article(article_id, token = store.state.token) {
            return axios.get(`${base.article}/collect_article`, {params: {article_id: article_id, token: token}})
        },
        un_collect_article(article_id, token = store.state.token) {
            return axios.get(`${base.article}/un_collect_article`, {params: {article_id: article_id, token: token}})
        },
        get_article_collect_state(article_id, token = store.state.token) {
            return axios.get(`${base.article}/get_article_collect_state`, {
                params: {
                    article_id: article_id,
                    token: token
                }
            })
        },
        get_article(article_id, token = store.state.token) {
            return axios.get(`${base.article}/get_article`, {params: {article_id: article_id, token: token}})
        },
        add_article_comment(article_id, content, token = store.state.token) {
            let data = {
                article_id: article_id,
                content: content,
                token: token
            };
            return axios.post(`${base.article}/add_article_comment`, qs.stringify(data))
        }
    },
    specialist: {
        get_my_fans(token = store.state.token) {
            return axios.get(`${base.specialist}/get_my_fans`, {params: {token: token}})
        },
        get_click_info(token = store.state.token) {
            return axios.get(`${base.specialist}/get_click_info`, {params: {token: token}})
        },
        get_historical_orders(token = store.state.token) {
            return axios.get(`${base.specialist}/get_historical_orders`, {params: {token: token}})
        },
        add_order(data) {
            return axios.post(`${base.specialist}/add_order`, qs.stringify(data))
        },
        get_order_list(token = store.state.token) {
            return axios.get(`${base.specialist}/get_order_list`, {params: {token: token}})
        },
        get_order(order_id, token = store.state.token) {
            return axios.get(`${base.specialist}/get_order`, {params: {order_id: order_id, token: token}})
        },
        confirm_order(data) {
            return axios.post(`${base.specialist}/confirm_order`, qs.stringify(data))
        },
        refuse_order(order_id, token = store.state.token) {
            return axios.get(`${base.specialist}/refuse_order`, {params: {order_id: order_id, token: token}})
        }
    },
    activities: {
        get_activities(type) {
            return axios.get(`${base.activities}/get_activities`, {params: {type: type}})
        }
    },
    tags: {
        get_first_tag() {
            return axios.get(`${base.tags}/get_first_tag`)
        },
        get_child_tag(tag_id) {
            return axios.get(`${base.tags}/get_child_tag`, {params: {tag_id: tag_id}})
        },
        get_tag_recommend(tag_id, tag, token = store.state.token) {
            return axios.get(`${base.tags}/get_tag_recommend`, {params: {tag_id: tag_id, tag: tag, token: token}})
        },
        add_tag(father, tag, tag_type) {
            let data = {
                name: tag,
                father: father,
                tag_type: tag_type,
                token: store.state.token
            };
            return axios.post(`${base.tags}/add_tag`, qs.stringify(data))
        },
        get_tag_tree() {
            return axios.get(`${base.tags}/get_tag_tree`)
        }
    },
    upload: {
        upload_picture(formData) {
            return axios.post(`${base.upload}/upload_picture`, formData)
        }
    },
    group: {
        get_groups(token = store.state.token) {
            return axios.get(`${base.group}/get_groups`, {params: {token: token}})
        },

        get_group_message(id) {
            return axios.get(`${base.group}/get_group_message`, {params: {token: store.state.token, group_id: id}})
        },  // 获取群聊信息

        send_group_message(data) {
            return axios.post(`${base.group}/send_group_message`, qs.stringify(data))
        },  // 发送群聊信息

        get_group_members(id) {
            return axios.get(`${base.group}/get_group_members`, {params: {group_id: id}})
        },  // 获取当前群成员

        exit_group(id) {
            return axios.get(`${base.group}/exit_group`, {params: {token: store.state.token, group_id: id}})
        },  // 退出群聊
    },
    board: {
        get_board_recommend(page, token = store.state.token) {
            return axios.get(`${base.board}/get_board_recommend`, {params: {page: page, token: token}})
        },
        get_demands_by_tag(tag_id) {
            return axios.get(`${base.board}/get_demands_by_tag`, {params: {tag_id: tag_id}})
        },
        get_demand(demand_id) {
            return axios.get(`${base.board}/get_demand`, {params: {demand_id: demand_id}})
        },
        get_sign_state(demand_id, token = store.state.token) {
            return axios.get(`${base.board}/get_sign_state`, {params: {demand_id: demand_id, token: token}})
        },
        sign_to_demand(demand_id, token = store.state.token) {
            return axios.get(`${base.board}/sign_to_demand`, {params: {demand_id: demand_id, token: token}})
        },
        get_my_demand(token = store.state.token) {
            return axios.get(`${base.board}/get_my_demand`, {params: {token: token}})
        },
    },
    enterprise: {
        add_demand(data) {
            return axios.post(`${base.enterprise}/add_demand`, qs.stringify(data))
        },
        get_my_demands(token = store.state.token) {
            return axios.get(`${base.enterprise}/get_my_demands`, {params: {token: token}})
        },
        get_signed_users(demand_id, token = store.state.token) {
            return axios.get(`${base.enterprise}/get_signed_users`, {params: {demand_id: demand_id, token: token}})
        },
        refuse_signed_user(user_id, target, token = store.state.token) {
            return axios.get(`${base.enterprise}/refuse_signed_user`, {
                params: {
                    target: target,
                    token: token,
                    user_id: user_id
                }
            })
        },
        un_refuse_signed_user(user_id, target, token = store.state.token) {
            return axios.get(`${base.enterprise}/un_refuse_signed_user`, {
                params: {
                    target: target,
                    token: token,
                    user_id: user_id
                }
            })
        },
        confirm_signed_user(user_id, target, token = store.state.token) {
            return axios.get(`${base.enterprise}/confirm_signed_user`, {
                params: {
                    target: target,
                    token: token,
                    user_id: user_id
                }
            })
        },
        start_demand(demand_id, token = store.state.token) {
            return axios.get(`${base.enterprise}/start_demand`, {params: {demand_id: demand_id, token: token}})
        },
        close_demand(demand_id, token = store.state.token) {
            return axios.get(`${base.enterprise}/close_demand`, {params: {demand_id: demand_id, token: token}})
        }
    },
    algorithm: {
        auto_complete(word) {
            return axios.get(`${base.algorithm}/before_search`, {params: {word: word}})
        }, //根据搜索词语言用tfidf进行自动补全

        vague_search(word, type = "all", page = 1, token = store.state.token) {
            if (type == 0) {
                type = "question"
            } else if (type == 1) {
                type = "article"
            } else if (type == 2) {
                type = "user"
            } else if (type == 3) {
                type = "all"
            }
            return axios.get(`${base.algorithm}/search`, {params: {word: word, type: type, token: token, page: page}})
        }, //模糊搜索
    },
    other: {
        check_update() {
            return axios.get(`${base.other}/check_update`)
        }
    }
};

export default index;
