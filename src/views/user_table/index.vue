<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <el-input v-model="search.userName" placeholder="用户名" clearable/>
        </el-col>
      </el-row>

      <el-row :gutter="5" style="margin-top: 15px;">
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="openDialogForCreate">新增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="fetchData">刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      style="margin-top: 15px;"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="用户名" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column label="密码" width="500" align="center">
        <template slot-scope="scope">{{ scope.row.password }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="openDialogForReset(scope.$index,scope.row)"
          >重置密码</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="用户信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="用户名" prop="userName">
          <el-input v-model="form.userName" auto-complete="off" placeholder="用户名"/>
          <span>注：至少6位</span>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码" prop="password">
          <el-input v-model="form.password" auto-complete="off" placeholder="密码"/>
          <span>注：至少8位</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="isEdit" type="primary" @click="handleEdit">更 新</el-button>
        <el-button v-else type="primary" @click="handleCreate">添 加</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="resetDialogVisible" :before-close="handleClose" title="重置密码">
      <el-form ref="resetPasswordForm" :rules="resetRules" :model="user">
        <el-form-item :label-width="formLabelWidth" label="新密码" prop="password">
          <el-input v-model="user.password" clearable/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleReset">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, deleteItem, updateItem, createItem, query } from '@/api/user'
export default {
  data() {
    return {
      originList: null,
      list: null,
      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      resetDialogVisible: false,
      isEdit: true,
      editIndex: null,
      user: {
        id: null,
        userName: null,
        password: null
      },
      search: {
        username: null
      },
      form: {
        userName: '',
        password: '',
        id: ''
      },

      rules: {
        userName: [
          { required: true, min: 6, message: '请输入用户名', trigger: 'blur' }
        ],

        password: [
          {
            required: true,
            min: 8,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      resetRules: {
        password: [
          {
            required: true,
            min: 6,
            message: '密码至少为6位',
            trigger: 'blur'
          }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  watch: {
    dialogFormVisible: function(val, oldVla) {
      this.$refs['ruleForm'].resetFields()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.items
        this.originList = response.items
        this.listLoading = false
      })
    },
    handleReset() {
      this.$refs['resetPasswordForm'].validate(valid => {
        if (valid) {
          this.resetDialogVisible = false
          updateItem(this.user)
            .then(() => {
              this.fetchData()
              this.$message({
                type: 'success',
                message: '更新成功'
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消重置'
              })
            })
        }
      })
    },
    handleEdit() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          updateItem(this.form)
            .then(() => {
              this.fetchData()
              this.$message({
                type: 'success',
                message: '更新成功!'
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
        } else {
          return false
        }
      })
    },
    handleDelete(index) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteItem(this.list[index].id).then(() => {
            this.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    openDialogForEdit(index, obj) {
      this.isEdit = true
      this.editIndex = index
      this.form = Object.assign({}, obj)
      this.dialogFormVisible = true
    },
    openDialogForReset(index, obj) {
      this.resetDialogVisible = true
      this.user.id = obj.id
      this.user.userName = obj.userName
    },
    handleSearch() {
      this.listLoading = false
      query(this.search).then(response => {
        this.list = response.list
        this.listLoading = false
      })
    },
    handleCreate() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          createItem(this.form)
            .then(() => {
              this.fetchData()
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消添加'
              })
            })
        } else {
          return false
        }
      })
    },
    openDialogForCreate() {
      this.form = {}
      this.isEdit = false
      this.dialogFormVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style scoped>
</style>
