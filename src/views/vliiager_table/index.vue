<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <el-input v-model="search.name" placeholder="请输入姓名" clearable/>
        </el-col>

        <el-col :span="6">
          <el-date-picker
            v-model="search.birthdayFrom"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择开始日期"
          />
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="search.birthdayTo"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择结束日期"
          />
        </el-col>
        <el-col :span="6">
          <el-select v-model="search.education" clearable placeholder="请选择学历">
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
          <el-input v-model="search.homeAddress" placeholder="请输入住址" clearable/>
        </el-col>

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
        <el-col :span="5">
          <el-input v-model="search.annualIncomeFrom" placeholder="请输入年收入下限" clearable/>
        </el-col>
        <el-col :span="5">
          <el-input v-model="search.annualIncomeTo" placeholder="请输入年收入上限" clearable/>
        </el-col>
      </el-row>
      <el-row :gutter="15" style="margin-top: 15px;" justify="left" type="flex">
        <el-col :span="3">
          <el-radio-group v-model="search.gender">
            <el-radio label="男" @click.native.prevent="clickitemGender('男')">男</el-radio>
            <el-radio label="女" @click.native.prevent="clickitemGender('女')">女</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          <el-radio-group v-model="search.havingIllegalRecord">
            <el-radio :label="true" @click.native.prevent="clickItemIllegal(true)">有违法记录</el-radio>
            <el-radio :label="false" @click.native.prevent="clickItemIllegal(false)">无违法记录</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          <el-radio-group v-model="search.havingCriminalRecord">
            <el-radio :label="true" @click.native.prevent="clickItemCriminal(true)">有犯罪记录</el-radio>
            <el-radio :label="false" @click.native.prevent="clickItemCriminal(false)">无犯罪记录</el-radio>
          </el-radio-group>
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
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="姓名" width="80">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="出生日期" width="140" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.birthday | dateString }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.gender }}</template>
      </el-table-column>
      <el-table-column label="家庭住址" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.homeAddress }}</template>
      </el-table-column>
      <el-table-column label="学历" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.education }}</template>
      </el-table-column>
      <el-table-column label="年收入" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.annualIncome }}</template>
      </el-table-column>
      <el-table-column label="婚姻状况" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.maritalStatus }}</template>
      </el-table-column>
      <el-table-column label="有无违法记录" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.havingIllegalRecord | recordString }}</template>
      </el-table-column>
      <el-table-column label="有无犯罪记录" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.havingCriminalRecord | recordString }}</template>
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
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="村民信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="姓名" prop="name">
          <el-input v-model="form.name" auto-complete="off" placeholder="姓名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="出生日期" prop="birthday">
          <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="性别" prop="gender">
          <el-radio v-model="form.gender" label="男">男</el-radio>
          <el-radio v-model="form.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="家庭住址" prop="homeAddress">
          <el-input v-model="form.homeAddress" auto-complete="off" placeholder="家庭住址"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="学历" prop="education">
          <el-select v-model="form.education" placeholder="请选择学历">
            <el-option
              v-for="item in educationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="年收入" prop="annualIncome">
          <el-input v-model="form.annualIncome" auto-complete="off" placeholder="年收入"/>
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
        <el-form-item :label-width="formLabelWidth" label="有无违法记录" prop="havingIllegalRecord">
          <el-radio-group v-model="form.havingIllegalRecord">
            <el-radio :label="true">有</el-radio>
            <el-radio :label="false">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="有无犯罪记录" prop="havingCriminalRecord">
          <el-radio-group v-model="form.havingCriminalRecord">
            <el-radio :label="true">有</el-radio>
            <el-radio :label="false">无</el-radio>
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
} from '@/api/villager'
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
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入收入')
      } else {
        if (isNaN(value)) {
          callback(new Error('请输入数字'))
        } else {
          if (value < 0) {
            callback(new Error('不能小于0'))
          } else {
            callback()
          }
        }
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
        name: null,
        birthdayFrom: null,
        birthdayTo: null,
        gender: null,
        homeAddress: null,
        education: null,
        annualIncomeFrom: null,
        annualIncomeTo: null,
        maritalStatus: null,
        havingIllegalRecord: null,
        havingCriminalRecord: null
      },
      form: {
        name: '',
        birthday: null,
        gender: '',
        homeAddress: '',
        education: '',
        annualIncome: 0,
        maritalStatus: '',
        havingIllegalRecord: null,
        havingCriminalRecord: null,
        id: ''
      },

      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, message: '长度至少为2', trigger: 'blur' }
        ],
        birthday: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'blur'
          }
        ],
        gender: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }
        ],
        homeAddress: [
          {
            required: true,
            max: 100,
            message: '请输入家庭住址',
            trigger: 'blur'
          }
        ],
        education: [
          {
            required: true,
            message: '请选择学历',
            trigger: 'blur'
          }
        ],
        annualIncome: [
          {
            required: true,
            message: '请输入收入',
            trigger: 'blur'
          },
          {
            validator: checkNum,
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
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
    clickitemGender(e) {
      e === this.search.gender
        ? (this.search.gender = null)
        : (this.search.gender = e)
    },
    clickItemIllegal(e) {
      e === this.search.havingIllegalRecord
        ? (this.search.havingIllegalRecord = null)
        : (this.search.havingIllegalRecord = e)
    },
    clickItemCriminal(e) {
      e === this.search.havingCriminalRecord
        ? (this.search.havingCriminalRecord = null)
        : (this.search.havingCriminalRecord = e)
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
