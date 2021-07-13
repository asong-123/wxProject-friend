// miniprogram/components/callPhone/callPhone.js
Component({
  options:{
    styleIsolation:'apply-shared'
  },
  properties:{
    phoneNumber:String
  },
  data: {

  },
  methods:{
    handleCallPhone(){
      wx.makePhoneCall({
        phoneNumber: this.data.phoneNumber,
      })
    }
  }
})