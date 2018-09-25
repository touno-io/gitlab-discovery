<template>
  <modal title="New repository">
    <div class="p-4 position-relative">
      <div
        v-if="createRepo === 'creating'"
        id="progress-window"
        class="px-6">
        <span class="text-center d-block mb-2 h2">Creating {{ name_repo }}</span>
        <div class="progress">
          <div
            id="progressbar-clone"
            class="progress-bar loading progressbar-primary"
            role="progressbar"/>
        </div>
      </div>
      <div
        :class="{creating:createRepo == 'creating'}"
        class="mb-3">
        <span class="mb-1">Name</span>
        <input
          id="name_repo"
          v-model="name_repo"
          type="text"
          class="mb-2"
          placeholder="Repository name">
        <span class="mb-1">Description</span>
        <input
          id="desc_repo"
          v-model="desc_repo"
          type="text"
          class="mb-2"
          placeholder="Repository description">
        <div class="mb-2">
          <span class="mb-1">Folder location</span>
          <input
            id="path-folder"
            :value="localPath"
            type="text"
            placeholder="Folder location"><button
              id="change-folder-btn"
              class="button alternative"
              @click="openDialog()">Escolher</button>
        </div>
        <div
          id="initialize-repo-readme"
          class="mb-2">
          <label><input
            v-model="initialize_repo_readme"
            type="checkbox"
            class="d-inline-block">
            <span class="mb-1">Initialize this repository with a README.md</span>
          </label>
        </div>
        <div class="mb-2">
          <span class="mb-1">Git ignore</span>
          <select
            id="git-ignore-list"
            v-model="gitIgnoreSelected">
            <option
              v-for="(name) in gitIgnore"
              :key="name"
              :value="name">{{ name }}</option>
          </select>
        </div>
        <div class="mb-2">
          <span class="mb-1">License</span>
          <select
            id="git-license-list"
            v-model="licenseSelected">
            <option
              v-for="(obj) in licensesList"
              v-if="obj.title !== 'separator'"
              :key="obj.title"
              :value="obj.title">{{ obj.title }}</option>
            <option
              v-else
              disabled>────────────────────</option>
          </select>
        </div>
      </div>
    </div>
    <div class="bottom p-4 text-right">
      <button
        id="clone-btn"
        class="button primary"
        @click="gitInit()">Create repository</button>
      <button
        id="cancel-btn"
        class="button alternative"
        @click="close()">Cancel</button>
    </div>
  </modal>
</template>
<script>
import { GitProcess } from 'dugite';
import fs from 'fs';
import { mapActions } from 'vuex';
import path from 'path';
import moment from 'moment';
import { remote } from 'electron';
import bluebird from 'bluebird';
import Modal from '../LandingPage/Modal';
import Tab from '../LandingPage/Tab';
import Tabs from '../LandingPage/Tabs';
import config from '../../config';
import gitIgnore from '../../git-ignore-list';
import licenses from '../../licenses-list';
import EventBus from '../../events';

