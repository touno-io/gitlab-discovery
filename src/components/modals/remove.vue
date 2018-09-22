<template>
  <modal title="Remove project">
    <div id="remove_body">
     <div class="position-relative p-4">
      <span>Are you sure you want to remove the repository "{{currentProjectName}}"?</span>
      <span class="text-muted">The repository will be removed from GitLab Discovery</span>
     </div>
      <div class="bottom p-4 text-right">
        <button id="cancel-btn" class="button primary" @click="close">Cancel</button>
        <button id="cancel-btn" class="button alternative" @click="remove">Remove</button>
      </div>
    </div>
  </modal>
</template>
<script>
import Modal from '../LandingPage/Modal'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'modal-remove-project',
  data () {
    return {
    }
  },
  components: { Modal },
  methods: {
    ...mapActions(['closeModal', 'switchProject', 'removeProject', 'showListControl']),
    close () {
      this.closeModal()
    },
    remove () {
      let allProjects = this.getAllProjectsInfo.projects
      let currentProject = this.currentProject
      let newList = allProjects.filter(p => p.path !== currentProject)
      this.removeProject(newList)
      if (newList.length > 0) this.showListControl('projects')
      this.close()
    }
  },
  computed: {
    ...mapGetters([
      'currentProjectName',
      'getAllProjectsInfo',
      'currentProject'
    ])
  },
  mounted () {
  }
}
</script>
<style lang="scss">
</style>