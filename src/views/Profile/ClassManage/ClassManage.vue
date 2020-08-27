<template>
  <div class="manage">
    <!--    岗位修改-->
    <el-dialog title="岗位信息编辑" :visible.sync="edit" style="text-align: center">
      <el-form :model="editForm" :rules="editRules" ref="editForm">
        <el-form-item label="岗位名称:" :label-width="formLabelWidth" prop="name" style="margin-left: 180px;">
          <el-input v-model="editForm.name" autocomplete="off" style="width: 240px; float: left"></el-input>
        </el-form-item>
        <el-form-item label="岗位上限:" :label-width="formLabelWidth" prop="name" style="margin-left: 180px;">
          <el-input v-model="editForm.approvedNum" autocomplete="off" style="width: 240px; float: left"></el-input>
        </el-form-item>
        <el-form-item label="薪水:" :label-width="formLabelWidth" prop="name" style="margin-left: 180px;">
          <el-input v-model="editForm.salary" autocomplete="off" style="width: 240px; float: left"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="edit = false">取 消</el-button>
          <el-button type="primary" @click="editClass()">确 定</el-button>
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
  AllJob, UpdateClass
} from '@/network/Profile/classmanage'
export default {
  name: 'ClassManage',
  data() {
    return {
      total: null,
      pageNo: 1,
      pageSize: 1,
      jobList: [],
      formLabelWidth: '80px',
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
        name: ''
      }
    }
  },
  created() {
    this.getClassList()
  },
  methods: {
    handleApply: function (index, row) {
      const _this = this
      _this.editForm = row
      _this.edit = true
    },
    // 获取所有岗位信息
    getClassList() {
      AllJob(this.pageNo, this.pageSize).then(res => {
        console.log(res)
        if (res.code === 2000) {
          this.jobList = res.data.jobs
          this.total = res.data.total
        }
      })
    },
    // 修改岗位信息
    editClass() {
      UpdateClass(this.editForm.id, this.editForm.name, this.editForm.salary, this.editForm.approvedNum).then(res => {
        console.log(res)
        if (res.code === 2000) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.getClassList()
          this.edit = false
        } else {
          this.$message({
            message: '修改失败！',
            type: 'warning'
          })
        }
      })
    },
    // 分页
    pageNoChange(pageNo) {
      this.pageNo = pageNo
      this.getClassList()
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
