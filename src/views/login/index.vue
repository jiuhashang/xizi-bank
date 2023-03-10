<template>
  <div class="home">
    <div class="item">
      <div class="top">西子光能智慧能源管理平台</div>
      <div class="bottom">
        <span style="font-size:20px;color:#313131;margin-left:145px;margin-top:33px;">欢迎登录</span>
        <el-form :model="form" class="form">
          <el-form-item>
            <el-input prefix-icon="el-icon-user" v-model="form.loginPhone" placeholder="请输入手机号码" clearable />
          </el-form-item>
          <el-form-item>
            <el-input type="password" prefix-icon="el-icon-lock" v-model="form.loginPassword" placeholder="请输入密码" clearable />
          </el-form-item>
          <el-form-item style="height:44px;">
            <el-row :gutter="50">
              <el-col :span="15">
                <el-input prefix-icon="el-icon-warning-outline" v-model="form.code" placeholder="请输入验证码" clearable />
              </el-col>
              <el-col :span="9">
                <img :src="imgSrc" alt="" @click="getImgSrc">
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <el-button style="width:100%;background-color:#130C5F;color:#fff;font-size:18px;margin-bottom:21px;" @click="send" :loading="loading">登 录</el-button>
        <span style="font-size:14px;color:#6f6f6f;margin-left:80px;">如需账号，请联系后台管理员申请</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { Collapse } from 'element-ui'
import { getImg } from '@/api/login'
import { login } from '@/api/bank'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        loginPhone: '',
        loginPassword: '',
        code: '',
        key: ''
      },
      imgSrc: '',
      loading:false,
      menu: '项目发起, 材料补充, 立项补充,项目初审, 图纸复核, 项目终审, 项目总览,账户管理, 角色管理, 下载管理'
    }
  },
  created() {
    this.getImgSrc()
  },
  methods: {
    send () {
      if(this.form.code) {
        this.loading = true
        login (this.form).then(res => {
          if(res.code == 0) {
            console.log(res)
            this.loading = false
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('bankName', res.data.bankName)
            window.sessionStorage.setItem('image', res.data.image)
            // if(this.form.userName == 'admin') {
            //   window.sessionStorage.setItem('menuId', this.menu)
            //   this.$router.push('/home')
            // } else {
              // window.sessionStorage.setItem('menuId', res.data.seAdminRoleInfo.menuId)
              this.$router.push('/home')
            // }
          }
        }).catch( err => {
          this.loading = false
          this.form.code =  ''
          this.getImgSrc()
        })
      } else {
        this.$message.error('验证码不能为空!')
      }
    },
    getImgSrc() {
      getImg().then(res => {
        this.imgSrc = res.data.image
        this.form.key = res.data.key
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(https://xizi-file-6e32.obs.cn-east-3.myhuaweicloud.com/1645168260522.webp);
    background-repeat: no-repeat;
    background-size: cover;
    .item {
      position: absolute;
      width: 483px;
      height: 676px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
      .top {
        height: 132px;
        font-size: 30px;
        background-color: #130C5F;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .bottom {
        background-color: #fff;
        padding: 33px 54px 62px 54px;
        border-bottom-right-radius:20px;
        border-bottom-left-radius:20px;
        .form {
          margin-top: 19px;
        }
      }
    }
  }
  
</style>
