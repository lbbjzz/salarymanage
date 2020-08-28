<template>
  <div class="selectList">
    <el-select v-model="value" @change="projectChange" placeholder="请选择查看的项目">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <el-select @change="deptChange" style="margin-left: 50px" v-model="deptName" placeholder="请选择查询的部门">
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
    <el-button style="float: right;margin-left: 10px" @click="reset" type="warning" icon="el-icon-search">重置
    </el-button>
    <el-button style="float: right;margin-left: 10px" @click="searchByEmployeeName" type="primary" icon="el-icon-search">查询
    </el-button>
    <el-input
            placeholder="请输入需要查询的员工名"
            prefix-icon="el-icon-search"
            style="width: 20%;float: right"
            v-model="employeeName">
    </el-input>
    <!--固定项目-->
    <div style="margin-top: 30px" v-show="value === '1'">
      <el-table
        tooltip-effect="dark"
        :data="fixedSalaryList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="90">
        </el-table-column>
        <el-table-column
          prop="name"
          label="员工姓名">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="员工部门">
        </el-table-column>
        <el-table-column
          prop="jobName"
          label="员工岗位">
        </el-table-column>
        <el-table-column
          prop="salary"
          label="基本工资">
        </el-table-column>
        <el-table-column
          prop="heatingSubsidy"
          label="采暖补贴">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间">
        </el-table-column>
      </el-table>
    </div>
    <!--固定项目-->
    <!--计算项目表格-->
    <div v-show="value === '2'">
      <el-button style="margin-top: 20px;margin-bottom: 10px" type="primary" round @click="editSelectCalculate">批量编辑</el-button>
      <el-table
        ref="multipleTable"
        @selection-change="selectCalculate"
        :data="calculateVoList"
        stripe
        border
        style="width: 100%;margin-top: 20px">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="employeeName"
          label="员工名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="部门名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="jobName"
          label="岗位名"
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
          prop="dailySickLeaveDeduction"
          label="病假扣款 (元)"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dailyPersonalLeaveDeduction"
          label="事假扣款（元）"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dailyLateDeduction"
          label="迟到扣款（元）"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dailyOvertimePay"
          label="加班扣款（元）"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间"
          width="190">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="editCalculate(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--导入项目-->
    <div STYLE="margin-top: 30px" v-show="value === '3'">
      <el-table
        :data="importVoList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="Id"
          width="50">
        </el-table-column>
        <el-table-column
          prop="employeeName"
          label="员工姓名">
        </el-table-column>
        <el-table-column
          prop="employeeDept"
          label="员工部门">
        </el-table-column>
        <el-table-column
          prop="employeeJob"
          label="员工岗位">
        </el-table-column>
        <el-table-column
          prop="sickLeaveDay"
          label="病假天数">
        </el-table-column>
        <el-table-column
          prop="personalLeaveDay"
          label="事假天数">
        </el-table-column>
        <el-table-column
          prop="lateDay"
          label="迟到次数">
        </el-table-column>
        <el-table-column
          prop="overtimeDay"
          label="加班天数">
        </el-table-column>
        <el-table-column
          prop="backPay"
          label="补发工资">
        </el-table-column>s
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="editImport(scope.row)" type="text" size="small">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
              icon="el-icon-info"
              iconColor="red"
              @onConfirm="deleted(scope.row)"
              title="是否刪除该员工考勤数据？"
            >
              <el-button slot="reference" type="text" size="small" style="color: red">清空</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!--导入项目-->
    </div>
