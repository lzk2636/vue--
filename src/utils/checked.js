export let checkedPhone = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("请输入手机号码"));
    } else {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(value)) {
        // this.$refs.ruleForm.validateField('checkPass');
        callback();
      } else {
        callback(new Error("手机格式不正确!!!"));
      }
    }
  };
  //验证邮箱
export   let checkEmail = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("请输入邮箱"));
    } else {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (!reg.test(value)) {
        return callback(new Error("邮箱不匹配"));
      }
      callback();
    }
  };