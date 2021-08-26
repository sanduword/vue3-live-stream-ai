// url query参数
export function query(name: string) {
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
  let r = window.location.search.substr(1).match(reg)
  if(r != null)
    return  unescape(decodeURI(r[2]));
  return null
}