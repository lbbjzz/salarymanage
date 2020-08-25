<template>
  <div class="manage">
        <el-button style="float:left" type="primary" @click="dialogFormVisible = true">+ 添加</el-button>
        <el-dialog title="添加岗位" :visible.sync="dialogFormVisible" style="text-align: center">
            <el-form :model="form" :rules="addrules">
                <el-form-item label="岗位名称:" :label-width="formLabelWidth" prop="postName">
                    <el-input v-model="form.postName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="核定人数:" :label-width="formLabelWidth" prop="approvedNum">
                    <el-input v-model="form.approvedNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="岗位底薪:" :label-width="formLabelWidth" prop="salary">
                    <el-input v-model="form.salary" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addClass()">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="岗位信息修改" :visible.sync="edit" modal-append-to-body="false" style="text-align: center">
            <el-form ref="edit" :model="editForm" :rules="rules">
                <el-form-item label="岗位名称:" prop="postName" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.postName" autocomplete="off" style="width: 60%;float: left">
                        {{editForm.postName}}
                    </el-input>
                </el-form-item>
                <el-form-item label="核定人数:" prop="approvedNum" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.approvedNum" autocomplete="off" style="width: 60%;float: left">
                        {{editForm.approvedNum}}
                    </el-input>
                </el-form-item>
                <el-form-item label="岗位底薪:" prop="salary" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.salary" autocomplete="off" style="width: 60%;float: left">
                        {{editForm.salary}}
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="edit = false">取 消</el-button>
                    <el-button type="primary" @click="editClass">确 定</el-button>
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
                    prop="postName"
                    label="岗位名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="approvedNum"
                    label="核定人数"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="salary"
                    label="岗位底薪"
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
  name: 'ClassManage',
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
        postName: '',
        approvedNum: '',
        salary: ''
      },
      rules: {
        postName: [
          {
            required: true,
            message: '请输入岗位名称！',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 8,
            message: '长度在 2 到 8 个字符',
            trigger: 'blur'
          }
        ],
        approvedNum: [
          {
            required: true,
            message: '请输入岗位核定人数！',
            trigger: 'change'
          }
        ],
        salary: [
          {
            required: true,
            message: '请输入岗位底薪',
            trigger: 'blur'
          }
        ]
      },
      addrules: {
        postName: [
          {
            required: true,
            message: '请输入岗位名称！',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 8,
            message: '长度在 2 到 8 个字符',
            trigger: 'blur'
          }
        ],
        approvedNum: [
          {
            required: true,
            message: '请输入岗位核定人数！',
            trigger: 'change'
          }
        ],
        salary: [
          {
            required: true,
            message: '请输入岗位底薪',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    addClass () {
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
    editClass () {
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

<style scoped>
  .manage {
    height: 70%;
  }

  .pager {
      position: absolute;
      right: 20px;
  }
</style>
