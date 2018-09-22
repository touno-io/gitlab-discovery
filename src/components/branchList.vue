<template>
  <div id="branch-list" class="depth-12">
    <div class="mt-4 ml-4 mr-4 mb-2" id="filter-branch-area">
      <input type="text" id="filter-branch" placeholder="Filter" v-model="filter" ref="inputFilterBranch" @keyup="ListFilter">
      <button id="change-folder-btn" class="button alternative" @click="showModal('createBranch')">New branch</button>
    </div>
    <div id="list-body">
      <ul>
        <li class="px-4 pl-6" v-if="branchesList.heads.filtered.length > 0 && branchesList.default !== null" v-for="(heads) in branchesList.heads.filtered" @click="selectBranch(heads)">
          <span class="title-branch" v-html="highlightFilter(heads[2], currentBranch)"></span>
          <span class="update-branch-date">Updated {{getTime(heads[0])}}</span>

          <svg v-if="currentBranch[0] === heads[2]" width="16" height="16" class="icon-selected-branch" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>icn/mobile-issue-close</title><defs><path d="M6.651 9.478l4.72-5.172a.896.896 0 0 1 1.35 0c.372.408.372 1.07 0 1.478l-5.395 5.91a.896.896 0 0 1-1.35 0L3.28 8.739a1.117 1.117 0 0 1 0-1.478.896.896 0 0 1 1.35 0L6.65 9.478z" id="a"/></defs><use fill="#000" xlink:href="#a" fill-rule="evenodd"/></svg>
          
          <svg v-else width="16" height="16" class="icon-selected-branch" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>icn/branch</title><defs><path d="M4 11.268V4.732a2 2 0 1 1 2 0v3.583c.628-.388 1.37-.665 2.219-.831 1.025-.2 1.61-1.044 1.729-2.783A1.999 1.999 0 0 1 11 1a2 2 0 0 1 .946 3.763c-.174 2.627-1.279 4.28-3.344 4.684-1.315.257-2.151.819-2.602 1.706v.115a2 2 0 1 1-2 0zM5 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" id="aua"/></defs><use fill="#000" fill-rule="nonzero" xlink:href="#aua"/></svg>
        </li>
      </ul>
      <ul>
        <li class="px-4 pl-6" v-if="branchesList.origin.filtered.length > 0" v-for="(origin) in branchesList.origin.filtered" @click="selectBranch(origin)">
          <span class="title-branch" v-html="highlightFilter(origin[2])"></span>
          <span class="update-branch-date">Updated {{getTime(origin[0])}}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>icn/branch</title><defs><path d="M4 11.268V4.732a2 2 0 1 1 2 0v3.583c.628-.388 1.37-.665 2.219-.831 1.025-.2 1.61-1.044 1.729-2.783A1.999 1.999 0 0 1 11 1a2 2 0 0 1 .946 3.763c-.174 2.627-1.279 4.28-3.344 4.684-1.315.257-2.151.819-2.602 1.706v.115a2 2 0 1 1-2 0zM5 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" id="aua"/></defs><use fill="#000" fill-rule="nonzero" xlink:href="#aua"/></svg>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { GitProcess } from 'dugite'
