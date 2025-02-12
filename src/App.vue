<template>
  <div class="header">
    <div class="logo-section">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      <button class="menu-toggle" @click="toggleMenu">&#9776;</button>
    </div>
    <nav class="navigation" v-show="menuOpen">
      <ul class="nav-menu">
        <li>
          <router-link to="/verifier" active-class="active-menu" exact>동일인 판별기</router-link>
        </li>
        <li>
          <router-link to="/identifier" active-class="active-menu" exact>성별 판별기</router-link>
        </li>
      </ul>
    </nav>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
}
</script>


<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px; /* Adjust based on your layout */
  margin-bottom: 10px;
}

.logo {
  height: 40px;
  transition: transform 300ms ease-in-out;
}

.logo:hover {
  transform: scale(1.1);
}

.navigation {
  display: flex;
  justify-content: center;
  width: 100%;
}

.nav-menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
}

.nav-menu li {
  margin: 0 15px;
}

.nav-menu a {
  text-decoration: none;
  color: #646cff;
  font-size: 16px;
  transition: color 300ms, transform 300ms;
}

.nav-menu a:hover {
  color: #42b883;
  transform: translateY(-3px);
}

.active-menu {
  color: #42b883;
  font-weight: bold;
  background-color: #e0e0e0;
  padding: 6px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
