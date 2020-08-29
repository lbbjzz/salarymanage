<template>
  <div>
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

    <el-button style="margin-left: 20px" type="primary" @click="exportExcel" plain>导出Excel</el-button>
    <el-table
      :data="printItem"
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
import { AllPrintItem , allSalaryVO } from '@/network/FormManage/SalaryPrint'
import moment from 'moment'
import { allDept } from '@/network/salaryManage/fixedSalaryManage'
import XLSX from 'xlsx'

export default {
  name: 'SalarySettlement',
  data() {
    return {
      total: null,
      pageNo: 1,
      pageSize: 8,
      options: [{
        value: '1',
        label: '技术部'
      }, {
        value: '2',
        label: '产品部'
      }],
      printItem: [],
      deptName: '全部部门',
      allDept: [],
      yearsMonth: '',
      time: '0',
      deptId: 0
    }
  },
  created() {
    this.getPrintItem()
    this.getAllDept()
  },
  mounted () {
  },
  methods: {
    exportExcel () {
      const time = this.yearsMonth === '' ? '全部时间' : this.yearsMonth
      this.$confirm('此操作导出' + this.deptName + time + '的考勤数据？', '导出Excel', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 获取全部的工资数据
        allSalaryVO(this.deptId, this.time).then(res => {
          console.log(res)
          if (res.code === 2000) {
            alert('测试')
            if (res.data.salaryVoList.length === 0) {
              this.$message({
                type: 'error',
                message: '没有任何数据！！'
              })
              return
            }
            const data = res.data.salaryVoList
            console.log(data)
            this.export(data, time)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    export (data, time) {
      const tableData = [
        ['ID', '员工编号', '员工姓名', '员工部门', '发放月', '实发工资',
          '基本工资', '采暖补贴', '病假天数', '事假天数', '加班天数',
          '迟到天数', '个人支付养老保险', '公司支付养老保险医疗保险',
          '个人支付失业保险', '个人支付公积金', '公司支付公积金', '个人支付医保',
          '公司支付医保', '个人所得税', '补发']
      ] // 表格表头
      data.forEach(item => {
        let rowData = []
        rowData = [
          item.id,
          item.employeeId,
          item.employeeName,
          item.deptName,
          item.createTime,
          item.netPay,
          item.basicSalary,
          item.heatingSubsidy,
          item.sickLeaveDay,
          item.personalLeaveDay,
          item.overtimeDay,
          item.lateDay,
          item.sickLeaveDeduction,
          item.personalLeaveDeduction,
          item.overtimePay,
          item.lateDeduction,
          item.personalEndowmentInsurance,
          item.companyEndowmentInsurance,
          item.personalUnemploymentInsurance,
          item.personalAccumulationFund,
          item.companyAccumulationFund,
          item.personalMedicalInsurance,
          item.companyMedicalInsurance,
          item.personalIncomeTax,
          item.backPay
        ]
        tableData.push(rowData)
      })
      const ws = XLSX.utils.aoa_to_sheet(tableData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, '数据') // 工作簿名称
      XLSX.writeFile(wb, this.deptName + time + '.xlsx') // 保存的文件名
    },
    // 格式化时间
    dateFormat(row, column) {
      const date = row[column.property]
      return moment(date).format('YYYY 年 MMMM')
    },
    // 获取所有部门
    getAllDept () {
      allDept().then(res => {
        if (res.code === 2000) {
          this.allDept = res.data.allDept
        }
      })
    },
    // 获取打印信息
    getPrintItem() {
      AllPrintItem(this.deptId, this.pageNo, this.pageSize, this.time).then(res => {
        console.log(res.data.salaryVoList, 'all')
        this.printItem = res.data.salaryVoList
        this.total = res.data.total
      })
    },
    // 分页
    pageNoChange(pageNo) {
      this.pageNo = pageNo
      this.getPrintItem()
    },
    // 选择部门变化
    deptNameChange(value) {
      if (value === '全部部门') {
        this.deptId = 0
      } else {
        const dept = this.allDept.find(item => {
          return item.name === value
        })
        this.deptId = dept.id
      }
      this.getPrintItem()
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
      this.getPrintItem()
    }
  }
}
</script>

<style lang="scss" scoped>
.pager {
  position: absolute;
  right: 20px;
}
</style>
