<!--  -->
<template>
  <div class="commonTab">
    <el-tag
      v-for="(tag, index) in tags"
      :key="index"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :type="tag.type"
      @close="handleClose(tag)"
      @click="ChangMenu(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
export default {
  name: "",
  data() {
    return {
      dynamicTags: [
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" }
      ]
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations({
      close: "closeTab"
    }),
    handleClose(tag) {
      this.close(tag)
    },
    ChangMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit("selectMenu", item)
    }
  }
}
</script>

<style lang="scss" scoped>
.commonTab {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