import moment from 'moment'
export default{
  name: 'branch-list',
  data () {
    return {
      LastTime: null,
      filter: '',
      branchesList: {
        heads: {
          filtered: [],
          default: []
        },
        origin: {
          filtered: [],
          default: []
        }
      }
    }
  },
  methods: {
    listBranchs () {
      const delimiter = '1F'
      const delimiterString = String.fromCharCode(parseInt(delimiter, 16))
      const prefixes = ['refs/heads', 'refs/remotes']
      const prefix = [
        '%(committerdate:iso8601)',
        '%(refname)',
        '%(refname:short)',
        '%(upstream:short)',
        '%(objectname)', // SHA
        '%(author)',
        '%(committer)',
        '%(parent)', // parent SHAs
        '%(symref)',
        '%(subject)',
        '%(body)',
        '%(trailers:unfold,only)',
        `%${delimiter}` // indicate end-of-line as %(body) may contain newlines
      ].join('%00')
      GitProcess.exec(['for-each-ref', '--sort=-committerdate:iso8601', `--format=${prefix}`, ...prefixes], this.currentProject)
        .then((result) => {
          let list = result.stdout
          list = list.split(delimiterString)
          // Remove the trailing newline
          list.splice(-1, 1)
          let heads = []
          let origins = []
          for (let branch of list) {
            let lines = branch.split('\0').filter(String)
            // Create a local list
            if (lines[2] !== 'origin/HEAD') {
              if (lines[1].indexOf('head') > -1) {
                console.log([lines[0]])
                heads.push(lines)
              } else {
                origins.push(lines)
              }
            }
          }
          let checkHeads = heads.join('\t')
          origins = origins.filter(item => {
            let hashOrigin = item[6]
            let nameOrigin = item[2]
            let regexHash = new RegExp(hashOrigin, 'g')
            let regexName = new RegExp(nameOrigin, 'g')
            if (checkHeads.match(regexHash) === null && checkHeads.match(regexName) === null) {
              return item
            }
          })
          this.branchesList.heads.default = heads
          this.branchesList.heads.filtered = heads
          this.branchesList.origin.default = origins
          this.branchesList.origin.filtered = origins
        })
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
      let heads = this.branchesList.heads.default
      let origin = this.branchesList.origin.default
      let filterHeads = []
      let filterOrigin = []

      if (this.filter.length !== 0) {
        filterHeads = heads.filter(heads => {
          if (heads[2].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) return heads
        })

        filterOrigin = origin.filter(origin => {
          if (origin[2].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) return heads
        })

        this.branchesList.heads.filtered = filterHeads
        this.branchesList.origin.filtered = filterOrigin
      } else {
        this.branchesList.heads.filtered = heads
        this.branchesList.origin.filtered = origin
      }
    },
    selectBranch (b) {
      if (b[2] !== this.currentBranch[0]) {
        this.updateOperation('switch_branch')
        console.log([b[1], b[2], b[3]]);
        this.updateBranch([b[1], b[2], b[3]])
      }
      this.showListControl('null')
    },
    ...mapActions(['showListControl', 'updateBranch', 'updateOperation', 'showModal'])
  },
  computed: {
    ...mapGetters(['currentProject', 'currentBranch', 'controlStatus'])
  },
  mounted () {
    this.listBranchs()
    console.log(this.currentBranch)
    setTimeout(() => {
      this.$refs.inputFilterBranch.focus()
    }, 300)
  }
}
</script>
<style lang="scss">
  
  #branch-list{
    position: absolute;
    width: 350px;
    height: 400px;
    background-color: white;
    z-index: 12;
    border-radius: 8px;
    border-top-left-radius: 0;
    top: 52px;
    left: 0;
    
    *{
      font-size: 12px;
    }

    button {
      padding: 4px 15px;
      margin: 0;
    }

    #filter-branch {
      width: calc(100% - 113px);
      display: inline-block;
      margin-right: 10px;
    }

    #filter-branch-area {
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 10px;
    }

    #list-body{
      overflow-y: auto;
      max-height: calc(100% - 74px);

      .title-branch {
        font-size: 10pt;
        font-weight: bold;

        .highlight_filter {
          background-color: #6262d2;
          color: white;
          font-weight: bold;
        }
      }

      .update-branch-date {
        display: block;
        color: #707070;
      }

      li {
        padding: 4px;
        position: relative;

        svg {
          position: absolute;
          top: 50%;
          left: 24px;
          transform: translateY(-50%);
        }
        &:hover {
          background-color: #eee;
          cursor: pointer;
        }
      }
    }
  }
</style>