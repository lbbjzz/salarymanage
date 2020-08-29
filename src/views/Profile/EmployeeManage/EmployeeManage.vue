<template>
  <div class="manage">
    <!--    员工查询-->
    <el-button style="float:right" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    <el-input
      placeholder="请输入员工姓名"
      prefix-icon="el-icon-search"
      v-model="searchContent"
      style="width: 20%;float: right;margin-right: 10px">
    </el-input>
    <!--    员工添加-->
    <el-button style="float:left" type="primary" @click="dialogFormVisible = true">+ 添加</el-button>
    <el-dialog title="添加员工" :visible.sync="dialogFormVisible" style="text-align: center">
      <el-form :model="form" :rules="addRules" ref="form">
        <el-form-item label="姓名:" :label-width="formLabelWidth" prop="employeeName">
          <el-input v-model="form.employeeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门:" :label-width="formLabelWidth" prop="deptName">
          <el-select v-model="form.deptName" autocomplete="off" style="float: left" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位:" :label-width="formLabelWidth" prop="jobName">
          <el-select v-model="form.jobName" autocomplete="off" style="float: left">
            <el-option
              v-for="item in optionsTwo"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
          <el-select v-model="form.sex" autocomplete="off" style="float: left">
            <el-option label="先生" :value="true"></el-option>
            <el-option label="女士" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日:" :label-width="formLabelWidth" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd"
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
        <el-form-item label="身份证号:" :label-width="formLabelWidth" prop="idCard">
          <el-input v-model="form.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addEmployee('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    员工编辑-->
    <el-dialog title="员工信息编辑" :visible.sync="edit" style="text-align: center">
      <el-form :model="editForm" :rules="editRules" ref="editForm">
        <el-form-item label="ID:" :label-width="formLabelWidth" prop="id">
          <el-input v-model="editForm.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名:" :label-width="formLabelWidth" prop="employeeName">
          <el-input v-model="editForm.employeeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门:" :label-width="formLabelWidth" prop="deptName">
          <el-select v-model="editForm.deptName" autocomplete="off" style="float: left">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位:" :label-width="formLabelWidth" prop="jobName">
          <el-select v-model="editForm.jobName" autocomplete="off" style="float: left">
            <el-option
              v-for="item in optionsTwo"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
          <el-select v-model="editForm.sex" autocomplete="off" style="float: left">
            <el-option label="先生" :value="true"></el-option>
            <el-option label="女士" :value="false"></el-option>
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
        <el-form-item label="身份证号:" :label-width="formLabelWidth" prop="idCard">
          <el-input v-model="editForm.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="edit = false">取 消</el-button>
          <el-button type="primary" @click="editEmployee('editForm')">确 定</el-button>
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
      v-if="total >pageSize"
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

import {
  AddEmployee, AllDepart, AllJob,
  DeleteEmployeeById,
  EmployeeList,
  FindEmployeeByName,
  UpdateEmployee
} from '@/network/Profile/employeemanage'

