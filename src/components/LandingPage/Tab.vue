<template>
<div v-show="isActive" class="tab-content">
    <slot></slot>
</div>
</template>  
<script>
export default {
  name: 'Tab',
  props: {
    name: { required: false },
    id: {default: false},
    selected: { default: false },
    icon: {required: false},
    type: {default: false}
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    href () {
      return '#' + this.name.toLowerCase().replace(/ /g, '-')
    }
  },
  watch: {
    selected: function () {
      this.isActive = this.selected
    }
  },
  mounted () {
    this.isActive = this.selected
  }
}
</script>  