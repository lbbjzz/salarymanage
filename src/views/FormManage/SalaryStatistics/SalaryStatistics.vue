<template>
  <div>
    <el-select
      v-model="value1"
      style="margin-left: 20px;"
      placeholder="请选择查看的统计表">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-date-picker
      v-model="value2"
      type="year"
      placeholder="选择查看的年份"
      style="margin-left: 20px">
    </el-date-picker>
    <el-select
      v-model="value3"
      style="margin-left: 20px;"
      placeholder="请选择查看的月份">
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
      <div></div>
      <el-table
        :data="deptData"
        stripe
        style="width: 100%;margin-top: 20px"
        v-if="value1 === '1'">
        <el-table-column
          prop="deptID"
          label="部门编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="部门名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="yandm"
          label="年度/月度"
          width="180">
        </el-table-column>
        <el-table-column
          prop="totalSalary"
          label="总基本工资"
          width="180">
        </el-table-column>
        <el-table-column
          prop="averageSalary"
          label="平均基本工资"
          width="180">
        </el-table-column>
        <el-table-column
          prop="minimumSalary"
          label="最低基本工资"
          width="180">
        </el-table-column>
        <el-table-column
          prop="highestSalary"
          label="最高基本工资"
          width="180">
        </el-table-column>
      </el-table>
      <el-table
        :data="companyData"
        stripe
        style="width: 100%;margin-top: 20px"
        v-if="value1 === '2'">
        <el-table-column
          prop="yandm"
          label="年度/月度"
          width="180">
        </el-table-column>
        <el-table-column
          prop="totalSalary"
          label="总工资"
          width="180">
        </el-table-column>
        <el-table-column
          prop="averageSalary"
          label="平均工资"
          width="180">
        </el-table-column>
        <el-table-column
          prop="minimumSalary"
          label="最低工资"
          width="180">
        </el-table-column>
        <el-table-column
          prop="highestSalary"
          label="最高工资"
          width="180">
        </el-table-column>
      </el-table>
      <el-table
        :data="employeeData"
        stripe
        style="width: 100%;margin-top: 20px"
        v-if="value1 === '3'">
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
          prop="basicSalary"
          label="总基本工资"
          width="180">
        </el-table-column>
        <el-table-column
          prop="slDeduction"
          label="总病假扣款"
          width="180">
        </el-table-column>
        <el-table-column
          prop="plDeduction"
          label="总事假扣款"
          width="180">
        </el-table-column>
        <el-table-column
          prop="overtimePay"
          label="总加班工资"
          width="180">
        </el-table-column>
        <el-table-column
          prop="lateDeduction"
          label="总迟到扣款"
          width="180">
        </el-table-column>
        <el-table-column
          prop="endowmentInsurance"
          label="总养老保险"
          width="180">
        </el-table-column>
        <el-table-column
          prop="medicalInsurance"
          label="总医疗保险"
          width="200">
        </el-table-column>
        <el-table-column
          prop="accumulationInsurance"
          label="总公积金"
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
  name: 'SalaryStatistics',
  data () {
    return {
      options: [{
        value: '1',
        label: '部门'
      }, {
        value: '2',
        label: '公司'
      }, {
        value: '3',
        label: '员工'
      }],
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
      value1: [],
      value2: [],
      value3: []
    }
  }
}
</script>

<style scoped>

</style>