export default {
  name: 'EmployeeManage',
  data() {
    return {
      options: [],
      optionsTwo: [],
      searchContent: '',
      total: null,
      pageNo: 1,
      pageSize: 10,
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
        idCard: '',
        status: ''
      },
      form: {
        id: '',
        employeeName: '',
        deptName: '',
        jobName: '',
        sex: '',
        birth: '',
        education: '',
        idCard: '',
        status: ''
      },
      addRules: {
        employeeName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ],
        deptName: [
          {
            required: true,
            message: '请选择部门',
            trigger: 'change'
          }
        ],
        jobName: [
          {
            required: true,
            message: '请选择岗位',
            trigger: 'change'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        education: [
          {
            required: true,
            message: '请选择学历',
            trigger: 'change'
          }
        ],
        birth: [
          {
            type: 'date',
            required: true,
            message: '请选择出生日期',
            trigger: 'change'
          }
        ],
        idCard: [
          {
            // type: 'number',
            required: true,
            message: '请输入身份证号',
            trigger: 'blur'
          },
          {
            pattern: /^(\d{18,18})$/,
            message: '长度为18个数字',
            trigger: 'blur'
          }
        ]
      },
      editRules: {
        id: [],
        employeeName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ],
        deptName: [
          {
            required: true,
            message: '请选择部门',
            trigger: 'change'
          }
        ],
        jobName: [
          {
            required: true,
            message: '请选择岗位',
            trigger: 'change'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        education: [
          {
            required: true,
            message: '请选择学历',
            trigger: 'change'
          }
        ],
        birth: [
          {
            type: 'date',
            required: true,
            message: '请选择出生日期',
            trigger: 'change'
          }
        ],
        idCard: [
          {
            // type: 'number',
            required: true,
            message: '请输入身份证号',
            trigger: 'blur'
          },
          {
            pattern: /^(\d{18,18})$/,
            message: '长度为18个数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getEmployeeList()
    AllDepart(-1, -1).then(res => {
      console.log(res)
      if (res.code === 2000) {
        this.options = res.data.listDept
      }
    })
    AllJob().then(res => {
      console.log(res)
      if (res.code === 2000) {
        this.optionsTwo = res.data.jobs
      }
    })
  },
  methods: {
    handleApply: function (index, row) {
      const _this = this
      _this.editForm = row
      _this.edit = true
    },
    // 添加员工信息
    addEmployee(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // alert('success')
          // alert(this.form.sex)
          const dept = this.options.find(item => {
            return item.name === this.form.deptName
          })
          // alert(this.editForm.jobName)
          console.log(this.optionsTwo)
          const job = this.optionsTwo.find(item => {
            return item.name === this.form.jobName
          })
          let _sex = true
          if (this.form.sex === '先生') {
            _sex = false
          }
          AddEmployee(dept.id, this.form.employeeName, job.id, _sex, this.form.education, this.form.birth, this.form.idCard).then(res => {
            if (res.code === 2000) {
              this.$message({
                message: '添加成功！',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.getEmployeeList()
            } else {
              this.$message({
                message: '添加失败！',
                type: 'warning'
              })
            }
          })
        } else {
          this.$message({
            message: '输入错误 请重新输入！',
            type: 'warning'
          })
        }
      })
    },
    // 修改员工信息
    editEmployee() {
      let _sex = true
      if (this.form.sex === '先生') {
        _sex = false
      }
      // alert(this.editForm.jobName)
      console.log(this.editForm)
      const dept = this.options.find(item => {
        return item.name === this.editForm.deptName
      })
      // alert(this.editForm.jobName)
      console.log(this.optionsTwo)
      const job = this.optionsTwo.find(item => {
        return item.name === this.editForm.jobName
      })
      // alert(dept.id)
      // alert(job.id)
      // alert(this.editForm.idCard)
      UpdateEmployee(this.editForm.id, dept.id, this.editForm.employeeName, job.id, _sex, this.editForm.education, this.editForm.birth, this.editForm.idCard).then(res => {
        console.log(res)
        if (res.code === 2000) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.getEmployeeList()
          this.edit = false
        } else {
          this.$message({
            message: '修改失败！',
            type: 'warning'
          })
        }
      })
    },
    // 删除员工
    deleteById(row) {
      // alert(row.id)
      const _this = this
      _this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteEmployeeById(row.id).then(res => {
          console.log(res)
          if (res.code === 2000) {
            _this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getEmployeeList()
          } else {
            _this.$message({
              type: 'warning',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 查询员工
    search() {
      const _this = this
      if (_this.searchContent === '') {
        _this.$message.warning('请输入查询内容')
      } else {
        FindEmployeeByName(null, _this.searchContent, null, 1, 3).then(res => {
          // console.log(resp.data.listEmployeeVO, 'Name')
          _this.employeeList = res.data.listEmployeeVO
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
    // 分页
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
