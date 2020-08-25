<template>
  <div>
    <!--文件导入-->
    <div style="margin-bottom: 50px">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
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
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="Id">
          </el-table-column>
          <el-table-column
            prop="name"
            label="员工姓名">
          </el-table-column>
          <el-table-column
            prop="address"
            label="员工部门">
          </el-table-column>
          <el-table-column
            prop="address"
            label="员工岗位">
          </el-table-column>
          <el-table-column
            prop="address"
            label="病假天数">
          </el-table-column>
          <el-table-column
            prop="address"
            label="事假天数">
          </el-table-column>
          <el-table-column
            prop="address"
            label="迟到次数">
          </el-table-column>
          <el-table-column
            prop="address"
            label="加班天数">
          </el-table-column>
          <el-table-column
            prop="address"
            label="补发工资">
          </el-table-column>
          <el-table-column
            prop="address"
            label="创建时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!--表格-->
  </div>
</template>

<script>
import { listImportVo } from '../../../network/salaryManage/importData'

export default {
  name: 'ImportData',
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      // 表格数据
      importVoList: [],
      total: 0,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted () {
    this.getImportVoList()
  },
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    getImportVoList () {
      listImportVo(this.pageNo, this.pageSize).then(res => {
        if (res.code === 2000) {
          this.importVoList = res.data.listImportVo
          this.total = res.data.total
        }
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
