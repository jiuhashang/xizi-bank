<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审批中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width:240px;">
          <h2>&lt; {{ $route.meta.title }}</h2>
        </div>
        <div class="btnnn">
          <el-button size="small" @click="handleApproval">审批记录</el-button>
          <el-button size="small" type="danger" @click="handleReject" v-show="secondExamine == 1">驳回审核</el-button>
          <el-button size="small" type="primary" @click="handlePass" v-show="secondExamine == 1">审核通过</el-button>
        </div>
      </div>
    </div>
    <el-card>
      <div class="xian">
        <div>项目信息</div>
      </div>
      <el-row :gutter="20" style="margin:30px;">
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
      <el-row :gutter="20" style="margin:30px;">
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
      <el-row :gutter="20" style="margin:30px;">
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
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">公司性质</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectCompanyInfo.companyType == 0">央企</span>
              <span v-else-if="seProjectCompanyInfo.companyType == 1">外资</span>
              <span v-else-if="seProjectCompanyInfo.companyType == 2">国企</span>
              <span v-else-if="seProjectCompanyInfo.companyType == 3">上市公司</span>
              <span v-else-if="seProjectCompanyInfo.companyType == 4">股份制</span>
              <span v-else>其他</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">建站地址</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.province }} {{ seProjectCompanyInfo.city }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">详细地址</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.setAddress }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
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
        <div>屋面信息</div>
      </div>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">屋面总面积</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyBuildInfo.houseArea }} m²</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">建筑物个数</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyBuildInfo.buildNum }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">屋面正南遮挡物</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectCompanyBuildInfo.houseSouthScreenFlag ==0">否</span>
              <span v-else>是</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">屋顶使用年限</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectCompanyBuildInfo.useYears == 0">0-5年</span>
              <span v-else-if="seProjectCompanyBuildInfo.useYears == 1">6-10年</span>
              <span v-else-if="seProjectCompanyBuildInfo.useYears == 2">11-15年</span>
              <span v-else-if="seProjectCompanyBuildInfo.useYears == 3">16-20年</span>
              <span v-else-if="seProjectCompanyBuildInfo.useYears == 4">21-25年</span>
              <span v-else-if="seProjectCompanyBuildInfo.useYears == 5">26-30年</span>
              <span v-else>31年以上</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">屋面材质</el-col>
            <el-col :span="16" class="span130">
              <span v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(0) !== -1">瓦铄屋面&nbsp;</span>
              <span v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(1) !== -1">混泥土屋面&nbsp;</span>
              <span v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(2) !== -1">彩钢瓦屋面&nbsp;</span>
              <span v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(3) !== -1">其他</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">彩钢瓦类型</el-col>
            <el-col :span="16" class="span130">
              <span v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(0) !== -1">无&nbsp;</span>
              <span v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(1) !== -1">直立锁边&nbsp;</span>
              <span v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(2) !== -1">角驰&nbsp;</span>
              <span v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(3) !== -1">T型&nbsp;</span>
              <span v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(4) !== -1">其他&nbsp;</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">彩钢瓦比水泥顶</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyBuildInfo.colorSteelCementTopScale }} %</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">其他屋面材质说明</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyBuildInfo.otherMessage }}</el-col>
          </el-row>
        </el-col>
      </el-row>

      <div class="xian">
        <div>供电现状</div>
      </div>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">供电类型</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectPowerInfo.prowerType == 0">工业</span>
              <span v-else-if="seProjectPowerInfo.prowerType == 1">商业</span>
              <span v-else-if="seProjectPowerInfo.prowerType == 2">农用</span>
              <span v-else>居民用电</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">变压器容量</el-col>
            <el-col :span="16" class="span130">{{ seProjectPowerInfo.transformerVolume }} kVA</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">变压器台数</el-col>
            <el-col :span="16" class="span130">{{ seProjectPowerInfo.transformerNum }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">预估装机容量</el-col>
            <el-col :span="16" class="span130">{{ seProjectPowerInfo.mayInstallVolume }} kW</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">法定节假日是否休息</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectPowerInfo.legalHolidayFlag == 1">是</span>
              <span v-else>否</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">周末生产情况</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectPowerInfo.weekendFlag == 0">单班</span>
              <span v-else-if="seProjectPowerInfo.weekendFlag == 1">双班</span>
              <span v-else>连续生产</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">中午设备是否停机</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectPowerInfo.noonEquipmentFlag == 1">是</span>
              <span v-else>否</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">其他供电说明</el-col>
            <el-col :span="16" class="span130">{{ seProjectPowerInfo.otherMessage }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-card style="margin-bottom:50px;">
        <div slot="header" class="clearfix">
          <span>变压器各台容量（选填）</span>
        </div>
        <div>
          <el-table :data="seProjectPowerTransformInfoList" style="width: 100%" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
            <el-table-column prop="transformName" label="变压器名称" />
            <el-table-column prop="transformVolume" label="容量（kVA）" />
          </el-table>
        </div>
      </el-card>
      
      <div class="xian">
        <div>合作模式</div>
      </div>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">合作模式</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectCooperate.cooperateType == 0">业主投资</span>
              <span v-else>其他投资</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" v-show="seProjectCooperate.cooperateType == 0">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">
              <el-checkbox v-model="seProjectCooperate.ownPutFlag" disabled></el-checkbox>
            </el-col>
            <el-col :span="16" class="span130">
              <span>业主自投，预算 : {{ seProjectCooperate.ownPutMoney }} 万元</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" v-show="seProjectCooperate.cooperateType == 1">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">
              <el-checkbox v-model="seProjectCooperate.electricityDiscountFlag" disabled></el-checkbox>
            </el-col>
            <el-col :span="16" class="span130">
              <span>电费折扣，比例 : {{ seProjectCooperate.electricityDiscountScale }} %</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" v-show="seProjectCooperate.cooperateType == 1">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">
              <el-checkbox v-model="seProjectCooperate.houseLeaseFlag" disabled></el-checkbox>
            </el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectCooperate.houseLeaseMoney">出租屋面，租金 : {{ seProjectCooperate.houseLeaseMoney }} 万元/年</span>
              <span v-else>出租屋面，租金 :</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <div class="xian">
        <div>近3年销售与利润</div>
      </div>
      <table style="width: 100%;text-align:center;margin:20px 0;" class="ht" cellpadding="0" cellspacing="0">
        <tr style="background:#f2f2f2;">
          <td></td>
          <td>2019年</td>
          <td>2020年</td>
          <td>2021年</td>
        </tr>
        <tr>
          <td>年销售额（万元）</td>
          <td>
            {{ first.sellMoney ? first.sellMoney : '-' }}
          </td>
          <td>
            {{ second.sellMoney ? second.sellMoney : '-' }}
          </td>
          <td>
            {{ three.sellMoney ? three.sellMoney : '-' }}
          </td>
        </tr>
        <tr>
          <td>年利润额（万元）</td>
          <td>
            {{ first.profix ? first.profix : '-' }}
          </td>
          <td>
            {{ second.profix ? second.profix : '-' }}
          </td>
          <td>
            {{ three.profix ? three.profix : '-' }}
          </td>
        </tr>
      </table>

      <div class="xian">
        <div>相关材料</div>
      </div>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">不动产权证或三证</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.realPropertyRightFile)"
              :disabled="seProjectRelevantFile.realPropertyRightFile == '' || seProjectRelevantFile.realPropertyRightFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">近12个月电费复核单</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.nearYearElectricityBill)"
              :disabled="seProjectRelevantFile.nearYearElectricityBill == '' || seProjectRelevantFile.nearYearElectricityBill == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">结构图</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.structureFile)"
              :disabled="seProjectRelevantFile.structureFile == '' || seProjectRelevantFile.structureFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">配电室内部照片</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.electricityRoomInsideFile)"
              :disabled="seProjectRelevantFile.electricityRoomInsideFile == '' || seProjectRelevantFile.electricityRoomInsideFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">建筑图</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.buildFile)"
              :disabled="seProjectRelevantFile.buildFile == '' || seProjectRelevantFile.buildFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">总平图</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.generalLayoutFile)"
              :disabled="seProjectRelevantFile.generalLayoutFile == '' || seProjectRelevantFile.generalLayoutFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">厂房内部照片</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.workShopInsideFile)"
              :disabled="seProjectRelevantFile.workShopInsideFile == '' || seProjectRelevantFile.workShopInsideFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">厂名正面照片</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.workShopFrontFile)"
              :disabled="seProjectRelevantFile.workShopFrontFile == '' || seProjectRelevantFile.workShopFrontFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">屋顶细节照片</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.houseTopDetailFile)"
              :disabled="seProjectRelevantFile.houseTopDetailFile == '' || seProjectRelevantFile.houseTopDetailFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">厂房内屋顶照片</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.workShopInsideTopFile)"
              :disabled="seProjectRelevantFile.workShopInsideTopFile == '' || seProjectRelevantFile.projectOtherFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">项目发起额外材料</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.projectOtherFile)"
              :disabled="seProjectRelevantFile.projectOtherFile == '' || seProjectRelevantFile.projectOtherFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">项目发起额外说明</el-col>
            <el-col :span="16" class="span130">
              <span>{{ seProjectRelevantFile.projectOtherMessage }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <div class="xian">
        <div>荷载报告</div>
      </div>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13 mt5">荷载报告</el-col>
            <el-col :span="16" class="span130" v-if="secondExamine == 1">
              <file-upload-string
                v-model="secondExamineReport"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm">
              </file-upload-string>
            </el-col>
            <el-col :span="16" class="span130" v-else>
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.secondExamineReport)"
              :disabled="seProjectRelevantFile.secondExamineReport == '' || seProjectRelevantFile.secondExamineReport == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <!-- 操作 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <el-alert :title="alert" type="success" :closable="false" style="margin-top:0;" />
      <el-input type="textarea" :rows="3" placeholder="最多输入200字符（选填）" v-model="message" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审批记录 -->
    <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
  </div>
