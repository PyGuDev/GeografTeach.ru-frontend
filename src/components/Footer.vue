<template>
  <div id="footer" v-bind:style="styleObj">
    <footer>
      <span>Я в соц сетях:</span>
      <div class="links">
        <a href="https://vk.com/id438315397"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADdklEQVRoge2YXUhTYRzGn/dsLqdmU3Nptb4o7cYyNCg1qKirijAC7aZu6iYqcKG76AuipCl4YUUgRUFESISVRhdFCWWGjSgLLIlVUpvV/MzJ1rZzupgtjmfvme/R0zLO72r7/9+P53n3fg7Q0NDQiCckVoG5ts7tgoAKAIUAktWXBADwQsBzwgl1LvvKZrmCsgayqjrPEMA2tdoYIaTabc87Qk3TEmMjf0sdVWzwAtn2tTavJVqOo1Uamzb/BDrCW2k5qgEABSpoUYQAUkjLyRlIUUGLUmbSEnIGpgWagXijGYg3etYK7bZcLEw3AACCvIDKm1/Q6BiI5J/ZcrFgLP+bDx4/imu7JW2VFaahZsc8JOjC56nT40dJlHJyMP8CxoQ/VfQcwaENmaL8w3c/JHUWz54hiaUadTixJTsiHgBcgwFWOewGXvSMSsTlzzdGvl9+2jehdg6uz4QpSSeKNTz2sMphN9DaLR3h0lWmyGen52fMNpZmzsC+ktmi2JP3I3jwVtp2LJgNtLwehi/Ai2JlBWlITQyPZogX5DskgH3HPBj0f6ZOICTg6B0Xq5Rwe6wV+r1BNL0cEsVSjTrsXpM+ofoHN5ixdon4WVH/8Bu6v/pZpQBQuI1ebPNAGDfQB9ZnIntWArXOogwDSvNNOLzZLIp3uX2of/RdiQwACg10uX1oejkoiqUadThbbkHOHOmOAwBPq3JxfpcFek78BLE1fUEgJD/t5FB8kJ2+14thX0gUK1qSjFZrDlM7JOajVh7FBtxDAZxodk+udwDnyi1IT2Y+TyNM6irR6BiY8L5fVPMOe658Qr83KIpb0gy4sMsCTuEvMem70LE7Ltx7Mxyz3Me+n7jfNYydDR8wMCqeeuuWpeDQRjOlpjyTNsALwP7rPbjW0T+h8m97fdh79ZNk4Vo3mbHKksTc/5TcRv3B8KWu4sZn9I2bItFod3px8q54/eg5guNbspj7Vr56otDoGMDtV0MoL0xDab4Jy7MSYdATtDtHJGUvtfVhrsmAvcUZkQtdkoF9PKlLJ7uqU/nmrALumhVRtU77B41mIN781wakW0e8IKCelHQDAhyqiFEA4elaqAYIJ9SpI4cdniNULVQDLvvKZhBSrY4kBghO9drz7tLTMZhT+XqrjvBWAWQ1/t4/1iNEQAfPkTo58RoaGhrx5xfzIvXn+sbXTAAAAABJRU5ErkJggg=="></a>
        <a href="https://ok.ru/gollobol?st.layer.cmd=PopLayerClose&st._forceSetHistory=true&st._aid=User_SM_Visit"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADdklEQVRoge2ZTUwTQRTHf4viBxZI/AI1VMByIcREDeoJReJFwcSPg9QQD2pSDmLUk/FkogdDglUPYjwpCiiJxoA3EOtBI4aLeJIWFQUEDgYKBUWth6GRbXeX3e5ULv0lTTszb+a9/8zOvtkuJEmSJMlCosxnEK7nCFADbAVWJDwiwSTQDVxXPDw2MjQUEK7HC5yRGFg81Ckezus16gqYnfmWhIRklTCHlGqeaDWlGHRb6Jmfi24siw06bYnLVVo2FNWAcx9kukTdmB/6n0HPDZgatj6mwjb9Jh3C9YQtO3JVwq47sFhnr89MwMtT4G+2PLTi0Y7VaAWs4XJD2X0M7wupDihrFL/jEKGF0R4wT1o2lNzGxF1Z2JTcgeVZUlzLEVBUI2Y3wu9peHUWGtZBw3p4fU7URUh1QNFpKa7lCHDuV5ffXIAeL4S+QWgI3l2Drotqm43lUlzLEZCRry4HNK7v3gdRfTZJcS1HgBmURepy+I+UYeUIGO9Tl13uWJuCqLpgX6xNHMi5jfa3warN/8rbr4hvf5P4drmh+LK6z+c2Ka7lJLLlWVDpV9+JjJgJQpMLpkZMu9BLZHIuoalhkWFNaQ6D75Sl4I2Qt4n9zdDhFscFPWaC0F4JgYfS3Mo7SoAQMdApkpRzH2QWiPqxXnGYe39T2sxHkLMHlq0R13/wozn79DyxUtOjpl0kbg8UVkPVILj7oLwdNuwBRWNYJQU2lEF5h7CtGoRCj2339lfg+CgsW62uC32DkS6Y/CrKjhxYUywOfXOZHoW7a80FmrDj9MxErIC0bMg9YK6vTexfQr4T8W3M6VHwnbTt3r6AgefQmC9OoBNf5rcPDUH3JWjcJPraRO4jJQrkH4a9jzSGDkP7UQi0YC7hRY2c0EwcwZEDO66iPS8K7KyFjDypLuUJcDihojP22cCqjUXkCEjPhQO+2MCCn8RnLg6nyAXpuVJc2xewdKWY1eiAgp+gtVR8okWk50LFc1iSadu9fQEFx/SDj6yApog88T+STewL+PFdXdYKWE/Er5Bt90YCzKXJQDP4G0VWHeyE1t2xgcKsiN0w5IOf4/Dh3r8ntvkZ12swygM+oMSshwTzQvFQqtVgtALXExRMPHj1GnQFzL4ZqUtIONaoVTw81Wuc/xXTLQ6iUAMU839fMb0FvEbBJ0mSJMnC8xeZCfv/bBeRgAAAAABJRU5ErkJggg=="></a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      topVal: '',
      intervalFooterUpdate: 0
    }
  },
  created() {
    this.intervalFooterUpdate = setInterval(this.fixedPosition, 100)
  },
  mounted() {
    this.fixedPosition()
  },
  beforeDestroy() {
    clearInterval(this.intervalFooterUpdate)
  },
  computed: {
    styleObj: function () {
      return {
        top: `${this.topVal}px`
      }
    }
  },
  methods: {
    fixedPosition() {
      var height = window.innerHeight + 10;
      var contentHeight = document.getElementById('content').clientHeight + 100;

      if(this.$router.app._route.name == 'Home'){
        height = height + 100;
        contentHeight = contentHeight + 100;
      }
      var footer = document.getElementById('footer');
      if(contentHeight > height)
        footer.style.top = `${contentHeight}px`;
      else
        footer.style.top = `${height}px`;
    }
  }
}
</script>

<style>
#footer {
  position: absolute;
  width: 100%;
}
</style>