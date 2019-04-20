<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <el-input v-model="search.categroyName" placeholder="请输入数据类别名称" clearable/>
        </el-col>

        <el-col :span="10">
          <el-input v-model="search.categroyCode" placeholder="请输入数据类别编码"/>
        </el-col>
      </el-row>
      <el-row :gutter="5" style="margin-top: 30px;">
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
      <el-table-column label="数据类别编码" align="center">
        <template slot-scope="scope">{{ scope.row.categroyCode }}</template>
      </el-table-column>
      <el-table-column label="数据类别名称" align="center">
        <template slot-scope="scope">{{ scope.row.categroyName }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
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
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="乡镇信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="数据类别编码" prop="categroyCode">
          <el-input v-model="form.categroyCode" auto-complete="off" placeholder="数据类别编码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="数据类别名称" prop="categroyName">
          <el-input v-model="form.categroyName" auto-complete="off" placeholder="数据类别名称"/>
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
  getListOfDataCategroy,
  deleteItemOfDataCategroy,
  updateItemOfDataCategroy,
  createItemOfDataCategroy,
  queryOfDataCategroy
} from '@/api/data_categroy'
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
        categroyName: null,
        categroyCode: null
      },
      form: {
        categroyName: '',
        categroyCode: '',
        id: ''
      },

      rules: {
        categroyName: [
          { required: true, message: '请输入数据类别名称', trigger: 'blur' }
        ],

        categroyCode: [
          {
            required: true,
            message: '请输入数据类别编码',
            trigger: 'blur'
          }
        ]
      },
      formLabelWidth: '150px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    clearValidation() {
      if (this.$refs['ruleForm'] !== undefined) {
        this.$refs['ruleForm'].clearValidate()
      }
    },
    fetchData() {
      this.listLoading = true
      getListOfDataCategroy().then(response => {
        this.list = response.items
        this.originList = response.items
        this.listLoading = false
      })
    },
    handleEdit() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          updateItemOfDataCategroy(this.form)
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
          deleteItemOfDataCategroy(this.list[index].id).then(() => {
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
      this.clearValidation()
      this.dialogFormVisible = true
    },
    handleSearch() {
      this.listLoading = false
      queryOfDataCategroy(this.search).then(response => {
        this.list = response.list
        this.listLoading = false
      })
    },
    handleCreate() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          createItemOfDataCategroy(this.form)
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
      this.clearValidation()
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
