<template>
  <div align="center">
    <div class="box">
      <p>下方是可供下载的各类文件</p>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="文件" width="240" align="left">
          <template slot-scope="scope">
            <i class="el-icon-document"/>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="EXCEL 2007" align="center">
          <template slot-scope="scope">
            <el-link :href="scope.row.url" type="primary" target="_blank">xlsx</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '村民档案',
          url: 'http://localhost:5543/api/Villagers/excel?isProtected=0'
        },
        {
          name: '村档案',
          url: 'http://localhost:5543/api/Villages/excel?isProtected=0'
        },
        {
          name: '乡镇档案',
          url: 'http://localhost:5543/api/Towns/excel?isProtected=0'
        },
        {
          name: '党员档案',
          url: 'http://localhost:5543/api/PartyMembers/excel?isProtected=0'
        },
        {
          name: '家庭档案',
          url: 'http://localhost:5543/api/PartyMembers/excel?isProtected=0'
        },
        {
          name: '组织机构档案',
          url: 'http://localhost:5543/api/Departments/excel?isProtected=0'
        },
        {
          name: '村非经营性资产档案',
          url:
            'http://localhost:5543/api/NonOperatingAssetss/excel?isProtected=0'
        },
        {
          name: '村民小组档案',
          url: 'http://localhost:5543/api/VillagerGroups/excel?isProtected=0'
        }
      ]
    }
  }
}
</script>
<style scoped>
.box {
  text-align: left;
  font-family: 'Georgia,Palatino,Times,Roman';
  font-size: 11pt;
  padding: 0.5em 0.5em 0.5em 1.5em;
  margin-left: 2em;
  margin-right: 3em;
  margin-top: 3em;
  width: 80%;
  background: #f7f7f7;
  border: 2px solid #cccccc;
}
</style>

