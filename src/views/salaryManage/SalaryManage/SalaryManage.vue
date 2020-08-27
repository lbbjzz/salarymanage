<template>
  <div class="selectList">
    <el-select v-model="value" placeholder="请选择查看的项目">
      <el-option
        v-for="item in options"
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
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%;margin-top: 20px">
      <el-table-column
        prop="id"
        label="工资ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="employeeId"
        label="员工ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="employeeName"
        label="员工姓名">
      </el-table-column>
      <el-table-column
        prop="basicSalary"
        label="基本工资"
        v-if="value==='1' | value===''">
      </el-table-column>
      <el-table-column
        prop="peInsurance"
        label="个人支付养老保险"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="ceInsurance"
        label="公司支付养老保险医疗保险"
        width="200"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="puInsurance"
        label="个人支付失业保险"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="paFund"
        label="个人支付公积金"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="caFund"
        label="公司支付公积金"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="pmInsurance"
        label="个人支付医保"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="cmInsurance"
        label="公司支付医保"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="piTax"
        label="个人所得税"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="slDeduction"
        label="病假扣款"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="slDay"
        label="病假天数"
        width="180"
        v-if="value==='3' | value===''">
      </el-table-column>
      <el-table-column
        prop="plDeduction"
        label="事假扣款"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="plDay"
        label="事假天数"
        width="180"
        v-if="value==='3' | value===''">
      </el-table-column>
      <el-table-column
        prop="lateDeduction"
        label="迟到扣款"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="lateDay"
        label="迟到天数"
        width="180"
        v-if="value==='3' | value===''">
      </el-table-column>
      <el-table-column
        prop="overtimePay"
        label="加班工资"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="overtimeDay"
        label="加班天数"
        width="180"
        v-if="value==='3' | value===''">
      </el-table-column>
      <el-table-column
        prop="backPay"
        label="补发工资"
        v-if="value==='3' | value===''">
      </el-table-column>
      <el-table-column
        prop="shouldPay"
        label="应发工资"
        width="180"
        v-if="value==='2' | value===''">
      </el-table-column>
      <el-table-column
        prop="netPay"
        label="实发工资"
        v-if="value==='4'">
      </el-table-column>
      <el-table-column
            fixed="right"
            label="操作"
            width="200">
        <template slot-scope="scope">
            <el-button size="mini" @click="handleApply(scope.$index, scope.row)">编辑</el-button>
            <el-button @click="deleteById(scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SalaryManage',
  data () {
    return {
      options: [{
        value: '1',
        label: '固定项目'
      }, {
        value: '2',
        label: '计算项目'
      }, {
        value: '3',
        label: '导入项目'
      }, {
        value: '4',
        label: '实发项目'
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
        shouldPay: '1206000'
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
        shouldPay: '1206000'
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
        shouldPay: '1206000'
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
        shouldPay: '1206000'
      }],
      value: ''
    }
  }
}
</script>

<style scoped>

</style>
