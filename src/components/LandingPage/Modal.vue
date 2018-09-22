<template>
  <div class="modal">
   <div class="modal-body mx-auto depth-26">
    <span class="d-block px-4 py-3 m-0" id="modal-title" v-if="title !== ''">{{title}}</span>
    <slot></slot>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Utils from '../../utils'
export default {
  name: 'modal',
  props: {
    title: { required: false }
  },
  methods: {
    ...mapActions(['closeModal'])
  },
  mounted () {
    Utils().addScapeKey('remove_complete', () => {
      this.closeModal()
    })
  }
}
</script>
<style lang="scss">
  .modal {
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 16;
    
    span, input{
      display: block;
      width: 100%;
    }
    
    mark{
      display: inline-block;
      padding: 0 2px;
      background-color: #eff1f3;
      color: rgb(64,64,64);
      margin: 0;
    }
    
    #modal-title{
      font-size: 14px;
      font-weight: bold;
      color: rgb(64,64,64);
      display: block;
      border-bottom: 1px solid #e6e6e6;
    }
    
    .modal-body{
      background-color: white;
      width: 450px;
/*      min-height: 300px;*/
      border-radius: 8px;
      margin-top: 80px;
      position: relative;
      padding-bottom: 80px;
/*      max-height: 530px;*/
    }
    
    .bottom{
      border-top: 1px solid #e6e6e6;
      display: block;
      width: 100%;
      @extended .p-4;
      bottom: 0;
      position: absolute;
    }
    
    #main-list-repositories{
      border-bottom: 1px solid #e6e6e6;
      height: 325px;
    }
    
    #path-folder{
      width: calc(100% - 98px);
      display: inline-block;
      margin-right: 10px;
    }
      
    #tab-navegation{
      ul {
        width: auto;
        -webkit-box-orient: unset;
        -webkit-box-direction: unset;
        -ms-flex-direction: unset;
        flex-direction: unset;
        
        .icon-tabs {
          display: none;
        }

        li {
          display: inline-block;
          width: auto;
          height: auto;
          border: 0;
          padding: 10px;
          &:not(:last-child) {
            border-right: 1px solid #e6e6e6;
          }
          
          &.active-item:before{
            bottom: 0;
            height: 4px;
            width: 100%;
          }
        }
      }
    }
  }
  
</style>