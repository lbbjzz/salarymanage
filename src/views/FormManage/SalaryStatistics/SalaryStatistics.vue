/* eslint-disable no-undef */
<template>
  <div>
    <el-select
      v-model="value1"
      style="margin-left: 20px; margin-bottom: 20px"
      placeholder="请选择查看的统计表">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-date-picker
      value-format="yyyy-MM"
      v-model="value2"
      type="month"
      placeholder="选择月"
      style="margin-left: 20px"
      @change="getMonth"
      v-show="value1 === '1' | value1 === '2'">
    </el-date-picker>
    <el-select v-show="value1 === '1'" @change="deptChange" style="margin-left: 50px" v-model="deptName" placeholder="请选择查询的部门">
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
    <div></div>
    <el-table
      :data="deptData"
      stripe
      style="width: 100%;margin-top: 20px"
      v-show="value1 === '1'">
      <el-table-column
        prop="deptId"
        label="部门编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="部门名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="queryDate"
        label="年度/月度"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sumSalary"
        label="总基本工资"
        v-model="sumSalary"
        width="180">
      </el-table-column>
      <el-table-column
        prop="avgSalary"
        label="平均基本工资"
        v-model="avgSalary"
        width="180">
      </el-table-column>
      <el-table-column
        prop="minSalary"
        label="最低基本工资"
        v-model="minSalary"
        width="180">
      </el-table-column>
      <el-table-column
        prop="maxSalary"
        label="最高基本工资"
        v-model="maxSalary"
        width="180">
      </el-table-column>
    </el-table>
    <el-table
      :data="employeeData"
      stripe
      style="width: 100%;margin-top: 20px"
      v-show="value1 === '3'">
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
        prop="basicSalaryTotal"
        label="总基本工资"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sickLeaveDeductionTotal"
        label="总病假扣款"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalLeaveDeductionTotal"
        label="总事假扣款"
        width="180">
      </el-table-column>
      <el-table-column
        prop="overtimePayTotal"
        label="总加班工资"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lateDeductionTotal"
        label="总迟到扣款"
        width="180">
      </el-table-column>
      <el-table-column
        prop="endowmentInsuranceTotal"
        label="总养老保险"
        width="180">
      </el-table-column>
      <el-table-column
        prop="medicalInsuranceTotal"
        label="总医疗保险"
        width="200">
      </el-table-column>
      <el-table-column
        prop="accumulationFundTotal"
        label="总公积金"
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
    <div id="myChart" :style="{width: '800px', height: '400px'}" v-show="value1 === '1' | value1 === '2'"></div>
  </div>
</template>

<script>
import { getMonthlySalaryStat, getMonthlySalaryStatByDeptId, getEmployeeSalaryStat, getCompMonthlySalaryStat } from '../../../network/FormManage/SalaryStatistics'
import { allDept } from '../../../network/salaryManage/fixedSalaryManage'

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
      value1: '',
      value2: '',
      deptData: [],
      companyData: [],
      employeeData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      time: '',
      allDept: [],
      deptName: '全部部门',
      deptId: 0,
      value: '1',
      c: null,
      drawData: [],
      sumSalary: 0,
      avgSalary: 0,
      minSalary: 0,
      maxSalary: 0
    }
  },
  mounted () {
    // this.getYearlySalar()
    this.getMonthlySalary()
    this.getAllDept()
    this.getMonthlySalaryStatByDeptId()
    this.getEmployeeSalaryStat()
    this.drawLine()
  },
  methods: {
    // 页号改变
    pageNoChange (pageNo) {
      this.pageNo = pageNo
      this.searchInfo()
    },
    // 获取全部部门
    getAllDept () {
      allDept().then(res => {
        if (res.code === 2000) {
          this.allDept = res.data.allDept
        }
      })
    },
    // 获取月度部门工资
    getMonthlySalary (month) {
      console.log(month, 'month')
      getMonthlySalaryStat(month).then(res => {
        if (res.code === 2000) {
          console.log(res)
          this.deptData = res.data.listSalaryStat
        }
      })
    },
    getMonthlySalaryStatByDeptId(deptId, month) {
      console.log(deptId, month)
      getMonthlySalaryStatByDeptId(this.deptId, month).then(res => {
        if (res.code === 2000) {
          console.log(res)
          this.deptData = []
          this.deptData[0] = res.data.salaryStat
          this.drawLine(this.deptData[0].sumSalary, this.deptData[0].avgSalary, this.deptData[0].minSalary, this.deptData[0].maxSalary)
        }
      })
    },
    // 获取公司月度工资统计
    getCompMonthlySalaryStat(month) {
      getCompMonthlySalaryStat(month).then(res => {
        if (res.code === 2000) {
          console.log(res)
          // this.companyData.queryDate = res.data.queryDate
          // this.companyData.avgSalary = res.data.avgSalary
          // this.companyData.minSalary = res.data.minSalary
          // this.companyData.maxSalary = res.data.maxSalary
          // this.companyData.sumSalary = res.data.sumSalary
          this.drawLine(res.data.sumSalary, res.data.avgSalary, res.data.minSalary, res.data.sumSalary)
        }
      })
    },
    getMonth(time) {
      this.getMonthlySalary(time)
      this.getCompMonthlySalaryStat(time)
      this.time = time
    },
    // 查询部门的改变
    deptChange (value) {
      if (value === '全部部门') {
        this.deptId = 0
      } else {
        const dept = this.allDept.find(item => {
          return item.name === value
        })
        this.deptId = dept.id
      }
      this.searchInfo()
    },
    searchByDeptId() {
      this.searchInfo()
    },
    searchInfo (deptId, time) {
      deptId = this.deptId
      time = this.time
      console.log(deptId, time)
      this.getMonthlySalaryStatByDeptId(deptId, time)
    },
    // 获取员工工资统计
    getEmployeeSalaryStat() {
      getEmployeeSalaryStat().then(res => {
        if (res.code === 2000) {
          console.log(res)
          this.employeeData = res.data.employeeSalaryStat
        }
      })
    },
    // 获取后台数据
    drawLine(sumSalary, avgSalary, minSalary, maxSalary) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '工资统计' },
        tooltip: {},
        xAxis: {
          data: ['总基本工资', '平均基本工资', '最低基本工资', '最高基本工资']
        },
        yAxis: {},
        series: [{
          name: '工资统计',
          type: 'bar',
          data: [sumSalary, avgSalary, minSalary, maxSalary]
        }],
        color: ['#5aacd1']
      })
    }
  }
}
</script>

<style scoped>

</style>