<!--    <el-table-->
<!--      :data="calculateVoList"-->
<!--      stripe-->
<!--      border-->
<!--      style="width: 100%;margin-top: 20px">-->
<!--      <el-table-column-->
<!--        prop="id"-->
<!--        label="ID"-->
<!--        width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="employeeName"-->
<!--        label="员工名"-->
<!--        width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="deptName"-->
<!--        label="部门名">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="jobName"-->
<!--        label="岗位名">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="sickLeaveDay"-->
<!--        label="病假天数 (天)"-->
<!--        width="180">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="personalLeaveDay"-->
<!--        label="事假天数（天）"-->
<!--        width="180">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="lateDay"-->
<!--        label="迟到天数（天）"-->
<!--        width="180">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="overtimeDay"-->
<!--        label="加班天数（天）"-->
<!--        width="180">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="backPay"-->
<!--        label="补发工资（元）"-->
<!--        width="180">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--            fixed="right"-->
<!--            label="操作"-->
<!--            width="100">-->
<!--        <template slot-scope="scope">-->
<!--            <el-button size="mini" @click="handleApply(scope.$index, scope.row)">编辑</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--    <el-table-->
<!--      :data="calculateVoList"-->
<!--      stripe-->
<!--      border-->
<!--      style="width: 100%;margin-top: 20px"-->
<!--      v-if="value === '4'">-->
<!--      <el-table-column-->
<!--        prop="id"-->
<!--        label="ID"-->
<!--        width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="employeeName"-->
<!--        label="员工名"-->
<!--        width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="deptName"-->
<!--        label="部门名"-->
<!--        width="150">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="jobName"-->
<!--        label="岗位名"-->
<!--        width="150">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="netPay"-->
<!--        label="实发工资 (元)">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--            fixed="right"-->
<!--            label="操作"-->
<!--            width="100">-->
<!--        <template slot-scope="scope">-->
<!--            <el-button size="mini" @click="handleApply(scope.$index, scope.row)">编辑</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
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
    <!--编辑员工计算项目-->
    <el-dialog
      title="编辑员工计算项目"
      :visible.sync="calculateVisible"
      width="40%"
      center>
      <div>
        <el-form label-position="right" label-width="160px" :model="selectCalculateVo">
          <el-form-item label="姓名">
            <el-input :readonly="true" v-model="selectCalculateVo.employeeName"></el-input>
          </el-form-item>
          <el-form-item label="所在部门">
            <el-input :readonly="true" v-model="selectCalculateVo.deptName"></el-input>
          </el-form-item>
          <el-form-item label="所在岗位">
            <el-input :readonly="true" v-model="selectCalculateVo.jobName"></el-input>
          </el-form-item>
          <el-form-item label="个人支付养老保险">
            <el-input-number v-model="selectCalculateVo.personalEndowmentInsuranceRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="公司支付养老医疗保险">
            <el-input-number v-model="selectCalculateVo.companyEndowmentInsuranceRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="个人支付失业保险">
            <el-input-number v-model="selectCalculateVo.personalUnemploymentInsuranceRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="个人支付公积金">
            <el-input-number v-model="selectCalculateVo.personalAccumulationFundRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="公司支付公积金">
            <el-input-number v-model="selectCalculateVo.companyAccumulationFundRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="个人支付医保">
            <el-input-number v-model="selectCalculateVo.personalMedicalInsuranceRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="公司支付医保">
            <el-input-number v-model="selectCalculateVo.companyMedicalInsuranceRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="个人所得税">
            <el-input-number v-model="selectCalculateVo.personalIncomeTaxRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="病假扣款">
            <el-input-number v-model="selectCalculateVo.dailySickLeaveDeduction" :min="10" :step="1" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="事假扣款">
            <el-input-number v-model="selectCalculateVo.dailyPersonalLeaveDeduction" :min="10" :step="1" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="迟到扣款">
            <el-input-number v-model="selectCalculateVo.dailyLateDeduction" :min="10" :step="1" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="加班扣款">
            <el-input-number v-model="selectCalculateVo.dailyOvertimePay" :min="50" :step="1" :max="1000"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="calculateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCalculate">确 定</el-button>
      </span>
    </el-dialog>

    <!--批量编辑员工计算项目-->
    <el-dialog
      title="编辑员工计算项目"
      :visible.sync="editSelectCalculateVisible"
      width="40%"
      center>
      <div>
        <el-form label-position="right" label-width="160px" :model="selectCalculateVo">
          <el-form-item label="个人支付养老保险">
            <el-input-number v-model="selectCalculateVo.personalEndowmentInsuranceRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="公司支付养老医疗保险">
            <el-input-number v-model="selectCalculateVo.companyEndowmentInsuranceRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="个人支付失业保险">
            <el-input-number v-model="selectCalculateVo.personalUnemploymentInsuranceRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="个人支付公积金">
            <el-input-number v-model="selectCalculateVo.personalAccumulationFundRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="公司支付公积金">
            <el-input-number v-model="selectCalculateVo.companyAccumulationFundRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="个人支付医保">
            <el-input-number v-model="selectCalculateVo.personalMedicalInsuranceRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="公司支付医保">
            <el-input-number v-model="selectCalculateVo.companyMedicalInsuranceRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="个人所得税">
            <el-input-number v-model="selectCalculateVo.personalIncomeTaxRate" :precision="2" :step="0.1" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="病假扣款">
            <el-input-number v-model="selectCalculateVo.dailySickLeaveDeduction" :min="10" :step="1" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="事假扣款">
            <el-input-number v-model="selectCalculateVo.dailyPersonalLeaveDeduction" :min="10" :step="1" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="迟到扣款">
            <el-input-number v-model="selectCalculateVo.dailyLateDeduction" :min="10" :step="1" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="加班扣款">
            <el-input-number v-model="selectCalculateVo.dailyOvertimePay" :min="50" :step="1" :max="1000"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSelectCalculateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSelectCalculate">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑导入项目的表单-->
    <el-dialog title="编辑员工考勤数据" :visible.sync="importVisible">
      <el-form :model="importData">
        <el-form-item label="员工姓名：">
          <el-input :readOnly="true" v-model="importData.employeeName"></el-input>
        </el-form-item>
        <el-form-item label="部门：">
          <el-input :readOnly="true" v-model="importData.employeeDept"></el-input>
        </el-form-item>
        <el-form-item label="岗位：">
          <el-input :readOnly="true" v-model="importData.employeeJob"></el-input>
        </el-form-item>
        <el-form-item label="病假天数：">
          <el-input-number :step=1 :step-strictly="true" v-model="importData.sickLeaveDay" :min="0" :max="31"></el-input-number>
        </el-form-item>
        <el-form-item label="事假天数：">
          <el-input-number :step=1 :step-strictly="true" v-model="importData.personalLeaveDay" :min="0" :max="31"></el-input-number>
        </el-form-item>
        <el-form-item label="迟到天数：">
          <el-input-number :step=1 :step-strictly="true" v-model="importData.lateDay" :min="0" :max="31"></el-input-number>
        </el-form-item>
        <el-form-item label="加班天数：">
          <el-input-number :step="1" :step-strictly="true" v-model="importData.overtimeDay" :min="0" :max="31"></el-input-number>
        </el-form-item>
        <el-form-item label="补发工资：">
          <el-input onkeyup='this.value=this.value.replace(/\D/gi,"")' v-model="importData.backPay"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="importVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateImportData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCalculateVo, updateCalculate, listFixedSalaryVo, listImport } from '../../../network/salaryManage/salaryManage'
