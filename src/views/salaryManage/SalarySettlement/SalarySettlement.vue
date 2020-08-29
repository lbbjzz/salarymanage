<template>
  <div class="selectList">
    <el-select @change="deptNameChange" v-model="deptName" placeholder="请选择发放的部门">
      <el-option
        key="0"
        label="全部部门"
        value="全部部门">
      </el-option>
      <el-option
        v-for="item in allDept"
        :key="item.id"
        :label="item.name"
        :value="item.name">
      </el-option>
    </el-select>
    <el-date-picker
      value-format="yyyy-MM"
      style="margin-left: 30px"
      v-model="yearsMonth"
      @change="timeChange"
      type="month"
      placeholder="选择月">
    </el-date-picker>
    <div v-if="!isSend">
      <el-button v-show="!isStorage" plain style="margin-top: 20px;" @click="storageSalary">暂存工资</el-button>
      <el-button v-show="isStorage" type="primary" plain style="margin-top: 20px;" @click="sendStorageSalary">发放工资</el-button>
    </div>
    <el-table
      :data="salaryVoList"
      stripe
      style="width: 100%;margin-top: 20px">
      <el-table-column
        prop="id"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="employeeName"
        label="员工姓名">
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="员工部门"
        width="100">
      </el-table-column>
      <el-table-column
        prop="jobName"
        label="员工岗位"
        width="100">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发放月"
        :formatter="dateFormat"
        width="150">
      </el-table-column>
      <el-table-column
        prop="netPay"
        label="实发工资">
      </el-table-column>
      <el-table-column
        prop="basicSalary"
        label="基本工资">
      </el-table-column>
      <el-table-column
        prop="heatingSubsidy"
        label="采暖补贴">
      </el-table-column>
      <el-table-column
        prop="sickLeaveDay"
        label="病假天数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalLeaveDay"
        label="事假天数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="overtimeDay"
        label="加班天数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lateDay"
        label="迟到天数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sickLeaveDeduction"
        label="病假扣款"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalLeaveDeduction"
        label="事假扣款"
        width="180">
      </el-table-column>
      <el-table-column
        prop="overtimePay"
        label="加班工资"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lateDeduction"
        label="迟到扣款"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalEndowmentInsurance"
        label="个人支付养老保险"
        width="180">
      </el-table-column>
      <el-table-column
        prop="companyEndowmentInsurance"
        label="公司支付养老保险医疗保险"
        width="200">
      </el-table-column>
      <el-table-column
        prop="personalUnemploymentInsurance"
        label="个人支付失业保险"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalAccumulationFund"
        label="个人支付公积金"
        width="180">
      </el-table-column>
      <el-table-column
        prop="companyAccumulationFund"
        label="公司支付公积金"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalMedicalInsurance"
        label="个人支付医保"
        width="180">
      </el-table-column>
      <el-table-column
        prop="companyMedicalInsurance"
        label="公司支付医保"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalIncomeTax"
        label="个人所得税"
        width="180">
      </el-table-column>
      <el-table-column
        prop="backPay"
        label="补发">
      </el-table-column>
      <el-table-column
        v-if="isStorage"
        fixed="right"
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button @click="editSalary(scope.row)"  type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div style="float: right;margin-top: 30px;margin-bottom: 20px;margin-right: 60px">
      <el-pagination
        v-if="total > pageSize"
        background
        :current-page="pageNo"
        :page-size="pageSize"
        @current-change="pageNoChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!--编辑暂存的工资-->
    <el-dialog
      title="提示"
      :visible.sync="editVisible"
      width="30%"
      center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑导入项目的表单-->
    <el-dialog title="编辑员工工资计算" :visible.sync="editVisible">
      <el-form :model="salaryData">
        <el-form-item label="员工姓名：">
          <el-input :readOnly="true" v-model="salaryData.employeeName"></el-input>
        </el-form-item>
        <el-form-item label="病假天数：">
          <el-input-number :step=1 :step-strictly="true" v-model="salaryData.sickLeaveDay" :min="0" :max="31"></el-input-number>
        </el-form-item>
        <el-form-item label="事假天数：">
          <el-input-number :step=1 :step-strictly="true" v-model="salaryData.personalLeaveDay" :min="0" :max="31"></el-input-number>
        </el-form-item>
        <el-form-item label="迟到天数：">
          <el-input-number :step=1 :step-strictly="true" v-model="salaryData.lateDay" :min="0" :max="31"></el-input-number>
        </el-form-item>
        <el-form-item label="加班天数：">
          <el-input-number :step="1" :step-strictly="true" v-model="salaryData.overtimeDay" :min="0" :max="31"></el-input-number>
        </el-form-item>
        <el-form-item label="补发工资：">
          <el-input onkeyup='this.value=this.value.replace(/\D/gi,"")' v-model="salaryData.backPay"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary"  @click="updateSalary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { allDept } from '../../../network/salaryManage/fixedSalaryManage'
