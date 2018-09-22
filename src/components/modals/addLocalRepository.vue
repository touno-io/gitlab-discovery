<template>
  <modal title="Add local repository">
    <div class="p-4 position-relative">
      <div class="mb-3">
        <div class="mb-2">
          <span class="mb-1">Local path</span>
          <input type="text" id="path-folder" placeholder="repository path" :value="this.localPath"><button id="change-folder-btn" class="button alternative" @click="openDialog()">Choose</button>
        </div>
      </div>
    </div>
    <div class="bottom p-4 text-right">
      <button id="clone-btn" class="button primary" @click="add()">Add repository</button>
      <button id="cancel-btn" class="button alternative" @click="close()">Cancel</button>
    </div>
  </modal>
</template>
<script>
import Modal from '../LandingPage/Modal'
import Tab from '../LandingPage/Tab'
import Tabs from '../LandingPage/Tabs'
import { remote } from 'electron'
import { mapActions } from 'vuex'
import moment from 'moment'
import path from 'path'
export default {
  name: 'modal-create',
  data () {
    return {
      localPath: '',
      date: {
        Year: moment().format('YYYY')
      }
    }
  },
  components: { Tab, Tabs, Modal },
  methods: {
    openDialog () {
      var current = 'C:/'
      remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
        defaultPath: current
      }, names => {
        this.localPath = names[0]
      })
    },
    add () {
      let pathProject = this.localPath
      let nameProject = path.basename(pathProject)
      this.addNewRepo([pathProject, nameProject])
      this.closeModal()
    },
    close () {
      this.closeModal()
    },
    ...mapActions(['closeModal', 'addNewRepo'])
  },
  computed: {
    // ...mapGetters(['createRepo'])
  }
}
</script>
<style lang="scss">
  *{
    font-size: 12px;
  }
</style>