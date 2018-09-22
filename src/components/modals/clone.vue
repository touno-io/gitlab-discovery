<template>
  <modal title="Clone a repository">
    <tabs>
      <tab
        id="gitlab_com"
        name="GitLab.com"
        selected="true"
        type="modal">
        <div
          id="main-list-repositories"
          class="pt-4">
          <div class="mb-3">
            <input
              id="filter_path"
              v-model="filter_projects"
              type="text"
              placeholder="Filter"
              @keyup="ListFilter">
            <div
              v-show="filteredUserRepoList.length <= 0"
              id="load-list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="430"
                height="200"
                viewBox="0 0 430 200">
                <g
                  fill="none"
                  fill-rule="evenodd">
                  <g transform="translate(138 65)">
                    <!-- eslint-disable max-len -->
                    <path
                      fill="#E5E5E5"
                      fill-rule="nonzero"
                      d="M35 70c-1.1045695 0-2-.8954305-2-2s.8954305-2 2-2c2.5416617 0 5.0415896-.3054667 7.4626379-.9036641 1.072322-.2649515 2.1563964.3895517 2.4213478 1.4618737.2649515 1.072322-.3895517 2.1563964-1.4618737 2.4213478C40.6877484 69.6551694 37.8656677 70 35 70zm18.2108107-5.1051878c-.9428105.5754843-2.1736316.2777076-2.7491158-.6651029-.5754843-.9428105-.2777076-2.1736316.6651029-2.7491159 2.1457336-1.3097393 4.1262715-2.8769136 5.8963238-4.6635758.7773926-.7846876 2.0437087-.7906013 2.8283963-.0132087.7846875.7773925.7906013 2.0437087.0132087 2.8283962-1.9971234 2.0158642-4.2319715 3.7842709-6.6539159 5.2626071zm12.894669-13.8345984c-.5075117.9810737-1.7142486 1.3649716-2.6953223.8574599-.9810738-.5075116-1.3649717-1.7142485-.85746-2.6953223 1.1524495-2.2278066 2.0307482-4.5902283 2.6121496-7.0427389.2547916-1.0747814 1.3326236-1.7395143 2.4074049-1.4847227 1.0747814.2547917 1.7395144 1.3326236 1.4847227 2.407405-.6570023 2.7714163-1.6495243 5.4410722-2.9514949 7.957919zm3.8152758-18.4330709c.0738452 1.1020984-.7597187 2.0553889-1.861817 2.129234-1.1020983.0738452-2.0553888-.7597187-2.129234-1.861817-.1693795-2.5278964-.6435332-5.0010563-1.4071583-7.3798248-.337616-1.0517078.2412697-2.1779772 1.2929774-2.5155933 1.0517078-.337616 2.1779772.2412697 2.5155933 1.2929774.8628058 2.6877264 1.3984479 5.4816064 1.5896386 8.3350237zm-6.3458747-17.8425766c.6386612.9012134.4258206 2.1495285-.4753928 2.7881897s-2.1495285.4258206-2.7881897-.4753928c-1.4534937-2.0510217-3.151875-3.9203523-5.0544833-5.5642568-.8358021-.7221555-.927931-1.98512972-.2057755-2.82093188.7221554-.83580217 1.9851296-.92793102 2.8209318-.20577555 2.1465986 1.85471863 4.0627401 3.96372803 5.7029095 6.27816733zM48.895123 2.86724309c1.0136332.43888654 1.4795575 1.61638648 1.040671 2.63001975-.4388866 1.01363326-1.6163865 1.47955754-2.6300198 1.04067101-2.298686-.99529323-4.7151226-1.70874893-7.2064988-2.12085824-1.0897612-.1802621-1.8270558-1.20981937-1.6467937-2.29958051.1802621-1.08976115 1.2098193-1.8270558 2.2995805-1.6467937 2.8147466.46559941 5.5456225 1.27189366 8.1430608 2.39654169zM30.2629041.31809463c1.0945847-.14818237 2.1020465.61902833 2.2502289 1.71361308.1481824 1.09458474-.6190283 2.10204655-1.7136131 2.25022893-2.5042991.33902628-4.9399478.98069322-7.2650281 1.90682514-1.0261596.40874247-2.1893775-.09177294-2.5981199-1.11793246-.4087425-1.02615953.0917729-2.18937743 1.1179324-2.5981199C24.6816464 1.42617981 27.4340968.70105208 30.2629041.31809463zM12.9072403 7.85257394c.8563336-.69768662 2.1161158-.56907788 2.8138025.28725567.6976866.85633356.5690779 2.11611579-.2872557 2.81380249-1.9491691 1.5880602-3.7007916 3.407617-5.2131804 5.4157591-.66450694.8823289-1.91846516 1.0589085-2.80079407.3944016-.88232892-.6645069-1.05890852-1.9184651-.39440158-2.8007941 1.7064955-2.265876 3.68264565-4.31866846 5.88182925-6.11042476zM1.98895813 23.3423527c.3678123-1.0415315 1.51031119-1.5876888 2.5518427-1.2198765 1.04153152.3678123 1.58768886 1.5103112 1.21987657 2.5518427-.83269601 2.3579395-1.37771587 4.8170524-1.61857328 7.3366732-.10510965 1.0995571-1.08168498 1.905716-2.18124205 1.8006063-1.09955706-.1051096-1.90571597-1.081685-1.80060632-2.181242.27196841-2.8450745.88778166-5.623605 1.82870238-8.2880037zM.71823598 42.0866504c-.22255081-1.0819173.47410332-2.1393976 1.55602057-2.3619484 1.08191724-.2225508 2.13939753.4741034 2.36194834 1.5560206.50821321 2.4706476 1.31544697 4.8578651 2.40038264 7.1178137.47803895.9957673.05833719 2.1905234-.93743012 2.6685623-.99576731.478039-2.19052335.0583372-2.6685623-.9374301-1.22582596-2.5534267-2.13809242-5.2512554-2.71235913-8.0430181zM9.39373515 58.860598c-.75318331-.8079534-.70878339-2.0735047.09917-2.8266881.80795335-.7531833 2.07350475-.7087833 2.82668805.09917 1.7148234 1.8395222 3.646918 3.4662544 5.7516125 4.8409871.9247756.6040398 1.1847833 1.8433894.5807435 2.7681649-.6040397.9247755-1.8433894 1.1847833-2.7681649.5807435-2.3753193-1.5514979-4.5553066-3.386944-6.49004915-5.4623774zm16.24506865 9.8729643c-1.0645037-.2947976-1.6884738-1.396729-1.3936762-2.4612327.2947977-1.0645037 1.3967291-1.6884738 2.4612328-1.3936762 2.405326.6661174 4.8957908 1.0405837 7.4331922 1.1096504 1.1041606.0300546 1.9748954.9495177 1.9448408 2.0536782-.0300546 1.1041606-.9495177 1.9748955-2.0536783 1.9448408-2.8623618-.0779119-5.67473-.5007797-8.3919113-1.2532605z"/>
                    <circle
                      cx="35"
                      cy="35"
                      r="16"
                      stroke="#E1DBF1"
                      stroke-width="4"/>
                    <path
                      fill="#6B4FBB"
                      d="M37 33h5c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2h-7c-1.1045695 0-2-.8954305-2-2v-8c0-1.1045695.8954305-2 2-2s2 .8954305 2 2v6z"/>
                  </g>
                  <g transform="translate(247 30)">
                    <rect
                      width="116"
                      height="135"
                      y="5"
                      fill="#F9F9F9"
                      rx="10"/>
                    <rect
                      width="116"
                      height="134"
                      x="5"
                      fill="#FFF"
                      stroke="#EEE"
                      stroke-width="4"
                      stroke-linecap="round"
                      rx="10"/>
                    <g transform="translate(23 23)">
                      <rect
                        width="16"
                        height="4"
                        fill="#E1DBF1"
                        rx="2"/>
                      <rect
                        width="16"
                        height="4"
                        x="32"
                        y="12"
                        fill="#E1DBF1"
                        rx="2"/>
                      <rect
                        width="16"
                        height="4"
                        x="44"
                        fill="#EEE"
                        rx="2"/>
                      <rect
                        width="16"
                        height="4"
                        x="12"
                        y="24"
                        fill="#E1DBF1"
                        rx="2"/>
                      <rect
                        width="16"
                        height="4"
                        x="64"
                        y="36"
                        fill="#FEF0E8"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        x="20"
                        fill="#FEE1D3"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        x="32"
                        y="36"
                        fill="#FC6D26"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        x="52"
                        y="12"
                        fill="#FEF0E8"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        x="64"
                        fill="#FEF0E8"
                        rx="2"/>
                      <rect
                        width="12"
                        height="4"
                        x="16"
                        y="48"
                        fill="#E1DBF1"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        x="44"
                        y="36"
                        fill="#FC6D26"
                        rx="2"/>
                      <rect
                        width="4"
                        height="4"
                        x="56"
                        y="36"
                        fill="#E1DBF1"
                        rx="2"/>
                      <rect
                        width="4"
                        height="4"
                        x="64"
                        y="60"
                        fill="#E1DBF1"
                        rx="2"/>
                      <rect
                        width="4"
                        height="4"
                        x="72"
                        y="60"
                        fill="#FC6D26"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        x="32"
                        fill="#FC6D26"
                        rx="2"/>
                      <rect
                        width="28"
                        height="4"
                        y="36"
                        fill="#EEE"
                        rx="2"/>
                      <rect
                        width="28"
                        height="4"
                        x="44"
                        y="48"
                        fill="#EEE"
                        rx="2"/>
                      <rect
                        width="28"
                        height="4"
                        x="32"
                        y="60"
                        fill="#EFEDF8"
                        rx="2"/>
                      <rect
                        width="28"
                        height="4"
                        y="12"
                        fill="#6B4FBB"
                        rx="2"/>
                      <rect
                        width="28"
                        height="4"
                        x="32"
                        y="24"
                        fill="#C3B8E3"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        y="24"
                        fill="#FEF0E8"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        x="32"
                        y="48"
                        fill="#6B4FBB"
                        rx="2"/>
                      <rect
                        width="12"
                        height="4"
                        y="48"
                        fill="#FC6D26"
                        rx="2"/>
                      <rect
                        width="12"
                        height="4"
                        y="60"
                        fill="#FEF0E8"
                        rx="2"/>
                      <rect
                        width="12"
                        height="4"
                        x="16"
                        y="60"
                        fill="#FEF0E8"
                        rx="2"/>
                    </g>
                    <g transform="translate(23 95)">
                      <rect
                        width="16"
                        height="4"
                        fill="#EFEDF8"
                        rx="2"/>
                      <rect
                        width="16"
                        height="4"
                        x="18"
                        y="12"
                        fill="#FC6D26"
                        rx="2"/>
                      <rect
                        width="16"
                        height="4"
                        x="44"
                        fill="#6B4FBB"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        x="20"
                        fill="#FEE1D3"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        x="38"
                        y="12"
                        fill="#FEF0E8"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        x="64"
                        fill="#FEF0E8"
                        rx="2"/>
                      <rect
                        width="8"
                        height="4"
                        x="32"
                        fill="#FC6D26"
                        rx="2"/>
                      <rect
                        width="14"
                        height="4"
                        y="12"
                        fill="#EEE"
                        rx="2"/>
                    </g>
                  </g>
                  <path
                    fill="#FC6D26"
                    fill-rule="nonzero"
                    d="M81 119c-10.493 0-19-8.507-19-19s8.507-19 19-19 19 8.507 19 19-8.507 19-19 19zm0-4c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15zm-5-20c1.1045695 0 2 .8954305 2 2v6c0 1.1045695-.8954305 2-2 2s-2-.8954305-2-2v-6c0-1.1045695.8954305-2 2-2zm10 0c1.1045695 0 2 .8954305 2 2v6c0 1.1045695-.8954305 2-2 2s-2-.8954305-2-2v-6c0-1.1045695.8954305-2 2-2z"/>
                  <path
                    fill="#E5E5E5"
                    fill-rule="nonzero"
                    d="M108.0000091 102c0-1.105.887-2 1.998-2h4.004c1.103 0 1.998.888 1.998 2 0 1.105-.887 2-1.998 2h-4.004c-.5305757.0010668-1.0396985-.2093685-1.4146852-.5847306-.3749867-.375362-.5849124-.884695-.5833148-1.4152694zm14 0c0-1.105.887-2 1.998-2h4.004c1.103 0 1.998.888 1.998 2 0 1.105-.887 2-1.998 2h-4.004c-.5305757.0010668-1.0396985-.2093685-1.4146852-.5847306-.3749867-.375362-.5849124-.884695-.5833148-1.4152694zm92.9999999 0c0-1.105.887-2 1.998-2h4.004c1.103 0 1.998.888 1.998 2 0 1.105-.887 2-1.998 2h-4.004c-.530576.0010668-1.039698-.2093685-1.414685-.5847306-.374987-.375362-.584913-.884695-.583315-1.4152694zm14 0c0-1.105.887-2 1.998-2h4.004c1.103 0 1.998.888 1.998 2 0 1.105-.887 2-1.998 2h-4.004c-.530576.0010668-1.039698-.2093685-1.414685-.5847306-.374987-.375362-.584913-.884695-.583315-1.4152694z"/>
                </g>
              </svg>
              <span>Loading your repositories list</span>
              <div class="progress mx-10">
                <div
                  id="progressbar-clone"
                  class="progress-bar loading progressbar-primary"
                  role="progressbar"/>
              </div>
            </div>
            <div class="repositories-list">
              <strong
                v-if="filteredUserRepoList.length > 0"
                class="d-block py-2 px-4"><span>Your repositories</span></strong>
              <ul
                v-show="filteredUserRepoList.length > 0"
                id="user-repositories"
                class="repositories-list-obj">
                <li
                  v-for="(item) in filteredUserRepoList"
                  :key="item.id"
                  :class="{selected:item.id == selected.id}"
                  class="px-4"
                  @click="selectRepo(item)">
                  <img
                    v-if="item.avatar_url != null"
                    :src="item.avatar_url + '?private_token=' + config.token"
                    class="avatar-project d-inline-block" >
                  <span
                    v-else
                    class="custom-avatar-project d-inline-block">{{ item.name.charAt(0).toUpperCase() }}</span>
                  <span
                    class="d-inline-block width-auto"
                    v-html="highlightFilter(item.path_with_namespace)"/>
                  <svg
                    v-if="item.visibility == 'private'"
                    version="1.1"
                    class="repo-icon-visibility-type"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                    <g transform="translate(0 -161.53)">
                      <path
                        transform="translate(0 161.53)"
                        d="m253.55 45.248c-83.714 0-142.43 72.467-142.43 169.26 0 2.1996 0.0441 4.3864 0.10937 6.5664h-10.211c-13.431 0-24.244 10.813-24.244 24.244v191.93c0 13.431 10.813 24.244 24.244 24.244h307.09c13.431 0 24.244-10.813 24.244-24.244v-191.93c0-13.431-10.813-24.244-24.244-24.244h-12.23c0.0653-2.18 0.10938-4.3668 0.10938-6.5664 0-96.794-58.718-169.26-142.43-169.26zm-0.50586 41.479a90.409 115.16 0 0 1 90.408 115.16 90.409 115.16 0 0 1-1.3652 19.193h-178.17a90.409 115.16 0 0 1-1.2793-19.193 90.409 115.16 0 0 1 90.408-115.16z"
                        fill="#1a1a1a"
                        stroke-width="0"
                        style="paint-order:fill markers stroke"/>
                    </g>
                  </svg>

                  <svg
                    v-else-if="item.visibility == 'internal'"
                    class="repo-icon-visibility-type"
                    version="1.1"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                    <metadata>
                      <rdf:RDF>
                        <cc:Work rdf:about="">
                          <dc:format>image/svg+xml</dc:format>
                          <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                          <dc:title/>
                        </cc:Work>
                      </rdf:RDF>
                    </metadata>
                    <g transform="translate(0 -161.53)">
                      <path
                        d="m57.848 193.52v217.15c11.617 210.38 182.16 250.82 192.15 250.88 7.0462 0.0446 182.64-41.028 192.15-250.88v-217.15h-192.15zm192.15 48.572h152.27v172.08c-7.537 166.3-146.69 198.84-152.27 198.81z"
                        fill="#1a1a1a"
                        stroke-width="0"
                        style="paint-order:fill markers stroke"/>
                    </g>
                  </svg>

                  <svg
                    v-else
                    version="1.1"
                    viewBox="0 0 512 512"
                    class="repo-icon-visibility-type"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                    <metadata>
                      <rdf:RDF>
                        <cc:Work rdf:about="">
                          <dc:format>image/svg+xml</dc:format>
                          <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                          <dc:title/>
                        </cc:Work>
                      </rdf:RDF>
                    </metadata>
                    <g transform="translate(0 -161.53)">
                      <path
                        transform="translate(0 161.53)"
                        d="m256 0a256 256 0 0 0-256 256 256 256 0 0 0 256 256 256 256 0 0 0 256-256 256 256 0 0 0-256-256zm0 32.857a223.14 223.14 0 0 1 129.11 41.342c-5.283 1.7084-25.312 13.067-28.732 12.582-3.8972-0.55256-7.117-12.388-11.158-15.207-0.25257-0.17619-0.62993-0.2418-1.1172-0.20898-7.3089 0.49227-39.256 23.101-42.949 25.967-3.9399 3.0563 5.3305 22.323 2.1465 26.012-3.184 3.6887-41.278 16.807-47.25 22.859-5.972 6.0528-9.4484 16.74-7.0469 20.83 2.2321 3.8019 22.78-8.1005 28.02-10.158 5.2394-2.0578 49.82 11.875 66.684 29.604 16.864 17.729 49.342 64.608 69.953 61.871 20.611-2.737 7.6859-24.35 14.141-26.768 6.1433-2.3006 40.697 36.718 51.133 38.639a223.14 223.14 0 0 1-166 211.41c-4.149-10.591-28.33-19.912-61.221-19.729-1.1678 7e-3 -2.3479 0.0258-3.5371 0.0566-21.649 0.56137-55.879 7.335-72.322 12.035a223.14 223.14 0 0 1-117.63-104.87c1.0194-3.225 2.7681-7.9442 5.5625-12.918 6.1804-11.001 16.852-21.512 17.492-30.633 0.9018-12.849 2.0756-20.774-0.31055-23.641-2.3862-2.8671-14.923-15.939-18.344-19.721-3.4633-3.8285-22.664-48.179-21.861-74.104a223.14 223.14 0 0 1 38.113-77.379l7.1914 0.55274s13.174-4.6119 21.428-5.3574c8.2533-0.74555 20.269 5.7057 27.576 1.791s8.488-14.392 9.3789-19.33c0.89089-4.9378 23.581-18.735 35.527-23.723 15.357-6.4286 42.288-19.373 44.303-18.023s-6.9607 8.0655-19.824 16.73c-15.631 10.529-34.23 24.195-29.639 31.662 4.5915 7.467 40.196-7.7827 71.238-18.424 19-6.5132 34.277-13.732 38.475-15.178 4.198-1.4455 0.95873-11.443-3.4629-13.719s-10.937-0.25324-15-3.2148-3.3396-16.053-3.9297-17.5c-0.59003-1.4469-6.1426-4.1426-6.1426-4.1426zm2.3086 145.69c-9.8036-6e-3 -33.014 5.7585-45.166 16.773 0 0-26.673 25.869-22.396 40.947 7.487 26.401 55.053 33.995 71.363 39.779 16.31 5.784 8.6488 114.94 34.391 115.24s76.414-82.342 78.506-84.379c2.0917-2.0368 26.499-15.103 28.109-17.711 1.6102-2.6083 2.6926-15.497 2.6055-19.604-0.0871-4.1061-19.657-8.3912-29.877-17.855-10.22-9.4642-18.745-37.471-25.826-39.754s-53.465-15.224-55.6-16.182-0.83427-7.8816-2.4844-9.5566-23.415-6.7947-31.85-7.625c-0.52715-0.0519-1.1218-0.0777-1.7754-0.0781z"
                        fill="#1a1a1a"
                        stroke-width="0"
                        style="paint-order:fill markers stroke"/>
                    </g>
                  </svg>
                </li>
              </ul>
              <!-- Groups list repositories -->
              <div
                v-for="(groups) in filteredGroupsRepoList"
                :key="groups.full_name"
                class="repositories-list">
                <strong
                  v-if="groups.projects.length > 0"
                  class="d-block py-2 px-4"><span>{{ groups.full_name }}</span></strong>
                <ul
                  id="user-repositories"
                  class="repositories-list-obj">
                  <li
                    v-for="(projects) in groups.projects"
                    :key="projects.id"
                    :class="{selected:projects.id == selected.id}"
                    class="px-4"
                    @click="selectRepo(projects)">
                    <img
                      v-if="projects.avatar_url != null"
                      :src="projects.avatar_url + '?private_token=' + config.token"
                      class="avatar-project d-inline-block" >
                    <span
                      v-else
                      class="custom-avatar-project d-inline-block">{{ projects.name.charAt(0).toUpperCase() }}</span>
                    <span
                      class="width-auto d-inline-block"
                      v-html="highlightFilter(projects.path_with_namespace)"/>
                    <svg
                      v-if="projects.visibility == 'private'"
                      version="1.1"
                      class="repo-icon-visibility-type"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:cc="http://creativecommons.org/ns#"
                      xmlns:dc="http://purl.org/dc/elements/1.1/"
                      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                      <metadata>
                        <rdf:RDF>
                          <cc:Work rdf:about="">
                            <dc:format>image/svg+xml</dc:format>
                            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                            <dc:title/>
                          </cc:Work>
                        </rdf:RDF>
                      </metadata>
                      <g transform="translate(0 -161.53)">
                        <path
                          transform="translate(0 161.53)"
                          d="m253.55 45.248c-83.714 0-142.43 72.467-142.43 169.26 0 2.1996 0.0441 4.3864 0.10937 6.5664h-10.211c-13.431 0-24.244 10.813-24.244 24.244v191.93c0 13.431 10.813 24.244 24.244 24.244h307.09c13.431 0 24.244-10.813 24.244-24.244v-191.93c0-13.431-10.813-24.244-24.244-24.244h-12.23c0.0653-2.18 0.10938-4.3668 0.10938-6.5664 0-96.794-58.718-169.26-142.43-169.26zm-0.50586 41.479a90.409 115.16 0 0 1 90.408 115.16 90.409 115.16 0 0 1-1.3652 19.193h-178.17a90.409 115.16 0 0 1-1.2793-19.193 90.409 115.16 0 0 1 90.408-115.16z"
                          fill="#1a1a1a"
                          stroke-width="0"
                          style="paint-order:fill markers stroke"/>
                      </g>
                    </svg>

                    <svg
                      v-else-if="projects.visibility == 'internal'"
                      class="repo-icon-visibility-type"
                      version="1.1"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:cc="http://creativecommons.org/ns#"
                      xmlns:dc="http://purl.org/dc/elements/1.1/"
                      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                      <metadata>
                        <rdf:RDF>
                          <cc:Work rdf:about="">
                            <dc:format>image/svg+xml</dc:format>
                            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                            <dc:title/>
                          </cc:Work>
                        </rdf:RDF>
                      </metadata>
                      <g transform="translate(0 -161.53)">
                        <path
                          d="m57.848 193.52v217.15c11.617 210.38 182.16 250.82 192.15 250.88 7.0462 0.0446 182.64-41.028 192.15-250.88v-217.15h-192.15zm192.15 48.572h152.27v172.08c-7.537 166.3-146.69 198.84-152.27 198.81z"
                          fill="#1a1a1a"
                          stroke-width="0"
                          style="paint-order:fill markers stroke"/>
                      </g>
                    </svg>

                    <svg
                      v-else
                      version="1.1"
                      viewBox="0 0 512 512"
                      class="repo-icon-visibility-type"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:cc="http://creativecommons.org/ns#"
                      xmlns:dc="http://purl.org/dc/elements/1.1/"
                      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                      <metadata>
                        <rdf:RDF>
                          <cc:Work rdf:about="">
                            <dc:format>image/svg+xml</dc:format>
                            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                            <dc:title/>
                          </cc:Work>
                        </rdf:RDF>
                      </metadata>
                      <g transform="translate(0 -161.53)">
                        <path
                          transform="translate(0 161.53)"
                          d="m256 0a256 256 0 0 0-256 256 256 256 0 0 0 256 256 256 256 0 0 0 256-256 256 256 0 0 0-256-256zm0 32.857a223.14 223.14 0 0 1 129.11 41.342c-5.283 1.7084-25.312 13.067-28.732 12.582-3.8972-0.55256-7.117-12.388-11.158-15.207-0.25257-0.17619-0.62993-0.2418-1.1172-0.20898-7.3089 0.49227-39.256 23.101-42.949 25.967-3.9399 3.0563 5.3305 22.323 2.1465 26.012-3.184 3.6887-41.278 16.807-47.25 22.859-5.972 6.0528-9.4484 16.74-7.0469 20.83 2.2321 3.8019 22.78-8.1005 28.02-10.158 5.2394-2.0578 49.82 11.875 66.684 29.604 16.864 17.729 49.342 64.608 69.953 61.871 20.611-2.737 7.6859-24.35 14.141-26.768 6.1433-2.3006 40.697 36.718 51.133 38.639a223.14 223.14 0 0 1-166 211.41c-4.149-10.591-28.33-19.912-61.221-19.729-1.1678 7e-3 -2.3479 0.0258-3.5371 0.0566-21.649 0.56137-55.879 7.335-72.322 12.035a223.14 223.14 0 0 1-117.63-104.87c1.0194-3.225 2.7681-7.9442 5.5625-12.918 6.1804-11.001 16.852-21.512 17.492-30.633 0.9018-12.849 2.0756-20.774-0.31055-23.641-2.3862-2.8671-14.923-15.939-18.344-19.721-3.4633-3.8285-22.664-48.179-21.861-74.104a223.14 223.14 0 0 1 38.113-77.379l7.1914 0.55274s13.174-4.6119 21.428-5.3574c8.2533-0.74555 20.269 5.7057 27.576 1.791s8.488-14.392 9.3789-19.33c0.89089-4.9378 23.581-18.735 35.527-23.723 15.357-6.4286 42.288-19.373 44.303-18.023s-6.9607 8.0655-19.824 16.73c-15.631 10.529-34.23 24.195-29.639 31.662 4.5915 7.467 40.196-7.7827 71.238-18.424 19-6.5132 34.277-13.732 38.475-15.178 4.198-1.4455 0.95873-11.443-3.4629-13.719s-10.937-0.25324-15-3.2148-3.3396-16.053-3.9297-17.5c-0.59003-1.4469-6.1426-4.1426-6.1426-4.1426zm2.3086 145.69c-9.8036-6e-3 -33.014 5.7585-45.166 16.773 0 0-26.673 25.869-22.396 40.947 7.487 26.401 55.053 33.995 71.363 39.779 16.31 5.784 8.6488 114.94 34.391 115.24s76.414-82.342 78.506-84.379c2.0917-2.0368 26.499-15.103 28.109-17.711 1.6102-2.6083 2.6926-15.497 2.6055-19.604-0.0871-4.1061-19.657-8.3912-29.877-17.855-10.22-9.4642-18.745-37.471-25.826-39.754s-53.465-15.224-55.6-16.182-0.83427-7.8816-2.4844-9.5566-23.415-6.7947-31.85-7.625c-0.52715-0.0519-1.1218-0.0777-1.7754-0.0781z"
                          fill="#1a1a1a"
                          stroke-width="0"
                          style="paint-order:fill markers stroke"/>
                      </g>
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mx-4 my-2">
          <span class="mb-1">Folder location</span>
          <input
            id="path-folder"
            :value="selected.localPath"
            type="text"
            placeholder="Folder location"><button
              id="change-folder-btn"
              class="button alternative"
              @click="openDialog()">Change</button>
        </div>
        <div class="bottom p-4 text-right">
          <button
            id="clone-btn"
            class="button primary"
            @click="cloneGit()">Clone</button>
          <button
            id="cancel-btn"
            class="button alternative"
            @click="close()">Cancel</button>
        </div>
      </tab>
      <tab
        id="url"
        name="URL"
        type="modal">
        <div class="p-4">
          <div class="mb-3">
            <span>GitLab repository URL or username and repository</span>
            <span class="mb-1">(<mark class="d-inline-block">nuinalp/safira</mark>)</span>
            <input
              id="url_path"
              v-model="selected.localPath"
              placeholder="GitLab repository URL or username and repository"
              type="text">
          </div>
          <div class="mb-3">
            <span class="mb-1">Folder location</span>
            <input
              id="path-folder"
              :value="selected.localPath"
              type="text"
              placeholder="Folder location"><button
                id="change-folder-btn"
                class="button alternative"
                @click="openDialog()">Change</button>
          </div>
        </div>
        <div class="bottom p-4 text-right">
          <button
            id="clone-btn"
            class="button primary"
            @click="cloneGit()">Clonar</button>
          <button
            id="cancel-btn"
            class="button alternative"
            @click="close()">Cancel</button>
        </div>
      </tab>
    </tabs>
  </modal>
