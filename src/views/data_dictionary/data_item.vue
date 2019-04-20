<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="0">
          <el-menu-item-group>
            <template slot="title">数据分类</template>
            <el-menu-item
              v-for="(categroy, i) in categroies"
              :key="i"
              :index="i.toString()"
              @click="handleClick(categroy.categroyCode)"
            >{{ categroy.categroyName }}</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <el-row type="flex" justify="space-between">
            <el-button type="primary" @click="openDialogForCreate">新建数据项</el-button>
            <el-col :span="6">
              <el-input v-model="search.key" placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
              </el-input>
            </el-col>
          </el-row>
          <el-table
            :data="tableData"
            style="margin-top: 15px;"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="分类代码">
              <template slot-scope="scope">{{ scope.row.categroyCode }}</template>
            </el-table-column>
            <el-table-column label="数据项代码" align="center">
              <template slot-scope="scope">{{ scope.row.itemCode }}</template>
            </el-table-column>
            <el-table-column label="内容" align="center">
              <template slot-scope="scope">{{ scope.row.content }}</template>
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
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="乡镇信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="数据类别编码" prop="categroyCode">
          <el-input
            v-model="form.categroyCode"
            :disabled="true"
            auto-complete="off"
            placeholder="数据类别编码"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="数据项编码" prop="categroyCode">
          <el-input v-model="form.itemCode" auto-complete="off" placeholder="数据类别编码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="内容" prop="categroyName">
          <el-input v-model="form.content" auto-complete="off" placeholder="数据类别名称"/>
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
import { getListOfDataCategroy } from '@/api/data_categroy'
import {
  getListsByCategroyId,
  createItemOfDataItem,
  updateItemOfDataItem,
  deleteItemOfDataItem,
  queryItemOfDataItem
} from '@/api/data_item'
export default {
  data() {
    return {
      formLabelWidth: '120px',
      originList: null,
      list: null,
      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      isEdit: true,
      editIndex: null,
      rules: {},
      search: {
        key: null,
        categroyCode: null
      },
      form: {
        categroyCode: '',
        itemCode: '',
        content: '',
        id: ''
      },

      categroies: [],
      tableData: []
    }
  },
  created() {
    this.fetchDataCategroy()
  },
  methods: {
    clearValidation() {
      if (this.$refs['ruleForm'] !== undefined) {
        this.$refs['ruleForm'].clearValidate()
      }
    },
    handleClick(id) {
      this.listLoading = true
      getListsByCategroyId(id).then(reponse => {
        this.tableData = reponse.list
        this.listLoading = false
      })
    },
    fetchDataCategroy() {
      this.listLoading = true
      getListOfDataCategroy().then(reponse => {
        this.categroies = reponse.items
        getListsByCategroyId(reponse.items[0].categroyCode).then(reponse => {
          this.tableData = reponse.list
          this.listLoading = false
        })
      })
    },
    handleEdit() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          updateItemOfDataItem(this.form)
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
          deleteItemOfDataItem(this.tableData[index].id).then(() => {
            this.listLoading = true
            getListsByCategroyId(this.tableData[index].categroyCode).then(
              reponse => {
                this.tableData = reponse.list
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }
            )
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
      this.search.categroyCode = this.tableData[0].categroyCode
      queryItemOfDataItem(this.search).then(response => {
        this.tableData = response.list
        this.listLoading = false
      })
    },
    handleCreate() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          console.log(this.form)
          createItemOfDataItem(this.form)
            .then(() => {
              this.listLoading = true
              getListsByCategroyId(this.form.categroyCode).then(reponse => {
                this.tableData = reponse.list
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
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
      Object.assign(this.form, {
        itemCode: '',
        content: '',
        categroyCode: this.tableData[0].categroyCode
      })
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
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
