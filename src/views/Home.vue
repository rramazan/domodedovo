<template>
    <div class="home">
        <div class="row">
            <div class="col-lg-6">
                <label for="foi">Поиск по ФИО</label>
                <div class="input-group mb-3 ">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Ф.И.О</span>
                    </div>
                    <input type="text" v-model="searchQuery" class="form-control" id="foi" aria-label="Default"
                           aria-describedby="inputGroup-sizing-default">
                </div>
            </div>
            <div class="col-lg-6">
                <label for="date">Фильтр по дате рождения</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Дата</span>
                    </div>
                    <input type="date" v-model="dateFilter" class="form-control" id="date" aria-label="Default"
                           aria-describedby="inputGroup-sizing-default">
                </div>
            </div>
        </div>
        <table class="table table-hover">
            <thead class="thead-dark">
            <tr>
                <th scope="col">
                    <span class="title">Фото</span>
                </th>
                <th v-for="key in columns"
                    @click="sortBy(key)"
                    class="sort"
                    :class="{ active: sortKey == key }">
                    <span class="title">{{ key | ru}}</span>
                    <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in filteredHeroes" :key="index" @click="follow(item.id)">
                <td><img :src="item.picture.thumbnail" :alt="item.picture.thumbnail"></td>
                <td>{{item.name}}</td>
                <td>{{item.date | userDate}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "home",
        data() {
            return {
                searchQuery: '',
                dateFilter: '',
                sortKey: '',
                sortOrders: {
                    name: 1,
                    date: 1
                },
                columns: ['name', 'date'],
            }
        },
        computed: {
            ...mapState(["userList"]),
            filteredHeroes() {
                let sortKey = this.sortKey;
                let filterKey = this.searchQuery && this.searchQuery.toLowerCase();
                let order = this.sortOrders[sortKey] || 1;
                let heroes = this.userList;
                if (filterKey) {
                    heroes = heroes.filter(row => {
                        return row.name.toLowerCase().indexOf(filterKey) > -1;
                    })
                }
                if (this.dateFilter) {
                    heroes = heroes.filter(row => {
                        return row.date.toLocaleDateString("ru") === new Date(this.dateFilter).toLocaleDateString("ru");
                    })
                }
                if (sortKey) {
                    heroes = heroes.slice().sort((a, b) => {
                        a = (sortKey === 'name') ? a[sortKey].replace(' ', '').toLowerCase() : a[sortKey];
                        b = (sortKey === 'name') ? b[sortKey].replace(' ', '').toLowerCase() : b[sortKey];
                        return (a === b ? 0 : a > b ? 1 : -1) * order;
                    })
                }
                return heroes;
            }
        },
        filters: {
            ru(str) {
                return (str === 'name') ? 'Ф.И.О' : 'Дата';
            },
            userDate(date) {
                return date.toLocaleDateString("ru");
            }
        },
        methods: {
            sortBy(key) {
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1;
            },
            follow(id) {
                this.$router.push({ name: 'user', params: { id: id } })
            }
        },
    };
</script>
<style lang="scss">
    .home {
        padding-top: 30px;
    }

    .title {
        display: inline-block;
        opacity: 0.66;
    }

    th.active .arrow, th.active .title {
        opacity: 1;
    }

    td, .sort {
        cursor: pointer;
    }

    table thead th.sort {
        &:hover {
            opacity: 0.66;
        }
    }
    table.table td {
        vertical-align: middle;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #fff;
    }
</style>