import { listSalaryVO, judgeSendSalary, updateSalaryStorage, generateSalary, sendSalary } from '../../../network/salaryManage/salarySettlement.vue'
import moment from 'moment'
export default {
  name: 'SalarySettlement',
  data () {
    return {
      allDept: [],
      deptName: '全部部门',
      deptId: 0,
      yearsMonth: '',
      time: '0',
      pageNo: 1,
      pageSize: 10,
      total: 0,
      salaryVoList: [],
      // 是否发放了工资
      isSend: true,
      // 是否为暂存工资
      isStorage: false,
      editVisible: false,
      salaryData: {},
      options: [{
        value: '1',
        label: '技术部'
      }, {
        value: '2',
        label: '产品部'
      }],
      months: [{
        value: '0',
        label: '全部'
      }, {
        value: '01',
        label: '1月'
      }, {
        value: '02',
        label: '2月'
      }, {
        value: '03',
        label: '3月'
      }, {
        value: '04',
        label: '4月'
      }, {
        value: '05',
        label: '5月'
      }, {
        value: '06',
        label: '6月'
      }, {
        value: '07',
        label: '7月'
      }, {
        value: '08',
        label: '8月'
      }, {
        value: '09',
        label: '9月'
      }, {
        value: '10',
        label: '10月'
      }, {
        value: '11',
        label: '11月'
      }, {
        value: '12',
        label: '12月'
      }]
    }
  },
  mounted () {
    this.getAllDept()
    this.getListSalaryVO()
  },
  methods: {
    judgeSendSalary () {
      if (this.deptId === 0 || this.time === '0') {
        return
      }
      judgeSendSalary(this.deptId, this.time).then(res => {
        if (res.code === 2000) {
          this.isSend = res.data.isSend
          if (this.isSend) {
            this.getListSalaryVO()
          } else {
            this.isStorage = false
            this.$message.error(this.deptName + '在' + this.time + '月没有发放工资！')
          }
        }
      })
    },
    getListSalaryVO () {
      listSalaryVO(this.pageNo, this.pageSize, this.deptId, this.time).then(res => {
        if (res.code === 2000) {
          console.log(res)
          const isStorage = res.data.isStorage
          console.log(isStorage)
          this.isSend = true
          if (isStorage !== undefined) {
            this.isStorage = isStorage
            this.isSend = !this.isStorage
          } else {
            this.isStorage = false
          }
          this.salaryVoList = res.data.salaryVoList
          this.total = this.res.data.total
        }
      })
    },
    getAllDept () {
      allDept().then(res => {
        if (res.code === 2000) {
          this.allDept = res.data.allDept
        }
      })
    },
    // 页号改变
    pageNoChange (pageNo) {
      this.pageNo = pageNo
      this.getListSalaryVO()
    },
    // 选择部门变化
    deptNameChange (value) {
      if (value === '全部部门') {
        this.deptId = 0
      } else {
        const dept = this.allDept.find(item => {
          return item.name === value
        })
        this.deptId = dept.id
      }
      if (this.time === '0' || this.deptId === 0) {
        this.getListSalaryVO()
      } else {
        this.judgeSendSalary()
      }
    },
    // 选择月份变化
    timeChange (value) {
      if (value === null || value === undefined) {
        this.time = '0'
      } else {
        this.time = value
      }
      // 2020-08
      const times = value.split('-')
      console.log(times)
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      if (Number(times[0]) > Number(year) || Number(times[1]) > Number(month)) {
        this.yearsMonth = ''
        this.$message.error('时间选择有误！')
        return
      }
      if (this.time === '0' || this.deptId === 0) {
        this.getListSalaryVO()
      } else {
        this.judgeSendSalary()
      }
    },
    // 编辑工资
    editSalary (row) {
      this.salaryData = row
      console.log(this.salaryData)
      this.editVisible = true
    },
    // 格式化时间
    dateFormat (row, column) {
      const date = row[column.property]
      return moment(date).format('YYYY 年 MMMM')
    },
    // 修改
    updateSalary () {
      updateSalaryStorage(this.salaryData.id, this.salaryData.importId,
        this.salaryData.employeeId, this.salaryData.sickLeaveDay,
        this.salaryData.personalLeaveDay, this.salaryData.lateDay,
        this.salaryData.overtimeDay, this.salaryData.backPay).then(res => {
        if (res.code === 2000) {
          this.judgeSendSalary()
          this.editVisible = false
        }
      })
    },
    // 暂存工资
    storageSalary () {
      if (this.deptId === 0 || this.time === '0') {
        this.$message.error('时间和部门有误！')
        return
      }
      // 生成暂存工资
      generateSalary(this.deptId, this.time).then(res => {
        if (res.code === 2000) {
          this.$message.success(this.deptName + '在' + this.time + '月工资发放中！！')
          this.judgeSendSalary()
        }
      })
    },
    sendStorageSalary () {
      if (this.deptId === 0 || this.time === '0') {
        this.$message.error('时间和部门有误！')
        return
      }
      // 生成暂存工资
      sendSalary(this.deptId, this.time).then(res => {
        if (res.code === 2000) {
          this.$message.success(this.deptName + '在' + this.time + '月工资发放成功！')
          this.judgeSendSalary()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
