<template>
      <modal :title="titleModal">
      <div id="about_body">
        <div id="main" v-show="show == 'main'" class="position-relative p-4">
          <div id="logo_app">
          <!-- Created with Inkscape (http://www.inkscape.org/) --> <svg version="1.1" viewBox="0 0 135.47 135.47" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"> <metadata> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/> <dc:title/> </cc:Work> </rdf:RDF> </metadata> <g transform="translate(0 -161.53)"> <circle cx="67.733" cy="229.27" r="67.733" fill="#8c929d" stroke-width=".30454"/> <circle cx="67.733" cy="229.27" r="62.388" fill="#30353e" stroke-width=".28051"/> <g transform="matrix(.16987 0 0 .16987 8.9799 170.38)" fill="none" fill-rule="evenodd"> <g id="logo-extra-whitespace"> <g id="logo-no-bg" transform="translate(98,118)"> <g transform="matrix(1 0 0 -1 0 457.33)"> <g id="Group" transform="translate(.66666 .66666)"> <g transform="translate(.532 .77493)" fill="#fc6d26"> <path d="m492 194.67-27.559 84.815-54.617 168.1c-2.8093 8.648-15.045 8.648-17.856 0l-54.619-168.1h-181.37l-54.62 168.1c-2.8093 8.648-15.045 8.648-17.856 0l-54.617-168.1-27.557-84.815c-2.5147-7.736 0.24-16.211 6.82-20.992l238.51-173.29 238.51 173.29c6.58 4.7813 9.3333 13.256 6.82 20.992"/> </g> <g transform="translate(156.2 1.1603)" fill="#e24329"> <path d="m91 0 90.684 279.1h-181.37z"/> </g> <g transform="translate(28.531 1.1608)" fill="#fc6d26"> <path d="m218.67 0-90.684 279.09h-127.09z"/> </g> <g transform="translate(.088533 .25587)" fill="#fca326"> <path d="m29.333 280-27.559-84.815c-2.5133-7.736 0.24-16.211 6.8213-20.991l238.51-173.29z"/> </g> <g transform="translate(29.422 280.26)" fill="#e24329"> <path d="m0 0h127.09l-54.619 168.1c-2.8107 8.6493-15.047 8.6493-17.856 0z"/> </g> <g transform="translate(247.2 1.1608)" fill="#fc6d26"> <path d="m0 0 90.684 279.09h127.09z"/> </g> <g transform="translate(246.31 .25587)" fill="#fca326"> <path d="m218.67 280 27.559-84.815c2.5133-7.736-0.24-16.211-6.8213-20.991l-238.51-173.29z"/> </g> <g transform="translate(336.97 280.26)" fill="#e24329"> <path d="m128 0h-127.09l54.619 168.1c2.8107 8.6493 15.047 8.6493 17.856 0z"/> </g> </g> </g> </g> </g> </g> </g> </svg>
         </div>
          <span id="app_name">GitLab Discovery<br><small class="text-muted" id="developer" @click="openLink('https://www.nuinalp.com')">Designed by Nuinalp</small></span>

          <a class="info_links text-primary" @click="openLink('https://www.nuinalp.com/en-us/products/gitlab-discovery/releases-notes')">Version {{version}} (release notes)</a>
          <a class="info_links text-primary" @click="showLicence">Licence</a>

          <div class="d-block my-2 align-center text-center row">
            <button id="cancel-btn" class="button alternative d-inline-block">Check updates</button>
            <button id="cancel-btn" class="button primary d-inline-block" @click="openLink('https://www.patreon.com/nuinalp')">Donate</button>
          </div>
          </div>
          <div class="bottom p-4 text-right">
            <button id="cancel-btn" class="button alternative" @click="close">Close</button>
           </div>
        </div>
        
        <div id="license" v-show="show == 'license'" class="position-relative p-4">
         <span class="mb-4"><a @click="openLink('https://www.nuinalp.com/en-us/products/gitlab-discovery')">GitLab Discovery</a> is an open source project development by <a @click="openLink('https://www.nuinalp.com')">Nuinalp</a> and published under the BSD License. You can view the source code and contribute to this project on <a @click="openLink('https://www.gitlab.com/nuinalp/gitlab-discovery')">GitLab</a>.</span>
          <pre id="license_text">BSD 3-Clause License

          Copyright (c) 2018, Nuinalp and contributors
          All rights reserved.

          Redistribution and use in source and binary forms, with or without
          modification, are permitted provided that the following conditions are met:

          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.

          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation
            and/or other materials provided with the distribution.

          * Neither the name of the copyright holder nor the names of its
            contributors may be used to endorse or promote products derived from
            this software without specific prior written permission.

          THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
          AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
          IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
          DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
          FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
          DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
          SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
          CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
          OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
          OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.</pre>
          
          <span class="mt-4 mb-3">GitLab Discovery also distributes these libraries:</span>
          
          <div v-if="licenseContent.length == libsLicense.length" v-for="(lib, i) of libsLicense" class="py-3 libs-content">
            <a class="lib_name" @click="openLink(lib.link)">{{lib.name}}@{{lib.version}}</a>
            <pre class="license_text my-2">{{licenseContent[i]}}</pre>
          </div>
          
        </div>

      </modal>
</template>
<script>
import Modal from '../LandingPage/Modal'
import Tab from '../LandingPage/Tab'
import Tabs from '../LandingPage/Tabs'
import Electron from 'electron'
import bluebird from 'bluebird'
import fs from 'fs'
import { mapActions } from 'vuex'
export default {
  name: 'modal-about',
  data () {
    return {
      version: '1.0.0',
      show: 'main',
      titleModal: '',
      libsLicense: [
        {name: 'bluebird', link: 'https://github.com/petkaantonov/bluebird', licenseFile: 'bluebird.md', version: '3.5.1'},
        {name: 'dugite', link: 'https://github.com/desktop/dugite', licenseFile: 'dugite.md', version: '1.69.0'},
        {name: 'Electron', link: 'https://github.com/electron/electron', licenseFile: 'electron.md', version: '2.0.2'},
        {name: 'gitlab', link: 'https://github.com/jdalrymple/node-gitlab', licenseFile: 'node-gitlab.md', version: '3.7.0'},
        {name: 'moment.js', link: 'https://github.com/moment/moment/', licenseFile: 'momentjs.md', version: '2.22.2'},
        {name: 'Vue.js', link: 'https://github.com/vuejs/vue', licenseFile: 'vuejs.md', version: '2.5.16'},
        {name: 'Vuex', link: 'https://github.com/vuejs/vuex', licenseFile: 'vuex.md', version: '3.0.1'}
      ],
      licenseContent: []
    }
  },
  components: { Tab, Tabs, Modal },
  methods: {
    ...mapActions(['closeModal']),
    showLicence () {
      this.show = 'license'
      this.titleModal = 'License and legal Notices'
    },
    openLink (url) {
      Electron.shell.openExternal(url)
    },
    getLicenseFile (file) {
      // List for name license files
      let filesRead = []
      // Function get and read content files for show in modal License
      let getContent = (licenseFile) => {
        return function () {
          return new Promise(function (resolve, reject) {
            fs.readFile('src/assets/license-libs/' + licenseFile, 'utf8', (err, data) => {
              if (err) return reject(err)
              resolve(data)
            })
          })
        }
      }
      // Add all license name files on array
      for (let libs of this.libsLicense) {
        filesRead.push(libs.licenseFile)
      }
      // Resolve promisses in sequence for corret show
      bluebird.resolve(filesRead.map((n) => getContent(n)))
        .mapSeries(function (asyncFunc) {
          return asyncFunc()
        }).then((results) => {
          // Update license content
          this.licenseContent = results
        })
    },
    close () {
      if (this.show === 'license') {
        this.show = 'main'
      } else {
        this.closeModal()
      }
    }
  },
  mounted () {
    this.getLicenseFile()
  }
}
</script>
<style lang="scss">
  #app_name {
    font-size: 12pt;
    color: rgb(60,60,60);
    font-weight: bold;
    display: block;
    padding: 10px;
    text-align: center;
    
  }
  
  span, a, label, div, pre {
      font-size: 10pt;
    }

  #developer {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  
  .lib_name {
    font-size: 12pt;
    cursor: pointer;
  }
  
  #license{
    overflow-y: auto;
    max-height: 400px;
  }
  
  #license_text, .license_text {
    font-size: 10pt;
    text-align: left;
    white-space: pre-line;  
  }
  
  .info_links{
    display: block;
    font-size: 10pt;
    text-align: center;
    cursor: pointer;
  }
  
  .libs-content {
    &:not(:last-child) {
      border-top: 1px solid #e6e6e6;
    }
  }
  
  #logo_app {
  
    display: block;
    text-align: center;
    overflow: hidden;

    svg {
      width: 80px;
      height: 80px;
      display: inline-block;
    }
  }
</style>