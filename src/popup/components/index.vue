<template>
  <div id="app">
    <div class="app-right-section">
      <div class="mailsend-ext-main">
        <b-card-body class="p-0">
          <b-card-header class="align-items-center p-3 headersec border-0">
            <h4 class="card-header-title w-25">
              <img src="../assets/minds/logo-icon.png" width="36" />
            </h4>
            <p class="text-dark w-75 supportingline text-center mb-0">
              Trending repos
            </p>
          </b-card-header>
        </b-card-body>
        <hr style="width: 90%; margin: 0 auto" />
        <TrackRepos></TrackRepos>
      </div>
    </div>
    <div class="footer-sec">
      <div class="align-items-center d-flex justify-content-between">
        <div class="">
          <div class="align-items-center d-flex justify-content-between">
            <div class="avatar text-uppercase avatar-sm footer-avatar">
              <h3 class="avatar-title rounded bg-primary">
                {{ user.email.charAt(0) }}
              </h3>
            </div>
            <div class="text-left ml-2 f-lineheight">
              <!-- Title -->
              <h6 class="mb-0 name ellipsis pt-1">
                <span>{{ user.email.split('@')[0] }}</span>
              </h6>
              <!-- support line -->
              <div class="mb-0 ellipsis text-center">
                <span class="f-emailid">{{ user.email }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrackRepos from './TrackRepos';
export default {
  data() {
    return {
      user: {
        email: 'info@appminds.com',
      },
    };
  },
  components: {
    TrackRepos,
  },
  methods: {
    showActivity() {
      event.preventDefault();
      window.open('chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/popup/popup.html#/activities');
    },
  },
};
</script>

<style lang="css" scoped>
.trytext {
  font-size: 10px;
}
</style>
