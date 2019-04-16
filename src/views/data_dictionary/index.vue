<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="0">
          <el-menu-item-group>
            <template slot="title">数据分类</template>
            <el-menu-item
              v-for="(categroy, i) in categroies"
              :key="i"
              :index="i.toString()"
              @click="handleClick(categroy.categroyCode)"
            >{{ categroy.categroyName }}</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <el-table
            :data="tableData"
            style="margin-top: 15px;"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="分类代码" width="80">
              <template slot-scope="scope">{{ scope.row.categroyCode }}</template>
            </el-table-column>
            <el-table-column label="数据项代码" width="100" align="center">
              <template slot-scope="scope">{{ scope.row.itemCode }}</template>
            </el-table-column>
            <el-table-column label="内容" width="200" align="center">
              <template slot-scope="scope">{{ scope.row.content }}</template>
            </el-table-column>

            <el-table-column label="操作" align="center" fixed="right" width="200">
              <template slot-scope="scope">
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getListOfDataCategroy } from '@/api/data_categroy'
import { getListsByCategroyId } from '@/api/data_item'
export default {
  data() {
    return {
      categroies: [],
      tableData: []
    }
  },
  created() {
    this.fetchDataCategroy()
  },
  methods: {
    handleClick(id) {
      getListsByCategroyId(id).then(reponse => {
        this.tableData = reponse.list
        console.log(this.tableData)
      })
    },
    fetchDataCategroy() {
      getListOfDataCategroy().then(reponse => {
        this.categroies = reponse.items
        getListsByCategroyId(reponse.items[0].categroyCode).then(reponse => {
          this.tableData = reponse.list
          console.log(this.tableData)
        })
      })
    }
  }
}
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
