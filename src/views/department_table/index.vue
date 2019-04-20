<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <el-input v-model="search.departmentName" placeholder="请输入部门名" clearable/>
        </el-col>

        <el-col :span="10">
          <el-input v-model="search.departmentCode" placeholder="请输入部门代码"/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.principalName" placeholder="请输入负责人姓名"/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="8">
          <el-input v-model="search.contactPhone" placeholder="请输入联系电话"/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.fax" placeholder="请输入传真号" clearable/>
        </el-col>

        <el-col :span="8">
          <el-input v-model="search.email" placeholder="请输入电子邮箱" clearable/>
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
      <el-table-column label="部门名" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.departmentName }}</template>
      </el-table-column>
      <el-table-column label="部门代码" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.departmentCode }}</template>
      </el-table-column>
      <el-table-column label="负责人姓名" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.principalName }}</template>
      </el-table-column>
      <el-table-column label="地址" width="240" align="center">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="联系电话" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.contactPhone }}</template>
      </el-table-column>
      <el-table-column label="传真号" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.fax }}</template>
      </el-table-column>
      <el-table-column label="电子邮箱" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.email }}</template>
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
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="组织机构信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="部门名" prop="departmentName">
          <el-input v-model="form.departmentName" auto-complete="off" placeholder="村名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="部门代码" prop="departmentCode">
          <el-input v-model="form.departmentCode" auto-complete="off" placeholder="部门代码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="地址" prop="address">
          <el-input v-model="form.address" auto-complete="off" placeholder="地址"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="负责人姓名" prop="principalName">
          <el-input v-model="form.principalName" auto-complete="off" placeholder="负责人姓名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone" auto-complete="off" placeholder="联系电话"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="传真号" prop="fax">
          <el-input v-model="form.fax" auto-complete="off" placeholder="传真号"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="电子邮件" prop="email">
          <el-input v-model="form.email" auto-complete="off" placeholder="电子邮件"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="备注" prop="notes">
          <el-input v-model="form.notes" type="textarea" auto-complete="off" placeholder="备注"/>
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
} from '@/api/department'
import moment from 'moment'
export default {
  filters: {
    dateString(value, format) {
      return moment(value).format(format || 'YYYY年M月D日')
    },
    recordString(value) {
      return value === true ? '是' : '否'
    }
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      var reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
      if (!value) {
        callback(new Error('请输入联系电话'))
      }
      setTimeout(() => {
        if (reg.test(value)) {
          callback()
        } else {
          callback('请输入正确的格式：0区号-8位或7位号码[-分机号]')
        }
      }, 100)
    }
    var checkFax = (rule, value, callback) => {
      var reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
      if (!value) {
        callback(new Error('请输入传真号'))
      }
      setTimeout(() => {
        if (reg.test(value)) {
          callback()
        } else {
          callback('请输入正确的格式：0区号-8位或7位号码[-分机号]')
        }
      }, 100)
    }
    var checkEmail = (rule, value, callback) => {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (!value) {
        callback(new Error('请输入电子邮箱'))
      }
      setTimeout(() => {
        if (reg.test(value)) {
          callback()
        } else {
          callback('请输入正确的格式xxxxx@xxxxx.xxx')
        }
      }, 100)
    }
    return {
      originList: null,
      list: null,
      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      isEdit: true,
      editIndex: null,
      search: {
        departmentName: null,
        departmentCode: null,
        address: null,
        principalName: null,
        fax: null,
        email: null,
        notes: null
      },
      form: {
        departmentName: '',
        departmentCode: '',
        address: '',
        principalName: '',
        contactPhone: '',
        fax: '',
        notes: '',
        id: ''
      },

      rules: {
        departmentName: [
          { required: true, message: '请输入部门名', trigger: 'blur' }
        ],
        departmentCode: [
          { required: true, message: '请输入部门代码', trigger: 'blur' }
        ],
        fax: [
          { required: true, message: '请输入传真号', trigger: 'blur' },
          {
            validator: checkFax,
            trigger: 'blur'
          }
        ],
        contactPhone: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          },
          {
            validator: checkPhone,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入电子邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        principalName: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' }
        ],

        address: [
          {
            required: true,
            message: '请输入地址',
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
      this.dialogFormVisible = false
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
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
    },
    clearValidation() {
      if (this.$refs['ruleForm'] !== undefined) {
        this.$refs['ruleForm'].clearValidate()
      }
    }
  }
}
</script>
<style scoped>
</style>
