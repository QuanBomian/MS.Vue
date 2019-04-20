<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <el-input v-model="search.villageName" placeholder="请输入村名" clearable/>
        </el-col>

        <el-col :span="10">
          <el-input v-model="search.address" placeholder="请输入地址" clearable/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.mayorName" placeholder="请输入镇长姓名" clearable/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="8">
          <el-input v-model="search.secretaryName" placeholder="请输入党委书记姓名" clearable/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.villageHeadName" placeholder="请输入镇长姓名" clearable/>
        </el-col>

        <el-col :span="8">
          <el-input v-model="search.contactPhone" placeholder="请输入联系电话" clearable/>
        </el-col>
      </el-row>
      <el-row :gutter="8" style="margin-top: 15px;">
        <el-col :span="8">
          <el-input v-model="search.areaNumber" placeholder="请输入行政编码" clearable/>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.highAreaNumber" placeholder="请输入行政编码" clearable/>
        </el-col>
        <el-col :span="8">
          <el-select v-model="search.governmentLevel" placeholder="请选择行政级别" clearable>
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="5" style="margin-top: 15px;">
        <el-col :span="6">
          <el-select v-model="search.urbanRuralClassification" placeholder="请选择城乡分类" clearable>
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.groupCount" placeholder="请输入村民小组数量" clearable/>
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
      <el-table-column label="村名" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.villageName }}</template>
      </el-table-column>
      <el-table-column label="行政编码" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.areaNumber }}</template>
      </el-table-column>
      <el-table-column label="行政级别" width="140" align="center">
        <template slot-scope="scope">{{ scope.row.governmentLevel|governmentLevelString }}</template>
      </el-table-column>
      <el-table-column label="地址" width="240" align="center">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="村长姓名" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.villageHeadName }}</template>
      </el-table-column>
      <el-table-column label="党委书记姓名" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.secretaryName }}</template>
      </el-table-column>
      <el-table-column label="城乡分类" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.urbanRuralClassification }}</template>
      </el-table-column>
      <el-table-column label="村民小组数量" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.groupCount }}</template>
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
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="村信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="村名" prop="villageName">
          <el-input v-model="form.villageName" auto-complete="off" placeholder="村名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="地址" prop="address">
          <el-input v-model="form.address" auto-complete="off" placeholder="地址"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="上级行政区编码" prop="highLevelAreaNumber">
          <el-input v-model="form.highLevelAreaNumber" auto-complete="off" placeholder="上级行政区行政编码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="行政编码" prop="areaNumber">
          <el-input v-model="form.areaNumber" auto-complete="off" placeholder="行政编码"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="行政级别" prop="governmentLevel">
          <el-input v-model="form.governmentLevel" auto-complete="off" placeholder="行政级别"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="村长姓名" prop="villageHeadName">
          <el-input v-model="form.villageHeadName" auto-complete="off" placeholder="村长姓名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="党委书记姓名" prop="secretaryName">
          <el-input v-model="form.secretaryName" auto-complete="off" placeholder="党委书记姓名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="城乡分类" prop="urbanRuralClassification">
          <el-select v-model="form.urbanRuralClassification" placeholder="请选择城乡分类" clearable>
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="村民小组数量" prop="groupCount">
          <el-input v-model="form.groupCount" auto-complete="off" placeholder="村民小组数量"/>
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
  getList,
  deleteItem,
  updateItem,
  createItem,
  query
} from '@/api/village'
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
      originList: null,
      list: null,
      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      isEdit: true,
      editIndex: null,
      options1: [
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
      options2: [
        {
          value: 111,
          label: '主城区'
        },
        {
          value: 112,
          label: '城乡结合区'
        },
        {
          value: 121,
          label: '镇中心区'
        },
        {
          value: 123,
          label: '特殊区域'
        },
        {
          value: 210,
          label: '乡中心区'
        },
        {
          value: 220,
          label: '村庄'
        }
      ],
      search: {
        villageName: null,
        address: null,
        villageHeadName: null,
        secretaryName: null,
        highLevelAreaNumber: null,
        urbanRuralClassification: null,
        groupCount: null,
        contactPhone: null,
        areaNumer: '',
        governmentLevel: null
      },
      form: {
        villageName: '',
        areaNumer: '',
        highLevelAreaNumber: '',
        urbanRuralClassification: null,
        groupCount: null,
        governmentLevel: null,
        address: '',
        villageHeadName: '',
        secretaryName: '',
        contactPhone: '',
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
