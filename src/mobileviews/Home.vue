<template>
    <div>

        <!-- <router-link :to="{ name: 'Progress' }"><li><a href="javascript:;">这是移动端</a></li></router-link> -->
        <div>
            <Icon type="success"></Icon>
        </div>
    </div>
</template>

<script>
import { Icon } from 'vux'
export default {
  name: "Home",
  components: {
    Icon
  }
};
</script>

<style scoped>
</style>
