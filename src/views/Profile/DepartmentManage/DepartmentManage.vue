<template>
  <div class="manage">
    <!--    增加部门-->
    <el-button style="float:left" type="primary" @click="dialogFormVisible = true">+ 添加</el-button>
    <el-dialog title="增加部门信息" :visible.sync="dialogFormVisible" style="text-align: center">
      <el-form :model="form" :rules="addRules" ref="form">
        <el-form-item label="部门名称:" :label-width="formLabelWidth" prop="name" style="margin-left: 180px;">
          <el-input v-model="form.name" autocomplete="off" style="width: 240px; float: left"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDepart('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    部门编辑-->
    <el-dialog title="部门信息编辑" :visible.sync="edit" style="text-align: center">
      <el-form :model="editForm" :rules="editRules" ref="editForm">
        <el-form-item label="部门名称:" :label-width="formLabelWidth" prop="name" style="margin-left: 180px;">
          <el-input v-model="editForm.name" autocomplete="off" style="width: 240px; float: left"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="edit = false">取 消</el-button>
          <el-button type="primary" @click="editDepart('editForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    部门列表-->
    <el-table
      :data="departList"
      height="120%"
      style="width: 100%" stripe>
      <el-table-column
        prop="id"
        label="ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="部门名称"
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
  DepartList,
  AllDepart,
  UpdateDepart,
  IsSame,
  AddDepart,
  DeleteDepartById
} from '@/network/Profile/departmentmanage'
export default {
  name: 'DepartmentManage',
  data() {
    return {
      options: [],
      searchContent: '',
      total: null,
      pageNo: 1,
      pageSize: 1,
      departList: [],
      formLabelWidth: '100px',
      edit: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      editForm: {
        id: '',
        name: ''
      },
      form: {
        name: ''
      },
      addRules: {
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
        ]
      }
    }
  },
  created() {
    this.getDepartList()
    AllDepart(-1, -1).then(res => {
      console.log(res)
      if (res.code === 2000) {
        this.editForm.name = res.data.listDept.name
      }
    })
  },
  methods: {
    handleApply: function (index, row) {
      const _this = this
      _this.editForm = row
      _this.edit = true
    },
    // 增加部门
    addDepart(form) {
      // alert(this.editForm.name)
      // alert(this.editForm.id)
      this.$refs[form].validate((valid) => {
        if (valid) {
          IsSame(this.form.name).then(res => {
            if (!res.data.isExist) {
              AddDepart(this.form.name).then(res => {
                console.log(res)
                if (res.code === 2000) {
                  this.$message({
                    message: '增加成功！',
                    type: 'success'
                  })
                  this.getDepartList()
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
    // 修改部门信息
    editDepart(editForm) {
      // alert(this.editForm.name)
      // alert(this.editForm.id)
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          IsSame(this.editForm.name).then(res => {
            if (!res.data.isExist) {
              UpdateDepart(this.editForm.id, this.editForm.name).then(res => {
                console.log(res)
                if (res.code === 2000) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  })
                  this.getDepartList()
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
    // 删除部门
    deleteById(row) {
      // alert(row.id)
      const _this = this
      _this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteDepartById(row.id).then(res => {
          console.log(res)
          if (res.code === 2000) {
            _this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getDepartList()
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
    // 获取所有部门信息
    getDepartList() {
      DepartList(this.pageNo, this.pageSize).then(res => {
        console.log(res)
        if (res.code === 2000) {
          this.departList = res.data.listDept
          this.total = res.data.total
        }
      })
    },
    // 分页
    pageNoChange(pageNo) {
      this.pageNo = pageNo
      this.getDepartList()
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
