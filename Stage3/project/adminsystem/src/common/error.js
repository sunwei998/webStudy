// ? 自定义错误
export default function CustomError(error) {
  this.code = error.response.data.code;
  this.message = error.response.data.message;
  this.details = error.response.data.details;
}
