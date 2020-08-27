<template>
  <div>
    <!--选择部门-->
    <div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="活动名称">
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
      <el-tooltip class="item" effect="dark" content="删除选中的重复数据！" placement="top">
        <el-button type="danger" icon="el-icon-delete" circle ></el-button>
      </el-tooltip>
      <el-card class="box-card" style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>全部在岗人员固定工资</span>
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
            label="员工编号">
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
  </div>
</template>

<script>
import { listEmployeeFixedSalaryVo, allDept } from '../../../network/salaryManage/fixedSalaryManage'

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
      sortOrder: true
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
          this.allDept = res.data.allDept
        }
      })
    },
    // 复选框选择
    handleSelectionChange (row) {
      console.log(row)
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
      this.getListEmployeeFixedSalaryVo()
    },
    // 重置
    reset () {
      this.deptId = ''
      this.getListEmployeeFixedSalaryVo()
    }
  }
}
</script>

<style scoped>

</style>
