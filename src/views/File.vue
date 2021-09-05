<template>
  <div class="container">
    <div class="block-content">
      <div class="row-file" v-for="file in reversList" :key="file.id">
        <div class="col img">
          <img v-if="file.type_file == 'ppt'" src="../assets/icons/ppt.svg" alt="file icon" srcset="">
          <img v-else-if="file.type_file == 'pdf'" src="../assets/icons/pdf.svg" alt="file icon" srcset="">
          <img v-else-if="file.type_file == 'doc'| file.type_file == 'docx'" src="../assets/icons/doc.svg"
               alt="file icon" srcset="">
          <img v-else-if="file.type_file == 'rar' | file.type_file == 'zip'" src="../assets/icons/zip.svg"
               alt="file icon" srcset="">
          <img v-else-if="file.type_file == 'jpg'" src="../assets/icons/jpg.svg" alt="file icon" srcset="">
          <img v-else-if="file.type_file == 'png'" src="../assets/icons/png.svg" alt="file icon" srcset="">
          <img v-else-if="file.type_file == 'svg'" src="../assets/icons/svg.svg" alt="file icon" srcset="">
          <img v-else src="../assets/icons/file.svg" alt="file icon" srcset="">
        </div>
        <div class="col">
          <div class="description">
            <h3>{{ file.title }}</h3>
            <p>{{ file.description }}</p>
            <div style="padding-bottom: 20px">
              <span>Размер: {{ file.size }}</span>
              <br>
              <span>Тип: {{ file.type_file }}</span>
            </div>
            <a :href="file.file"><button>Скачать</button></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  display: block;
}

.block-content {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  width: 70%;
  padding: 10px;
}

.row-file {
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 20px;
}

.img {
  width: 20% !important;
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
}

.img img {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

.col {
  width: 80%;
}

.description {
  margin-left: 20px;
  padding-right: 10px;
  padding-bottom: 30px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.description button {
  background-color: rgb(0 0 0 / 35%);
  border-radius: 10px;
  border: 0;
  padding: 7px;
  color: white;
  font-size: 14px;
}
.description button:hover {
  background-color: rgb(0 0 0 / 45%);
}

.description button:focus {
  outline: none;
}

@media screen and (max-width: 700px) {
  .block-content {
    width: 100%;
    padding: 0;
  }
}

@media screen and (max-width: 560px) {
  .row-file {
    flex-direction: column;
  }

  .col {
    width: 100%;
  }

  .img {
    width: 100% !important;
    display: flex;
    justify-content: center;
  }

  .description p {
    text-align: start;
  }
}
</style>
<script>
export default {
  name: 'Files',
  data() {
    return {
      listFiles: [],
    }
  },
  created() {
    this.loadListFiles()
  },

  computed: {
    reversList: function () {
      return this.listFiles.reverse()
    }
  },
  methods: {
    async loadListFiles() {
      this.listFiles = await fetch(
          `${this.$store.getters.getServerUrl}/blog/files/`
      ).then(response => response.json())
    }
  }
}
</script>