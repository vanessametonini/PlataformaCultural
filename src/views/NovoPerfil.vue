<template>
  <q-layout
    view="hHh Lpr lff"
    container
    class="profile-layout"
  >
    <q-header
      elevated
      class="bg-black"
    >
      <q-toolbar>
        <q-toolbar-title>
          <logo-card mobile />
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="isMobileMenuOpen"
      side="right"
      show-if-above
      bordered
      :width="200"
      :breakpoint="500"
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div
            v-for="n in 50"
            :key="n"
          >
            Drawer {{ n }} / 50
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>

export default {
  name: "Profile",
  data () {
    return {
      isMobileMenuOpen: false,
    }
  }
}
</script>
<style lang="scss" scoped>
.profile-layout {
  min-height: 100vh;
}
</style>