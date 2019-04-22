<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"/>

    <el-tree
      ref="tree"
      :data="data"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      :props="defaultProps"
      node-key="id"
      class="filter-tree"
      default-expand-all
    >
      <span slot-scope="{node,data}" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="openDialogForMore(data)">详情</el-button>
          <el-button type="text" size="mini" @click="openDialogForAppend(data)">新增</el-button>
          <el-button type="text" size="mini" @click="openDialogForEdit(data)">编辑</el-button>
          <el-button type="text" size="mini" @click="handleDelete(node,data)">删除</el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="行政区信息">
      <el-form ref="ruleForm" :model="form" :rules="rules" :disabled="isDetail">
        <el-form-item :label-width="formLabelWidth" label="上级行政编码" prop="highLevelAreaNumber">
          <el-input v-model="form.highLevelAreaNumber" auto-complete="off" placeholder="上级行政编码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="行政编码" prop="areaNumber">
          <el-input v-model="form.areaNumber" auto-complete="off" placeholder="行政编码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="行政级别" prop="governmentLevel">
          <el-input v-model="form.governmentLevel" auto-complete="off" placeholder="行政级别"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="行政名称" prop="governmentName">
          <el-input v-model="form.governmentName" auto-complete="off" placeholder="行政名称"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="下属县级行政区数量" prop="countyNumber">
          <el-input v-model="form.countyNumber" auto-complete="off" placeholder="下属县级行政区数量"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="下属乡级行政区数量" prop="townNumber">
          <el-input v-model="form.townNumber" auto-complete="off" placeholder="下属乡级行政区数量"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="下属村级行政区数量" prop="villageNumber">
          <el-input v-model="form.villageNumber" auto-complete="off" placeholder="下属村级行政区数量"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="下属村民小组数量" prop="villageGroupNumber">
          <el-input v-model="form.villageGroupNumber" auto-complete="off" placeholder="下属村民小组数量"/>
        </el-form-item>
      </el-form>
      <div v-if="!isDetail" slot="footer" class="dialog-footer">
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
  getById,
  createItem,
  deleteItem,
  updateItem
} from '@/api/admin_division'
export default {
  data() {
    return {
      isDetail: false,
      isEdit: false,
      dialogFormVisible: false,
      rules: {
        highLevelAreaNumber: [
          {
            required: true,
            message: '请输入上级行政编码',
            trigger: 'blur'
          }
        ]
      },
      form: {
        highLevelAreaNumber: '',
        areaNumber: null,
        governmentLevel: null,
        governmentName: '',
        countyNumber: null,
        townNumber: null,
        villageNumber: null,
        villageGroupNumber: null
      },
      filterText: '行政名称',
      data: [],

      defaultProps: {
        children: 'children',
        label: 'governmentName'
      },
      formLabelWidth: '180px'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    dialogFormVisible: function(val, oldVla) {
      if (this.$refs['ruleForm'] !== undefined) {
        this.$refs['ruleForm'].resetFields()
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
    handleCreate(data) {
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
    handleDelete(node, data) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(data)
          deleteItem(data.id).then(() => {
            this.fetchData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(error => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    openDialogForMore(obj) {
      this.isDetail = true
      getById(obj.id).then(reponse => {
        this.form = reponse.item
        this.dialogFormVisible = true
      })
    },
    openDialogForAppend(data) {
      console.log(data)
      this.isDetail = false
      this.form = {}
      this.form.highLevelAreaNumber = data.areaNumber
      this.isEdit = false
      this.dialogFormVisible = true
    },
    openDialogForEdit(obj) {
      this.isDetail = false
      this.isEdit = true
      getById(obj.id).then(reponse => {
        this.form = reponse.item
        this.dialogFormVisible = true
      })
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    fetchData() {
      getList().then(response => {
        this.data = response.list
      })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
