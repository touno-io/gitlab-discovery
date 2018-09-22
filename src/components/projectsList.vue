<template>
  <div id="projects-list" class="depth-12">
    <div class="mt-4 ml-4 mr-4 mb-2" id="filter-projects-area">
      <input type="text" id="filter-projects" placeholder="Filter" v-model="filter" ref="inputFilterBranch" @keyup="ListFilter">
    </div>
    <div id="list-body">
     <strong class="px-4 my-2 d-block" v-if="projects.gitlab.length > 0">GitLab.com</strong>
      <ul>
        <li class="px-4" v-if="projects.gitlab.length > 0" v-for="(project) in projects.gitlab" @click="selectProject(project)" :title="project.path" :class="{'active': currentProject === project.path}">
          <div class="logo-project">
            <img v-if="project.avatar_url != 'null'" :src="project.avatar_url + '?private_token=' + config.token" class="avatar-project d-inline-block" />
            <span v-else class="custom-avatar-project d-inline-block">{{project.name.charAt(0).toUpperCase()}}</span>
          </div>
          <div class="info-project">
            <span class="title-projects" v-html="highlightFilter(project.name)"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Utils from '../utils'
import moment from 'moment'
export default{
  name: 'projects-list',
  data () {
    return {
      LastTime: null,
      filter: '',
      projects: {
        gitlab: [],
        others: []
      }
    }
  },
  methods: {
    getlistProjects () {
    //
    },
    getTime (time) {
      if (time !== null) {
        let date = moment(time.match(/([0-9]{4,}-[0-9]{2,}-[0-9]{2,} [0-9]{2,}:[0-9]{2,}:[0-9]{2,})/)[0]).toDate()
        return moment(date).fromNow()
      }
    },
    highlightFilter (a) {
      if (this.filter.length > 0) {
        let filter = new RegExp(this.filter, 'i')
        let word = a.match(filter)
        return a.replace(filter, '<span class="highlight_filter">' + word + '</span>')
      } else {
        return a
      }
    },
    ListFilter () {
      let gitLab = this.listProjects
      // let origin = this.branchesList.origin.default
      let filterGitLab = []
      // let filterOrigin = []

      if (this.filter.length !== 0) {
        filterGitLab = gitLab.filter(project => {
          if (project.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1) return project
        })

        /* filterOrigin = origin.filter(origin => {
          if (origin[2].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) return heads
        })

        this.branchesList.heads.filtered = filterHeads
        */
        this.projects.gitlab = filterGitLab
      } else {
        this.projects.gitlab = gitLab
        // this.branchesList.origin.filtered = origin
      }
    },
    selectProject (p) {
      this.switchProject(p)
      this.showListControl('null')
      let projects = this.getAllProjectsInfo
      Utils().updateProjectSelected(projects).then((results) => {
        console.log('ok')
      })
    },
    ...mapActions(['showListControl', 'updateOperation', 'switchProject'])
  },
  computed: {
    ...mapGetters(['currentProject', 'currentBranch', 'controlStatus', 'listProjects', 'getAllProjectsInfo'])
  },
  mounted () {
    this.projects.gitlab = this.listProjects
  }
}
</script>
<style lang="scss">
  
  #projects-list{
    position: absolute;
    width: 339px;
    height: 400px;
    background-color: white;
    z-index: 12;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    top: 52px;
    left: 0;
    
    *{
      font-size: 12px;
    }

    button {
      padding: 4px 15px;
    }

    #filter-projects {
      width: 100%;
      display: inline-block;
      margin-right: 10px;
    }

    #filter-projects-area {
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 10px;
    }

    #list-body{
      overflow-y: auto;
      max-height: calc(100% - 73px);

      .title-projects {
        font-size: 10pt;
        font-weight: normal;

        .highlight_filter {
          background-color: #6262d2;
          color: white;
          font-weight: bold;
        }
      }
      
      .path-projects{
        display: block;
      }
      
      
      .avatar-project{
        width: 25px;
        background-color: white;
        border-radius: 100%;
        margin-right: 10px;
      }
      
      .custom-avatar-project{
        width: 25px;
        height: 25px;
        text-align: center;
        font-size: 14px;
        border-radius: 100%;
        background-color: #EEEEEE;
        color: #555 !important;
        line-height: 25px;
        margin-right: 10px;
      }

      .update-branch-date {
        display: block;
        color: #707070;
      }
      
      .info-project, .logo-project {
        display: inline-block;
        vertical-align: top;
      }
      
      .info-project {
       padding: 2px 0;
      }

      li {
        padding: 4px;
        position: relative;
        
        &.active {
          background-color: #6262d2;
          span {color: white;}
        }

        svg {
          position: absolute;
          top: 50%;
          left: 24px;
          transform: translateY(-50%);
        }
        &:hover {
          background-color: #eee;
          cursor: pointer;
          span {color: rgb(64,64,64);}
        }
      }
    }
  }
</style>