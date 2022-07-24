// Define a mixin object
import axios from 'axios';

var mixinMinds = {
  methods: {
    // Get relative path with respective app
    getAppDomain(page) {
      return `https://api.github.com/search/repositories?q=created:>2022-06-23&sort=stars&order=desc&page=${page}`;
    },

    // Make axios request & get the data
    getURL: function(page) {
      return axios
        .get(this.getAppDomain(page), {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        })
        .then(response => response);
    },

    // Get respective tab URL
    getTabURL() {
      if (this.$tab) return this.$tab.url;
      return 'https://www.appmindstech.com';
    },

    // Get host with respective website
    getTabURLHost() {
      const url = this.getTabURL();
      const host = new URL(url).host;
      return host;
    },

    // Get favicon icon  with respective website
    getFavIcon() {
      return this.$tab.favIconUrl;
    },
  },
};

export { mixinMinds };
