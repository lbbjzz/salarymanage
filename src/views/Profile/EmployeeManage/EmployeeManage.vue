<template>
    <div class="manage">
        <el-button style="float:left" type="primary" @click="dialogFormVisible = true">+ 添加</el-button>
        <el-dialog title="添加员工" :visible.sync="dialogFormVisible" style="text-align: center">
            <el-form :model="form" :rules="addrules">
                <el-form-item label="部门:" :label-width="formLabelWidth" prop="deptID">
                    <el-input v-model="form.deptID" autocomplete="off" style="float: left">
                      <el-option label="技术部" value="技术部"></el-option>
                      <el-option label="产品部" value="产品部"></el-option>
                      <el-option label="达哥部" value="达哥部"></el-option>
                    </el-input>
                </el-form-item>
                <el-form-item label="岗位:" :label-width="formLabelWidth" prop="jobId">
                    <el-input v-model="form.jobId" autocomplete="off" style="float: left">
                      <el-option label="测试更新" value="测试更新"></el-option>
                      <el-option label="主管" value="主管"></el-option>
                    </el-input>
                </el-form-item>
                <el-form-item label="姓名：" :label-width="formLabelWidth" prop="employeeName">
                    <el-input v-model="form.employeeName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别:" :label-width="formLabelWidth" prop="sex">
                    <el-select v-model="form.sex" autocomplete="off" style="float: left">
                        <el-option label="先生" value="先生"></el-option>
                        <el-option label="女士" value="女士"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生年月:" :label-width="formLabelWidth" prop="birth">
                    <el-input v-model="form.birth" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学历:" :label-width="formLabelWidth" prop="education">
                    <el-input v-model="form.education" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号:" :label-width="formLabelWidth" prop="idCard">
                    <el-input v-model="form.idCard" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="员工状态:" :label-width="formLabelWidth" prop="status">
                    <el-input v-model="form.status" autocomplete="off" style="float: left">
                      <el-option label="离职" value="离职"></el-option>
                      <el-option label="试用" value="试用"></el-option>
                      <el-option label="在职" value="在职"></el-option>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addEmployee()">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="员工信息修改" :visible.sync="edit" modal-append-to-body="false" style="text-align: center">
            <el-form ref="edit" :model="editForm" :rules="rules">
                <el-form-item label="部门:" prop="deptID" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.deptID" autocomplete="off" style="width: 60%;float: left">
                      <el-option label="技术部" value="技术部"></el-option>
                      <el-option label="产品部" value="产品部"></el-option>
                      <el-option label="达哥部" value="达哥部"></el-option>
                    </el-input>
                </el-form-item>
                <el-form-item label="岗位:" prop="jobId" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.jobId" autocomplete="off" style="width: 60%;float: left">
                      <el-option label="测试更新" value="测试更新"></el-option>
                      <el-option label="主管" value="主管"></el-option>
                    </el-input>
                </el-form-item>
                <el-form-item label="姓名:" prop="employeeName" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.employeeName" autocomplete="off" style="width: 60%;float: left">
                        {{editForm.employeeName}}
                    </el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-select v-model="editForm.sex" autocomplete="off" style="width: 60%;float: left">
                        <el-option label="先生" value="先生"></el-option>
                        <el-option label="女士" value="女士"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生年月:" prop="birth" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.birth" autocomplete="off" style="width: 60%;float: left">
                        {{editForm.birth}}
                    </el-input>
                </el-form-item>
                <el-form-item label="学历:" prop="education" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.education" autocomplete="off" style="width: 60%;float: left">
                        {{editForm.education}}
                    </el-input>
                </el-form-item>
                <el-form-item label="身份证号:" prop="idCard" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.idCard" autocomplete="off" style="width: 60%;float: left">
                        {{editForm.idCard}}
                    </el-input>
                </el-form-item>
                <el-form-item label="员工状态:" prop="status" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.status" autocomplete="off" style="width: 60%;float: left">
                      <el-option label="离职" value="离职"></el-option>
                      <el-option label="试用" value="试用"></el-option>
                      <el-option label="在职" value="在职"></el-option>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="edit = false">取 消</el-button>
                    <el-button type="primary" @click="editEmployee">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table
                :data="tableData"
                height="120%"
                style="width: 100%" stripe>
            <el-table-column
                    prop="id"
                    label="ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系方式"
                    width="180">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleApply(scope.$index, scope.row)">编辑</el-button>
                    <!--                    <el-button size="mini" type="danger" @click="deleteById(scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

