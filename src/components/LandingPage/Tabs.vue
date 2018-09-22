<template>
  <div class="tab-body">
    <div id="tab-navegation" class="tabs">
          <ul class="list clearfix m-0 row">
              <li v-for="tab in tabs" :class="{'columns': tab.type == 'modal', 'active-item' : tab.isActive, 'row align-middle': tab.type !== 'modal'}" class="tab-nav-item" @click="selectTab(tab)">
                  <span v-if="tab.name !== ''" :id="tab.id"  :class="{ 'active-item' : tab.isActive}" class="align-self-middle">{{tab.name}}</span>
                  <div class="icon-tabs align-self-middle" :class="{'columns': tab.type !== 'modal'}" v-if="tab.icon !== ''" v-html="tab.icon"></div>
              </li>
          </ul>
      </div>
      <slot></slot>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Tabs',
  data () {
    return {
      tabs: []
    }
  },
  created () {
    this.tabs = this.$children
  },
  methods: {
    ...mapActions(['showTab']),
    selectTab (selectedTab) {
      this.showTab(selectedTab.id)
      console.log('From Tabs ' + this.showTabStatus)
      this.tabs.forEach(tab => {
        tab.isActive = (tab.id === selectedTab.id)
        console.log(tab.isActive)
        console.log('From Tabs ' + tab.id)
        console.log('From Tabs ' + selectedTab.id)
      })
    }
  },
  computed: {
    ...mapGetters(['showTabStatus'])
  }
}
</script>  

<style lang="scss">
  .tab-nav-item{
    font-size: 12pt;
  }
  .icon-tabs{
    width: 21px;
    height: 21px;
    svg{width: 100%; height: 100%;}
  }
</style>  
