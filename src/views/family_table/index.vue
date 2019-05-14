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
      <el-table-column label="家庭代码" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.familyCode }}</template>
      </el-table-column>
      <el-table-column label="户主" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.householder }}</template>
      </el-table-column>
      <el-table-column label="人口" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.peopleNumber }}</template>
      </el-table-column>
      <el-table-column label="户口属性" width="240" align="center">
        <template slot-scope="scope">{{ scope.row.accountCharacter }}</template>
      </el-table-column>
      <el-table-column label="村名" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.villageName }}</template>
      </el-table-column>
      <el-table-column label="所属村民小组编码" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.villageGroupCode }}</template>
      </el-table-column>
      <el-table-column label="人均年收入" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.averageAnnualIncome }}</template>
      </el-table-column>
      <el-table-column label="房屋面积" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.housingArea }}</template>
      </el-table-column>
      <el-table-column label="人均面积" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.averageHousingArea }}</template>
      </el-table-column>
      <el-table-column label="是否低保户" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.isLowIncome|recordString }}</template>
      </el-table-column>
      <el-table-column label="是否贫困户" width="220" align="center">
        <template slot-scope="scope">{{ scope.row.isPoor|recordString }}</template>
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
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="家庭信息">
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
        <el-form-item :label-width="formLabelWidth" label="所属村民小组编码" prop="villageGroupCode">
          <el-input v-model="form.villageGroupCode" auto-complete="off" placeholder="所属村民小组编码"/>
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
  getPagedList,
  deleteItem,
  updateItem,
  createItem,
  query
} from '@/api/family'
export default {
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
    var checkInt = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入收入')
      } else {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入整数'))
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
        householder: null,
        familyCode: null,
        peopleNumber: null,
        accountCharacter: null,
        villageName: null,
        villageGroupCode: null,
        averageAnnualIncome: null,
        housingArea: null,
        averageHousingArea: null,
        isLowIncome: null,
        isPoor: null
      },
      form: {
        householder: '',
        familyCode: '',
        peopleNumber: null,
        accountCharacter: '',
        villageName: '',
        villageGroupCode: '',
        averageAnnualIncome: null,
        HousingArea: null,
        averageHousingArea: null,
        isLowIncome: null,
        isPoor: null,
        id: ''
      },

      rules: {
        householder: [
          { required: true, message: '请输入户主', trigger: 'blur' }
        ],
        familyCode: [
          { required: true, message: '请输入家庭代码', trigger: 'blur' }
        ],
        peopleNumber: [
          { required: true, message: '请输入人口数', trigger: 'blur' },
          {
            validator: checkInt,
            trigger: 'blur'
          }
        ],
        accountCharacter: [
          { required: true, message: '请输入户口性质', trigger: 'blur' }
        ],
        villageName: [
          { required: true, message: '请输入所属村名', trigger: 'blur' }
        ],
        villageGroupCode: [
          { required: true, message: '请输入所属村民小组编码', trigger: 'blur' }
        ],
        averageAnnualIncome: [
          { required: true, message: '请输入人均年收入', trigger: 'blur' },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        housingArea: [
          {
            required: true,
            message: '请输入住宅面积',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        averageHousingArea: [
          {
            required: true,
            message: '请输入人均面积',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        isLowIncome: [
          {
            required: true,
            message: '请选择是否低保户',
            trigger: 'change'
          }
        ],
        isPoor: [
          {
            required: true,
            message: '请选择是否贫困户',
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
    handleSizeChange() {
      this.fetchData()
    },
    handleCurrentChange() {
      this.fetchData()
    },
    clickitemPoor(e) {
      e === this.form.isPoor
        ? (this.form.isPoor = null)
        : (this.form.isPoor = e)
    },
    clickitemLowIncome(e) {
      e === this.form.isLowIncome
        ? (this.form.isLowIncome = null)
        : (this.form.isLowIncome = e)
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
      this.clearValidation()
      this.isEdit = true
      this.editIndex = index
      this.form = Object.assign({}, obj)
      this.dialogFormVisible = true
    },
    handleSearch() {
      this.listLoading = false
      query(this.search).then(response => {
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
