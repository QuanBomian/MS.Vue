<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <el-input v-model="search.memberCode" placeholder="人员代码" clearable/>
        </el-col>

        <el-col :span="10">
          <el-input v-model="search.memberName" placeholder="请输入人员姓名"/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.departmentCode" placeholder="请输入部门代码"/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col>
          <el-input v-model="search.homeAddress" placeholder="请输入家庭住址"/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="6">
          <el-radio-group v-model="search.gender">
            <el-radio label="男" @click.native.prevent="clickitemGender('男')">男</el-radio>
            <el-radio label="女" @click.native.prevent="clickitemGender('女')">女</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.nationality" placeholder="民族" clearable/>
        </el-col>

        <el-col :span="8">
          <el-input v-model="search.idCardNumber" placeholder="身份证号" clearable/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="6">
          <el-date-picker
            v-model="search.birthdayFrom"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择开始出生日期"
          />
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="search.birthdayTo"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择结束出生日期"
          />
        </el-col>
        <el-col :span="8">
          <el-select v-model="search.education" clearable placeholder="请选择文化水平">
            <el-option
              v-for="item in educationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="6">
          <el-select v-model="search.maritalStatus" placeholder="请选择婚姻状况" clearable>
            <el-option
              v-for="item in maritalOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="search.politicalStatus" placeholder="请选择政治面貌" clearable>
            <el-option
              v-for="item in politicalStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="search.status" placeholder="请选择工作状态" clearable>
            <el-option
              v-for="item in workingOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="6">
          <el-date-picker
            v-model="search.entryTimeFrom"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择开始入职日期"
          />
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="search.entryTimeTo"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择结束入职日期"
          />
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="6">
          <el-date-picker
            v-model="search.leaveTimeFrom"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择开始离职日期"
          />
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="search.leaveTimeTo"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择结束离职日期"
          />
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.lengthOfService" placeholder="服务时间" clearable/>
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
      <el-table-column label="家庭住址" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.homeAddress }}</template>
      </el-table-column>
      <el-table-column label="身份证号码" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.idCardNumber }}</template>
      </el-table-column>
      <el-table-column label="职务" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.position }}</template>
      </el-table-column>
      <el-table-column label="出生日期" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.birthday|dateString }}</template>
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
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="人员信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="人员代码" prop="memberCode">
          <el-input v-model="form.memberCode" auto-complete="off" placeholder="人员代码" clearable/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="人员姓名" prop="memberName">
          <el-input v-model="form.memberName" auto-complete="off" placeholder="人员姓名" clearable/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="部门代码" prop="departmentCode">
          <el-input v-model="form.departmentCode" auto-complete="off" placeholder="部门代码" clearable/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="民族" prop="nationality">
          <el-input v-model="form.nationality" auto-complete="off" placeholder="民族" clearable/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="家庭住址" prop="homeAddress">
          <el-input v-model="form.homeAddress" auto-complete="off" placeholder="家庭住址" clearable/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="身份证号" prop="idCardNumber">
          <el-input v-model="form.idCardNumber" auto-complete="off" placeholder="身份证号" clearable/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="职务" prop="position">
          <el-input v-model="form.position" auto-complete="off" placeholder="职务" clearable/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="出生日期" prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            :picker-options="pickerOptions"
            :clearable="false"
            type="date"
            placeholder="输入生日"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="文化水平" prop="education">
          <el-select v-model="form.education" placeholder="请选择文化水平状况">
            <el-option
              v-for="item in educationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="婚姻状况" prop="maritalStatus">
          <el-select v-model="form.maritalStatus" placeholder="请选择婚姻状况">
            <el-option
              v-for="item in maritalOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="政治面貌" prop="politicalStatus">
          <el-select v-model="form.politicalStatus" placeholder="请选择政治面貌">
            <el-option
              v-for="item in politicalStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="工作状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择工作状态">
            <el-option
              v-for="item in workingOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="入职时间" prop="entryTime">
          <el-date-picker
            v-model="form.entryTime"
            :picker-options="pickerOptions"
            :clearable="false"
            type="date"
            placeholder="选择入职日期"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="离职时间" prop="leaveTime">
          <el-date-picker
            v-model="form.leaveTime"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择离职日期"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="服务时间" prop="lengthOfService">
          <el-input
            v-model="form.lengthOfService"
            auto-complete="off"
            placeholder="服务时间"
            clearable
          />
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
    function IdentityCodeValid(idcode) {
      var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]

      var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

      var code = idcode + ''
      var last = idcode[17]

      var seventeen = code.substring(0, 17)

      // ISO 7064:1983.MOD 11-2
      // 判断最后一位校验码是否正确
      var arr = seventeen.split('')
      var len = arr.length
      var num = 0
      for (var i = 0; i < len; i++) {
        num = num + arr[i] * weight_factor[i]
      }

      var resisue = num % 11
      var last_no = check_code[resisue]
      var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/

      var format = idcard_patter.test(idcode)

      return !!(last === last_no && format)
    }
    var checkId = (rule, value, callback) => {
      if (!value) {
        callback('请输入身份证号码')
      } else {
        setTimeout(() => {
          if (IdentityCodeValid(value)) {
            callback()
          } else {
            callback('身份证号码不正确')
          }
        })
      }
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
        memberCode: null,
        memberName: null,
        departmentCode: null,
        homeAddress: null,
        gender: null,
        nationality: null,
        idCardNumber: null,
        position: null,
        birthdayFrom: null,
        birthdayTo: null,
        education: null,
        maritalStatus: null,
        politicalStatus: null,
        personnelNature: null,
        status: null,
        entryTimeFrom: null,
        entryTimeTo: null,
        leaveTimeFrom: null,
        leaveTimeTo: null,
        lengthOfService: null
      },
      originForm: {
        memberCode: '',
        memberName: '',
        departmentCode: '',
        homeAddress: '',
        gender: '男',
        nationality: '汉族',
        idCardNumber: '',
        position: '',
        birthday: new Date(1970, 1, 1),
        education: '本科',
        maritalStatus: '未婚',
        politicalStatus: '群众',
        personnelNature: '',
        status: '在职在岗',
        entryTime: null,
        leaveTime: null,
        lengthOfService: ''
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },

      rules: {
        memberCode: [
          { required: true, message: '请输入人员编码', trigger: 'blur' }
        ],
        memberName: [
          { required: true, message: '请输入人员姓名', trigger: 'blur' }
        ],
        departmentCode: [
          { required: true, message: '请输入部门编码', trigger: 'blur' }
        ],
        homeAddress: [
          {
            required: true,
            max: 100,
            message: '请输入家庭住址',
            trigger: 'blur'
          }
        ],
        idCardNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: checkId, trigger: 'blur' }
        ],
        nationality: [
          {
            required: true,
            message: '请输入民族',
            trigger: 'blur'
          }
        ],

        position: [
          {
            required: true,
            message: '请输入职位',
            trigger: 'blur'
          }
        ],
        lengthOfService: [
          {
            required: true,
            message: '请输入服务时间',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }
        ]
      },
      formLabelWidth: '120px',
      educationOptions: [
        {
          value: '小学',
          label: '小学'
        },
        {
          value: '初中',
          label: '初中'
        },
        {
          value: '高中',
          label: '高中'
        },
        {
          value: '中专',
          label: '中专'
        },
        {
          value: '本科',
          label: '本科'
        },
        {
          value: '大专专科',
          label: '大学专科'
        },
        {
          value: '硕士研究生',
          label: '硕士研究生'
        },
        {
          value: '博士研究生',
          label: '博士研究生'
        }
      ],
      maritalOptions: [
        {
          value: '未婚',
          label: '未婚'
        },
        {
          value: '已婚',
          label: '已婚'
        },
        {
          value: '丧偶',
          label: '丧偶'
        },
        {
          value: '离婚',
          label: '离婚'
        }
      ],
      workingOptions: [
        {
          value: '在职在岗',
          label: '在职在岗'
        },
        {
          value: '在职离岗',
          label: '在职离岗'
        },
        {
          value: '离职离岗',
          label: '离职离岗'
        }
      ],
      politicalStatusOptions: [
        { value: '中共党员', label: '中共党员' },
        { value: '中共预备党员', label: '中共预备党员' },
        { value: '共青团员', label: '共青团员' },
        { value: '民革党员', label: '民革党员' },
        { value: '民盟盟员', label: '民盟盟员' },
        { value: '民建会员', label: '民建会员' },
        { value: '民进会员', label: '民进会员' },
        { value: '农工党党员', label: '农工党党员' },
        { value: '九三学社社员', label: '九三学社社员' },
        { value: '台盟盟员', label: '台盟盟员' },
        { value: '无党派人士', label: '无党派人士' },
        { value: '群众', label: '群众' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    setToDefault() {
      this.form = Object.assign({}, this.from, this.originForm)
    },
    clearValidation() {
      if (this.$refs['ruleForm'] !== undefined) {
        this.$refs['ruleForm'].clearValidate()
      }
    },
    clickitemGender(e) {
      e === this.search.gender
        ? (this.search.gender = null)
        : (this.search.gender = e)
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
      this.setToDefault()
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
