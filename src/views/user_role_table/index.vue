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
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">{{ scope.row.user.userName }}</template>
      </el-table-column>
      <el-table-column label="授权" align="center">
        <template slot-scope="scope">{{ scope.row.role.roleName }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="openDialogForEdit(scope.$index,scope.row)"
          >编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="用户角色信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="用户名" prop="user.userName">
          <el-select
            v-model="form.user.userName"
            value-key="id"
            placeholder="请选择用户名"
            @change="currentUserSel"
          >
            <el-option
              v-for="item in userNameOptions"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- <el-input v-model="form.user.userName" auto-complete="off" placeholder="用户名"/> -->
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="角色名" prop="role.roleName">
          <el-select
            v-model="form.role.roleName"
            value-key="id"
            placeholder="请选择角色名"
            @change="currentRoleSel"
          >
            <el-option
              v-for="item in roleNameOptions"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- <el-input v-model="form.role.roleName" auto-complete="off" placeholder="角色名"/> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="isEdit" type="primary" @click="handleEdit">更 新</el-button>
        <el-button v-else type="primary" @click="handleCreate">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  deleteItem,
  updateItem,
  createItem,
  query
} from '@/api/auth_user'
import * as userApi from '@/api/user'
import * as roleApi from '@/api/role'
export default {
  data() {
    return {
      originList: null,
      list: null,
      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      isEdit: true,
      editIndex: null,
      search: {
        userName: null
      },
      form: {
        user: {
          id: '',
          userName: ''
        },
        role: {
          id: '',
          roleName: ''
        },
        userId: '',
        roleId: '',
        id: ''
      },
      userNameOptions: [],
      roleNameOptions: [],
      rules: {
        'user.userName': [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'change'
          }
        ],
        'role.roleName': [
          {
            required: true,
            message: '请输入角色名',
            trigger: 'change'
          }
        ]
      },
      formLabelWidth: '120px'
    }
  },

  created() {
    this.fetchData()
    this.fetchOptions()
  },
  methods: {
    currentUserSel(selVal) {
      var user = this.userNameOptions.find(item => item.userName === selVal)
      this.form.userId = user.id
    },
    currentRoleSel(selVal) {
      var role = this.roleNameOptions.find(item => item.roleName === selVal)
      this.form.roleId = role.id
    },
    clearValidation() {
      if (this.$refs['ruleForm'] !== undefined) {
        this.$refs['ruleForm'].clearValidate()
      }
    },
    fetchOptions() {
      userApi.getList().then(response => {
        var options = response.items
        for (var i = 0; i < options.length; i++) {
          options[i].value = options[i].userName
          options[i].label = options[i].userName
        }
        this.userNameOptions = options
      })
      roleApi.getList().then(response => {
        var options = response.items
        for (var i = 0; i < options.length; i++) {
          options[i].value = options[i].roleName
          options[i].label = options[i].roleName
        }
        this.roleNameOptions = options
      })
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.items
        this.originList = response.items
        this.listLoading = false
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
      this.clearValidation()
      this.isEdit = true
      this.editIndex = index
      this.form = Object.assign({}, obj)
      this.dialogFormVisible = true
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
          var userRole = {}
          userRole.userId = this.form.userId
          userRole.roleId = this.form.roleId
          createItem(userRole)
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
      this.clearValidation()
      this.form.user = {}
      this.form.role = {}
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
