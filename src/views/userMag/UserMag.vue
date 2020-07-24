<!--  -->
<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm"></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary">搜索</el-button>
      </common-form>
    </div>
    <common-table
      :inline="true"
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @delete="deleteUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm"
import CommonTable from "../../components/CommonTable"
export default {
  components: {
    CommonForm,
    CommonTable
  },
  name: "",
  data() {
    return {
      isShow: false,
      searchFrom: {
        keyword: ""
      },
      formLabel: [
        {
          model: "keyword",
          label: ""
        }
      ],
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sexLabel",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 250
        },
        {
          prop: "addr",
          label: "地址",
          width: 300
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: 1
      },
      operateFormLabel: [
        {
          model: "name",
          label: "姓名"
        },
        {
          model: "age",
          label: "年龄"
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date"
        },
        {
          model: "addr",
          label: "地址"
        }
      ],
      operateType: "add"
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.config.loading = true
      this.$http
        .get("/api/user/getUser", {
          params: {
            page: this.config.page
          }
        })
        .then(res => {
          // console.log(res, res);
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? "女" : "男"
            return item
          })
          this.config.total = res.data.count
          this.config.loading = false
        })
    },
    // 编辑用户
    editUser(row) {
      this.operateType = "edit"
      this.isShow = true
      this.operateForm = row
    },
    // 删除用户
    deleteUser(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id
          this.$http
            .get("/api/user/del", {
              params: {
                id
              }
            })
            .then(res => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                })
                this.getList()
              }
            })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    //点击确认 修改用户
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/api/user/edit", this.operateForm).then(res => {
          console.log(res)
        })
      }
    },
    // 新增用户
    addUser() {
      this.operateForm = {}
      this.operateType = "add"
      this.isShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/form.scss";
</style>
