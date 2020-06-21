<template>
  <div class="admin">
<div class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
            <i class="fas fa-bars"></i>
        </a>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">Dn Hook Admin Paneel</a>
                    <div id="close-sidebar" @click="closeMenu">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header">

                    <div class="user-pic">
                        <img class="img-responsive img-rounded" src="/img/user.png" alt="User picture">
                    </div>

                    <div class="user-info">
                        <router-link to="/admin/profile">
                            <span class="user-role"> {{email}} </span>
                    </router-link>
                        <span class="user-role">Admin</span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>


                        <li>
                            <router-link to="/admin/products">
                                <i class="fab fa-amazon"></i>
                                <span>Producten</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/orders">
                                <i class="fa fa-shopping-cart"></i>
                                <span>Bestellingen</span>
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/admin/vendors">
                                <i class="fas fa-truck-moving"></i>
                                <span>Leveranciers</span>
                            </router-link>
                        </li>

                        <li>
                            <a href="#" @click="logout()">
                                <i class="fa fa-power-off"></i>
                                <span>Uitloggen</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>

        </nav>
        <!-- sidebar-content  -->
        <main class="page-content">
            <router-view/>
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->




  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/LandingComponent.vue";
import {fb} from '../../firebase';
export default {
    name: "admin",
    data(){
        return{
            name:null,
            email:null,
        }
    },
    components: {
    },
    methods:{
        closeMenu(){
            $(".page-wrapper").toggleClass("toggled");
        },
        logout(){
            fb.auth().signOut()
                .then(() => {
                    this.$router.replace('/');
                })
                .catch((err) =>{
                    console.log(err);
                });
        }
    },
    created(){
        let user = fb.auth().currentUser;
        this.name = user.displayName;
        this.email = user.email;
    }
};
</script>

<style>
</style>

