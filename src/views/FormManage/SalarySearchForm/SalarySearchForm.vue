<template>
  <div>
    <el-date-picker
      value-format="yyyy-MM"
      style="margin-left: 30px"
      v-model="beginTime"
      @change="beginDateChange"
      type="month"
      placeholder="选择开始时间">
    </el-date-picker>
    <el-date-picker
      value-format="yyyy-MM"
      v-model="endTime"
      style="margin-left: 30px"
      @change="endDateChange"
      type="month"
      placeholder="选择结束时间">
    </el-date-picker>
    <el-select placeholder="请选择发放的部门" style="margin-left: 30px" v-model="secectDeptName" @change="deptNameChange">
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
    <el-table
      :data="searchItem"
      stripe
      style="width: 100%;margin-top: 20px"
      ref="multipleTable">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="employeeId"
        label="员工编号"
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
    </el-table>
    <!--分页-->
    <el-pagination
      style="padding-top: 20px"
      class="pager"
      background layout="prev, pager, next"
      :current-page="pageNo"
      :page-size="pageSize"
      :total="total"
      @current-change="pageNoChange"
      hide-on-single-page>
    </el-pagination>
  </div>
</template>

<script>
import { getEmployeeSalaryStat } from '../../../network/FormManage/SalarySearchForm'
import { allDept } from '@/network/salaryManage/fixedSalaryManage'
import moment from 'moment'

export default {
  name: 'SalarySeachForm',
  data() {
    return {
      total: null,
      pageNo: 1,
      pageSize: 8,
      searchItem: [],
      deptName: '-1',
      allDept: [],
      beginTime: '',
      endTime: '',
      secectDeptName: '全部部门',
      beginDate: '-1',
      endDate: '-1'
    }
  },
  mounted() {
    this.getAllDept()
    this.getInfo()
  },
  methods: {
    // 页号改变
    pageNoChange(pageNo) {
      this.pageNo = pageNo
      this.getInfo()
    },
    // 获取所有部门
    getAllDept () {
      allDept().then(res => {
        if (res.code === 2000) {
          console.log(res, 'all')
          this.allDept = res.data.allDept
        }
      })
    },
    // 格式化时间
    dateFormat(row, column) {
      const date = row[column.property]
      return moment(date).format('YYYY 年 MMMM')
    },
    // 开始时间
    beginDateChange (value) {
      if (value === null || value === undefined) {
        this.beginDate = '-1'
      } else {
        this.beginDate = value
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
      }
      console.log(this.beginDate, 'begin')
      this.getInfo()
    },
    // 结束时间
    endDateChange (value) {
      if (value === null || value === undefined) {
        this.beginDate = '-1'
      } else {
        this.beginDate = value
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
      }
      console.log(this.endDate, 'end')
      console.log(this.deptName, 'name')
      this.getInfo()
    },
    // 部门变化
    deptNameChange(value) {
      if (value === '全部部门') {
        this.deptName = '-1'
      } else {
        this.deptName = value
      }
      this.getInfo()
    },
    getInfo() {
      getEmployeeSalaryStat(this.pageNo, this.pageSize, this.beginDate, this.endDate, this.deptName).then(res => {
        console.log(res)
        this.searchItem = res.data.salaryVoList
        this.total = res.data.total
      })
    }
  }
}
</script>

<style scoped>

</style>