export default{
  name: 'ModalCreate',
  components: { Tab, Tabs, Modal },
  data() {
    return {
      localPath: '',
      name_repo: '',
      desc_repo: '',
      gitIgnore: gitIgnore.list,
      licensesList: licenses.list,
      gitIgnoreSelected: 'None',
      licenseSelected: 'None',
      config,
      initialize_repo_readme: false,
      createRepo: '',
      date: {
        Year: moment().format('YYYY'),
      },
    };
  },
  computed: {
    // ...mapGetters(['createRepo'])
  },
  methods: {
    ...mapActions(['finishCreateRepo', 'someAsyncTask', 'closeModal']),
    openDialog() {
      const current = 'C:/';
      remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
        defaultPath: current,
      }, names => {
        [this.localPath] = names;
      });
    },
    gitInit() {
      // Step one, create a folder for project.
      this.createRepo = 'creating';
      const dirPath = path.join(this.localPath, this.name_repo);
      const descProject = this.desc_repo;
      const currentGitIgnore = this.gitIgnoreSelected;
      const Readme = this.initialize_repo_readme;
      // eslint-disable-next-line
      const License = this.licensesList.filter(item => item.title.toLowerCase().indexOf(this.licenseSelected.toLowerCase()) > -1);
      const Date = this.date;
      const infoUser = this.config;
      if (!fs.existsSync(dirPath)) {
        fs.mkdir(dirPath, (err) => {
          if (err) {
            console.log(err);
            return false;
          }
          // Step two, init with Git.
          GitProcess.exec(['init'], dirPath)
            .then((result) => {
              if (result.exitCode !== 0) {
                return false;
              }
              const dataFinish = [
                Date,
                License,
                infoUser,
                dirPath,
                Readme,
                descProject,
                currentGitIgnore,
              ];
              if (descProject !== '' && descProject.length > 0) {
                fs.writeFile(path.join(dirPath, '/.git/description'), descProject, (errDesc) => {
                  if (errDesc) {
                    return console.log(errDesc);
                  }
                  console.log('The file was saved!');
                  this.prepareFinish(dataFinish);
                  return false;
                });
              } else {
                this.prepareFinish(dataFinish);
              }
              return false;
            }); // End then
          return false;
        });
      }
    },
    prepareFinish(dataFinish) {
      const runFuncs = (func) => (func);
      const [
        Date,
        License,
        infoUser,
        dirPath,
        Readme,
        descProject,
        currentGitIgnore,
      ] = dataFinish;
      const nextSteps = [
        this.createLicense(Date, License, infoUser, dirPath),
        this.createReadme(Readme, descProject, dirPath),
        this.createGitIgnore(currentGitIgnore, dirPath),
      ];
      // Resolve promisses in sequence for corret show
      bluebird.resolve(nextSteps.map((n) => runFuncs(n)))
        .mapSeries((asyncFunc) => asyncFunc)
        .then((results) => {
          const [license, readme, gitignore] = results;
          if (license === 'create_license_ok' && readme === 'create_readme_ok' && gitignore === 'create_gitignore_ok') this.InitialCommit(dirPath);

          console.log('concluido, resultados');
          console.log(results);
        });
    },
    createReadme(Readme, descProject, dirPath) {
      return new Promise((resolve, reject) => {
        if (Readme === true) {
          fs.writeFile(path.join(dirPath, '/Readme.md'), `# ${descProject}`, (err) => {
            if (err) {
              reject(err);
            }
            resolve('create_readme_ok');
          });
        } else {
          resolve('create_readme_ok');
        }
      });
    },
    createGitIgnore(currentGitIgnore, dirPath) {
      return new Promise((resolve, reject) => {
        if (currentGitIgnore !== 'None') {
          const createGitIgnore = fs.createReadStream(path.resolve(`./src/assets/gitignore/${currentGitIgnore}.gitignore`)).pipe(fs.createWriteStream(path.join(dirPath, '/.gitignore')));
          createGitIgnore.on('error', (err) => reject(err));
          createGitIgnore.on('close', () => resolve('create_gitignore_ok'));
        } else {
          resolve('create_gitignore_ok');
        }
      });
    },
    createLicense(Date, License, infoUser, dirPath) {
      return new Promise((resolve, reject) => {
        if (License[0].title !== 'None') {
          fs.readFile(path.join(`./src/assets/license-templates/templates/${License[0].file}`), 'utf-8', (err, data) => {
            if (err) {
              console.log(`An error ocurred reading the file :${err.message}`);
              reject(err);
              return;
            }
            const newData = data.replace('{{ year }}', Date.Year).replace('{{ organization }}', infoUser.name_user_with_space);
            fs.writeFile(path.join(dirPath, '/LICENSE'), newData, (errLicense) => {
              if (errLicense) {
                console.log(err);
                reject(errLicense);
              }
              resolve('create_license_ok');
            });
          });
        } else {
          resolve('create_license_ok');
        }
      });
    },
    InitialCommit(dirPath) {
      GitProcess.exec(['add', '.'], dirPath)
        .then(() => {
          GitProcess.exec(['commit', '-m', 'Initial commit'], dirPath)
            .then((result) => {
              console.log(result);
              EventBus.$emit('finishCreateRepo', dirPath);
              this.close();
            });
        });
    },
    close() {
      this.closeModal();
    },
  },
};
</script>
<style lang="scss">
  *{
    font-size: 12px;
  }
  #git-ignore-list, #git-license-list{
    width: 100%;
  }
  .creating{
    opacity: 0;
    visibility: hidden;
  }
  #progress-window{
    position: absolute;
    width: 100%;
    transform: translateY(-50%);
    top:50%;
    left: 0;
  }
  #initialize-repo-readme{
    span, input{
      width: auto;
      display: inline-block;
      vertical-align: top;
      margin-left: 0;
    }
    label{
      margin-bottom: 0;
    }
  }
</style>
