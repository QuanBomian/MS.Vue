<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <el-input v-model="search.townName" placeholder="请输入乡镇名" clearable/>
        </el-col>

        <el-col :span="10">
          <el-input v-model="search.address" placeholder="请输入地址"/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.mayorName" placeholder="请输入镇长姓名"/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="8">
          <el-input v-model="search.secretaryName" placeholder="请输入党委书记姓名"/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.chairmanName" placeholder="请输入人大委员长姓名" clearable/>
        </el-col>

        <el-col :span="8">
          <el-input v-model="search.contactPhone" placeholder="请输入联系电话" clearable/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="8">
          <el-input v-model="search.areaNumber" placeholder="请输入行政编码"/>
        </el-col>
        <el-col :span="8">
          <el-select v-model="search.governmentLevel" placeholder="请输入行政级别" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="乡镇名" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.townName }}</template>
      </el-table-column>
      <el-table-column label="行政编码" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.areaNumber }}</template>
      </el-table-column>
      <el-table-column label="行政级别" width="40" align="center">
        <template slot-scope="scope">{{ scope.row.governmentLevel }}</template>
      </el-table-column>
      <el-table-column label="地址" width="240" align="center">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="镇长姓名" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.mayorName }}</template>
      </el-table-column>
      <el-table-column label="党委书记姓名" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.secretaryName }}</template>
      </el-table-column>
      <el-table-column label="人大委员长姓名" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.chairmanName }}</template>
      </el-table-column>
      <el-table-column label="联系电话" width="140" align="center">
        <template slot-scope="scope">{{ scope.row.contactPhone }}</template>
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
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="乡镇信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="乡镇名" prop="townName">
          <el-input v-model="form.townName" auto-complete="off" placeholder="乡镇名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="地址" prop="address">
          <el-input v-model="form.address" auto-complete="off" placeholder="地址"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="行政编码" prop="areaNumber">
          <el-input v-model="form.areaNumber" auto-complete="off" placeholder="行政编码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="行政级别" prop="governmentLevel">
          <el-input v-model="form.governmentLevel" auto-complete="off" placeholder="行政级别"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="镇长姓名" prop="mayorName">
          <el-input v-model="form.mayorName" auto-complete="off" placeholder="镇长姓名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="党委书记姓名" prop="secretaryName">
          <el-input v-model="form.secretaryName" auto-complete="off" placeholder="党委书记姓名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="人大委员长姓名" prop="chairmanName">
          <el-input v-model="form.chairmanName" auto-complete="off" placeholder="人大委员长姓名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone" auto-complete="off" placeholder="联系电话"/>
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
import { getList, deleteItem, updateItem, createItem, query } from '@/api/town'
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
      options: [
        {
          value: 1,
          label: '省级'
        },
        {
          value: 2,
          label: '地级'
        },
        {
          value: 3,
          label: '县级'
        },
        {
          value: 4,
          label: '乡级'
        },
        {
          value: 5,
          label: '村级'
        }
      ],
      search: {
        townName: null,
        address: null,
        majorName: null,
        secretaryName: null,
        chairmanName: null,
        contactPhone: null,
        areaNumer: '',
        governmentLevel: null
      },
      form: {
        townName: '',
        areaNumer: '',
        governmentLevel: null,
        address: '',
        majorName: '',
        secretaryName: '',
        chairmanName: '',
        contactPhone: '',
        id: ''
      },

      rules: {
        townName: [
          { required: true, message: '请输入乡镇名', trigger: 'blur' }
        ],

        address: [
          {
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }
        ],
        mayorName: [
          {
            required: true,
            message: '请输入镇长姓名',
            trigger: 'blur'
          }
        ],
        secretaryName: [
          {
            required: true,
            message: '请输入党委书记姓名',
            trigger: 'blur'
          }
        ],
        chairmanName: [
          {
            required: true,
            message: '请输入人大委员长姓名',
            trigger: 'blur'
          }
        ]
      },
      formLabelWidth: '120px'
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
      this.isEdit = true
      this.editIndex = index
      this.form = Object.assign({}, obj)
      this.clearValidation()
      this.dialogFormVisible = true
    },
    handleSearch() {
      this.listLoading = false
      this.list = query(this.search).then(response => {
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
