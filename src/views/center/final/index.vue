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
          <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable style="width:250px;" />
        </el-form-item>
        <el-form-item>
        <el-input v-model="tableInfo.companyName" placeholder="业主名称查询" clearable style="width:250px;" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="tableInfo.firstExamine" clearable placeholder="全部状态">
          <el-option
            v-for="item in options"
            :key="item.firstExamine"
            :label="item.label"
            :value="item.firstExamine">
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
        <el-table-column prop="companyName" label="业主名称" />
        <el-table-column prop="endExamineSubmintTime" label="提交时间" />
        <el-table-column prop="createUserNickName" label="负责人" />
        <el-table-column label="终审状态">
          <template slot-scope="scope">
            <span v-if="scope.row.thirdExamine == 0">待提交</span>
            <span v-else-if="scope.row.thirdExamine == 1" style="color:#F59A23;">待审核</span>
            <span v-else-if="scope.row.thirdExamine == 3" style="color:#1890FF;">终审通过</span>
            <span v-else-if="scope.row.thirdExamine == 2" style="color:#D9001B;">终审未通过</span>
            <span v-else-if="scope.row.thirdExamine == 99">项目已终止</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
            <el-button type="text" @click="approval(scope.row.projectId)">审批记录</el-button>
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
import { getExamineList, getProjectExamineLog } from '@/api/listProject'

import ApprovalLog from '@/components/Log/ApprovalLog.vue'

export default {
  name: 'Final',
  data() {
    return {
      tableInfo: {
        companyName: '',
        projectName: '',
        firstExamine: '',
        type: 2,
        pageIndex: 1,
        pageSize: 10
      },
      options: [
        {
          firstExamine: '1',
          label: '审核中'
        }, 
        {
          firstExamine: '3',
          label: '审核通过'
        }, 
        {
          firstExamine: '2',
          label: '审核未通过'
        }, 
        {
          firstExamine: '99',
          label: '项目已终止'
        }
      ],
      tableData: [],
      total: 0,

      // 审批记录
      logVisible: false,
      activities: []
    }
  },
  components: { ApprovalLog },
  created() {
    this.getList()
  },
  methods: {
    // 列表请求
    getList() {
      getExamineList(this.tableInfo).then(res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
      })
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        companyName: '',
        firstExamine: '',
        firstExamine: '',
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getList()
    },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'FinalDetail', query: { 
        projectId: row.projectId,
        createTime: row.createTime,
        createUserNickName: row.createUserNickName,
        createUserPhone: row.createUserPhone,
        projectName: row.projectName,
        thirdExamine: row.thirdExamine
       } })
    },
    
    // 审批记录
    approval(projectId) {
      getProjectExamineLog({ projectId }).then(res => {
        this.activities = res.data
      })
      this.logVisible = true
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.getList()
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