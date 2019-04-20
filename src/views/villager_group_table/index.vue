<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <el-input v-model="search.villageGroupCode" placeholder="请输入村民小组编码" clearable/>
        </el-col>

        <el-col :span="10">
          <el-input v-model="search.principalName" placeholder="请输入负责人姓名" clearable/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.principalPhone" placeholder="请输入负责人联系电话" clearable/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="8">
          <el-input v-model="search.principalEmail" placeholder="请输入联系人电子邮箱" clearable/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.villageName" placeholder="请输入所属村名" clearable/>
        </el-col>

        <el-col :span="8">
          <el-input v-model="search.memberNumber" placeholder="请输入成员数量" clearable/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="8">
          <el-input v-model="search.principalAddress" placeholder="请输入负责人家庭住址" clearable/>
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
      <el-table-column label="村名小组编码" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.villageGroupCode }}</template>
      </el-table-column>
      <el-table-column label="负责人姓名" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.principalName }}</template>
      </el-table-column>
      <el-table-column label="负责人家庭住址" width="140" align="center">
        <template slot-scope="scope">{{ scope.row.principalAddress }}</template>
      </el-table-column>
      <el-table-column label="负责人电子邮箱" width="240" align="center">
        <template slot-scope="scope">{{ scope.row.principalEmail }}</template>
      </el-table-column>
      <el-table-column label="负责人联系电话" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.principalPhone }}</template>
      </el-table-column>
      <el-table-column label="所属村名" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.villageName }}</template>
      </el-table-column>
      <el-table-column label="成员数量" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.memberNumber }}</template>
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
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="村信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="村民小组编码" prop="villageGroupCode">
          <el-input v-model="form.villageGroupCode" auto-complete="off" placeholder="村民小组编码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="负责人姓名" prop="principalName">
          <el-input v-model="form.principalName" auto-complete="off" placeholder="负责人姓名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="负责人联系电话" prop="principalPhone">
          <el-input v-model="form.principalPhone" auto-complete="off" placeholder="负责人联系电话"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="负责人电子邮箱" prop="principalEmail">
          <el-input v-model="form.principalEmail" auto-complete="off" placeholder="负责人电子邮箱"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="负责人家庭住址" prop="principalAddress">
          <el-input v-model="form.principalAddress" auto-complete="off" placeholder="负责人家庭住址"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="所属村名 " prop="villageName">
          <el-input v-model="form.villageName" auto-complete="off" placeholder="所属村名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="成员数量" prop="memberNumber">
          <el-input v-model="form.memberNumber" auto-complete="off" placeholder="成员数量"/>
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
} from '@/api/villager_group'
export default {
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
    return {
      originList: null,
      list: null,
      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      isEdit: true,
      editIndex: null,
      search: {
        villageGroupCode: null,
        principalPhone: null,
        principalEmail: null,
        principalName: null,
        villageName: null,
        memberNumber: null
      },
      form: {
        villageGroupCode: '',
        principalPhone: '',
        principalEmail: '',
        principalName: '',
        villageName: '',
        memberNumber: null,
        id: ''
      },

      rules: {
        villageName: [
          { required: true, message: '请输入村名', trigger: 'blur' }
        ],

        address: [
          {
            required: true,
            max: 100,
            message: '请输入地址',
            trigger: 'blur'
          }
        ],
        areaNumber: [
          {
            required: true,
            max: 15,
            message: '请输入行政区划编码',
            trigger: 'blur'
          }
        ],
        governmentLevel: [
          {
            required: true,
            message: '请输入行政级别',
            trigger: 'blur'
          }
        ],
        villageHeadName: [
          {
            required: true,
            min: 2,
            message: '请输入村长姓名',
            trigger: 'blur'
          }
        ],
        secretaryName: [
          {
            required: true,
            min: 2,
            message: '请输入党委书记姓名',
            trigger: 'blur'
          }
        ],
        chairmanName: [
          {
            required: true,
            min: 2,
            message: '请输入人大委员长姓名',
            trigger: 'blur'
          }
        ],
        urbanRuralClassification: [
          {
            required: true,
            message: '请选择城乡分类',
            trigger: 'change'
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
      this.clearValidation()
      this.isEdit = true
      this.editIndex = index
      this.form = Object.assign({}, obj)
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
      this.clearValidation()
      this.form = {}
      console.log(this.form)
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
