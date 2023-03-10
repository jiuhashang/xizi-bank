<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>综合管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="id">编辑角色</el-breadcrumb-item>
        <el-breadcrumb-item v-else>创建角色</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width:240px;">
          <h2>&lt; 角色管理</h2>
        </div>
        <div class="btnnn">
          <el-button size="small">取 消</el-button>
          <el-button v-if="id" size="small" type="primary" @click="handleSave">保 存</el-button>
          <el-button v-else size="small" type="primary" @click="handleAddRole">创 建</el-button>
        </div>
      </div>
    </div>
     <el-card>
        <h3>角色信息</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="8" style="text-align:right;margin-top:5px;"><span style="color:red;">*</span> 角色名称</el-col>
              <el-col :span="16">
                <el-input v-model="addRoleInfo.roleName" placeholder="请输入"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:10px;">
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="8" style="text-align:right;margin-top:5px;">备注</el-col>
              <el-col :span="16">
                <el-input v-model="addRoleInfo.remark" placeholder="请输入"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <h3>权限配置</h3>
        <div style="margin-left:110px;">
          <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">资料收集</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1" style="margin-left:30px;">
            <el-checkbox v-for="city in cities1" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div style="margin: 15px 0 0 110px;">
          <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">审批中心</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2" style="margin-left:30px;">
            <el-checkbox v-for="city in cities2" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div> 
        <div style="margin:15px 0 0 110px;">
          <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">综合管理</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3" style="margin-left:30px;">
            <el-checkbox v-for="city in cities3" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-card>
  </div>
</template>

<script>
import { getRoleList, addRole, updateOne } from '@/api/integrated'
const dataCollection1 = ['项目发起', '材料补充', '立项补充']
const dataCollection2 = ['项目初审', '图纸复核', '项目终审', '项目分享', '项目总览']
const dataCollection3 = ['账户管理', '角色管理','机构管理', '下载管理']
export default {
  name: 'RoleDetail',
  data() {
    return {
      addRoleInfo: {
        id: '',
        roleName: '',
        roleType: '',
        remark: '',
        menuId: ''
      },
      menu: [],
      
      checkAll1: false,
      checkedCities1: [],
      cities1: dataCollection1,
      isIndeterminate1: true,

      checkAll2: false,
      checkedCities2: [],
      cities2: dataCollection2,
      isIndeterminate2: true,

      checkAll3: false,
      checkedCities3: [],
      cities3: dataCollection3,
      isIndeterminate3: true,
    }
  },
  created() {
    this.id = this.$route.query.id
    if( this.id ) {
      this.getRoleList()
    }
  },
  methods: {
    getRoleList() {
      getRoleList({ id: this.id }).then(res => {
        console.log(res)
        const { id, roleName, roleType, remark, menuId } = res.data
        this.addRoleInfo.id = id
        this.addRoleInfo.roleName = roleName
        this.addRoleInfo.roleType = roleType
        this.addRoleInfo.remark = remark
        this.menu = menuId.split(',')
        this.menu.forEach(m => {
          if(this.cities1.indexOf(m)>-1) this.checkedCities1.push(m)
          if(this.cities2.indexOf(m)>-1) this.checkedCities2.push(m)
          if(this.cities3.indexOf(m)>-1) this.checkedCities3.push(m)
        })
      })
    },
    handleCheckAllChange1(val) {
      this.checkedCities1 = val ? dataCollection1 : []
      this.isIndeterminate1 = false
      console.log(this.checkedCities1)
    },
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length
      this.checkAll1 = checkedCount === this.cities1.length
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.cities1.length
    },

    handleCheckAllChange2(val) {
      this.checkedCities2 = val ? dataCollection2 : []
      this.isIndeterminate2 = false
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length
      this.checkAll2 = checkedCount === this.cities2.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.cities2.length
    },

    handleCheckAllChange3(val) {
      this.checkedCities3 = val ? dataCollection3 : []
      this.isIndeterminate3 = false
    },
    handleCheckedCitiesChange3(value) {
      let checkedCount = value.length
      this.checkAll3 = checkedCount === this.cities3.length
      this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.cities3.length
    },

    handleAddRole() { // 创建角色
      this.addRoleInfo.menuId = [ ...this.checkedCities1, ...this.checkedCities2, ...this.checkedCities3].join(',')
      addRole(this.addRoleInfo).then(res => {
        // console.log(res)
        this.$message.success(res.msg)
        this.$router.back()
      })
    },

    handleSave() { // 编辑角色
      this.addRoleInfo.menuId = [ ...this.checkedCities1, ...this.checkedCities2, ...this.checkedCities3].join(',')
      updateOne(this.addRoleInfo).then(res => {
        console.log(res)
        this.$message.success(res.msg)
        this.$router.back()
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
</style>