<template>
  <div>
    <el-switch
      @change="activeChange"
      v-model="active"
      active-text="上传时验证用户是否存在"
      inactive-text="上传时不验证用户（速度快）">
    </el-switch>
    <!--文件导入-->
    <div style="margin-bottom: 50px;margin-top: 20px">
      <el-upload
        class="upload-demo"
        drag
        :action="uploadUrl"
        :on-success="uploadSuccess"
        accept=".xls, .xlsx"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件</div>
      </el-upload>
    </div>
    <!--文件导入-->
    <!--表格-->
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ time }}----导入员工考勤数据</span>
        </div>
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
                <el-button slot="reference" type="text" size="small" style="color: red">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!--编辑的表单-->
      <el-dialog title="编辑员工考勤数据" :visible.sync="dialogFormVisible">
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
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateImportData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--表格-->
    <!--分页-->
    <div style="float: right;margin-top: 30px;margin-bottom: 20px;margin-right: 60px">
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
import { listImportVo, uploadDataUrl, uploadDataNotCheck, updateImport, deleteImport } from '../../../network/salaryManage/importData'

export default {
  name: 'ImportData',
  data () {
    return {
      time: '',
      pageNo: 1,
      pageSize: 10,
      // 表格数据
      importVoList: [],
      total: 0,
      // 导入数据的接口
      uploadUrl: uploadDataUrl,
      uploadDataUrl: uploadDataUrl,
      uploadDataNotCheck: uploadDataNotCheck,
      dialogFormVisible: false,
      // 点击编辑导入的某条数据
      importData: {},
      labelPosition: 'right',
      active: true
    }
  },
  created () {
    const date = new Date()
    this.time = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
  },
  mounted () {
    this.getImportVoList()
  },
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    getImportVoList () {
      listImportVo(this.pageNo, this.pageSize, 'now').then(res => {
        if (res.code === 2000) {
          this.importVoList = res.data.listImportVo
          this.total = res.data.total
        }
        console.log(res)
      })
    },
    // 文件上传成功
    uploadSuccess () {
      this.getImportVoList()
    },
    // 编辑导入数据的表单打开
    editImport (row) {
      this.importData = row
      this.dialogFormVisible = true
    },
    // 更新员工导入的数据
    updateImportData () {
      updateImport(this.importData.id, this.importData.sickLeaveDay,
        this.importData.personalLeaveDay, this.importData.lateDay,
        this.importData.overtimeDay, this.importData.backPay).then(res => {
        this.dialogFormVisible = false
        if (res.code === 2000) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          return
        }
        this.$message({
          message: '修改失败！',
          type: 'error'
        })
      })
    },
    // 删除员工考勤数据
    deleted (row) {
      deleteImport(row.id).then(res => {
        if (res.code === 2000) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getImportVoList()
          return
        }
        this.$message({
          message: '删除失败！',
          type: 'error'
        })
      })
    },
    // 页号改变
    pageNoChange (pageNo) {
      this.pageNo = pageNo
      this.getImportVoList()
    },
    // 开关状态变化
    activeChange (flag) {
      if (flag === false) {
        this.uploadUrl = this.uploadDataNotCheck
      } else {
        this.uploadUrl = this.uploadDataUrl
      }
    }
  }
}
</script>

<style scoped>

</style>