import { allDept } from '../../../network/salaryManage/fixedSalaryManage'
import { deleteImport, updateImport } from '../../../network/salaryManage/importData'
export default {
  name: 'SalaryManage',
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      // 计算项目
      calculateVoList: [],
      selectCalculateVo: {},
      calculateVisible: false,
      calculateIds: [],
      // 选中的员工计算项目
      selectEditCalculateVo: [],
      editSelectCalculateVisible: false,
      // 固定项目
      fixedSalaryList: [],
      // 导入项目
      importVoList: [],
      importData: {},
      importVisible: false,
      // 全部部门
      allDept: [],
      deptName: '全部部门',
      deptId: 0,
      employeeName: null,
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
      value: '1'
    }
  },
  mounted () {
    this.getListEmployeeFixedSalaryVo()
    this.getAllDept()
  },
  methods: {
    // 获取全部部门
    getAllDept () {
      allDept().then(res => {
        if (res.code === 2000) {
          this.allDept = res.data.allDept
        }
      })
    },
    // 获取计算项目数据
    getListCalculateVo () {
      listCalculateVo(this.pageNo, this.pageSize, this.deptId, this.employeeName).then(res => {
        if (res.code === 2000) {
          this.calculateVoList = res.data.calculateVoList
          this.total = res.data.total
        }
      })
    },
    // 获取员工固定工资
    getListEmployeeFixedSalaryVo () {
      listFixedSalaryVo(this.pageNo, this.pageSize, this.deptId, this.employeeName).then(res => {
        if (res.code === 2000) {
          console.log(res)
          this.fixedSalaryList = res.data.employeeFixedSalaryVos
          this.total = res.data.total
        }
      })
    },
    // 获取导入项目数据
    getListImportVo () {
      listImport(this.pageNo, this.pageSize, this.deptId, this.employeeName).then(res => {
        if (res.code === 2000) {
          this.importVoList = res.data.listImportVo
          this.total = res.data.total
        }
      })
    },
    // 页号改变
    pageNoChange (pageNo) {
      this.pageNo = pageNo
      this.searchInfo()
    },
    // 编辑计算项目
    editCalculate (row) {
      this.selectCalculateVo = row
      this.calculateVisible = true
      console.log(row)
    },
    // 更新员工计算项目
    updateCalculate () {
      this.calculateVisible = false
      this.updateCalculateVo()
    },
    updateCalculateVo () {
      updateCalculate(this.selectCalculateVo.id, this.calculateIds, this.selectCalculateVo.dailySickLeaveDeduction,
        this.selectCalculateVo.dailyPersonalLeaveDeduction, this.selectCalculateVo.dailyLateDeduction,
        this.selectCalculateVo.dailyOvertimePay, this.selectCalculateVo.personalEndowmentInsuranceRate,
        this.selectCalculateVo.companyEndowmentInsuranceRate, this.selectCalculateVo.personalUnemploymentInsuranceRate,
        this.selectCalculateVo.personalAccumulationFundRate, this.selectCalculateVo.companyAccumulationFundRate,
        this.selectCalculateVo.personalMedicalInsuranceRate, this.selectCalculateVo.companyMedicalInsuranceRate,
        this.selectCalculateVo.personalIncomeTaxRate
      ).then(res => {
        console.log(res)
        if (res.code === 2000) {
          this.getListCalculateVo()
        }
      })
    },
    // 选中的计算项目
    selectCalculate (row) {
      this.selectEditCalculateVo = row
    },
    editSelectCalculate () {
      if (this.selectEditCalculateVo.length === 0) {
        this.$message.error('请选中需要编辑的员工')
        return
      }
      this.selectCalculateVo = {
        id: null,
        personalEndowmentInsuranceRate: 0,
        companyEndowmentInsuranceRate: 0,
        personalUnemploymentInsuranceRate: 0,
        personalAccumulationFundRate: 0,
        companyAccumulationFundRate: 0,
        personalMedicalInsuranceRate: 0,
        companyMedicalInsuranceRate: 0,
        personalIncomeTaxRate: 0,
        dailySickLeaveDeduction: 50,
        dailyPersonalLeaveDeduction: 30,
        dailyLateDeduction: 100,
        dailyOvertimePay: 200
      }
      this.editSelectCalculateVisible = true
    },
    // 批量更新员工计算项目
    updateSelectCalculate () {
      this.editSelectCalculateVisible = false
      const id = new Array(this.selectEditCalculateVo.length)
      this.selectEditCalculateVo.forEach((item, index) => {
        id[index] = item.id
      })
      this.calculateIds = id
      this.updateCalculateVo()
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
    // 通过员工姓名进行查询
    searchByEmployeeName () {
      this.searchInfo()
    },
    reset () {
      this.employeeName = null
      this.searchInfo()
    },
    // 选中的项目改变
    projectChange (value) {
      this.pageNo = 1
      this.deptName = '全部部门'
      this.deptId = 0
      this.searchInfo()
    },
    searchInfo () {
      if (this.value === '1') {
        this.getListEmployeeFixedSalaryVo()
      } else if (this.value === '2') {
        this.getListCalculateVo()
      } else if (this.value === '3') {
        this.getListImportVo()
      }
    },
    // 编辑导入数据的表单打开
    editImport (row) {
      this.importData = row
      this.importVisible = true
    },
    // 更新员工导入的数据
    updateImportData () {
      updateImport(this.importData.id, this.importData.sickLeaveDay,
        this.importData.personalLeaveDay, this.importData.lateDay,
        this.importData.overtimeDay, this.importData.backPay).then(res => {
        this.importVisible = false
        if (res.code === 2000) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.getListImportVo()
          return
        }
        this.$message({
          message: '修改失败！',
          type: 'error'
        })
      })
    },
    // 删除员工导入考勤数据
    deleted (row) {
      deleteImport(row.id).then(res => {
        if (res.code === 2000) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getListImportVo()
          return
        }
        this.$message({
          message: '删除失败！',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
