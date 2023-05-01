<template>
  <div class="header">
    <div class="vue-icons">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </div>
    <nav>
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

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.logo {
  height: 3em;
  padding: 0.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

/* Navigation menu styles */
.nav-menu {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  margin-right: 20px;
}

.nav-menu li:last-child {
  margin-right: 0;
}

.nav-menu a {
  text-decoration: none;
  color: #646cff;
  
  transition: color 300ms;
}

.nav-menu a:hover {
  color: #42b883;
}

/* Active menu styles */
.active-menu {
  color: #42b883;
  font-weight: 800;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>