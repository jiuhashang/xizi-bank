<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审批中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>{{ $route.meta.title }}</h2>
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
        <el-form-item>
          <el-select v-model="tableInfo.type" clearable placeholder="全部进度">
            <el-option
              v-for="item in options"
              :key="item.type"
              :label="item.label"
              :value="item.type">
            </el-option>
          </el-select>
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
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="当前进度">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0 || scope.row.status == 2">待录入</span>
            <span v-else-if="scope.row.status == 1">初审审核</span>
            <span v-else-if="scope.row.status == 3 && ( scope.row.firstExamineType == 1 || scope.row.firstExamineType == 4 )">图纸复核</span>
            <span v-else-if="scope.row.status == 3 && ( scope.row.firstExamineType == 2 || scope.row.firstExamineType == 5 )">材料补充</span>
            <span v-else-if="scope.row.status == 3 && ( scope.row.firstExamineType == 3 || scope.row.firstExamineType == 6 )">终审审核</span>
            <span v-else-if="scope.row.status == 7">立项补充</span>
            <span v-else-if="scope.row.status == 99">项目终止</span>
          </template>
        </el-table-column>
        <el-table-column prop="shareCountNum" label="已分享机构数" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">管理分享</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { getShareBankProjectList } from '@/api/integrated'

export default {
  name: 'Share',
  data() {
    return {
      tableInfo: {
        companyName: '',
        projectName: '',
        type: '',
        pageIndex: 1,
        pageSize: 10
      },
      options: [
        {
          type: '0',
          label: '项目录入'
        }, 
        {
          type: '1',
          label: '项目审核'
        }, 
        {
          type: '2',
          label: '图纸复核'
        }, 
        {
          type: '3',
          label: '材料补充'
        }, 
        {
          type: '4',
          label: '终审审核'
        },
        {
          type: '5',
          label: '立项补充'
        },
        {
          type: '6',
          label: '项目终止'
        }
      ],
      tableData: [],
      total: 0
    }
  },
  created() {
    this.getShareBankProjectList()
  },
  methods: {
    // 列表请求
    getShareBankProjectList() {
      getShareBankProjectList(this.tableInfo).then(res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
      })
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getShareBankProjectList()
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
      this.getShareBankProjectList()
    },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'ShareDetail', query: { 
        projectId: row.projectId,
        createTime: row.createTime,
        createUserNickName: row.createUserNickName,
        createUserPhone: row.createUserPhone,
        projectName: row.projectName,
        companyName: row.companyName
       } })
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.getShareBankProjectList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.getShareBankProjectList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .shang {
    height: 97px;
    background-color: #fff;
    .el-breadcrumb {
      padding: 15px 0 0 25px;
    }
    h2 {
      text-align: left;
      padding-left: 25px;
    }
  }
  .el-form {
    width: 80%;
  }
  .el-alert {
    margin-bottom: 25px;
  }
</style>