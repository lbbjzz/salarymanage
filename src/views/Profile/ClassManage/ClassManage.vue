<template>
  <div class="manage">
    <!--    增加岗位-->
    <el-button style="float:left" type="primary" @click="dialogFormVisible = true">+ 添加</el-button>
    <el-dialog title="增加岗位信息" :visible.sync="dialogFormVisible" style="text-align: center">
      <el-form :model="form" :rules="addRules" ref="form">
        <el-form-item label="岗位名称:" :label-width="formLabelWidth" prop="name" style="margin-left: 180px;">
          <el-input v-model="form.name" autocomplete="off" style="width: 240px; float: left"></el-input>
        </el-form-item>
        <el-form-item label="岗位上限:" :label-width="formLabelWidth" prop="approvedNum" style="margin-left: 180px;">
          <el-input v-model="form.approvedNum" autocomplete="off" style="width: 240px; float: left"></el-input>
        </el-form-item>
        <el-form-item label="薪水:" :label-width="formLabelWidth" prop="salary" style="margin-left: 180px;">
          <el-input v-model="form.salary" autocomplete="off" style="width: 240px; float: left"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addJob('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    岗位修改-->
    <el-dialog title="岗位信息编辑" :visible.sync="edit" style="text-align: center">
      <el-form :model="editForm" :rules="editRules" ref="editForm">
        <el-form-item label="岗位名称:" :label-width="formLabelWidth" prop="name" style="margin-left: 180px;">
          <el-input v-model="editForm.name" autocomplete="off" style="width: 240px; float: left"></el-input>
        </el-form-item>
        <el-form-item label="岗位上限:" :label-width="formLabelWidth" prop="approvedNum" style="margin-left: 180px;">
          <el-input v-model="editForm.approvedNum" autocomplete="off" style="width: 240px; float: left"></el-input>
        </el-form-item>
        <el-form-item label="薪水:" :label-width="formLabelWidth" prop="salary" style="margin-left: 180px;">
          <el-input v-model="editForm.salary" autocomplete="off" style="width: 240px; float: left"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="edit = false">取 消</el-button>
          <el-button type="primary" @click="editJob('editForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    岗位列表-->
    <el-table
      :data="jobList"
      height="120%"
      style="width: 100%" stripe>
      <el-table-column
        prop="id"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="岗位名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="approvedNum"
        label="岗位上限"
        width="200">
      </el-table-column>
      <el-table-column
        prop="salary"
        label="薪水"
        width="200">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="240">
      </el-table-column>
      <el-table-column
        prop="modifyTime"
        label="修改时间"
        width="240">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="240">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleApply(scope.$index, scope.row)">编辑</el-button>
          <el-button @click="deleteById(scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="total > pageSize"
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
  AllJob,
  UpdateJob,
  IsExits,
  DeleteJobById, AddJob
} from '@/network/Profile/classmanage'

export default {
  name: 'ClassManage',
  data() {
    return {
      total: null,
      pageNo: 1,
      pageSize: 10,
      jobList: [],
      formLabelWidth: '100px',
      edit: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      editForm: {
        id: '',
        name: '',
        salary: '',
        approvedNum: ''
      },
      form: {
        name: '',
        salary: '',
        approvedNum: ''
      },
      addRules: {
        name: [
          {
            required: true,
            message: '请输入岗位名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          }
        ],
        approvedNum: [
          {
            required: true,
            message: '请输入岗位上限',
            trigger: 'blur'
          },
          {
            pattern: /^(?:[1-9]?\d|100)$/,
            message: '岗位上限为0~100区间的数字',
            trigger: 'blur'
          }
        ],
        salary: [
          {
            required: true,
            message: '请输入薪资上限',
            trigger: 'blur'
          },
          {
            pattern: /^((?!0)\d{1,5}|100000|0)$/,
            message: '薪资范围为0~100000区间的数字',
            trigger: 'blur'
          }
        ]
      },
      editRules: {
        name: [
          {
            required: true,
            message: '请输入部门名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          }
        ],
        approvedNum: [
          {
            required: true,
            message: '请输入岗位上限',
            trigger: 'blur'
          },
          {
            pattern: /^(?:[1-9]?\d|100)$/,
            message: '岗位上限为0~100区间的数字',
            trigger: 'blur'
          }
        ],
        salary: [
          {
            required: true,
            message: '请输入薪资上限',
            trigger: 'blur'
          },
          {
            pattern: /^((?!0)\d{1,5}|100000|0)$/,
            message: '薪资范围为0~100000区间的数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getJobList()
  },
  methods: {
    handleApply: function (index, row) {
      const _this = this
      _this.editForm = row
      _this.edit = true
    },
    // 获取所有岗位信息
    getJobList() {
      AllJob(this.pageNo, this.pageSize).then(res => {
        console.log(res)
        if (res.code === 2000) {
          this.jobList = res.data.jobs
          this.total = res.data.total
        }
      })
    },
    // 修改岗位信息
    editJob(editForm) {
      // console.log(this.editForm.name, 'namee')
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          IsExits(this.editForm.name).then(res => {
            // alert(this.editForm.name)
            // // console.log(this.editForm.name)
            // console.log(res, 'isExits')
            if (!res.data.isExist) {
              UpdateJob(this.editForm.id, this.editForm.name, this.editForm.salary, this.editForm.approvedNum).then(res => {
                if (res.code === 2000) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  })
                  this.getJobList()
                  this.edit = false
                } else {
                  this.$message({
                    message: '修改失败！',
                    type: 'warning'
                  })
                }
              })
            } else {
              this.$message({
                message: '岗位名称重复！',
                type: 'warning'
              })
            }
          })
        }
      })
    },
    // 删除岗位
    deleteById(row) {
      // alert(row.id)
      const _this = this
      _this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteJobById(row.id).then(res => {
          console.log(res)
          if (res.code === 2000) {
            _this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getJobList()
          } else {
            _this.$message({
              type: 'warning',
              message: res.message
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
    // 增加岗位
    addJob(form) {
      // alert(this.editForm.name)
      // alert(this.editForm.id)
      this.$refs[form].validate((valid) => {
        if (valid) {
          IsExits(this.form.name).then(res => {
            if (!res.data.isExist) {
              AddJob(this.form.name, this.form.salary, this.form.approvedNum).then(res => {
                console.log(res)
                if (res.code === 2000) {
                  this.$message({
                    message: '增加成功！',
                    type: 'success'
                  })
                  this.getJobList()
                  this.dialogFormVisible = false
                } else {
                  this.$message({
                    message: '增加失败！',
                    type: 'warning'
                  })
                }
              })
            } else {
              this.$message({
                message: '部门名称重复！',
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
    // 分页
    pageNoChange(pageNo) {
      this.pageNo = pageNo
      this.getJobList()
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
