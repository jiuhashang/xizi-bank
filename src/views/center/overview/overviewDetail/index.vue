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
          <!-- <el-button size="small">工商数据查看</el-button> -->
          <el-button size="small" @click="handleApproval">审批记录</el-button>
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
                  <!-- <span v-else>其他</span> -->
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
                <el-col :span="16" class="span130" v-show="seProjectCompanyBuildInfo.houseArea">{{ seProjectCompanyBuildInfo.houseArea }} m²</el-col>
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
                  <span v-show="seProjectCompanyBuildInfo.houseSouthScreenFlag == 0">否</span>
                  <span v-show="seProjectCompanyBuildInfo.houseSouthScreenFlag == 1">是</span>
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
                  <span v-else-if="seProjectCompanyBuildInfo.useYears == 6">31年以上</span>
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
                <el-col :span="16" class="span130" v-show="seProjectCompanyBuildInfo.colorSteelCementTopScale">{{ seProjectCompanyBuildInfo.colorSteelCementTopScale }} %</el-col>
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
                <el-col :span="16" class="span130">{{ seProjectPowerInfo.prowerType }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">变压器容量</el-col>
                <el-col :span="16" class="span130" v-show="seProjectPowerInfo.transformerVolume">{{ seProjectPowerInfo.transformerVolume }} kVA</el-col>
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
                <el-col :span="16" class="span130" v-show="seProjectPowerInfo.mayInstallVolume">{{ seProjectPowerInfo.mayInstallVolume }} kW</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">法定节假日是否休息</el-col>
                <el-col :span="16" class="span130">
                  <span v-show="seProjectPowerInfo.legalHolidayFlag == 1">是</span>
                  <span v-show="seProjectPowerInfo.legalHolidayFlag == 0">否</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">周末生产情况</el-col>
                <el-col :span="16" class="span130">{{ seProjectPowerInfo.weekendFlag }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">中午设备是否停机</el-col>
                <el-col :span="16" class="span130">
                  <span v-show="seProjectPowerInfo.noonEquipmentFlag == 1">是</span>
                  <span v-show="seProjectPowerInfo.noonEquipmentFlag == 0">否</span>
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
                  <span v-show="seProjectCooperate.cooperateType == 0">业主投资</span>
                  <span v-show="seProjectCooperate.cooperateType == 1">其他投资</span>
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
          <el-row :gutter="20" style="margin:30px 0;">
            <el-col :span="3" class="span13">项目发起额外说明</el-col>
            <el-col :span="21" class="span130">{{ seProjectRelevantFile.projectOtherMessage }}</el-col>
          </el-row>

          <div class="xian" style="margin-top:20px;">
            <div>其他材料</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13 mt5">近3年财务报告</el-col>
                <el-col :span="16" class="span130">
                  <el-button size="small" type="primary" @click="handleDown(seProjectSupplementFile.nearThreeYearFinanceReport)"
                    :disabled="seProjectSupplementFile.nearThreeYearFinanceReport == '' || seProjectSupplementFile.nearThreeYearFinanceReport == null ">下 载</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13 mt5">材料补充额外材料</el-col>
                <el-col :span="16" class="span130">
                  <el-button size="small" type="primary" @click="handleDown(seProjectSupplementFile.otherFile)"
                    :disabled="seProjectSupplementFile.otherFile == '' || seProjectSupplementFile.otherFile == null ">下 载</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px 0;">
            <el-col :span="3" class="span13">额外说明</el-col>
            <el-col :span="21" class="span130">{{ seProjectSupplementFile.otherMessage }}</el-col>
          </el-row>

          <div class="xian" style="margin-top:20px;">
            <div>立项补充</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13 mt5">能源管理合同</el-col>
                <el-col :span="16" class="span130">
                  <el-button size="small" type="primary" @click="handleDown(seProjectEndSupplementFile.energyContractFile)"
                    :disabled="seProjectEndSupplementFile.energyContractFile == '' || seProjectEndSupplementFile.energyContractFile == null ">下 载</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13 mt5">项目建议书</el-col>
                <el-col :span="16" class="span130">
                  <el-button size="small" type="primary" @click="handleDown(seProjectEndSupplementFile.adviseBookFile)"
                    :disabled="seProjectEndSupplementFile.adviseBookFile == '' || seProjectEndSupplementFile.adviseBookFile == null ">下 载</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13 mt5">备案文件</el-col>
                <el-col :span="16" class="span130">
                  <el-button size="small" type="primary" @click="handleDown(seProjectEndSupplementFile.recordFile)"
                    :disabled="seProjectEndSupplementFile.recordFile == '' || seProjectEndSupplementFile.recordFile == null ">下 载</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13 mt5">接入文件</el-col>
                <el-col :span="16" class="span130">
                  <el-button size="small" type="primary" @click="handleDown(seProjectEndSupplementFile.insertFile)"
                    :disabled="seProjectEndSupplementFile.insertFile == '' || seProjectEndSupplementFile.insertFile == null ">下 载</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13 mt5">营业执照</el-col>
                <el-col :span="16" class="span130">
                  <el-button size="small" type="primary" @click="handleDown(seProjectEndSupplementFile.businessFile)"
                    :disabled="seProjectEndSupplementFile.businessFile == '' || seProjectEndSupplementFile.businessFile == null ">下 载</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">关联项目公司</el-col>
                <el-col :span="16" class="span130">{{ seProjectEndSupplementFile.projectCompanyName }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px 0;">
            <el-col :span="3" class="span13">额外说明</el-col>
            <el-col :span="21" class="span130">{{ seProjectEndSupplementFile.otherMessage }}</el-col>
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
                <el-col :span="16" class="span130">{{ province }} {{ city }}</el-col>
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
                <el-col :span="16" class="span130" v-show="mayInstallVolume">{{ mayInstallVolume }} KW</el-col>
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
                  <span v-else-if="seProjectCompanyBuildInfo.useYears == 6">31年以上</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋面材质</el-col>
                <el-col :span="16" class="span130">
                  <span v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(0) !== -1">瓦铄屋面 &nbsp;</span>
                  <span v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(1) !== -1">混泥土屋面 &nbsp;</span>
                  <span v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(2) !== -1">彩钢瓦屋面 &nbsp;</span>
                  <span v-show="seProjectCompanyBuildInfo.housePartType && seProjectCompanyBuildInfo.housePartType.indexOf(3) !== -1">其他</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">彩钢瓦类型</el-col>
                <el-col :span="16" class="span130">
                  <span v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(0) !== -1">无 &nbsp;</span>
                  <span v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(1) !== -1">直立锁边 &nbsp;</span>
                  <span v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(2) !== -1">角驰 &nbsp;</span>
                  <span v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(3) !== -1">T型 &nbsp;</span>
                  <span v-show="seProjectCompanyBuildInfo.colorSteelType && seProjectCompanyBuildInfo.colorSteelType.indexOf(4) !== -1">其他</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">彩钢瓦比水泥顶</el-col>
                <el-col :span="16" class="span130" v-show="seProjectCompanyBuildInfo.colorSteelCementTopScale">{{ seProjectCompanyBuildInfo.colorSteelCementTopScale }} %</el-col>
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
                  <span v-show="seProjectCooperate.cooperateType == 0">业主投资</span>
                  <span v-show="seProjectCooperate.cooperateType == 1">其他投资</span>
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
                  <span>出租屋面，租金 : {{ seProjectCooperate.houseLeaseMoney }}</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian" style="display:flex;justify-content:space-between;">
            <div>参数配置</div>
          </div>
          <el-form ref="form" label-width="130px">
            <el-row :gutter="20" style="margin:30px 30px 0 30px;">
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">脱硫煤电价</el-col>
                  <el-col :span="16" class="span130" v-show="seProjectProfitConfig.desulfurizeElectricityPrice">{{ seProjectProfitConfig.desulfurizeElectricityPrice }} 元/KWH</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">加权电价</el-col>
                  <el-col :span="16" class="span130" v-show="seProjectProfitConfig.weightElectricityPrice">{{ seProjectProfitConfig.weightElectricityPrice }} 元/KWH</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">折后电价</el-col>
                  <el-col :span="16" class="span130" v-show="seProjectProfitConfig.discountElectricityPrice">{{ seProjectProfitConfig.discountElectricityPrice }} 元/KWH</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin:30px;">
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">每年固定运维费用</el-col>
                  <el-col :span="16" class="span130" v-show="seProjectProfitConfig.yearRepairPrice">{{ seProjectProfitConfig.yearRepairPrice }} 元/瓦</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">第10年运维费用</el-col>
                  <el-col :span="16" class="span130" v-show="seProjectProfitConfig.tenRepairPrice">{{ seProjectProfitConfig.tenRepairPrice }} 元/瓦</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">第15年运维费用</el-col>
                  <el-col :span="16" class="span130" v-show="seProjectProfitConfig.fifteenRepairPrice">{{ seProjectProfitConfig.fifteenRepairPrice }} 元/瓦</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin:0 30px 30px 30px;">
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">自发自用比例</el-col>
                  <el-col :span="16" class="span130" v-show="seProjectProfitConfig.selfUseScale">{{ seProjectProfitConfig.selfUseScale }} %</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">单瓦价格</el-col>
                  <el-col :span="16" class="span130" v-show="seProjectProfitConfig.unitPrice">{{ seProjectProfitConfig.unitPrice }} 元/瓦</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">并网电压类型</el-col>
                  <el-col :span="16" class="span130" v-show="seProjectProfitConfig.voltageType == 0">低压</el-col>
                  <el-col :span="16" class="span130" v-show="seProjectProfitConfig.voltageType == 1">高压</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>

          <div class="xian">
            <div>测算结果</div>
          </div>
          <div style="margin-top:15px;display:flex;justify-content:space-around;">
            <div class="t1" style="background-color:#3C4563;">
              <p style="font-size: 14px;margin-left:30px;">全投资内部收益率</p>
              <p v-if="projectTotalProfitModel.innerScal" style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">{{ projectTotalProfitModel.innerScal.toFixed(2) }} %</p>
              <p v-else style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">-</p>
            </div>
            <div class="t1" style="background-color:#8892DF;">
              <p style="font-size: 14px;margin-left:30px;">投资偿还期（年）</p>
              <p v-if="projectTotalProfitModel.investNum" style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">{{ projectTotalProfitModel.investNum.toFixed(2) }}</p>
              <p v-else style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">-</p>
            </div>
            <div class="t1" style="background-color:#6FACFD;">
              <p style="font-size: 14px;margin-left:30px;">总投资费用（万元）</p>
              <p v-if="projectTotalProfitModel.totalInvestPrice" style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">{{ projectTotalProfitModel.totalInvestPrice.toFixed(2) }}</p>
              <p v-else style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">-</p>
            </div>
            <div class="t1" style="background-color:#ED7E77;">
              <p style="font-size: 14px;margin-left:30px;">首年发电量</p>
              <p v-if="projectTotalProfitModel.firstElectric" style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">{{ projectTotalProfitModel.firstElectric.toFixed(2) }}</p>
              <p v-else style="font-size: 36px;font-weight:900;text-align:center;margin-top:25px;">-</p>
            </div>
          </div>
          <div style="margin-top:15px;display:flex;justify-content:space-around;">
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>发电总效益（万元）</p>
                <h3 v-if="projectTotalProfitModel.totalElectricUseIncomeScal">{{ projectTotalProfitModel.totalElectricUseIncomeScal.toFixed(2) }}</h3>
                <h3 v-else>-</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3 v-if="projectTotalProfitModel.averageElectricUseIncomeScal">{{ projectTotalProfitModel.averageElectricUseIncomeScal.toFixed(2) }}</h3>
                <h3 v-else>-</h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>总净利润（万元）</p>
                <h3 v-if="projectTotalProfitModel.totalCleanProfit">{{ projectTotalProfitModel.totalCleanProfit.toFixed(2) }}</h3>
                <h3 v-else>-</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3 v-if="projectTotalProfitModel.averageCleanProfit">{{ projectTotalProfitModel.averageCleanProfit.toFixed(2) }}</h3>
                <h3 v-else>-</h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>投资方总收入（万元）</p>
                <h3 v-if="projectTotalProfitModel.totalInvestorIncome">{{ projectTotalProfitModel.totalInvestorIncome.toFixed(2) }}</h3>
                <h3 v-else>-</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3 v-if="projectTotalProfitModel.averageInvestorIncome">{{ projectTotalProfitModel.averageInvestorIncome.toFixed(2) }}</h3>
                <h3 v-else>-</h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>自投总收入（万元）</p>
                <h3 v-if="projectTotalProfitModel.totalOwnIncome">{{ projectTotalProfitModel.totalOwnIncome.toFixed(2) }}</h3>
                <h3 v-else>-</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3 v-if="projectTotalProfitModel.averageOwnIncome">{{ projectTotalProfitModel.averageOwnIncome.toFixed(2) }}</h3>
                <h3 v-else>-</h3>
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
    <!-- 审批记录 -->
    <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
  </div>
</template>

<script>
import { getProjectInfo, getProjectExamineLog } from '@/api/listProject'
import { getProfitMessage } from '@/api/center'

import ApprovalLog from '@/components/Log/ApprovalLog.vue'

export default {
  name: 'OverDetail',
  data() {
      return {
        city: '',
        province: '',
        yearSunShine: '',
        mayInstallVolume: '',
        seProjectProfitConfig: {},
        projectTotalProfitModel: {},
        seProjectProfitCountList: [],

        activeName: 'first',
        projectId: null,
        seProjectCompanyBuildInfo: {},
        seProjectCompanyInfo: {}, 
        seProjectCooperate: {}, 
        seProjectNearThreeYearSellProfixList: [], 
        seProjectPowerInfo: {}, 
        seProjectPowerTransformInfoList: [], 
        seProjectRelevantFile: {}, 
        seProjectSupplementFile: {},
        seProjectProfitCountList: [],
        seProjectEndSupplementFile: {},
        // 审批记录
        logVisible: false,
        activities: [],
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
      }
    },
    components: { ApprovalLog },
    created() {
      this.projectId = this.$route.query.projectId
      this.getProjectInfo(this.projectId)
      this.getProfitMessage(this.projectId)
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
        // console.log(tab, event)
      },
      getProjectInfo() {
        getProjectInfo({ projectId: this.projectId }).then(res => {
          const { seProjectCompanyBuildInfo, seProjectCompanyInfo, seProjectCooperate, seProjectNearThreeYearSellProfixList, seProjectPowerInfo, seProjectPowerTransformInfoList, seProjectRelevantFile, seProjectSupplementFile, seProjectEndSupplementFile } = res.data
          if(seProjectCompanyBuildInfo) { this.seProjectCompanyBuildInfo = { ...seProjectCompanyBuildInfo } }
          if(seProjectCompanyInfo) { this.seProjectCompanyInfo = { ...seProjectCompanyInfo } }
          if(seProjectCooperate) { this.seProjectCooperate = { ...seProjectCooperate } }
          if(this.seProjectCooperate.electricityDiscountFlag && this.seProjectCooperate.electricityDiscountFlag == 1) { this.seProjectCooperate.electricityDiscountFlag = true }
          if(this.seProjectCooperate.houseLeaseFlag && this.seProjectCooperate.houseLeaseFlag == 1) { this.seProjectCooperate.houseLeaseFlag = true }
          if(this.seProjectCooperate.ownPutFlag && this.seProjectCooperate.ownPutFlag == 1) { this.seProjectCooperate.ownPutFlag = true }
          if( seProjectNearThreeYearSellProfixList.length > 0 ) {this.seProjectNearThreeYearSellProfixList = seProjectNearThreeYearSellProfixList }
          if(seProjectPowerInfo) { this.seProjectPowerInfo = { ...seProjectPowerInfo } }
          if(seProjectPowerTransformInfoList) { this.seProjectPowerTransformInfoList = seProjectPowerTransformInfoList }
          if(seProjectRelevantFile) { this.seProjectRelevantFile = { ...seProjectRelevantFile } }
          if(seProjectSupplementFile) { this.seProjectSupplementFile = { ...seProjectSupplementFile } }
          if(seProjectEndSupplementFile) { this.seProjectEndSupplementFile = { ...seProjectEndSupplementFile } }
        }).catch(err => err)
      },
      getProfitMessage() {
        getProfitMessage({ projectId: this.projectId}).then(res => { // 收益试算
          const { province, city, yearSunShine, mayInstallVolume, seProjectProfitConfig, projectTotalProfitModel, seProjectProfitCountList } = res.data
          this.province = province
          this.city = city
          this.yearSunShine = yearSunShine
          this.mayInstallVolume = mayInstallVolume
          this.seProjectProfitConfig = { ...seProjectProfitConfig }
          this.projectTotalProfitModel = { ...projectTotalProfitModel }
          this.seProjectProfitCountList = seProjectProfitCountList
        }).catch(err => err)
      },
      handleApproval() { // 审批记录
        getProjectExamineLog({ projectId: this.projectId }).then(res => {
          this.activities = res.data
        })
        this.logVisible = true
      },
      handleDown(url) {
        window.open(url)
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