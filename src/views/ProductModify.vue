<template>
  <div class="product pt-5 container">

    <el-button type="text" @click="addItem">新增</el-button>


    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" prop="id" width="40"></el-table-column>

      <el-table-column width="80">
        <template slot="header" slot-scope="scope">
          圖片
        </template>
        <template slot-scope="scope">
          <!-- <img :src="scope.image.split(',')[0]" /> -->
          <div class="scope-image" v-if="scope.row.image"
            :style="{backgroundImage: 'url(' + appUrl + 'images/' + scope.row.image.split(',')[0] + ')'}"
          ></div>
        </template>
      </el-table-column>

      <el-table-column label="標題" prop="title"></el-table-column>
      <el-table-column label="內文" prop="content"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          編輯
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click.stop="modifyItem(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click.stop="removeItem(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-dialog
      :title="workType"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose">
      

      <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名稱">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="內容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="類型">
        <el-select v-model="form.kind" placeholder="請選擇類型">
          <el-option label="麵包" value="1"></el-option>
          <el-option label="蛋糕" value="2"></el-option>
          <el-option label="飲料" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :auto-upload="false"
        :on-change="handleChange"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      
    </el-form>


      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
      
    </el-dialog>

    

  </div>
</template>

<script>

export default {
  name: "productModify",
  data() {
    return {
      form: {
        id: 0,
        title: '',
        content: '',
        kind: null,
        // add: '',
      },
      postType: "",
      dialogVisible: false,
      imageUrl: '',
      iconUrl: '',
      oldImgs: '',
      hasUpload: false,
      fileReader: '',
      tableData: [],
      appUrl: process.env.VUE_APP_URL,
    }
  },
  created() {

    this.$http.get(process.env.VUE_APP_URL + "api/product/?items&page=1").then((res)=>{
      if(res.data.State) {
        this.tableData = res.data.Data.content;
      }
    });
  },
  computed: {
    workType() {
      if(this.postType == "ADD") {
        return "新增";
      } else if(this.postType == "MODIFY") {
        return "修改";
      } else {
        return "NONE";
      }
    }
  },
  methods: {
    onSubmit() {
      this.dialogVisible = false;
      var formData = new FormData(JSON.stringify(this.form));
      for(let k in this.form) {
        if(k == "id") {
          if(this.postType == "ADD") {
            formData.append("add", "");
          } else if (this.postType == "MODIFY") {
            formData.append("modify", this.form[k]);
          }
        } else {
          formData.append(k, this.form[k]);
        }
        this.form[k] = "";
      }
      if(this.hasUpload) {

        if(this.postType=="MODIFY" && this.oldImgs != '') {
          formData.append("oldImgs", this.oldImgs);
        }

        formData.append("imgBase64", this.imageUrl);
        formData.append("iconBase64", this.iconUrl);
        this.imageUrl = "";
      }
      this.$store.dispatch('ACT_LOADING', true);
      this.$http.post(process.env.VUE_APP_URL + "api/product/", formData
      ).then((res)=>{
        console.log(res);
      }).finally(()=>{
        this.$store.dispatch('ACT_LOADING', false);
      });
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!');
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleChange(file) {
      let reader = new FileReader();
      this.$store.dispatch('ACT_LOADING', true);
      reader.onload = (res)=> {

        this.handleImgSource(reader.result).then((_imgBase64)=>{

          if(this.postType == "MODIFY") {
            this.oldImgs = [this.iconUrl.split('/').slice(-1), this.imageUrl.split('/').slice(-1)].join(",");
          }

          this.imageUrl = _imgBase64.normalImg;
          this.iconUrl = _imgBase64.smallImg;
          this.hasUpload = true;
        }).finally(()=>{
          this.$store.dispatch('ACT_LOADING', false);
        });
      }
      reader.readAsDataURL(file.raw);

    },
    handleImgSource(base64) {
      var resizeImg = function(maxWdt, maxHgt, img){        
        let flag = false;
        if (img.width > img.height) {
          if (img.width > maxWdt) {
            img.height *= maxWdt / img.width;
            img.width = maxWdt;
            flag = true;
          }
        } else {
          if (img.height > maxHgt) {
            img.width *= maxHgt / img.height;
            img.height = maxHgt;
            flag = true;
          }
        }
        if(flag) {
          var canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);
          return canvas.toDataURL("image/jpg");
        } else {
          return img.src;
        }
      }
      var img = document.createElement("img");
      img.src = base64;

      return new Promise( function(resolve, reject) {
        img.onload = ()=> {
          resolve({
            normalImg: resizeImg(800, 800, img),
            smallImg: resizeImg(120, 120, img)
          });
        }
      });
    },
    handleClose() {
      this.cancelEdit();
    },
    removeItem($item) {
      // alert($id);

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        let formData = new FormData();
        formData.append('delete', $item.id);
        formData.append('image', $item.image);
        this.$http.post( env.process.VUE_APP_URL + "api/product/", formData).then((res)=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });


    },
    addItem(){
      this.dialogVisible = true;
      this.postType = "ADD";
    },
    modifyItem($item) {
      //this.form = 

      for(let $k in $item ) {
        if(this.form.hasOwnProperty($k)) {
          this.form[$k] = $item[$k];
        }

        if($k == "image") {
          [this.iconUrl, this.imageUrl] = $item[$k].split(',').map(
            (url)=> this.process.env.VUE_APP_URL + 'images/'+url
          );
        }
      }
      this.dialogVisible = true;
      this.postType = "MODIFY";
    },
    cancelEdit() {
      this.dialogVisible = false;
      this.iconUrl = "";
      this.imageUrl = "";
      this.oldImgs = "";
      this.form = {
        id: 0,
        title: '',
        content: '',
        kind: null
      }
    }
  }
}
</script>
<style lang="sass">
.avatar-uploader
  .el-upload
    border: 1px dashed #d9d9d9
    border-radius: 6px
    cursor: pointer
    position: relative
    overflow: hidden
  .el-upload:hover
    border-color: #409EFF
  .avatar-uploader-icon
    font-size: 28px
    color: #8c939d
    width: 90px
    height: 90px
    line-height: 90px
    text-align: center
  .avatar
    width: 90px
    height: 90px
    display: block
.scope-image
  width: 35px
  height: 35px
  background-repeat: no-repeat
  background-color: #efefef
  background-position: center center
  background-size: cover
  border: 1px solid #888
  border-radius: 5px
</style>