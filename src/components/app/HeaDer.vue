<template>
    <div id="header">
        <div class="container d-flex justify-content-between align-items-center py-3">
            <!------ BTN TOGGLE ------->
            <b-button id="btn-toggle" class="d-flex align-items-center h-50 d-none d-md-block " @click="toggle">
                <b-icon icon="list" aria-hidden="true"></b-icon> Menu
            </b-button>
            <!------ BTN TOGGLE PHONE ------->
            <b-icon icon="list" aria-hidden="true" @click="togglePhone" class="d-md-none fs-4"></b-icon>
            <!-------  LOGO BRAND PHONE   ------->
            <div class="logobrand d-block d-lg-none ">
                <img src="https://demo.plainadmin.com/assets/images/logo/logo-white.svg" alt="">
            </div>

            <!------ SEARCH ------->
            <b-nav-form class="d-none d-lg-flex ">
                <b-form-input size="sm" class="mr-sm-2 ml-2" placeholder="Search Page" id="search"></b-form-input>
            </b-nav-form>
            <!------ PROFILE MENU ------->

            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content  >
                    <b-avatar variant="info" :src="imageSrc" @click="toggleDropdown">
                        <template #badge>
                            <b-icon icon="arrow-down-circle-fill"></b-icon>
                        </template></b-avatar>
                </template>

                <b-dropdown-item href="#">Hello <strong>{{ nameUser }}</strong></b-dropdown-item>
                <b-dropdown-item href="#"> Notification</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item href="#" @click="logout">Log out <b-icon icon="box-arrow-in-right" variant="dark">
                    </b-icon>
                </b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'HeaDer',
        data() {
            return {
                imageSrc: require('@/assets/man.png'),
                listProfil: true,
                dropdownVisible: false,
                emailCurrentUser: '',
                nameUser: ''
            }
        },


        methods: {

            async getUser() {
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.get(`${process.env.VUE_URL}/api/getUser`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    this.nameUser = response.data.user.fullName
                } catch (error) {
                    console.log(`error for get user is ${error}`)
                }
            },
            toggle() {
                this.$emit('toggel-header')

            },
            togglePhone() {
                this.$emit('toggel-headerPhone')

            },

            toggleDropdown() {
                this.dropdownVisible = !this.dropdownVisible;
            },

            logout() {
                localStorage.removeItem('token')
                this.$router.push('/Login')
            },


        },

        mounted() {
            this.getUser()
        }



    }
</script>

<style lang="scss">
    #header {
        background-color: var(--couleur-primaire-1);

        .navbar {
            height: 77px;
        }
    }

    #btn-toggle {
        background-color: var(--couleur-primaire-4);
        border: none;
        gap: 10px;

    }

    #search {
        height: 43px;
        width: 256px;
        background-color: transparent;
        padding-left: 14px;
        border: 1px solid var(--couleur-primaire-2);
        color: var(--couleur-primaire-3);
    }

    #btn-search {
        height: 45px;
        width: 81px;
    }

    .prof {
        font-size: 12px;
        margin: 0px;
    }

    #img-profil {
        object-fit: cover;
    }

    // btn dropdown

    #__BVID__44__BV_toggle_{
        padding: 0px;
    }

    /* Style for tablets (less than de 992px) */
    @media (max-width: 991.98px) {
        
    }

    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
            // btn dropdown

    #__BVID__44__BV_toggle_{
        padding: 0px;
    }
    }
</style>