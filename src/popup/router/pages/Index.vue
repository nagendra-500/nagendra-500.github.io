<template>
  <p>Show loading.</p>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    // Registered main route
    this.$router.push('/registered');
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
