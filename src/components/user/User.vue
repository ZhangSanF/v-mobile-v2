<template>
  <div class="user">
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
		name: 'User',
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .user {
		height: 100%;
	}
</style>