</template>
<script>
import Gitlab from 'gitlab';
import { remote } from 'electron';
import bluebird from 'bluebird';
import { mapActions, mapGetters } from 'vuex';
import Tabs from '../LandingPage/Tabs';
import Modal from '../LandingPage/Modal';
import Tab from '../LandingPage/Tab';
import config from '../../config';

export default{
  name: 'ModalClone',
  components: { Tab, Tabs, Modal },
  data() {
    return {
      userRepoList: [],
      groupsRepoList: [],
      filteredUserRepoList: [],
      filteredGroupsRepoList: [],
      selected: {
        name: null,
        id: null,
        visibility: null,
        url_path: null,
        localPath: '',
      },
      config,
      filter_projects: '',
    };
  },
  computed: {
    ...mapGetters(['operation']),
  },
  mounted() {
    this.listRepoUser();
  },
  methods: {
    openDialog() {
      const current = 'C:/';
      remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
        defaultPath: current,
      }, names => {
        [this.selected.localPath] = names;
      });
    },
    cloneGit() {
      this.updateOperation('cloning');
      if (this.selected.id !== null && this.selected.name !== null) {
        this.defineClone(this.selected);
      } else {
        this.defineClone(this.selected);
      }
      this.close();
    },
    ...mapActions(['changeStateMenu', 'closeModal', 'updateOperation', 'defineClone']),
    listRepoUser() {
      return new Promise((resolve) => {
        const api = new Gitlab({
          token: config.token,
        });
        // List of groups for get projects
        const groupsID = [];
        // Function get and read projects from all groups user
        const getProjects = (id) => function () {
          return new Promise(((result) => {
            api.Groups.show(id)
              .then((groups) => {
                result(groups);
              });
          }));
        };
        // First step, get user projects...
        api.Users.projects(config.username)
          .then((uProjects) => {
            // Step two, Get all groups from current user using GitLab APIs and yors projects
            api.Groups.all()
              .then((groups) => {
                groups.forEach((group) => {
                  groupsID.push(group.id);
                });
                // Resolve promisses in sequence for corret show
                bluebird.resolve(groupsID.map((n) => getProjects(n)))
                  .mapSeries((asyncFunc) => asyncFunc()).then((gProjects) => {
                    // Update license content
                    this.userRepoList = uProjects;
                    this.filteredUserRepoList = uProjects;
                    this.groupsRepoList = gProjects;
                    this.filteredGroupsRepoList = gProjects;
                    resolve(uProjects);
                  });
              });
          });
      });
    },
    highlightFilter(a) {
      if (this.filter_projects.length > 0) {
        const filter = new RegExp(this.filter_projects, 'i');
        const word = a.match(filter);
        return a.replace(filter, `<span class="highlight_filter">${word}</span>`);
      }
      return a;
    },
    selectRepo(item) {
      this.selected.name = item.path_with_namespace;
      this.selected.id = item.id;
      this.selected.visibility = item.visibility;
      this.selected.url_path = item.http_url_to_repo;
    },
    ListFilter() {
      const pGroups = this.groupsRepoList;
      const pUsers = this.userRepoList;
      const filterGroups = [];

      if (this.filter_projects.length !== 0) {
        // eslint-disable-next-line
        const userProjects = pUsers.filter(item => item.name.toLowerCase().indexOf(this.filter_projects.toLowerCase()) > -1);
        pGroups.forEach((id) => {
          const p = pGroups[id].projects;
          // eslint-disable-next-line
          const projects = p.filter(item => item.name.toLowerCase().indexOf(this.filter_projects.toLowerCase()) > -1);
          filterGroups.push({ full_name: pGroups[id].full_name, projects });
        });

        this.filteredUserRepoList = userProjects;
        this.filteredGroupsRepoList = filterGroups;
      } else {
        this.filteredUserRepoList = this.userRepoList;
        this.filteredGroupsRepoList = this.groupsRepoList;
      }
    },
    close() {
      this.closeModal();
    },
  },
};
</script>
<style lang="scss">
  #main-list-repositories{
    #filter_path{
     margin: 0 24px;
      width: calc(100% - 48px);
    }
  }

  #load-list{
    padding: 20px 0px;
    text-align: center;

    .progress {
      height: 3px;
    }
  }

  ul{margin-bottom: 0;}
  .repositories-list{
    overflow-y: auto;
    max-height: 250px;
  }
  .repositories-list-obj{
    li{
      padding-bottom: 6px;
      padding-top: 6px;
      margin-bottom: 0;
      cursor: default;
      position: relative;
      &:hover{
        background-color: rgb(242,242,242);
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

      span{
        cursor: default;
      }

      .highlight_filter {
        display: inline-block;
        width: auto;
        background-color: #FCA326;
        color: white;
      }

      &.selected {
        background-color: #4b4ba3;
        color: white;
        > span{color: white;}
        svg path {fill: white !important;}

      .highlight_filter {
        color: #FCA326;
        background-color: white;
      }
      }
      .repo-icon-visibility-type{
        position: absolute;
        width: 14px;
        right: 24px;
        top: 0;
        margin: 11px 0;
      }
    }
  }
</style>
