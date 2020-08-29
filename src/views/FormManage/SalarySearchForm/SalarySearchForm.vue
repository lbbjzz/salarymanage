<template>
  <div>
    <div class="block">
      <el-select
        v-model="value1"
        style="margin-left: 20px;"
        placeholder="请选择开始月份">
        <el-option
          v-for="item in months"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select
        v-model="value2"
        style="margin-left: 20px;"
        placeholder="请选择结束月份">
        <el-option
          v-for="item in months"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button style="float: right;margin-left: 10px" type="primary" icon="el-icon-search" @click="searchByEmployeeId">搜索
      </el-button>
      <el-input
            placeholder="请输入需要员工ID"
            prefix-icon="el-icon-search"
            v-model="employeeId"
            style="width: 20%;float: right">
      </el-input>
    </div>
    <div></div>
    <el-table
      :data="salaryData"
      stripe
      style="width: 100%;margin-top: 20px">
      <el-table-column
        prop="deptId"
        label="部门编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="部门名称">
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
        prop="payMonth"
        label="发放月"
        width="100">
      </el-table-column>
      <el-table-column
        prop="netPay"
        label="实发工资"
        width="180">
      </el-table-column>
      <el-table-column
        prop="basicSalaryTotal"
        label="基本工资"
        width="180">
      </el-table-column>
      <el-table-column
        prop="heatingSubsidy"
        label="采暖补贴"
        width="180">
      </el-table-column>
      <el-table-column
        prop="slDay"
        label="病假天数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="plDay"
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
        prop="dailySickLeaveDeduction"
        label="病假扣款"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dailyPersonalLeaveDeduction"
        label="事假扣款"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dailyOvertimePay"
        label="加班工资"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dailyLateDeduction"
        label="迟到扣款"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalEndowmentInsuranceRate"
        label="个人支付养老保险"
        width="180">
      </el-table-column>
      <el-table-column
        prop="companyEndowmentInsuranceRate"
        label="公司支付养老保险医疗保险"
        width="200">
      </el-table-column>
      <el-table-column
        prop="personalUnemploymentInsuranceRate"
        label="个人支付失业保险"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalAccumulationFundRate"
        label="个人支付公积金"
        width="180">
      </el-table-column>
      <el-table-column
        prop="companyAccumulationFundRate"
        label="公司支付公积金"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalMedicalInsuranceRate"
        label="个人支付医保"
        width="180">
      </el-table-column>
      <el-table-column
        prop="companyMedicalInsuranceRate"
        label="公司支付医保"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalIncomeTaxRate"
        label="个人所得税"
        width="180">
      </el-table-column>
      <el-table-column
        prop="backPay"
        label="补发"
        width="180">
      </el-table-column>
    </el-table>
    <!--分页-->
    <div v-if="total > pageSize" style="float: right;margin-top: 30px;margin-bottom: 20px;margin-right: 60px">
      <el-pagination
        background
        :current-page="pageNo"
        :page-size="pageSize"
        @current-change="pageNoChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getEmployeeSalaryStat } from '../../../network/FormManage/SalarySearchForm'

export default {
  name: 'SalarySeachForm',
  data () {
    return {
      salaryData: [],
      employeeId: null,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      deptId: 0,
      months: [{
        value: '1',
        label: '1月'
      }, {
        value: '2',
        label: '2月'
      }, {
        value: '3',
        label: '3月'
      }, {
        value: '4',
        label: '4月'
      }, {
        value: '5',
        label: '5月'
      }, {
        value: '6',
        label: '6月'
      }, {
        value: '7',
        label: '7月'
      }, {
        value: '8',
        label: '8月'
      }, {
        value: '9',
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
      }],
      value1: '',
      value2: ''
    }
  },
  mounted () {
    this.getEmployeeSalaryStat()
  },
  methods: {
    // 页号改变
    pageNoChange (pageNo) {
      this.pageNo = pageNo
      this.searchInfo()
    },
    // 获取全部信息
    getEmployeeSalaryStat() {
      getEmployeeSalaryStat().then(res => {
        if (res.code === 2000) {
          console.log(res)
          this.salaryData = res.data.employeeSalaryStat
        }
      })
    },
    searchByEmployeeId () {

    }
  }
}
</script>

<style scoped>

</style>
