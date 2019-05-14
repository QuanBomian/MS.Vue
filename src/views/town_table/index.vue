<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <!-- <el-input v-model="search.townName" placeholder="请输入乡镇名" clearable/> -->
          <el-autocomplete
            v-model="search.townName"
            :fetch-suggestions="querySearch"
            class="inline-input"
            placeholder="请输入乡镇名"
            clearable
          />
        </el-col>

        <el-col :span="6">
          <!-- <el-input v-model="search.address" placeholder="请输入地址"/> -->
          <el-autocomplete
            v-model="search.address"
            :fetch-suggestions="querySearch1"
            class="inline-input"
            placeholder="请输入地址"
            clearable
          />
        </el-col>
        <el-col :span="6">
          <!-- <el-input v-model="search.mayorName" placeholder="请输入镇长姓名"/> -->
          <el-autocomplete
            v-model="search.mayorName"
            :fetch-suggestions="querySearch2"
            class="inline-input"
            placeholder="请输入镇长姓名"
            clearable
          />
        </el-col>
        <el-col :span="6">
          <!-- <el-input v-model="search.secretaryName" placeholder="请输入党委书记姓名"/> -->
          <el-autocomplete
            v-model="search.secretaryName"
            :fetch-suggestions="querySearch3"
            class="inline-input"
            placeholder="请输入党委书记姓名"
            clearable
          />
        </el-col>
        <el-col :span="8">
          <!-- <el-input v-model="search.chairmanName" placeholder="请输入人大委员长姓名" clearable/> -->
          <el-autocomplete
            v-model="search.chairmanName"
            :fetch-suggestions="querySearch4"
            class="inline-input"
            placeholder="请输入人大委员长姓名"
            clearable
          />
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="6">
          <!-- <el-input v-model="search.contactPhone" placeholder="请输入联系电话" clearable/> -->
          <el-autocomplete
            v-model="search.contactPhone"
            :fetch-suggestions="querySearch5"
            class="inline-input"
            placeholder="请输入联系电话"
            clearable
          />
        </el-col>
        <el-col :span="6">
          <!-- <el-input v-model="search.areaNumber" placeholder="请输入行政编码"/> -->
          <el-autocomplete
            v-model="search.areaNumber"
            :fetch-suggestions="querySearch6"
            class="inline-input"
            placeholder="请输入行政编码"
            clearable
          />
        </el-col>
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
      <el-table-column label="乡镇名" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.townName }}</template>
      </el-table-column>
      <el-table-column label="行政编码" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.areaNumber }}</template>
      </el-table-column>
      <el-table-column label="行政级别" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.governmentLevel|governmentLevelString }}</template>
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
          <el-input v-model="form.governmentLevel" auto-complete="off" placeholder="行政级别" disabled/>
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
import {
  getPagedList,
  deleteItem,
  updateItem,
  createItem,
  query
} from '@/api/town'
var governmentLevelMap = new Map([
  [1, '省级'],
  [2, '地级'],
  [3, '县级'],
  [4, '乡级'],
  [5, '村级']
])
export default {
  filters: {
    governmentLevelString(oldVal) {
      return governmentLevelMap.get(oldVal)
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
        ],
        areaNumber: [
          {
            required: true,
            message: '请输入行政编码',
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
        ]
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    querySearch(queryString, cb) {
      var list = this.list
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list
      for (var i = 0; i < results.length; i++) {
        results[i].value = results[i].townName
      }
      cb(results)
    },
    createFilter(queryString) {
      return list => {
        return list.townName.indexOf(queryString) === 0
      }
    },
    querySearch1(queryString, cb) {
      var list = this.list
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list
      for (var i = 0; i < results.length; i++) {
        results[i].value = results[i].address
      }
      cb(results)
    },
    createFilter1(queryString) {
      return list => {
        return list.address.indexOf(queryString) === 0
      }
    },
    querySearch2(queryString, cb) {
      var list = this.list
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list
      for (var i = 0; i < results.length; i++) {
        results[i].value = results[i].mayorName
      }
      cb(results)
    },
    createFilter2(queryString) {
      return list => {
        return list.mayorName.indexOf(queryString) === 0
      }
    },
    querySearch3(queryString, cb) {
      var list = this.list
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list
      for (var i = 0; i < results.length; i++) {
        results[i].value = results[i].secretaryName
      }
      cb(results)
    },
    createFilter3(queryString) {
      return list => {
        return list.secretaryName.indexOf(queryString) === 0
      }
    },
    querySearch4(queryString, cb) {
      var list = this.list
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list
      for (var i = 0; i < results.length; i++) {
        results[i].value = results[i].chairmanName
      }
      cb(results)
    },
    createFilter4(queryString) {
      return list => {
        return list.chairmanName.indexOf(queryString) === 0
      }
    },
    querySearch5(queryString, cb) {
      var list = this.list
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list
      for (var i = 0; i < results.length; i++) {
        results[i].value = results[i].contactPhone
      }
      cb(results)
    },
    createFilter5(queryString) {
      return list => {
        return list.contactPhone.indexOf(queryString) === 0
      }
    },
    querySearch6(queryString, cb) {
      var list = this.list
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list
      for (var i = 0; i < results.length; i++) {
        results[i].value = results[i].areaNumber
      }
      cb(results)
    },
    createFilter6(queryString) {
      return list => {
        return list.areaNumber.indexOf(queryString) === 0
      }
    },
    handleSizeChange() {
      this.fetchData()
    },
    handleCurrentChange() {
      this.fetchData()
    },
    clearValidation() {
      if (this.$refs['ruleForm'] !== undefined) {
        this.$refs['ruleForm'].clearValidate()
      }
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
      this.form = {}
      this.form.governmentLevel = 4
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
