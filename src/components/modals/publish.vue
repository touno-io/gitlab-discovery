<template>
  <modal title="Publish repository">
    <div id="publish_project_body">
      <div
        v-if="creating === true || updating === true"
        class="progress my-0">
        <div
          class="progress-bar loading progressbar-primary"/>
      </div>
      <span
        v-if="creating === 'error'"
        class="alert danger m-0 br-0">name {{ error }}</span>
      <div class="position-relative p-4">
        <span>Name</span>
        <input
          id="name_branch"
          v-model="name"
          type="text"
          class="my-2">
        <span>Description</span>
        <input
          id="description"
          v-model="desc"
          type="text"
          class="my-2">
        <div>
          <span>
            Visibility Level
            <!-- eslint-disable-next-line -->
            <svg @click="openExternal('https://gitlab.com/help/public_access/public_access')" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14z" /><path d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12z" fill="#fff" fill-rule="nonzero"/><path d="M8.16 7.184c.519-.37.904-.857 1.07-1.477.384-1.427-.619-2.897-2.246-2.897-.732 0-1.327.26-1.766.692a2.163 2.163 0 0 0-.509.743.75.75 0 0 0 1.4.54.78.78 0 0 1 .16-.213c.168-.165.39-.262.715-.262.597 0 .936.496.798 1.007-.067.249-.235.462-.492.644-.231.165-.47.264-.601.3a.75.75 0 0 0-.556.724v1.421a.75.75 0 0 0 1.5 0v-.909c.168-.082.346-.185.526-.313z" fill-rule="nonzero"/><ellipse cx="6.889" cy="10.634" rx="1" ry="1"/></svg>
          </span>
        </div>
        <div class="form-check">
          <input
            id="private_radio"
            v-model="visibility"
            type="radio"
            value="private"
            checked="true">
          <label for="private_radio">
            <span>
              <!-- eslint-disable-next-line -->
              <svg version="1.1" class="repo-icon-visibility-type" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -161.53)"><path transform="translate(0 161.53)" d="m253.55 45.248c-83.714 0-142.43 72.467-142.43 169.26 0 2.1996 0.0441 4.3864 0.10937 6.5664h-10.211c-13.431 0-24.244 10.813-24.244 24.244v191.93c0 13.431 10.813 24.244 24.244 24.244h307.09c13.431 0 24.244-10.813 24.244-24.244v-191.93c0-13.431-10.813-24.244-24.244-24.244h-12.23c0.0653-2.18 0.10938-4.3668 0.10938-6.5664 0-96.794-58.718-169.26-142.43-169.26zm-0.50586 41.479a90.409 115.16 0 0 1 90.408 115.16 90.409 115.16 0 0 1-1.3652 19.193h-178.17a90.409 115.16 0 0 1-1.2793-19.193 90.409 115.16 0 0 1 90.408-115.16z" fill="#1a1a1a" stroke-width="0" style="paint-order:fill markers stroke"/></g></svg>
              Private
            </span>
            <span>Project access must be granted explicitly to each user.</span>
          </label>
        </div>
        <div class="form-check">
          <input
            id="internal_radio"
            v-model="visibility"
            type="radio"
            value="internal">
          <label for="internal_radio">
            <span>
              <!-- eslint-disable-next-line -->
              <svg version="1.1" viewBox="0 0 512 512" class="repo-icon-visibility-type" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><metadata><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><g transform="translate(0 -161.53)"><path d="m57.848 193.52v217.15c11.617 210.38 182.16 250.82 192.15 250.88 7.0462 0.0446 182.64-41.028 192.15-250.88v-217.15h-192.15zm192.15 48.572h152.27v172.08c-7.537 166.3-146.69 198.84-152.27 198.81z" fill="#1a1a1a" stroke-width="0" style="paint-order:fill markers stroke"/></g></svg>
              Internal
            </span>
            <span>The project can be accessed by any logged in user.</span>
          </label>
        </div>
        <div class="form-check">
          <input
            id="public_radio"
            v-model="visibility"
            type="radio"
            value="public">
          <label for="public_radio">
            <span>
              <!-- eslint-disable-next-line -->
              <svg version="1.1" viewBox="0 0 512 512"  class="repo-icon-visibility-type"xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><metadata><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><g transform="translate(0 -161.53)"><path transform="translate(0 161.53)" d="m256 0a256 256 0 0 0-256 256 256 256 0 0 0 256 256 256 256 0 0 0 256-256 256 256 0 0 0-256-256zm0 32.857a223.14 223.14 0 0 1 129.11 41.342c-5.283 1.7084-25.312 13.067-28.732 12.582-3.8972-0.55256-7.117-12.388-11.158-15.207-0.25257-0.17619-0.62993-0.2418-1.1172-0.20898-7.3089 0.49227-39.256 23.101-42.949 25.967-3.9399 3.0563 5.3305 22.323 2.1465 26.012-3.184 3.6887-41.278 16.807-47.25 22.859-5.972 6.0528-9.4484 16.74-7.0469 20.83 2.2321 3.8019 22.78-8.1005 28.02-10.158 5.2394-2.0578 49.82 11.875 66.684 29.604 16.864 17.729 49.342 64.608 69.953 61.871 20.611-2.737 7.6859-24.35 14.141-26.768 6.1433-2.3006 40.697 36.718 51.133 38.639a223.14 223.14 0 0 1-166 211.41c-4.149-10.591-28.33-19.912-61.221-19.729-1.1678 7e-3 -2.3479 0.0258-3.5371 0.0566-21.649 0.56137-55.879 7.335-72.322 12.035a223.14 223.14 0 0 1-117.63-104.87c1.0194-3.225 2.7681-7.9442 5.5625-12.918 6.1804-11.001 16.852-21.512 17.492-30.633 0.9018-12.849 2.0756-20.774-0.31055-23.641-2.3862-2.8671-14.923-15.939-18.344-19.721-3.4633-3.8285-22.664-48.179-21.861-74.104a223.14 223.14 0 0 1 38.113-77.379l7.1914 0.55274s13.174-4.6119 21.428-5.3574c8.2533-0.74555 20.269 5.7057 27.576 1.791s8.488-14.392 9.3789-19.33c0.89089-4.9378 23.581-18.735 35.527-23.723 15.357-6.4286 42.288-19.373 44.303-18.023s-6.9607 8.0655-19.824 16.73c-15.631 10.529-34.23 24.195-29.639 31.662 4.5915 7.467 40.196-7.7827 71.238-18.424 19-6.5132 34.277-13.732 38.475-15.178 4.198-1.4455 0.95873-11.443-3.4629-13.719s-10.937-0.25324-15-3.2148-3.3396-16.053-3.9297-17.5c-0.59003-1.4469-6.1426-4.1426-6.1426-4.1426zm2.3086 145.69c-9.8036-6e-3 -33.014 5.7585-45.166 16.773 0 0-26.673 25.869-22.396 40.947 7.487 26.401 55.053 33.995 71.363 39.779 16.31 5.784 8.6488 114.94 34.391 115.24s76.414-82.342 78.506-84.379c2.0917-2.0368 26.499-15.103 28.109-17.711 1.6102-2.6083 2.6926-15.497 2.6055-19.604-0.0871-4.1061-19.657-8.3912-29.877-17.855-10.22-9.4642-18.745-37.471-25.826-39.754s-53.465-15.224-55.6-16.182-0.83427-7.8816-2.4844-9.5566-23.415-6.7947-31.85-7.625c-0.52715-0.0519-1.1218-0.0777-1.7754-0.0781z" fill="#1a1a1a" stroke-width="0" style="paint-order:fill markers stroke"/></g></svg>
              Public
            </span>
            <span>The project can be accessed without any authentication.</span>
          </label>
        </div>
        <span class="my-2">Group</span>
        <select
          v-if="updating === false"
          v-model="idGroup"
          class="width-100">
          <option value="none">None</option>
          <option
            v-for="group in groupsRepoList"
            :value="group.id"
            :key="group.id">{{ group.full_name }}</option>
        </select>
        <span v-else>Loading groups...</span>
      </div>
    </div>
    <div class="bottom p-4 text-right">
      <button
        id="cancel-btn"
        class="button alternative"
        @click="close">Cancel</button>
      <button
        id="cancel-btn"
        :class="{'disabled': updating === true || creating === true}"
        class="button primary"
        @click="prepare">Publish</button>
    </div>
  </modal>
