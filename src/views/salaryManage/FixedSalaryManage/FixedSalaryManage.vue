<template>
  <div>
    <!--选择部门-->
    <div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="部门名称">
          <el-select v-model="deptId" filterable placeholder="请选择">
            <el-option
              v-for="item in allDept"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button-group style="margin-left: 10px">
            <el-button @click="searchByDept" type="primary">搜索</el-button>
            <el-button @click="reset" type="danger" >重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-tooltip class="item" effect="dark" content="设置员工的采暖补贴！" placement="top">
        <el-button type="primary" @click="editHeating" icon="el-icon-edit" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="增加员工采暖补贴" placement="top">
        <el-button type="success" @click="addHeating" icon="el-icon-circle-plus-outline" circle ></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="删除选中的重复数据！" placement="top">
        <el-button type="danger" @click="deleteHeating" icon="el-icon-delete" circle ></el-button>
      </el-tooltip>
      <el-card class="box-card" style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>{{ content }}</span>
        </div>
        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          :data="fixedSalaryList"
          @sort-change="sortChange"
          stripe
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            sortable="custom"
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
            sortable="custom"
            label="采暖补贴">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="modifyTime"
            sortable="custom"
            label="修改时间">
          </el-table-column>
        </el-table>
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
      </el-card>
    </div>
    <el-dialog width="20%" title="编辑选中员工的采暖补贴" :visible.sync="dialogFormVisible">
      <el-input-number v-model="heatingSubsidy" :precision="2" :step="0.1" :max="10000" style="width: 100%"></el-input-number>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmChange">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listEmployeeFixedSalaryVo, allDept, operationEmployeeFixedSalary } from '../../../network/salaryManage/fixedSalaryManage'

export default {
  name: 'FixedSalaryManage',
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      fixedSalaryList: [],
      total: 0,
      allDept: [],
      deptId: '',
      // 排序字段
      sortName: '',
      // 升序排序
      sortOrder: true,
      content: '全部在岗人员固定工资',
      dialogFormVisible: false,
      // 输入的采暖补贴
      heatingSubsidy: 0,
      selectEmployee: [],
      // 操作方式 1表示编辑，2表示增加，3表示删
      operation: 1,
      // 员工的ID数组
      employeeId: []

    }
  },
  mounted () {
    this.getListEmployeeFixedSalaryVo()
    this.getAllDept()
  },
  methods: {
    // 获取员工固定工资
    getListEmployeeFixedSalaryVo () {
      let deptId
      if (this.deptId === '') {
        deptId = -1
      } else {
        deptId = Number(this.deptId)
      }
      listEmployeeFixedSalaryVo(this.pageNo, this.pageSize, deptId, this.sortName, this.sortOrder).then(res => {
        if (res.code === 2000) {
          console.log(res)
          this.fixedSalaryList = res.data.employeeFixedSalaryVos
          this.total = res.data.total
        }
      })
    },
    // 获取全部的部门
    getAllDept() {
      allDept().then(res => {
        if (res.code === 2000) {
          console.log(res.data.allDept)
          this.allDept = res.data.allDept
        }
      })
    },
    // 复选框选择
    handleSelectionChange (row) {
      console.log(row)
      this.selectEmployee = row
    },
    // 页号改变
    pageNoChange (pageNo) {
      this.pageNo = pageNo
      this.getImportVoList()
    },
    sortChange (sort) {
      console.log(sort)
      this.sortOrder = sort.order !== 'descending'
      if (sort.order === null) {
        this.sortName = ''
      } else {
        this.sortName = sort.prop
      }
      this.getListEmployeeFixedSalaryVo()
    },
    // 根据部门查找
    searchByDept () {
      if (this.deptId === '') {
        this.$message.error('请选择部门！')
        return
      }
      const deptName = this.allDept.find(item => {
        // eslint-disable-next-line no-unused-expressions
        return item.id === Number(this.deptId)
      })
      this.content = deptName.name + '员工固定工资'
      this.getListEmployeeFixedSalaryVo()
    },
    // 重置
    reset () {
      this.deptId = ''
      this.content = '全部在岗人员固定工资'
      this.getListEmployeeFixedSalaryVo()
    },
    // 编辑员工采暖补贴
    editHeating () {
      if (this.selectEmployee.length === 0) {
        this.$message.error('请选择员工！')
        return
      }
      this.operation = 1
      this.dialogFormVisible = true
    },
    addHeating () {
      if (this.selectEmployee.length === 0) {
        this.$message.error('请选择员工！')
        return
      }
      this.operation = 2
      this.dialogFormVisible = true
    },
    // 确认修改
    confirmChange () {
      this.getEmployeeId()
      operationEmployeeFixedSalary(this.operation, this.employeeId, this.heatingSubsidy).then(res => {
        if (res.code === 2000) {
          this.$message.success('操作成功！')
          this.getListEmployeeFixedSalaryVo()
          this.dialogFormVisible = false
        }
      })
    },
    deleteHeating () {
      if (this.selectEmployee.length === 0) {
        this.$message.error('请选择员工！')
        return
      }
      this.$confirm('此操作将删除员工采暖补贴, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getEmployeeId()
        this.operation = 3
        operationEmployeeFixedSalary(this.operation, this.employeeId, this.heatingSubsidy).then(res => {
          if (res.code === 2000) {
            this.$message.success('操作成功！')
            this.getListEmployeeFixedSalaryVo()
          }
        })
      }).catch(() => {
      })
    },
    getEmployeeId () {
      const id = new Array(this.selectEmployee.length)
      this.selectEmployee.forEach((item, index) => {
        id[index] = item.id
      })
      this.employeeId = id
    }
  }
}
</script>

<style scoped>

</style>
