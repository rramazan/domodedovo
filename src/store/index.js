import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userList:[],
        currentUser: {
            id: 'id',
            name: 'name',
            date: 'date',
            picture: {
                    large: 'https://image.flaticon.com/icons/png/512/44/44357.png'
            },
            phone: 'phone',
            email: 'email'
        },
    },
    mutations: {
        setUsers(state, list) {
            state.userList = list.map((item, index) => {
                return {
                    id: index,
                    name: `${item.name.last} ${item.name.first}`,
                    date: new Date(Date.parse(item.dob.date)),
                    picture: item.picture,
                    phone: item.phone,
                    email: item.email
                };
            });
        },
        setCurrentUser(state, id) {
            if(state.userList.length) {
                state.currentUser = state.userList[id];
            }else {
                setTimeout(() => {
                    state.currentUser = state.userList[id];
                }, 2000)
            }
        }
    },
    actions: {
        init({commit}) {
            Axios.get('https://randomuser.me/api/?results=20').then(r => {
                commit('setUsers', r.data.results);
            }).catch(e => {
                console.log(e);
            })
        }
    },
    modules: {}
});
