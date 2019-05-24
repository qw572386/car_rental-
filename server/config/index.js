module.exports = {
  port: 3000,
  smtp: {
    get host() {
      return 'smtp.office365.com'
    },
    get user() {
        return 'Hertz_UTS@outlook.com'
    },
    get pass() {
        return 'Qw572386.'
    }
  }
}
