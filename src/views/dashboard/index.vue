<template>
  <div class="dashboard">
    <div class="top">
      <img :src="image" alt="">
      <h2>你好，{{ bankName }}</h2>
    </div>
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline>
          <el-form-item>
            <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable style="width:250px;" />
          </el-form-item>
          <el-form-item>
          <el-input v-model="tableInfo.companyName" placeholder="公司名称查询" clearable style="width:250px;" />
        </el-form-item>
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="companyName" label="公司名称" />
        <el-table-column prop="expireTime" label="分享到期时间" />
        <el-table-column label="权限">
          <template slot-scope="scope">
            <span v-show="scope.row.downFlag == 0">仅查看</span>
            <span v-show="scope.row.downFlag == 1">可文件下载</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { getBankProjectList } from '@/api/bank'
export default {
  name: 'Dashboard',
  data() {
    return {
      tableInfo: {
        companyName: '',
        projectName: '',
        type: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    this.getBankProjectList()
  },
  methods: {
    // 列表请求
    getBankProjectList() {
      getBankProjectList(this.tableInfo).then(res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
      })
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getBankProjectList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        companyName: '',
        projectName: '',
        type: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getBankProjectList()
    },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'DashboardDetail', query: { 
          projectId: row.projectId,
          createTime: row.createTime,
          createUserNickName: row.createUserNickName,
          createUserPhone: row.createUserPhone,
          projectName: row.projectName,
          companyName: row.companyName
        } 
      })
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.getBankProjectList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.getBankProjectList()
    }
  },
  computed: {
    bankName() {
      return window.sessionStorage.getItem('bankName')
    },
    image() {
      return window.sessionStorage.getItem('image')
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 125px;
  display: flex;
  padding: 30px 15px 30px 30px;
  background-color: #fff;
  box-sizing: border-box;
  line-height: 15px;
}
img {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  margin-right: 15px;
}
</style>