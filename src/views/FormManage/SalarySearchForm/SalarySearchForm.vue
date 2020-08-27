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
      <el-button style="float: right;margin-left: 10px" type="primary" icon="el-icon-search" @click="search">搜索
      </el-button>
      <el-input
            placeholder="请输入需要查询的信息"
            prefix-icon="el-icon-search"
            v-model="searchContent"
            style="width: 20%;float: right">
      </el-input>
    </div>
    <div></div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;margin-top: 20px"
      @select="handleSelect"
      ref="multipleTable">
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
        prop="slDeduction"
        label="病假扣款"
        width="180">
      </el-table-column>
      <el-table-column
        prop="plDeduction"
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
        prop="peInsurance"
        label="个人支付养老保险"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ceInsurance"
        label="公司支付养老保险医疗保险"
        width="200">
      </el-table-column>
      <el-table-column
        prop="puInsurance"
        label="个人支付失业保险"
        width="180">
      </el-table-column>
      <el-table-column
        prop="paFund"
        label="个人支付公积金"
        width="180">
      </el-table-column>
      <el-table-column
        prop="caFund"
        label="公司支付公积金"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pmInsurance"
        label="个人支付医保"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cmInsurance"
        label="公司支付医保"
        width="180">
      </el-table-column>
      <el-table-column
        prop="piTax"
        label="个人所得税"
        width="180">
      </el-table-column>
      <el-table-column
        prop="backPay"
        label="补发">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SalarySeachForm',
  data () {
    return {
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
      tableData: [{
        id: '1',
        employeeId: '1',
        employeeName: 'dd',
        basicSalary: '6000',
        peInsurance: '600',
        ceInsurance: '1200',
        puInsurance: '900',
        paFund: '1200',
        caFund: '1200',
        pmInsurance: '600',
        cmInsurance: '600',
        piTax: '900',
        slDeduction: '300000',
        slDay: '3',
        plDeduction: '240000',
        plDay: '4',
        lateDeduction: '120000',
        lateDay: '12',
        overtimePay: '1200000',
        overtimeDay: '7',
        backPay: '0',
        netPay: '543300',
        deptName: '技术部',
        payMonth: '2月',
        deptId: '1'
      }, {
        id: '2',
        employeeId: '1',
        employeeName: 'dd',
        basicSalary: '6000',
        peInsurance: '600',
        ceInsurance: '1200',
        puInsurance: '900',
        paFund: '1200',
        caFund: '1200',
        pmInsurance: '600',
        cmInsurance: '600',
        piTax: '900',
        slDeduction: '300000',
        slDay: '3',
        plDeduction: '240000',
        plDay: '4',
        lateDeduction: '120000',
        lateDay: '12',
        overtimePay: '1200000',
        overtimeDay: '7',
        backPay: '0',
        netPay: '543300',
        deptName: '技术部',
        payMonth: '6月',
        deptId: '1'
      }, {
        id: '3',
        employeeId: '1',
        employeeName: 'dd',
        basicSalary: '6000',
        peInsurance: '600',
        ceInsurance: '1200',
        puInsurance: '900',
        paFund: '1200',
        caFund: '1200',
        pmInsurance: '600',
        cmInsurance: '600',
        piTax: '900',
        slDeduction: '300000',
        slDay: '3',
        plDeduction: '240000',
        plDay: '4',
        lateDeduction: '120000',
        lateDay: '12',
        overtimePay: '1200000',
        overtimeDay: '7',
        backPay: '0',
        netPay: '543300',
        deptName: '技术部',
        payMonth: '10月',
        deptId: '1'
      }, {
        id: '4',
        employeeId: '1',
        employeeName: 'dd',
        basicSalary: '6000',
        peInsurance: '600',
        ceInsurance: '1200',
        puInsurance: '900',
        paFund: '1200',
        caFund: '1200',
        pmInsurance: '600',
        cmInsurance: '600',
        piTax: '900',
        slDeduction: '300000',
        slDay: '3',
        plDeduction: '240000',
        plDay: '4',
        lateDeduction: '120000',
        lateDay: '12',
        overtimePay: '1200000',
        overtimeDay: '7',
        backPay: '0',
        netPay: '543300',
        deptName: '技术部',
        payMonth: '12月',
        deptId: '1'
      }],
      value1: '',
      value2: ''
    }
  }
}
</script>

<style scoped>

</style>
