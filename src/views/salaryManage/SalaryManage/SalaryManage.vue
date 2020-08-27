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
      :data="calculateVoList"
      stripe
      border
      style="width: 100%;margin-top: 20px">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="employeeName"
        label="员工名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="部门名">
      </el-table-column>
      <el-table-column
        prop="jobName"
        label="岗位名">
      </el-table-column>
      <el-table-column
        prop="dailySickLeaveDeduction"
        label="病假扣款 (天)"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dailyPersonalLeaveDeduction"
        label="事假扣款（天）"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dailyLateDeduction"
        label="迟到扣款（天）"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dailyOvertimePay"
        label="加班费（天）"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalEndowmentInsuranceRate"
        label="个人支付养老保险（%）"
        width="230">
      </el-table-column>
      <el-table-column
        prop="companyEndowmentInsuranceRate"
        label="公司支付养老保险医疗保险（%）"
        width="260">
      </el-table-column>
      <el-table-column
        prop="personalUnemploymentInsuranceRate"
        label="个人支付失业保险（%）"
        width="230">
      </el-table-column>
      <el-table-column
        prop="personalAccumulationFundRate"
        label="个人支付公积金（%）"
        width="230">
      </el-table-column>
      <el-table-column
        prop="companyAccumulationFundRate"
        label="公司支付公积金（%）"
        width="230">
      </el-table-column>
      <el-table-column
        prop="personalMedicalInsuranceRate"
        label="个人支付医保（%）"
        width="230">
      </el-table-column>
      <el-table-column
        prop="companyMedicalInsuranceRate"
        label="公司支付医保（%）"
        width="180">
      </el-table-column>
      <el-table-column
        prop="personalIncomeTaxRate"
        label="个人所得税（%）"
        width="180">
      </el-table-column>
      <el-table-column
            fixed="right"
            label="操作"
            width="100">
        <template slot-scope="scope">
            <el-button size="mini" @click="handleApply(scope.$index, scope.row)">编辑</el-button>
        </template>
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
import { listCalculateVo } from '../../../network/salaryManage/salaryManage'

export default {
  name: 'SalaryManage',
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      calculateVoList: [],
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
  },
  mounted () {
    this.getListCalculateVo()
  },
  methods: {
    getListCalculateVo () {
      listCalculateVo(this.pageNo, this.pageSize).then(res => {
        if (res.code === 2000) {
          this.calculateVoList = res.data.calculateVoList
          this.total = res.data.total
        }
      })
    },
    // 页号改变
    pageNoChange (pageNo) {
      this.pageNo = pageNo
      this.getImportVoList()
    }
  }
}
</script>

<style scoped>

</style>
