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
          <el-button size="small" @click="handleTermination" v-show="firstExamine == 1">终止项目</el-button>
          <!-- <el-button size="small" @click="handleView">工商数据查看</el-button> -->
          <el-button size="small" @click="handleApproval">审批记录</el-button>
          <el-button size="small" type="danger" @click="handleReject" v-show="firstExamine == 1">驳回审核</el-button>
          <el-button size="small" type="primary" @click="handleSupplement" v-show="firstExamine == 1">进入补充</el-button>
          <el-button size="small" type="primary" @click="handleFinal" v-show="firstExamine == 1">直接终审</el-button>
          <el-button size="small" type="primary" @click="handleReview" v-show="firstExamine == 1">进入复核</el-button>
        </div>
      </div>
    </div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="审核材料" name="first">
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
                  <span v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(4) !== -1">其他</span>
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
            <el-col :span="16">
              <el-row :gutter="20">
                <el-col :span="4" class="span13">其他屋面材质说明</el-col>
                <el-col :span="20" class="span130">{{ seProjectCompanyBuildInfo.otherMessage }}</el-col>
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
            <el-col :span="16">
              <el-row :gutter="20">
                <el-col :span="4" class="span13">其他供电说明</el-col>
                <el-col :span="20" class="span130">{{ seProjectPowerInfo.otherMessage }}</el-col>
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
                  <span>出租屋面，租金 : {{ seProjectCooperate.houseLeaseMoney }} 万元/年</span>
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
          <el-row :gutter="20" style="margin:30px 0;">
            <el-col :span="3" class="span13">项目发起额外说明</el-col>
            <el-col :span="21" class="span130">{{ seProjectRelevantFile.projectOtherMessage }}</el-col>
          </el-row>

          <div class="xian">
            <div>荷载报告</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13 mt5">荷载报告</el-col>
                <el-col :span="16" class="span130">
                  <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.secondExamineReport)"
                  :disabled="seProjectRelevantFile.secondExamineReport == '' || seProjectRelevantFile.secondExamineReport == null ">下 载</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="收益测算" name="second">
          <div class="xian">
            <div>项目数据</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">建站地址</el-col>
                <el-col :span="16" class="span130">{{ seProjectCompanyInfo.province }} {{ seProjectCompanyInfo.city }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">年日照</el-col>
                <el-col :span="16" class="span130">{{ yearSunShine }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">预估装机容量</el-col>
                <el-col :span="16" class="span130">{{ mayInstallVolume }} KW</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px 30px 0 30px;">
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
                <el-col :span="8" class="span13" style="margin-top:10px;">彩钢瓦类型</el-col>
                <el-col :span="16" class="span130">
                  <el-select v-model="seProjectCompanyBuildInfo.colorSteelType" multiple placeholder="请选择(可多选)" class="width100" :disabled="firstExamine == 2 || firstExamine == 3 || firstExamine == 99" clearable>
                    <el-option label="无" value="0"></el-option>
                    <el-option label="直立锁边" value="1"></el-option>
                    <el-option label="角驰" value="2"></el-option>
                    <el-option label="T型" value="3"></el-option>
                    <el-option label="其它" value="4"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin: 0 30px 30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13" style="margin-top:10px;">彩钢瓦比水泥顶</el-col>
                <el-col :span="16" class="span130">
                  <el-input v-model="seProjectCompanyBuildInfo.colorSteelCementTopScale" type="number" class="spanmt" placeholder="请输入" :disabled="firstExamine == 2 || firstExamine == 3 || firstExamine == 99" clearable>
                    <span slot="suffix">%</span>
                  </el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

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
                  <span v-if="seProjectCooperate.electricityDiscountScale">电费折扣，比例 : {{ seProjectCooperate.electricityDiscountScale }} %</span>
                  <span v-else>电费折扣，比例 :</span>
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

          <div class="xian" style="display:flex;justify-content:space-between;">
            <div>参数配置</div>
            <el-button type="primary" size="mini" @click="handleMeasure" :disabled="firstExamine == 2 || firstExamine == 3 || firstExamine == 99">测算数据</el-button>
          </div>
          <el-form ref="seProjectProfitConfigRef" :model="seProjectProfitConfig" :rules="seProjectProfitConfigRules" :disabled="firstExamine == 2 || firstExamine == 3 || firstExamine == 99" label-width="140px">
            <el-row :gutter="20" style="margin:30px 30px 0 30px;">
              <el-col :span="8" style="margin-top:10px;">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13" style="padding-right:0;">脱硫煤电价</el-col>
                  <el-col :span="16" class="span130" style="padding-left:15px;">{{ seProjectProfitConfig.desulfurizeElectricityPrice }} 元/KWH</el-col>
                </el-row>
              </el-col>
              <el-col :span="8" style="padding-left:70px;">
                <el-form-item label="加权电价" prop="weightElectricityPrice">
                  <el-input v-model="seProjectProfitConfig.weightElectricityPrice" type="number" @input="handleBlur" placeholder="请输入" clearable>
                    <span slot="suffix">元/KWH</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="margin-top:10px;">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13" style="padding-right:0;">折后电价</el-col>
                  <el-col :span="16" class="span130" style="padding-left:15px;" v-if="seProjectProfitConfig.discountElectricityPrice">{{ seProjectProfitConfig.discountElectricityPrice }} 元/KWH</el-col>
                  <el-col :span="16" class="span130" style="padding-left:15px;" v-else> - </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin: 10px 30px 10px;">
              <el-col :span="8" style="padding-left:70px;">
                <el-form-item label="每年固定运维费用" prop="yearRepairPrice">
                  <el-input v-model="seProjectProfitConfig.yearRepairPrice" type="number" placeholder="请输入" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="padding-left:70px;">
                <el-form-item label="第10年运维费用" prop="tenRepairPrice">
                  <el-input v-model="seProjectProfitConfig.tenRepairPrice" type="number" placeholder="请输入" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="padding-left:70px;">
                <el-form-item label="第15年运维费用" prop="fifteenRepairPrice">
                  <el-input v-model="seProjectProfitConfig.fifteenRepairPrice" type="number" placeholder="请输入" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin:0 30px 30px;">
              <el-col :span="8" style="padding-left:70px;">
                <el-form-item label="自发自用比例" prop="selfUseScale">
                  <el-input v-model="seProjectProfitConfig.selfUseScale" type="number" placeholder="请输入" clearable>
                    <span slot="suffix">%</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="padding-left:70px;">
                <el-form-item label="单瓦价格" prop="unitPrice">
                  <el-input v-model="seProjectProfitConfig.unitPrice" type="number" placeholder="请输入" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="padding-left:70px;">
                <el-form-item label="并网电压类型" prop="voltageType">
                  <el-select v-model="seProjectProfitConfig.voltageType" placeholder="请选择" class="width100">
                    <el-option label="高压" :value="1"></el-option>
                    <el-option label="低压" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div class="xian">
            <div>测算结果</div>
          </div>
          <div style="margin-top:15px;display:flex;justify-content:space-around;">
            <div class="t1" style="background-color:#3C4563;">
              <p style="font-size: 14px;margin-left:30px;">全投资内部收益率</p>
              <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;" v-if="projectTotalProfitModel.innerScal !== null">{{ projectTotalProfitModel.innerScal }}%</p>
              <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;" v-else> - </p>
            </div>
            <div class="t1" style="background-color:#8892DF;">
              <p style="font-size: 14px;margin-left:30px;">投资偿还期（年）</p>
              <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;" v-if="projectTotalProfitModel.investNum">{{ projectTotalProfitModel.investNum }}</p>
              <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;" v-else> - </p>
            </div>
            <div class="t1" style="background-color:#6FACFD;">
              <p style="font-size: 14px;margin-left:30px;">总投资费用（万元）</p>
              <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;" v-if="projectTotalProfitModel.totalInvestPrice">{{ projectTotalProfitModel.totalInvestPrice.toFixed(2) }}</p>
              <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;" v-else> - </p>
            </div>
            <div class="t1" style="background-color:#ED7E77;">
              <p style="font-size: 14px;margin-left:30px;">首年发电量</p>
              <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;" v-if="projectTotalProfitModel.firstElectric">{{ projectTotalProfitModel.firstElectric }}</p>
              <p style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;" v-else> - </p>
            </div>
          </div>
          <div style="margin-top:15px;display:flex;justify-content:space-around;">
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>发电总效益（万元）</p>
                <h3 v-if="projectTotalProfitModel.totalElectricUseIncomeScal">{{ projectTotalProfitModel.totalElectricUseIncomeScal }}</h3>
                <h3 v-else> - </h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3 v-if="projectTotalProfitModel.averageElectricUseIncomeScal">{{ projectTotalProfitModel.averageElectricUseIncomeScal }}</h3>
                <h3 v-else> - </h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>总净利润（万元）</p>
                <h3 v-if="projectTotalProfitModel.totalCleanProfit">{{ projectTotalProfitModel.totalCleanProfit }}</h3>
                <h3 v-else> - </h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3 v-if="projectTotalProfitModel.averageCleanProfit">{{ projectTotalProfitModel.averageCleanProfit }}</h3>
                <h3 v-else> - </h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>投资方总收入（万元）</p>
                <h3 v-if="projectTotalProfitModel.totalInvestorIncome">{{ projectTotalProfitModel.totalInvestorIncome }}</h3>
                <h3 v-else> - </h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3 v-if="projectTotalProfitModel.averageInvestorIncome">{{ projectTotalProfitModel.averageInvestorIncome }}</h3>
                <h3 v-else> - </h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>自投总收入（万元）</p>
                <h3 v-if="projectTotalProfitModel.totalOwnIncome">{{ projectTotalProfitModel.totalOwnIncome }}</h3>
                <h3 v-else> - </h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3 v-if="projectTotalProfitModel.averageOwnIncome">{{ projectTotalProfitModel.averageOwnIncome }}</h3>
                <h3 v-else> - </h3>
              </div>
            </div>
          </div>
          <el-table :data="seProjectProfitCountList" border style="width: 100%;margin-top:50px;" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
            <el-table-column prop="yearNum" label="年份" width="60px;" />
            <el-table-column prop="electricYear" label="发电量" width="100px;" />
            <el-table-column prop="electricYearSelfUse" label="企业自用电量" width="130px;" />
            <el-table-column prop="electricUseIncome" label="企业用电收入（万元）" />
            <el-table-column prop="electricYearBeLeft" label="余电上网电量" width="130px;" />
            <el-table-column prop="electricYearBeLeftIncome" label="余电上网收入（万元）" />
            <el-table-column prop="ownInvestIncome" label="自投总收入（万元）" />
            <el-table-column prop="electricUseIncomeScale" label="企业用电收益（万元）" />
            <el-table-column prop="investorIncome" label="投资方收入（万元）" />
            <el-table-column prop="shareEnergyEfficiency" label="企业分享节能效益" />
            <el-table-column prop="repairOutPrice" label="运维支出（万元）" />
            <el-table-column prop="cleanProfit" label="净利润（万元）" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <el-alert :title="alert" type="success" :closable="false" style="margin-top:0;" />
      <el-input type="textarea" :rows="3" placeholder="最多输入200字符（选填）" v-model="message" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm(type)">确 定</el-button>
      </span>
    </el-dialog>
    <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
  </div>
</template>

<script>
import { getProjectInfo, getProjectExamineLog } from '@/api/listProject'
import { getProfitMessage, putProfitMessage, projectFirstExamine } from '@/api/center'

import ApprovalLog from '@/components/Log/ApprovalLog.vue'

export default {
  name: 'FirstDetail',
  data() {
    var checkCe = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /^(?:100|\d{1,2})(?:\.\d{1,2})?$/ 
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字，0-100之间，小数点后2位'))
      }
    }
    var checkFour = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /^\d+(\.\d{1,4})?$/ 
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字，若小数最多4位，＞0'))
      }
    }
    return {
      firstExamine: '',
      province: '',
      city:'',
      activeName: 'first',
      projectId: '',
      seProjectCompanyInfo: {},
      seProjectCompanyBuildInfo: {}, 
      seProjectPowerInfo: {}, 
      seProjectPowerTransformInfoList: [], 
      seProjectNearThreeYearSellProfixList: [],
      seProjectCooperate: {}, 
      seProjectRelevantFile: {},
      yearSunShine: '',
      mayInstallVolume: '',
      seProjectProfitConfig: {
        projectId: this.$route.query.projectId,
        // weightElectricityPrice: undefined
      }, // 参数配置
      projectTotalProfitModel: {}, // 收益统计
      seProjectProfitConfigRules: {
        weightElectricityPrice: [
          { required: true, message: '请输入加权电价', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        yearRepairPrice: [
          { required: true, message: '请输入每年固定运维费用', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        tenRepairPrice: [
          { required: true, message: '请输入第10年运维费用', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        fifteenRepairPrice: [
          { required: true, message: '请输入第15年运维费用', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        selfUseScale: [
          { required: true, message: '请输入自发自用比例', trigger: 'blur' },
          { validator: checkCe, trigger: 'blur' }
        ],
        unitPrice: [
          { required: true, message: '请输入单瓦价格', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        voltageType: [
          { required: true, message: '请选择并网电压类型', trigger: 'change' }
        ]
      },
      seProjectProfitCountList: [], //  收益表格数据

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
      // 审批记录
      logVisible: false,
      activities: []
    }
  },
  components: { ApprovalLog },
  created() {
    this.firstExamine = this.$route.query.firstExamine
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
    handleClick(tab, event) {
      if(this.activeName == 'second') {
        getProfitMessage({ projectId: this.projectId}).then(res => { // 收益试算
          const { yearSunShine, mayInstallVolume, seProjectProfitConfig, projectTotalProfitModel, seProjectProfitCountList } = res.data
          this.yearSunShine = yearSunShine
          this.mayInstallVolume = mayInstallVolume
          this.projectTotalProfitModel = projectTotalProfitModel
          this.seProjectProfitConfig = seProjectProfitConfig
          this.seProjectProfitCountList = seProjectProfitCountList
          this.seProjectProfitConfig.voltageType = 0
        })
      }
    },
    getProjectInfo() {
      getProjectInfo({ projectId: this.projectId }).then(res => {
        const { seProjectCompanyInfo, seProjectCompanyBuildInfo, seProjectPowerInfo, seProjectPowerTransformInfoList, seProjectCooperate, seProjectRelevantFile, seProjectNearThreeYearSellProfixList } = res.data
        this.seProjectNearThreeYearSellProfixList = seProjectNearThreeYearSellProfixList
        this.seProjectCompanyInfo = seProjectCompanyInfo
        this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
        if(seProjectCompanyBuildInfo.colorSteelType) {
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
    handleMeasure() { // 测算数据
      this.$refs.seProjectProfitConfigRef.validate((valid) => {
        if(!valid) {
          this.$message.error('请填写相关测算数据') 
          return
        } else {
          if(this.seProjectCompanyBuildInfo.colorSteelType.length > 1) {
            this.seProjectCompanyBuildInfo.colorSteelType = this.seProjectCompanyBuildInfo.colorSteelType.join(',')
          } else {
            this.seProjectCompanyBuildInfo.colorSteelType = this.seProjectCompanyBuildInfo.colorSteelType[0]
          }
          if(this.seProjectCooperate.electricityDiscountFlag == true) {
            this.seProjectCooperate.electricityDiscountFlag = 1
          }
          if(this.seProjectCooperate.houseLeaseFlag == true) {
            this.seProjectCooperate.houseLeaseFlag = 1
          }
          if(this.seProjectCooperate.ownPutFlag == true) {
            this.seProjectCooperate.ownPutFlag = 1
          }
          putProfitMessage({
            province: this.province,
            city: this.city,
            mayInstallVolume: this.mayInstallVolume,
            yearSunShine: this.yearSunShine,
            seProjectCompanyBuildInfo: this.seProjectCompanyBuildInfo,
            seProjectCooperate: this.seProjectCooperate,
            seProjectProfitConfig: this.seProjectProfitConfig,
            projectTotalProfitModel: this.projectTotalProfitModel,
            seProjectProfitCountList: this.seProjectProfitCountList
          }).then(res => {
            this.$message.success('测算成功')
            getProfitMessage({ projectId: this.projectId}).then(res => { // 收益试算
              const { projectTotalProfitModel, seProjectProfitCountList, seProjectCompanyBuildInfo, seProjectCooperate, yearSunShine } = res.data
              this.yearSunShine = yearSunShine
              this.projectTotalProfitModel = projectTotalProfitModel
              this.seProjectProfitCountList = seProjectProfitCountList
              this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
              if(seProjectCompanyBuildInfo.colorSteelType) {
                this.seProjectCompanyBuildInfo.colorSteelType = this.seProjectCompanyBuildInfo.colorSteelType.split(',')
              }
              this.seProjectCooperate = seProjectCooperate
              if(seProjectCooperate.ownPutFlag == 1) {
                this.seProjectCooperate.ownPutFlag = true 
              }
              if(seProjectCooperate.electricityDiscountFlag == 1) {
                this.seProjectCooperate.electricityDiscountFlag = true
              }
              if(seProjectCooperate.houseLeaseFlag == 1) {
                this.seProjectCooperate.houseLeaseFlag = true
              }
            })
          })
        }
      })
    },
    handleBlur() { // 计算折后电价
      if(this.seProjectCooperate.electricityDiscountScale) {
          this.seProjectProfitConfig.discountElectricityPrice =  ( this.seProjectProfitConfig.weightElectricityPrice * (( this.seProjectCooperate.electricityDiscountScale )/ 100 )).toFixed(4) - 0
      } else {
          this.seProjectProfitConfig.discountElectricityPrice = ( this.seProjectProfitConfig.weightElectricityPrice * 1 ).toFixed(4) -0 
      }
    },
    handleDown(url) {
      window.open(url)
    },
    handleChange() {},

    // 审核
    handleView() { // 工商数据查看
    },
    handleTermination() { // 终止项目
      this.dialogVisible = true
      this.title = '终止项目详情'
      this.alert = '终止项目，请输入终止理由'
      this.type = 4
    },
    handleReject() {  // 驳回审核
      this.dialogVisible = true
      this.title = '驳回审核详情'
      this.alert = '审核驳回处理，请输入驳回理由'
      this.type = 0
    },
    handleSupplement() { // 进入补充
      this.dialogVisible = true
      this.title = '材料补充详情'
      this.alert = '进行审核通过处理，将项目提交至材料补充，请输入审核详情。'
      this.type = 1
    },
    handleFinal() { // 直接终审
      this.dialogVisible = true
      this.title = '直接终审详情'
      this.alert = '进行审核通过处理，将项目提交至项目终审，请输入审核详情。'
      this.type = 3
    },
    handleReview() {  // 进入复核
      this.dialogVisible = true
      this.title = '进入复核详情'
      this.alert = '进行审核通过处理，将项目提交至图纸复核，请输入审核详情。'
      this.type = 2
    },
    handleConfirm() {
      projectFirstExamine({
        projectId: this.projectId,
        type: this.type,
        message: this.message
      }).then(res => {
        if( this.type == 0 ) {
            this.$message.success('项目已审核驳回')
            this.dialogVisible = false
            this.$router.back()
          } else if( this.type == 1 ) {
            this.$message.success('项目已进入材料补充')
            this.dialogVisible = false
            this.$router.back()
          } else if( this.type == 2 ) {
            this.$message.success('项目已进入图纸复核')
            this.dialogVisible = false
            this.$router.back()
          } else if( this.type == 3 ) {
            this.$message.success('项目已进入项目终审')
            this.dialogVisible = false
            this.$router.back()
          } else if( this.type == 4 ) {
            this.$message.success('项目已终止')
            this.dialogVisible = false
            this.$router.back()
          }
      }).catch( err => {
          this.dialogVisible = false
        })
    },
    handleClose() {
      this.title = '',
      this.message = '',
      this.alert = '',
      this.type = ''
    },
    handleApproval() { // 记录
      getProjectExamineLog({ projectId: this.projectId }).then(res => {
        this.activities = res.data 
      })
      this.logVisible = true
    }
  },
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
  .t1 {
    width: 25%;
    height: 116px;
    margin: 0 10px;
    color: #fff;
    background-color: #f2f2f2;
  }
  .b1 {
    width: 25%;
    height: 116px;
    box-sizing: border-box;
    margin: 0 10px;
    padding: 0 30px;
    background-color: #f2f2f2;
  }
  /deep/ .el-input-number__decrease {
    display: none;
  }
  /deep/ .el-input-number__increase {
    display: none;
  }
  .spanmt {
    /deep/ .el-input__suffix {
      margin-top: 10px;
    }
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