<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资料收集</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width:240px;">
          <h2>&lt; {{ $route.meta.title }}</h2>
        </div>
        <div class="btnnn">
          <el-button size="small" @click="approval">审批记录</el-button>
          <el-button size="small" type="warning" @click="handleSave">保 存</el-button>
        </div>
      </div>
    </div>
    <el-card>
      <div class="xian">
        <div>项目信息</div>
      </div>
      <el-row :gutter="20" style="margin-top:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">创建时间</el-col>
            <el-col :span="16" class="span130">{{ $route.query.createTime }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">负责人</el-col>
            <el-col :span="16" class="span130">{{ $route.query.createUserNickName }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">负责人电话</el-col>
            <el-col :span="16" class="span130">{{ $route.query.createUserPhone }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:30px;margin-bottom:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">项目名称</el-col>
            <el-col :span="16" class="span130">{{ $route.query.projectName }}</el-col>
          </el-row>
        </el-col>
      </el-row>

      <div class="xian">
        <div>业主信息</div>
      </div>
      <el-row :gutter="20" style="margin-top:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">公司名称</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.companyName }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">统一社会信用代码</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.sameCreditCode }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">注册资本</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.registerMoney }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">公司性质</el-col>
            <el-col :span="16" class="span130">
              <span v-show="seProjectCompanyInfo.companyType == 0">央企</span>
                <span v-show="seProjectCompanyInfo.companyType == 1">外资</span>
                <span v-show="seProjectCompanyInfo.companyType == 2">国企</span>
                <span v-show="seProjectCompanyInfo.companyType == 3">上市公司</span>
                <span v-show="seProjectCompanyInfo.companyType == 4">股份制</span>
                <span v-show="seProjectCompanyInfo.companyType == 5">其他</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">建站地址</el-col>
            <el-col :span="16" class="span130">{{seProjectCompanyInfo.province}} {{seProjectCompanyInfo.city}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">详细地址</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.setAddress }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:30px;margin-bottom:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">公司联系人</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.legalPerson }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">联系人手机号</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.companyPhone }}</el-col>
          </el-row>
        </el-col>
      </el-row>

      <div class="xian">
        <div>立项补充</div>
      </div>
      <el-form ref="form" :model="seProjectEndSupplementFile" style="margin-left:60px;margin-top:30px;" label-width="140px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="能源管理合同" class="must-form-item">
              <file-upload-string
                v-model="seProjectEndSupplementFile.energyContractFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm">
              </file-upload-string>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:25px;">
            <el-form-item label="项目建议书" class="must-form-item">
              <file-upload-string
                v-model="seProjectEndSupplementFile.adviseBookFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm">
              </file-upload-string>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:48px;">
            <el-form-item label="备案文件" class="must-form-item">
              <file-upload-string
                v-model="seProjectEndSupplementFile.recordFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm">
              </file-upload-string>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="接入文件" class="must-form-item">
              <file-upload-string
                v-model="seProjectEndSupplementFile.insertFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm">
              </file-upload-string>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:25px;">
            <el-form-item label="营业执照" class="must-form-item">
              <file-upload-string
                v-model="seProjectEndSupplementFile.businessFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm">
              </file-upload-string>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:48px;">
            <el-form-item label="关联项目公司" class="must-form-item">
              <el-input v-model="seProjectEndSupplementFile.projectCompanyName" placeholder="请输入" clearable @input="handleInput" @clear="handleClear" />
            </el-form-item>
            <div class="divul" v-show="options.length">
              <ul style="list-style: none;">
                <li v-for="(item, index) in options" :key="item.id" class="divli" @click="handleSelect(item, index)">{{ item.name }}</li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="补充说明">
              <el-input v-model="seProjectEndSupplementFile.otherMessage" class="width100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 审批记录 -->
      <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
    </el-card>
  </div>
</template>

<script> 
import { getProjectInfo, getProjectExamineLog, setProjectInput, getByCompanyName } from '@/api/listProject'

import ApprovalLog from '@/components/Log/ApprovalLog.vue'

export default {
  name: 'AddedDetail',
  data() {
    return {
      projectId: '',
      logVisible: false, // 审批记录
      activities: [],
      seProjectCompanyInfo: {}, // 业主信息
      seProjectEndSupplementFile: { // 立项补充
        projectId: this.$route.query.projectId
      }, 
      options: [],
    }
  },
  components: { ApprovalLog },
  created() {
    this.projectId = this.$route.query.projectId
    this.getProjectInfo( this.projectId )
  },
  methods: {
    getProjectInfo( projectId ) {
      getProjectInfo({ projectId }).then(res => {
        const { seProjectCompanyInfo, seProjectEndSupplementFile } = res.data
        this.seProjectCompanyInfo = seProjectCompanyInfo
        this.seProjectEndSupplementFile = { ...seProjectEndSupplementFile }
      })
    },
    handleInput() {
      getByCompanyName({ companyName: this.seProjectEndSupplementFile.projectCompanyName }).then(res => {
        this.options = res.data.orders
      })
    },
    handleSelect(item, index) {

    },
    handleClear() {},
     // 审批记录
    approval() {
      getProjectExamineLog({ projectId: this.projectId }).then( res => {
        this.activities = res.data
      })
      this.logVisible = true
    },
    // 保存
    handleSave() {
      this.seProjectEndSupplementFile.projectId = this.$route.query.projectId
      setProjectInput( this.seProjectEndSupplementFile ).then(res => {
        this.$message.success('保存成功')
        this.getProjectInfo(this.projectId)
      })
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
    color: #1890FF;
    border-bottom: 1px solid #1890FF;
    padding-bottom: 5px;
    div {
      border-left: 4px solid #1890FF;
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
  .custom-upload-files {
    text-align: left;
  }
  .must-form-item {
    /deep/ .el-form-item__label:before {
      content: '*';
      color: red;
      margin-right: 4px;
    }
  }
  .divul {
    width: 300px;
    height: 310px;
    background-color: #fff;
    position: absolute;
    top: 170px;
    left: 153px;
    border:1px solid #DCDFE6;
    border-radius: 5px;
  }
  .divli {
    margin-bottom: 10px;
  }
</style>