</template>

<script>
import { getProjectInfo, getProjectExamineLog } from '@/api/listProject'
import { projectSecondExamine } from '@/api/center'

import ApprovalLog from '@/components/Log/ApprovalLog.vue'

export default {
  name: 'ReviewDetail',
  data() {
    return {
      secondExamine: '',
      province: '',
      city:'',
      activeName: 'first',
      projectId: '',
      seProjectCompanyInfo: {},
      seProjectCompanyBuildInfo: {}, 
      seProjectPowerInfo: {}, 
      seProjectPowerTransformInfoList: [], 
      seProjectCooperate: {}, 
      seProjectRelevantFile: {},
      yearSunShine: '',
      mayInstallVolume: '',
      seProjectProfitConfig: {
        projectId: this.$route.query.projectId,
        weightElectricityPrice: undefined,
      }, // 参数配置
      projectTotalProfitModel: {}, // 收益统计
      seProjectProfitCountList: [], //  收益表格数据
      seProjectNearThreeYearSellProfixList: [],
      // 审核
      dialogVisible: false,
      title: '',
      message: '',
      alert: '',
      type: '',
      first: {
        sellMoney: '',
        profix: ''
      },
      second: {
        sellMoney: '',
        profix: ''
      },
      three: {
        sellMoney: '',
        profix: ''
      },
      secondExamineReport: '', // 何在报告
      // 审批记录
      logVisible: false,
      activities: []
    }
  },
  components: { ApprovalLog },
  created() {
    this.secondExamine = this.$route.query.secondExamine
    this.projectId = this.$route.query.projectId
    this.getProjectInfo(this.projectId)
  },
  watch: {
    seProjectNearThreeYearSellProfixList(newVal, oldVal) {
      if(newVal) {
        this.first = newVal[0]
        this.second = newVal[1]
        this.three = newVal[2]
      }
    }
  },
  methods: {
    getProjectInfo() {
      getProjectInfo({ projectId: this.projectId }).then(res => {
        const { seProjectCompanyInfo, seProjectCompanyBuildInfo, seProjectPowerInfo, seProjectPowerTransformInfoList, seProjectCooperate, seProjectRelevantFile, seProjectNearThreeYearSellProfixList } = res.data
        this.seProjectNearThreeYearSellProfixList = seProjectNearThreeYearSellProfixList
        this.seProjectCompanyInfo = seProjectCompanyInfo
        this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
        if(seProjectCompanyBuildInfo.housePartType) {
          this.seProjectCompanyBuildInfo.colorSteelType = seProjectCompanyBuildInfo.colorSteelType.split(',')
        }
        this.seProjectPowerInfo = seProjectPowerInfo
        this.seProjectPowerTransformInfoList = seProjectPowerTransformInfoList
        this.seProjectCooperate = seProjectCooperate
        if(seProjectCooperate.electricityDiscountFlag == 1) {
          this.seProjectCooperate.electricityDiscountFlag = true
        }
        if(seProjectCooperate.houseLeaseFlag == 1) {
          this.seProjectCooperate.houseLeaseFlag = true
        }
        if(seProjectCooperate.ownPutFlag == 1) {
          this.seProjectCooperate.ownPutFlag = true
        }
        this.seProjectRelevantFile = seProjectRelevantFile
      })
    },
    // 审批记录
    handleApproval() {
      getProjectExamineLog({ projectId: this.projectId }).then(res => {
        this.activities = res.data
      })
      this.logVisible = true
    },

    // 审核
    handleReject() {
      this.dialogVisible = true
      this.title = '驳回审核'
      this.alert = '审核驳回处理，请输入驳回理由'
      this.type = 0
    },
    handlePass() {
      this.dialogVisible = true
      this.title = '审核通过'
      this.alert = '进行审核通过处理，将项目提交至材料补充，请输入审核详情。'
      this.type = 1
    },
    handleConfirm() {
      projectSecondExamine({
        projectId: this.projectId,
        type: this.type,
        message: this.message,
        secondExamineReport: this.secondExamineReport
      }).then(res => {
        if( this.type == 0 ) {
          this.$message.success('项目已驳回')
          this.dialogVisible = false
          this.$router.back()
        } else if( this.type == 1 ) {
          // console.log(res)
          this.$message.success('项目已通过')
          this.dialogVisible = false
          this.$router.back()
        }
      }).catch( err => {
        this.dialogVisible = false
      })
    },
    handleDown(url) {
      window.open(url)
    },
    handleClose() {
      this.title = '',
      this.message = '',
      this.alert = ''
    },
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
  .mt5 {
    margin-top: 5px;
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
  .el-alert {
    margin: 15px 0;
  }
  /deep/  .el-checkbox__label {
    padding-left: 0;
  }
  .custom-upload-files {
    text-align: left;
  }
.ht {
    border-collapse:collapse;
    border: 1px solid #DCDFE6;
    td {
      width: 25%;
      height: 50px;
      border: 1px solid #DCDFE6;
    }
  }
</style>