<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审批中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width: 240px">
          <h2>&lt; {{ $route.meta.title }}</h2>
        </div>
      </div>
    </div>
    <el-card>
      <div class="xian">
        <div>项目信息</div>
      </div>
      <el-row :gutter="20" style="margin: 30px">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">创建时间</el-col>
            <el-col :span="16" class="span130">{{$route.query.createTime}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">负责人</el-col>
            <el-col :span="16" class="span130">{{$route.query.createUserNickName}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">负责人电话</el-col>
            <el-col :span="16" class="span130">{{$route.query.createUserPhone}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 30px">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">项目名称</el-col>
            <el-col :span="16" class="span130">{{$route.query.projectName}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">公司名称</el-col>
            <el-col :span="16" class="span130">{{$route.query.companyName}}</el-col>
          </el-row>
        </el-col>
      </el-row>

      <div class="xian">
        <div>分享情况</div>
      </div>
      <div style="margin-top: 15px;text-align:right;">
        <el-button size="small" @click="handleRemoveAll">全部移除</el-button>
        <el-button type="primary" size="small" @click="handleAdd">添加机构</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
        <el-table-column prop="bankName" label="机构名称" />
        <el-table-column prop="expireTime" label="分享自动失效时间" />
        <el-table-column label="分享状态">
          <template slot-scope="scope">
            <span v-if="scope.row.expireFlag == 0">分享中</span>
            <span v-else-if="scope.row.expireFlag == 1">已失效</span>
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column label="文件下载权限">
          <template slot-scope="scope">
            <span v-show="scope.row.downFlag == 0">未开通</span>
            <span v-show="scope.row.downFlag == 1">已开通</span>
          </template>
        </el-table-column>
        <el-table-column label="其他">
          <template slot-scope="scope">
            <el-button type="text" @click="handlePermission(scope.row)">权限管理</el-button>
            <el-button type="text" @click="handleExtend(scope.row)">延长时间</el-button>
            <el-button type="text" style="color:red;" @click="handleRemove(scope.row)">移除分享</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="添加机构"
      :visible.sync="addDialogVisible"
      :close-on-click-modal="false"
      @close="handleClose"
      width="40%">
       <el-table :data="addTableData" style="width: 100%" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
         <el-table-column label="" width="40">
          <template scope="scope">
            <el-radio
              :label="scope.$index"
              v-model="currentRow"
              @change.native="getCurrentRow(scope.row)"
              style="color: #fff; padding-left: 10px; margin-right: -25px"
            ></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="bankName" label="机构名称" />
        <el-table-column prop="contactName" label="联系人" />
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddBank">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分享权限"
      :visible.sync="shareDialogVisible"
      :close-on-click-modal="false"
      width="30%">
      <div style="text-align: center;">
        <el-checkbox checked disabled style="padding-right:50px;">查看</el-checkbox>
        <el-checkbox v-model="checked" @change="handleChange">文件下载</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shareDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddShare">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getShareBankList, getBank, shareBankProject, deleteShare, editOne } from '@/api/integrated'
export default {
  name: 'ShareDetail',
  data() {
    return {
      listInfo: {
        projectId: this.$route.query.projectId,
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],

      addDialogVisible: false,
      addTableData: [],
      total: 0,
      shareInfo: {
        projectId: this.$route.query.projectId,
        seBankUserList: [],
        downFlag: 0
      },

      shareDialogVisible: false,
      checked: false,
      shareQuery: {
        type: 1, 
        id: undefined,
        downFlag: undefined
      },

      currentRow: undefined,
      bankName: ''
    }
  },
  created() {
    this.getShareBankList()
  },
  methods: {
    getShareBankList() {
      getShareBankList(this.listInfo).then(res => {
        this.tableData = res.data.records
      })
    },
    handleAdd() {
      this.getBank()
      this.addDialogVisible = true
    },
    getCurrentRow(row) {
      this.bankName = row.bankName
      this.shareInfo.seBankUserList.push(row)
    },
    async handleAddBank() {
      if(this.shareInfo.seBankUserList.length < 1) { return this.$message.warning('请选择您要分享的机构') }
      const confirmResult = await this.$confirm(`是否对 ${this.bankName} 机构进行分享?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      this.addDialogVisible = false
      shareBankProject(this.shareInfo).then(res => {
        console.log(res)
        this.$message.success(res.msg)
        this.getShareBankList()
      }).catch(err => {
        this.addDialogVisible = false
      })
    },
    async handleRemove(row) {
      const confirmResult = await this.$confirm(`是否移除 ${row.bankName} 机构?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      deleteShare({
        id: row.id,
        projectId: row.projectId,
        type: 0
      }).then(res => {
        this.getShareBankList()
        this.$message.success(res.msg)
      })
    },
    async handleRemoveAll() {
      if(this.tableData.length < 1) { return this.$message.warning('当前暂无分享情况，请添加机构') }
      const confirmResult = await this.$confirm('是否全部移除机构?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      deleteShare({
        projectId: this.$route.query.projectId,
        type: 1
      }).then(res => {
        this.getShareBankList()
        this.$message.success(res.msg)
      })
    },
    async handleExtend(row) {
      const confirmResult = await this.$confirm(`是否延长 ${row.bankName} 机构的分享时间15天?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      editOne({
        type: 0,
        id: row.id
      }).then(res => {
        this.$message.success(res.msg)
        this.getShareBankList()
      })
    },
    handlePermission(row) {
      this.shareDialogVisible = true
      this.shareQuery.id = row.id
      if( row.downFlag == 0 ) { 
        this.checked = false 
      } else if( row.downFlag == 1 ) {
        this.checked = true
      }
    },
    handleAddShare() {
      editOne( this.shareQuery ).then(res => {
        this.shareDialogVisible = false
        this.$message.success(res.msg)
        this.getShareBankList()
      })
    },
    handleChange(val) {
      if(val) {
        this.shareQuery.downFlag = 1
      } else {
        this.shareQuery.downFlag = 0
      }
    },
    handleClose() {
      this.addTableData = []
      this.currentRow = undefined
      this.checked = false
    },
    getBank() {
      getBank( this.listInfo ).then(res => {
        this.addTableData = res.data.records
      })
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.listInfo.pageSize = val
      this.getBank()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.listInfo.pageIndex = val
      this.getBank()
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
  .back {
    position: relative;
    .btnnn {
      position: absolute;
      bottom: 0;
      right: 15px;
    }
  }
  h2 {
    padding-left: 25px;
    cursor: pointer;
  }
}

.xian {
  color: #1890ff;
  border-bottom: 1px solid #1890ff;
  padding-bottom: 5px;
  div {
    border-left: 4px solid #1890ff;
    padding-left: 15px;
  }
}
.span13 {
    font-size: 13px;
    color: #aaa;
    text-align: right;
  }
.span130 {
  font-size: 13px;
  color: #000;
}
</style>
