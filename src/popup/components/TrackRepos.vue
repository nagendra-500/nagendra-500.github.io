<template>
  <div>
    <b-container fluid class="">
      <b-row>
        <!-- <b-col lg="12" class="">
          <div
            class="
              header-body
              topstrip
              d-flex
              align-items-center
              justify-content-between
              border-bottom-0
            "
          >
            <template>
              <date-picker
                v-model="range"
                type="date"
                singleDatePicker="true"
                placeholder="Select date range"
                :disabled-date="disabledBeforeTodayAndAfterAWeek"
                @change="onChangeDate($event)"
              ></date-picker>
            </template>
          </div>
        </b-col> -->
        <b-col lg="12" class="">
          <div v-if="githubRepos">
            <div>
              <b-card class="m-3">
                <b-table id="my-table" responsive :busy.sync="isBusy" :items="myProvider" :per-page="perPage" :fields="fields" :current-page="currentPage" small class="text-nowrap">
                  <template #cell(gravatar)="data">
                    <div>
                      <b-img :src="data.value" class="rounded-circle w-25"></b-img>
                    </div>
                  </template>
                  <template #cell(owner_name)="data">
                    <div>
                      <p class="mb-1 ellipsis" v-b-popover.hover.top="data.value.length > 26 ? data.value.length : ''">
                        {{ data.value }}
                      </p>
                    </div>
                  </template>
                  <template #cell(repo_name)="data">
                    <p class="mb-1 ellipsis" v-b-popover.hover.top="data.value.length > 26 ? data.value : ''">
                      {{ data.value }}
                    </p>
                  </template>
                  <template #cell(description)="data">
                    <p class="mb-1 ellipsis" style="cursor: pointer" v-b-popover.hover.top="data.value.length > 26 ? data.value : ''">
                      {{ data.value }}
                    </p>
                  </template>
                  <template #cell(stars_count)="data">
                    <div>
                      <p class="mb-1 ellipsis">
                        {{ data.value }}
                      </p>
                    </div>
                  </template>
                  <template #cell(repo_url)="data">
                    <p class="mb-1 ellipsis">
                      <b-link :id="'find' + data.value" @click="openLink(data.value)" v-b-popover.hover.top="data.value">
                        <p class="mb-0 mr-2 text-truncate w-315">
                          {{ data.value }}
                        </p>
                      </b-link>
                    </p>
                  </template>
                  <template #cell(open_issues_count)="data">
                    <div>
                      <p class="mb-1 ellipsis">
                        {{ data.value > 1 ? ` ${data.value} issues` : ` ${data.value} issue` }}
                      </p>
                    </div>
                  </template>
                </b-table>
              </b-card>
            </div>
            <div class="mb-4" v-if="count > 25">
              <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="right" class="mb-0 justify-content-center trackresponse-pagination"></b-pagination>
            </div>
            <div v-if="items.length == 0">
              <div class="bg-white mx-auto pb-3 text-center">
                <img src="../assets/minds/loading.gif" class="img-fluid mt-5 mx-auto pt-5" />
              </div>
            </div>
          </div>
          <div v-else>
            <div class="bg-white mx-auto pb-3 text-center">
              <img src="../assets/minds/drips.svg" width="190px" class="img-fluid mt-5 mx-auto pt-4" />
              <h5 class="d-block text-black-50 mt-4">
                No data found under the last 30 days
              </h5>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import RepoList from '../services/repoList';

export default {
  name: 'TrackRepos',
  mixins: [RepoList],
  // eslint-disable-next-line vue/no-unused-components
  components: { 'date-picker': DatePicker },
  data() {
    return {
      isBusy: false,
      currentPage: 1,
      perPage: 30,
      githubRepos: true,
      items: [],
      offset: 0,
      page: 0,
      range: '',
    };
  },
  computed: {
    rows: function() {
      return this.count;
    },
  },
  methods: {
    // Get the email by respective user
    myProvider(ctx, callback) {
      window.ctx = ctx;
      window.callback = callback;
      this.isBusy = true;
      if (this.page > ctx.currentPage) this.offset = this.offset - ctx.perPage * (this.page - ctx.currentPage);
      else {
        this.page = ctx.currentPage;
        this.offset = ctx.perPage * (ctx.currentPage - 1);
      }

      this.getURL(ctx.currentPage)
        .then(response => {
          // Pluck the array of items off our axios response
          if (response.data.items.length) {
            this.count = response.data.items.length * 3;
            this.githubRepos = true;
            this.items = [];
            this.page = ctx.currentPage;
            response.data.items.forEach(repos => {
              var repoInfo = {};
              repoInfo.repo_name = repos.full_name;
              repoInfo.description = repos.description;
              repoInfo.open_issues_count = repos.open_issues_count;
              repoInfo.gravatar = repos.owner.avatar_url;
              repoInfo.owner_name = repos.owner.login;
              repoInfo.repo_url = repos.html_url;
              repoInfo.stars_count = repos.stargazers_count;
              this.items.push(repoInfo);
            });
            this.isBusy = false;
            callback(this.items);
          } else {
            this.githubRepos = false;
          }
          // Provide the array of items to the callback
        })
        .catch(() => {
          this.isBusy = false;
          // eslint-disable-next-line standard/no-callback-literal
          callback([]);
        });

      // Must return null or undefined to signal b-table that callback is being used
      return null;
    },
    // Communication to background page
    getUserData() {
      // eslint-disable-next-line promise/param-names
      return new Promise((res, rej) => {
        chrome.runtime.sendMessage(window.openedornot_extension, { _minds: 'token' }, data => {
          this.userData = {
            token: data.token.value,
            tenant_id: data.user.tenant_id,
            user_id: data.user.user_id,
          };
          res(this.userData);
        });
      });
    },

    /**
     * Its redirected open with new tab
     * @param {String} value Its github repo link
     */
    openLink(value) {
      window.open(value, '_blank');
    },
  },
};
</script>