export default {
  name: 'EmployeeManage',
  data () {
    return {
      total: null,
      tableData: [],
      searchFrom: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ],
      edit: false,
      editForm: [],
      formLabelWidth: '120px',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        deptID: '',
        jobId: '',
        employeeName: '',
        sex: '',
        birth: '',
        education: '',
        idCard: '',
        status: ''
      },
      rules: {
        deptID: [
          {
            required: true,
            message: '请选择职工部门！',
            trigger: 'change'
          }
        ],
        jobID: [
          {
            required: true,
            message: '请选择职工岗位！',
            trigger: 'change'
          }
        ],
        employeeName: [
          {
            required: true,
            message: '请输入职工姓名！',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 8,
            message: '长度在 2 到 8 个字符',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择职工的性别！',
            trigger: 'change'
          }
        ],
        birth: [
          {
            required: true,
            message: '请输入职工出生年月！',
            trigger: 'blur'
          }
        ],
        education: [
          {
            required: true,
            message: '请输入职工学历！',
            trigger: 'blur'
          }
        ],
        idCard: [
          {
            required: true,
            message: '请输入职工身份证！',
            trigger: 'blur'
          },
          {
            max: 16,
            message: '长度为17位',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择职工状态！',
            trigger: 'change'
          }
        ]
      },
      addrules: {
        deptID: [
          {
            required: true,
            message: '请选择职工部门！',
            trigger: 'change'
          }
        ],
        jobID: [
          {
            required: true,
            message: '请选择职工岗位！',
            trigger: 'change'
          }
        ],
        employeeName: [
          {
            required: true,
            message: '请输入职工姓名！',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 8,
            message: '长度在 2 到 8 个字符',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择职工的性别！',
            trigger: 'change'
          }
        ],
        birth: [
          {
            required: true,
            message: '请输入职工出生年月！',
            trigger: 'blur'
          }
        ],
        education: [
          {
            required: true,
            message: '请输入职工学历！',
            trigger: 'blur'
          }
        ],
        idCard: [
          {
            required: true,
            message: '请输入职工身份证！',
            trigger: 'blur'
          },
          {
            max: 16,
            message: '长度为17位',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择职工状态！',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    addEmploee () {
      console.log(this.form)
      this.$http.put('/api/user/save', this.form).then(res => {
        console.log(res.data)
      })
      this.$message({
        message: '添加成功！',
        type: 'success'
      })
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        window.location.reload()
      }, 1000)
      this.dialogFormVisible = false
    },
    editEmployee () {
      console.log(this.editForm)
      this.$http.put('/api/user/save', this.editForm).then(res => {
        console.log(res.data)
      })
      this.edit = false
      window.location.reload()
    },
    handleApply: function (index, row) {
      const _this = this
      _this.editForm = row
      _this.edit = true
    }
  },
  //   deleteById (row) {
  //     const _this = this
  //     _this.$confirm('确认删除吗, 是否继续?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       this.$http.get('/user/delete/' + row.id).then(function (resp) {
  //         _this.$message({
  //           type: 'success',
  //           message: '删除成功'
  //         })
  //         clearTimeout(_this.timer)
  //         _this.timer = setTimeout(() => {
  //           window.location.reload()
  //         }, 1000)
  //       })
  //     }).catch(() => {
  //       this.$message({
  //         type: 'info',
  //         message: '已取消删除'
  //       })
  //     })
  //   }
  // },
  created () {
    const _this = this
    this.$http.get('/api/user/list').then(function (resp) {
      console.log(resp)
      _this.tableData = resp.data
    })
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
