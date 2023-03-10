<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>综合管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>{{ $route.meta.title }}</h2>
    </div>
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline>
          <el-form-item>
            <el-input v-model="tableInfo.bankName" placeholder="机构名称查询" clearable style="width:250px;" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="tableInfo.loginPhone" placeholder="手机号码查询" clearable style="width:250px;" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="tableInfo.status" clearable placeholder="全部状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="停用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="create">创建机构</el-button>
        </div>
      </div>
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column prop="loginPhone" label="登录手机号" />
        <el-table-column prop="contactName" label="联系人" />
        <el-table-column prop="bankName" label="机构名称" />
        <el-table-column prop="email" label="电子邮箱" />
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status == 0" type="success">已启用</el-tag>
            <el-tag v-show="scope.row.status == 1" type="danger">已停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" v-show="scope.row.status == 1"  @click="handleEn(scope.row)">启用</el-button>
            <el-button type="text" v-show="scope.row.status == 0" @click="handleStop(scope.row)" style="color:red;">停用</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
    <!-- 创建机构 -->
    <el-dialog
      title="创建机构"
      :visible.sync="addDialogVisible"
      :close-on-click-modal="false"
      @close="handleClose"
      width="40%">
      <el-form ref="addRef" :model="addForm" label-width="100px">
        <el-form-item label="机构类型">
          <el-select v-model="addForm.bankType" placeholder="请选择" class="width100">
            <el-option label="银行" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="addForm.bankName" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item label="登录手机号">
          <el-input v-model="addForm.loginPhone" placeholder="请输入登录手机号"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="addForm.contactName" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="addForm.email" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="addForm.loginPassword" placeholder="请设置登录密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑机构 -->
    <el-dialog
      title="编辑机构"
      :visible.sync="editDialogVisible"
      :close-on-click-modal="false"
      @close="handleClose"
      width="40%">
      <el-form ref="addRef" :model="editForm" label-width="100px">
        <el-form-item label="机构类型">
          <el-select v-model="editForm.bankType" placeholder="请选择" class="width100">
            <el-option label="银行" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="editForm.bankName" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item label="登录手机号">
          <el-input v-model="editForm.loginPhone" placeholder="请输入登录手机号"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="editForm.contactName" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="editForm.email" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="editForm.loginPassword" placeholder="请设置登录密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBankList, addSeBankUser, updateBank } from '@/api/integrated'
import _ from 'lodash'
export default {
  name: 'Organization',
  data() {
    return {
      tableInfo: {
        bankName: '',
        loginPhone: '',
        status: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      rules: {
        projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }
          ],
        companyName: [
          { required: true, message: '请输入业主名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ]
      },
      // 创建机构
      addDialogVisible: false,
      addForm: {
        bankType: 0
      },

      // 编辑机构
      editDialogVisible: false,
      editForm: {},
    }
  },
  created() {
    this.getBankList()
  },
  methods: {
    // 列表请求
    getBankList() {
      getBankList(this.tableInfo).then(res => {
        const { current, records, total } = res.data
        this.tableData = records
        // this.currentPage = current
        this.total = total
      })
    },

    // 创建机构
    create() {
      this.addDialogVisible = true
    },
    handleAdd() {
      addSeBankUser(this.addForm).then(res => {
        console.log(res)
        this.$message.success(res.msg)
        this.addDialogVisible = false
        this.getBankList()
      })
    },
    // 编辑机构
    handleEdit(row) {
      this.editDialogVisible = true
      this.editForm = _.cloneDeep(row)
    },
    edit() {
      updateBank(this.editForm).then(res => {
        console.log(res)
        this.$message.success(res.msg)
        this.editDialogVisible = false
        this.getBankList()
      })
    },

    async handleEn(row) {
      const confirmResult = await this.$confirm('是否启用该机构?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      row.status = 0
      updateBank(row).then(res => {
        this.$message.success(res.msg)
        this.getBankList()
      })
    },
    async handleStop(row) {
      const confirmResult = await this.$confirm('禁用后，该机构无法登录，是否禁用？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      row.status = 1
      console.log(row)
      updateBank(row).then(res => {
        this.$message.success(res.msg)
        this.getBankList()
      })
    },
    handleClose() {
      this.addForm = {
        bankType: 0
      }
      this.editForm = {}
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getBankList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        bankName: '',
        loginPhone: '',
        status: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getBankList()
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.getBankList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.getBankList()
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
  .el-alert {
    margin-bottom: 25px;
  }
</style>