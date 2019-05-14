<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <el-row :gutter="10" style="margin-buttom: 15px;" type="flex">
        <el-col :span="6">
          <el-input v-model="search.villageName" placeholder="所属村名" clearable/>
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
      <el-table-column label="所属村名" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.villageName }}</template>
      </el-table-column>
      <el-table-column label="办公楼数量" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.officeBuildingNumber }}</template>
      </el-table-column>
      <el-table-column label="办公楼面积" width="140" align="center">
        <template slot-scope="scope">{{ scope.row.officeBuildingArea }}</template>
      </el-table-column>
      <el-table-column label="服务站数量" width="240" align="center">
        <template slot-scope="scope">{{ scope.row.serviceStationNumber }}</template>
      </el-table-column>
      <el-table-column label="老年人活动中心数量" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.seniorCitizenCenterNumber }}</template>
      </el-table-column>
      <el-table-column label="老年人活动中心面积" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.seniorCitizenCenterArea }}</template>
      </el-table-column>
      <el-table-column label="文体活动室数量" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.sportsActivityRoomNumber }}</template>
      </el-table-column>
      <el-table-column label="文体活动室面积" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.sportActivityRoomArea }}</template>
      </el-table-column>
      <el-table-column label="员工宿舍数量" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.staffQuartersNumber }}</template>
      </el-table-column>
      <el-table-column label="员工宿舍面积" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.staffQuarterArea }}</template>
      </el-table-column>
      <el-table-column label="图书馆数量" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.libraryNumber }}</template>
      </el-table-column>
      <el-table-column label="图书馆藏书数量" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.libaryCollectionsNumber }}</template>
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
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="村信息">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="所属村名" prop="villageName">
          <el-input v-model="form.villageName" auto-complete="off" placeholder="所属村名"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="办公楼数量" prop="officeBuildingNumber">
          <el-input v-model="form.officeBuildingNumber" auto-complete="off" placeholder="办公楼数量"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="办公楼面积" prop="officeBuildingArea">
          <el-input v-model="form.officeBuildingArea" auto-complete="off" placeholder="办公楼面积"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="服务站数量" prop="serviceStationNumber">
          <el-input v-model="form.serviceStationNumber" auto-complete="off" placeholder="服务站数量"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="老年人活动中心数量"
          prop="seniorCitizenCenterNumber"
        >
          <el-input
            v-model="form.seniorCitizenCenterNumber"
            auto-complete="off"
            placeholder="老年人活动中心数量"
          />
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="老年人活动中心面积 "
          prop="seniorCitizenCenterArea"
        >
          <el-input
            v-model="form.seniorCitizenCenterArea"
            auto-complete="off"
            placeholder="老年人活动中心面积"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="文体活动室数量" prop="sportsActivityRoomNumber">
          <el-input
            v-model="form.sportsActivityRoomNumber"
            auto-complete="off"
            placeholder="文体活动室数量"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="文体活动室面积" prop="sportActivityRoomArea">
          <el-input v-model="form.sportActivityRoomArea" auto-complete="off" placeholder="文体活动室面积"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="员工宿舍数量" prop="staffQuartersNumber">
          <el-input v-model="form.staffQuartersNumber" auto-complete="off" placeholder="员工宿舍数量"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="员工宿舍面积" prop="staffQuarterArea">
          <el-input v-model="form.staffQuarterArea" auto-complete="off" placeholder="员工宿舍面积"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="图书馆数量" prop="libraryNumber">
          <el-input v-model="form.libraryNumber" auto-complete="off" placeholder="图书馆数量"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="图案书馆藏书数量" prop="libaryCollectionsNumber">
          <el-input
            v-model="form.libaryCollectionsNumber"
            auto-complete="off"
            placeholder="图案书馆藏书数量"
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
  getPagedList,
  deleteItem,
  updateItem,
  createItem,
  query
} from '@/api/non_operating_assets'
export default {
  data() {
    var checkNum = (rule, value, callback) => {
      if (value) {
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
        villageName: ''
        // officeBuildingNumber: null,
        // // officeBuildingArea: null,
        // serviceStationNumber: null,
        // // serviceStationArea: null,
        // SeniorCitizenCenterNumber: null,
        // // SeniorCitizenCenterArea: null,
        // SportsActivityRoomNumber: null,
        // // SportActivityRoomArea: null,
        // StaffQuartersNumber: null,
        // // StaffQuarterArea: null,
        // LibraryNumber: null
        // // LibaryCollectionsNumber: null
      },
      form: {
        villageName: '',
        officeBuildingNumber: 0,
        officeBuildingArea: 0,
        serviceStationNumber: 0,
        seniorCitizenCenterNumber: 0,
        seniorCitizenCenterArea: 0,
        sportsActivityRoomNumber: 0,
        sportActivityRoomArea: 0,
        staffQuartersNumber: 0,
        staffQuarterArea: 0,
        libraryNumber: 0,
        libaryCollectionsNumber: 0,
        id: ''
      },

      rules: {
        villageName: [
          {
            required: true,
            message: '请输入所属村名',
            trigger: 'blur'
          }
        ],
        officeBuildingNumber: [
          {
            required: true,
            message: '请输入办公楼数量',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        officeBuildingArea: [
          {
            required: true,
            message: '请输入办公楼面积',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        serviceStationNumber: [
          {
            required: true,
            message: '请输入服务站数量',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        seniorCitizenCenterNumber: [
          {
            required: true,
            message: '请输入办公楼面积',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        seniorCitizenCenterArea: [
          {
            required: true,
            message: '请输入办公楼面积',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        sportsActivityRoomNumber: [
          {
            required: true,
            message: '请输入办公楼面积',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        sportActivityRoomArea: [
          {
            required: true,
            message: '请输入办公楼面积',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        libraryNumber: [
          {
            required: true,
            message: '请输入办公楼面积',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        libaryCollectionsNumber: [
          {
            required: true,
            message: '请输入办公楼面积',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        staffQuartersNumber: [
          {
            required: true,
            message: '请输入办公楼面积',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        staffQuarterArea: [
          {
            required: true,
            message: '请输入办公楼面积',
            trigger: 'blur'
          },
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ]
      },
      formLabelWidth: '180px'
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
