<template>
  <div id="user-info" class="width-400">
    <div class="card border-0 mb-0">
      <index></index>
    </div>
  </div>
</template>
<script>
import index from '../../components/index';
export default {
  components: {
    index,
  },
  data() {
    return {
      tab: {},
    };
  },
  mounted() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      this.tab = tabs[0];
    });
  },
};
</script>
<style lang="scss" scoped>
p {
  font-size: 20px;
}
.linksize {
  width: 20px;
  height: 20px;
}
.user-info .card {
  border-radius: 0 !important;
}
.f16 {
  font-size: 16px;
  line-height: 1;
  font-weight: 500;
}

.f14 {
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
}
.f12 {
  font-size: 12px;
  font-weight: 500;
}

.width-400 {
  width: 400px;
  height: 490px;
}
</style>
