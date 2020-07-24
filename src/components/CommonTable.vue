<!--  -->
<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page - 1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" show-overflow-tooltip :width="item.width ? item.width : 125">
        <template slot-scope="scope">
          <span style="text-align: center;">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination class="pager" background layout="prev, pager,next" :total="config.total" :current-page.sync="config.page" @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableLabel: Array,
    tableData: Array,
    config: Object
  },
  name: "",
  data() {
    return {}
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row)
    },
    handleDelete(row) {
      this.$emit("delete", row)
    },
    changePage(page) {
      this.$emit("changePage", page)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 64px);
  // height: 100%;
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    // bottom: 20px;
    right: 20px;
  }
}
</style>
