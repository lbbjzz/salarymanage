<template>
  <div class="manage">
<!--    员工查询-->
    <el-button style="float:right" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    <el-input
      placeholder="请输入书名"
      prefix-icon="el-icon-search"
      v-model="searchContent"
      style="width: 20%;float: right;margin-right: 10px">
    </el-input>
<!--    员工添加-->
    <el-button style="float:left" type="primary" @click="dialogFormVisible = true">+ 添加</el-button>
    <el-dialog title="添加员工" :visible.sync="dialogFormVisible" style="text-align: center">
      <el-form :model="form" :rules="addrules">
        <el-form-item label="ID:" :label-width="formLabelWidth" prop="id">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" :label-width="formLabelWidth" prop="employeeName">
          <el-input v-model="form.employeeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门:" :label-width="formLabelWidth" prop="deptName">
          <el-select v-model="form.deptName" autocomplete="off" style="float: left">
            <el-option label="技术部" value="技术部"></el-option>
            <el-option label="技术部" value="技术部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位:" :label-width="formLabelWidth" prop="jobName">
          <el-select v-model="form.jobName" autocomplete="off" style="float: left">
            <el-option label="主管" value="主管"></el-option>
            <el-option label="主管" value="主管"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
          <el-select v-model="form.sex" autocomplete="off" style="float: left">
            <el-option label="先生" value="先生"></el-option>
            <el-option label="女士" value="女士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日:" :label-width="formLabelWidth" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="datetime"
            placeholder="选择日期时间"
            style="float: left">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学历:" :label-width="formLabelWidth" prop="education">
          <el-select v-model="form.education" autocomplete="off" style="float: left">
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工编号:" :label-width="formLabelWidth" prop="idCard">
          <el-input v-model="form.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
<!--          <el-button type="primary" @click="addBook()">确 定</el-button>-->
        </el-form-item>
      </el-form>
    </el-dialog>
<!--    员工编辑-->
    <el-dialog title="员工信息编辑" :visible.sync="edit" modal-append-to-body="false" style="text-align: center">
      <el-form :model="editForm">
        <el-form-item label="ID:" :label-width="formLabelWidth" prop="id">
          <el-input v-model="editForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" :label-width="formLabelWidth" prop="employeeName">
          <el-input v-model="editForm.employeeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门:" :label-width="formLabelWidth" prop="deptName">
          <el-select v-model="editForm.deptName" autocomplete="off" style="float: left">
            <el-option label="技术部" value="技术部"></el-option>
            <el-option label="技术部" value="技术部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位:" :label-width="formLabelWidth" prop="jobName">
          <el-select v-model="editForm.jobName" autocomplete="off" style="float: left">
            <el-option label="主管" value="主管"></el-option>
            <el-option label="主管" value="主管"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
          <el-select v-model="editForm.sex" autocomplete="off" style="float: left">
            <el-option label="先生" :value="false"></el-option>
            <el-option label="女士" :value="true"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日:" :label-width="formLabelWidth" prop="birth">
          <el-date-picker
            v-model="editForm.birth"
            type="datetime"
            placeholder="选择日期时间"
            style="float: left">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学历:" :label-width="formLabelWidth" prop="education">
          <el-select v-model="editForm.education" autocomplete="off" style="float: left">
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工编号:" :label-width="formLabelWidth" prop="idCard">
          <el-input v-model="editForm.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="edit = false">取 消</el-button>
<!--          <el-button type="primary" @click="editBook">确 定</el-button>-->
        </el-form-item>
      </el-form>
    </el-dialog>
<!--    员工列表-->
    <el-table
      :data="employeeList"
      height="120%"
      style="width: 100%" stripe>
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="employeeName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="部门"
        width="150">
      </el-table-column>
      <el-table-column
        prop="jobName"
        label="职位"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="生日"
        width="180">
      </el-table-column>
      <el-table-column
        prop="education"
        label="学历"
        width="180">
      </el-table-column>
      <el-table-column
        prop="idCard"
        label="员工编号"
        width="180">
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

import { FindEmployeeById, DeleteEmployeeById, EmployeeList } from '@/network/Profile/employeemanage'

export default {
  name: 'EmployeeManage',
  data() {
    return {
      searchContent: '',
      total: null,
      pageNo: 1,
      pageSize: 1,
      employeeList: [],
      formLabelWidth: '120px',
      edit: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      editForm: {
        id: '',
        employeeName: '',
        deptName: '',
        jobName: '',
        sex: '',
        birth: '',
        education: '',
        idCard: ''
      },
      form: {
        id: '',
        employeeName: '',
        deptName: '',
        jobName: '',
        sex: '',
        birth: '',
        education: '',
        idCard: ''
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    handleApply: function (index, row) {
      const _this = this
      _this.editForm = row
      _this.edit = true
    },
    // 删除员工
    deleteById (row) {
      const _this = this
      _this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteEmployeeById(row.id).then(function (resp) {
          _this.$message({
            type: 'success',
            message: '删除成功'
          })
          clearTimeout(_this.timer)
          _this.timer = setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 查询员工
    search () {
      const _this = this
      if (_this.searchContent === '') {
        _this.$message.warning('请输入查询内容')
      } else {
        FindEmployeeById(_this.searchContent).then(function (resp) {
          _this.employeeList = resp.data.employee
          // console.log(_this.tableData, 'Data')
          // _this.total = resp.totalCount
        })
      }
    },
    // 获取员工列表
    getEmployeeList() {
      EmployeeList(null, '', null, this.pageNo, this.pageSize).then(res => {
        console.log(res)
        if (res.code === 2000) {
          this.employeeList = res.data.listEmployeeVO
          this.total = res.data.total
        }
      })
    },
    pageNoChange(pageNo) {
      this.pageNo = pageNo
      this.getEmployeeList()
    }
  }
}
</script>

<style lang="scss" scoped>
.manage {
  height: 70%;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.pager {
  position: absolute;
  right: 20px;
}
</style>
