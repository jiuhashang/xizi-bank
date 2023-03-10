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
      <el-form ref="ruleForm" :model="tableInfo" inline>
        <el-form-item>
          <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable style="width:200px;" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="tableInfo.companyName" placeholder="公司名称查询" clearable style="width:200px;" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="tableInfo.bankId" placeholder="关联机构查询" clearable style="width:200px;" />
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
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="companyName" label="公司名称" />
        <el-table-column label="建站地址">
          <template slot-scope="scope">
            {{ scope.row.province }} - {{ scope.row.city }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="项目发起时间" />
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
            <el-button type="text" @click="handlePack(scope.row.projectId)">文件打包</el-button>
            <el-button type="text" @click="handlePdf(scope.row.projectId)">生成PDF</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
    <!-- 审批记录 -->
    <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
  </div>
</template>

<script>
import { getProjectExamineLog } from '@/api/listProject'
import { selectListAll, getProjectPdf } from '@/api/center'
import { readyDownFile } from '@/api/integrated'

import ApprovalLog from '@/components/Log/ApprovalLog.vue'

export default {
  name: 'Overview',
  data() {
    return {
      tableInfo: {
        companyName: '',
        projectName: '',
        bankId: '',
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
        },
      ],
      tableData: [],
      total: 0,
      projectIdList: [],
      // 审批记录
      logVisible: false,
      activities: []
    }
  },
  components: { ApprovalLog },
  created() {
    this.selectListAll()
  },
  methods: {
    // 列表请求
    selectListAll() {
      selectListAll(this.tableInfo).then(res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
      })
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.selectListAll()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        companyName: '',
        projectName: '',
        bankId: '',
        type: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.selectListAll()
    },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'OverviewDetail', query: { 
          projectId: row.projectId,
          createTime: row.createTime,
          createUserNickName: row.createUserNickName,
          createUserPhone: row.createUserPhone,
          projectName: row.projectName
        }
      })
    },
    // 审批记录
    approval(projectId) {
      getProjectExamineLog({projectId}).then(res => {
        this.activities = res.data
      })
      this.logVisible = true
    },
    handlePdf(projectId) {
      getProjectPdf({ projectId }).then(res => {
        window.open(res.data.url)
        this.$message.success('生成成功')
      })
    },
    handlePack(projectId) {
      this.$confirm('下载的项目资料将会以预下载的形式存储7日，请在下载管理中，下载至电脑内。', '提示', {
        confirmButtonText: '确定下载',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.projectIdList.push( projectId )
        readyDownFile( this.projectIdList ).then(res => {
          this.$message.success(res.msg)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })       
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.selectListAll()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.selectListAll()
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