<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <el-input v-model="search.familyCode" placeholder="请输入家庭代码" clearable/>
        </el-col>

        <el-col :span="10">
          <el-input v-model="search.householder" placeholder="请输入户主"/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.peopleNumber" placeholder="请输入人口"/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="8">
          <el-input v-model="search.accountCharacter" placeholder="请输入户口类型"/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.villageName" placeholder="请输入所属村名" clearable/>
        </el-col>

        <el-col :span="8">
          <el-input v-model="search.villageGroupCode" placeholder="请输入所属村民小组代码" clearable/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;"/>
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
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="人员代码" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.memberCode }}</template>
      </el-table-column>
      <el-table-column label="人员姓名" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.memberName }}</template>
      </el-table-column>
      <el-table-column label="部门代码" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.departmentCode }}</template>
      </el-table-column>
      <el-table-column label="性别" width="240" align="center">
        <template slot-scope="scope">{{ scope.row.gender }}</template>
      </el-table-column>
      <el-table-column label="民族" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.nationality }}</template>
      </el-table-column>
      <el-table-column label="身份证号码" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.idCardNumber }}</template>
      </el-table-column>
      <el-table-column label="职务" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.position }}</template>
      </el-table-column>
      <el-table-column label="出生日期" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.housingArea|dateString }}</template>
      </el-table-column>
      <el-table-column label="文化水平" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.education }}</template>
      </el-table-column>
      <el-table-column label="婚姻状况" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.maritalStatus }}</template>
      </el-table-column>
      <el-table-column label="政治面貌" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.politicalStatus }}</template>
      </el-table-column>
      <el-table-column label="工作状态" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column label="入职时间" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.entryTime|dateString }}</template>
      </el-table-column>
      <el-table-column label="离职时间" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.leaveTime|dateString }}</template>
      </el-table-column>
      <el-table-column label="服务时长" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.lengthOfService }}</template>
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
        <el-form-item :label-width="formLabelWidth" label="家庭代码" prop="familyCode">
          <el-input v-model="form.familyCode" auto-complete="off" placeholder="家庭代码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="户主" prop="householder">
          <el-input v-model="form.householder" auto-complete="off" placeholder="户主"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="人口" prop="peopleNumber">
          <el-input v-model="form.peopleNumber" auto-complete="off" placeholder="人口"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="户口类型" prop="accountCharacter">
          <el-input v-model="form.accountCharacter" auto-complete="off" placeholder="户口类型"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="所属村名" prop="villageName">
          <el-input v-model="form.villageName" auto-complete="off" placeholder="所属村名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="所属村民小组代码" prop="villageGroupCode">
          <el-input v-model="form.villageGroupCode" auto-complete="off" placeholder="所属村民小组代码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="人均年收入" prop="averageAnnualIncome">
          <el-input v-model="form.averageAnnualIncome" auto-complete="off" placeholder="人均年收入"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="房屋面积" prop="housingArea">
          <el-input v-model="form.housingArea" auto-complete="off" placeholder="房屋面积"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="面积" prop="averageHousingArea">
          <el-input v-model="form.averageHousingArea" auto-complete="off" placeholder="人均面积"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否低保户" prop="isLowIncome">
          <el-radio-group v-model="form.isLowIncome">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否贫困户" prop="isPoor">
          <el-radio-group v-model="form.isPoor">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
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
} from '@/api/member'
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
    return {
      originList: null,
      list: null,
      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      isEdit: true,
      editIndex: null,
      search: {
        memberCode: null,
        memberName: null,
        departmentCode: null,
        homeAddress: null,
        gender: null,
        nationality: null,
        idCardNumber: null,
        position: null,
        birthday: null,
        education: null,
        maritalStatus: null,
        politicalStatus: null,
        personnelNature: null,
        status: null,
        entryTime: null,
        leaveTime: null,
        lengthOfService: null
      },
      form: {
        memberCode: '',
        memberName: '',
        departmentCode: '',
        homeAddress: '',
        gender: '',
        nationality: '',
        idCardNumber: '',
        position: '',
        birthday: null,
        education: '',
        maritalStatus: '',
        politicalStatus: '',
        personnelNature: '',
        status: '',
        entryTime: null,
        leaveTime: null,
        lengthOfService: '',
        id: ''
      },

      rules: {
        departmentName: [
          { required: true, message: '请输入部门名', trigger: 'blur' }
        ],
        departmentCode: [
          { required: true, message: '请输入部门代码', trigger: 'blur' }
        ],
        fax: [{ required: true, message: '请输入传真号', trigger: 'blur' }],
        contactPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
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
    handleEdit() {
      this.$ref['ruleForm'].validate(valid => {
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
    handleSearch() {
      this.listLoading = false
      this.list = query(this.search).then(response => {
        this.list = response.list
        this.listLoading = false
      })
    },
    handleCreate() {
      this.$ref['ruleForm'].validate(valid => {
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