</template>
<script>
import { GitProcess } from 'dugite';
import { mapActions, mapGetters } from 'vuex';
import bluebird from 'bluebird';
import Gitlab from 'gitlab';
import fs from 'fs';
import path from 'path';
import Modal from '../LandingPage/Modal';
import Utils from '../../utils';
import config from '../../config';
import EventBus from '../../events';

export default {
  name: 'PublishProject',
  components: { Modal },
  data() {
    return {
      name: '',
      desc: '',
      visibility: 'private',
      groupsRepoList: [],
      creating: null,
      updating: null,
      idGroup: 'none',
      error: '',
    };
  },
  computed: {
    ...mapGetters([
      'currentBranch',
      'defaultBranch',
      'currentProject',
      'currentProjectName',
    ]),
  },
  mounted() {
    // [this.oldName] = this.currentBranch;
    // this.listBranchs();
    this.name = this.currentProjectName;
    this.getDesc();
    this.getListGroups();
  },
  methods: {
    ...mapActions([
      'closeModal',
      'switchProject',
      'removeProject',
      'updateOperation',
      'updateOperation',
      'updateBranch',
      'updateOperation',
      'updateProjectStatus',
    ]),
    close() {
      this.closeModal();
    },
    getListGroups() {
      this.updating = true;
      const api = new Gitlab({
        token: config.token,
      });
      // List of groups for get projects
      const groupsID = [];
      // Function get and read projects from all groups user
      const getProjects = (id) => () => new Promise((resolve, reject) => {
        api.Groups.show(id)
          .then((groups) => resolve(groups))
          .catch((err) => reject(err));
      });
      // Get all groups from current user using GitLab APIs and yors projects
      api.Groups.all()
        .then((groups) => {
          groups.forEach(group => {
            groupsID.push(group.id);
          });
          // Resolve promisses in sequence for corret show
          bluebird.resolve(groupsID.map((n) => getProjects(n)))
            .mapSeries((asyncFunc) => asyncFunc())
            .then((gProjects) => {
              this.updating = false;
              this.groupsRepoList = gProjects;
            });
        });
    },
    prepare() {
      if (this.creating === false || this.updating === false) {
        this.creating = true;
        const api = new Gitlab({
          token: config.token,
        });
        api.Projects.create({
          name: this.name,
          visibility: this.visibility,
          description: this.desc,
          namespace_id: (this.idGroup === 'none') ? '' : this.idGroup,
        }).then((result) => {
          this.addOrigin(result);
        }).catch((err) => {
          const [message] = err.error.message.name;
          console.log(err);
          if (message === 'has already been taken') {
            this.creating = 'error';
            this.error = message;
          }
        });
      }
    },
    getDesc() {
      fs.readFile(path.join(this.currentProject, '/.git/description'), 'utf8', (err, data) => {
        if (err) return err;
        this.desc = data;
        return true;
      });
    },
    addOrigin(repoData) {
      const url = `https://gitlab.com:${config.token}@${repoData.http_url_to_repo.replace(/(http:\/\/|https:\/\/)/gm, '')}`;
      GitProcess.exec(['remote', 'add', 'origin', url], this.currentProject)
        .then(() => {
          // this.updateProjectStatus();
          // this.pushCurrentBranch();
          this.getRemote(url);
        });
    },
    pushCurrentBranch() {
      this.updateOperation('pushing');
      const [branchName] = this.currentBranch;
      const Git = GitProcess.spawn(['push', 'origin', branchName, '--set-upstream', '--progress'], this.currentProject);
      Git.stdout.on('close', () => {
        EventBus.$emit('globalUpdate');
        this.updateOperation(null);
        this.close();
      });
    },
    getRemote(url) {
      GitProcess.exec(['remote', '-v'], this.currentProject)
        .then((result) => {
          const regex = new RegExp(url);
          if (result.stdout.match(regex)) this.setHead();
        });
    },
    setHead() {
      GitProcess.exec(['remote', 'set-head', 'origin', 'master'], this.currentProject)
        .then(() => {
          this.updateProjectStatus();
          this.pushCurrentBranch();
        });
    },
    openExternal(url) {
      Utils().showExternal(url);
    },
  },
};
</script>

<style lang="scss">
  #publish_project_body {
    .progress {
      height: 2px;
      background-color: transparent;
    }
    .form-check{
      margin: 6px 0;
      .repo-icon-visibility-type{
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: top;
      }
      input {
        width: auto;
        display: inline-block;
        vertical-align: top;
        margin-right: 8px;
      }
    }
  }
    .bottom  {
      .disabled {
        opacity: 0.5 !important;
        transition: none;
    }
  }
</style>
