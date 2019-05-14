<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <el-input v-model="search.memberCode" placeholder="党员代码" clearable/>
        </el-col>

        <el-col :span="10">
          <el-input v-model="search.departmentCode" placeholder="部门代码" clearable/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.partyMemberName" placeholder="姓名" clearable/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="8">
          <el-input v-model="search.nationality" placeholder="民族" clearable/>
        </el-col>

        <el-col :span="8">
          <el-select v-model="search.education" placeholder="请选择文化水平" clearable>
            <el-option
              v-for="item in educationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.partyPosition" placeholder="党内职务" clearable/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="8">
          <el-date-picker
            v-model="search.birthdayFrom"
            :picker-options="pickerOptions"
            clearable
            type="date"
            placeholder="开始出生日期"
          />
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="search.birthdayTo"
            :picker-options="pickerOptions"
            clearable
            type="date"
            placeholder="结束出生日期"
          />
        </el-col>

        <el-col :span="8">
          <el-input v-model="search.partyOrganizationName" placeholder="党组织" clearable/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="8">
          <el-input v-model="search.contactPhone" placeholder="联系电话" clearable/>
        </el-col>
        <el-col :span="8">
          <el-radio-group v-model="search.gender">
            <el-radio label="男" @click.native.prevent="clickitemGender('男')">男</el-radio>
            <el-radio label="女" @click.native.prevent="clickitemGender('女')">女</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="8">
          <el-radio-group v-model="search.isFullMember">
            <el-radio :label="true" @click.native.prevent="clickitem(true)">是</el-radio>
            <el-radio :label="false" @click.native.prevent="clickitem(false)">否</el-radio>
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
      <el-table-column label="党员代码" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.partyMemberCode }}</template>
      </el-table-column>
      <el-table-column label="姓名" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.partyMemberName }}</template>
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
      <el-table-column label="文化水平" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.education }}</template>
      </el-table-column>
      <el-table-column label="党内职务" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.partyPosition }}</template>
      </el-table-column>
      <el-table-column label="出生日期" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.housingArea|dateString }}</template>
      </el-table-column>
      <el-table-column label="党组织" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.partyOrganizationName }}</template>
      </el-table-column>
      <el-table-column label="联系电话" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.contactPhone }}</template>
      </el-table-column>
      <el-table-column label="所属村名" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.villageName }}</template>
      </el-table-column>
      <el-table-column label="是否正式党员" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.isFullMember|recordString }}</template>
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
    <el-pagination
      :page-size.sync="pageSize"
      :total="currentTotal"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 模态框 -->
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="党员信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="党员编码" prop="partyMemberCode">
          <el-input v-model="form.partyMemberCode" auto-complete="off" placeholder="党员编码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="党员姓名" prop="partyMemberName">
          <el-input v-model="form.partyMemberName" auto-complete="off" placeholder="党员姓名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="部门编码" prop="departmentCode">
          <el-input v-model="form.departmentCode" auto-complete="off" placeholder="部门编码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="民族" prop="nationality">
          <el-input v-model="form.nationality" auto-complete="off" placeholder="民族"/>
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
        <el-form-item :label-width="formLabelWidth" label="党内职务" prop="partyPosition">
          <el-input v-model="form.partyPosition" auto-complete="off" placeholder="党内职务"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="出生日期" prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            :picker-options="pickerOptions"
            :clearable="false"
            type="date"
            placeholder="生日"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="党组织" prop="partyOrganizationName">
          <el-input v-model="form.partyOrganizationName" auto-complete="off" placeholder="党组织"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone" auto-complete="off" placeholder="联系电话"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="所属村名" prop="villageName">
          <el-input v-model="form.villageName" auto-complete="off" placeholder="所属村名"/>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="是否正式党员" prop="isFullMember">
          <el-radio-group v-model="form.isFullMember">
            <el-radio :label="true">正式党员</el-radio>
            <el-radio :label="false">预备党员</el-radio>
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
  getPagedList,
  deleteItem,
  updateItem,
  createItem,
  query
} from '@/api/partymember'
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
      currentPage: 1,
      pageSize: 30,
      currentTotal: 0,
      originList: null,
      list: null,
      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      isEdit: true,
      editIndex: null,
      search: {
        memberCode: null,
        partymemberName: null,
        villageName: null,
        partyOrganizationName: null,
        departmentCode: null,
        gender: null,
        nationality: null,
        partyPosition: null,
        birthdayFrom: null,
        birthdayTo: null,
        education: null,
        contactPhone: null,
        isFullMember: null
      },
      originForm: {
        partyMemberCode: '',
        partymemberName: '',
        villageName: '',
        partyOrganizationName: '',
        departmentCode: '',
        gender: '男',
        nationality: '',
        partyPosition: '',
        birthday: new Date(1970, 1, 1),
        education: '本科',
        contactPhone: '',
        isFullMember: true
      },
      form: {
        partyMemberCode: '',
        partymemberName: '',
        villageName: '',
        partyOrganizationName: '',
        departmentCode: '',
        gender: '',
        nationality: '',
        partyPosition: '',
        birthday: '',
        education: '',
        contactPhone: '',
        isFullMember: null,
        id: ''
      },
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },

      rules: {
        partyMemberCode: [
          { required: true, message: '请输入党员编码', trigger: 'blur' }
        ],
        partymemberName: [
          {
            required: true,
            message: '请输入党员姓名',
            trigger: 'blur'
          }
        ],
        partyOrganizationName: [
          { required: true, message: '请输入党组织名', trigger: 'blur' }
        ],
        departmentCode: [
          { required: true, message: '请输入部门代码', trigger: 'blur' }
        ],
        nationality: [
          { required: true, message: '请输入民族', trigger: 'blur' }
        ],
        partyPosition: [
          { required: true, message: '请输入党内职务', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        villageName: [
          { required: true, message: '请输入所属村名', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange() {
      this.fetchData()
    },
    handleCurrentChange() {
      this.fetchData()
    },
    clickitem(e) {
      e === this.search.isFullMember
        ? (this.search.isFullMember = null)
        : (this.search.isFullMember = e)
    },
    clearValidation() {
      if (this.$refs['ruleForm'] !== undefined) {
        this.$refs['ruleForm'].clearValidate()
      }
    },
    setToDefault() {
      this.form = Object.assign({}, this.from, this.originForm)
    },
    clickitemGender(e) {
      e === this.search.gender
        ? (this.search.gender = null)
        : (this.search.gender = e)
    },
    fetchData() {
      this.listLoading = true
      getPagedList(this.currentPage, this.pageSize).then(response => {
        this.list = response.items.data
        this.currentTotal = response.items.currentTotal
        this.currentPage = response.items.pageIndex
        this.originList = response.items.data
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
