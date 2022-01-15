<template>
  <div class="container">
    <Service @updateParent="onUpdateParent"/>
    <div class="block-content">
      <div class="row-file" v-for="file in listFiles" :key="file.id">
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
              <div class="tag-list">
                <span class="tag" v-for="tag in file.tags">{{ tag.title }} </span>
              </div>
              <span>Размер: {{ file.size }}</span>
              <br>
              <span>Тип: {{ file.type_file }}</span>
            </div>
            <a download="file.title" @click.prevent="downloadItem(file.file, file.title, file.type_file)">
              <button>Скачать</button>
            </a>
          </div>
        </div>
      </div>
      <Pagination :total="countPages" @page-changed="loadListFiles" @page-select="selectPage"/>
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

.tag-list {
  margin-bottom: 10px;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.tag {
  background: #79aec8;
  border-radius: 10px;
  padding: 4px;
  font-size: 13px;
  margin-right: 3px;
  color: white;
}

.block-service {
  margin-left: auto;
  margin-right: auto;
}
</style>
<script>
import Pagination from "../components/Pagination";
import Service from "../components/Service";

export default {
  name: 'Files',
  data() {
    return {
      listFiles: [],
      nextPage: '',
      search: '',
      previosPage: '',
      countPages: 0,
      page: 1,
      count: 0
    }
  },
  created() {
    this.loadListFiles(this.page)
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'Сайт учителя географии';
      }
    },
  },
  components: {Pagination, Service},
  methods: {
    onUpdateParent(data) {
      if (data !== undefined) {
        if (data.search !== undefined) {
          this.search_text = data.search
        }
        this.getFilteredListFiles()
      }

    },
    async getFilteredListFiles() {
      let params = {};
      if (this.search_text)
        params['q'] = this.search_text

      let response_data = await this.$http(
          `${this.$store.getters.getServerUrl}/blog/files/`,
          {params: params}
      ).then(response => response.data);
      this.count = response_data.count
      this.listFiles = response_data.results;
      this.countPages = response_data.count_page;

    },

    async loadListFiles(pageNumber) {
      let response_data = await this.$http.get(
          `${this.$store.getters.getServerUrl}/blog/files/?page=${pageNumber}`
      ).then(response => response.data);
      this.count = response_data.count;
      this.countPages = response_data.count_page;
      this.nextPage = response_data.next;
      this.nextPage = this.nextPage != null ? this.nextPage.split('?')[1] : '';
      this.previosPage = response_data.previous;
      this.previosPage = this.previosPage != null ? this.previosPage.split('?')[1] : '';
      this.listFiles = response_data.results;
    },
    selectPage(pageNumber) {
      this.page = pageNumber
    },
    downloadItem(url, label, type) {
      this.$http.get(url, {responseType: 'blob'})
          .then(response => {
            if (type === 'docx')
              this.headerType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            else if (type === 'doc')
              this.headerType = 'application/msword'
            else if (type === 'ppt')
              this.headerType = 'application/vnd.ms-powerpoint'
            else if (type === 'pptx')
              this.headerType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            else
              this.headerType = `application/${type}`;
            const blob = new Blob([response.data], {type: this.headerType})
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = label
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error)
    }
  }
}
</script>