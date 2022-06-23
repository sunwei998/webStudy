const _=require('lodash')
function getRandomAvatar(){
  const avatars=[
    'https://ts1.cn.mm.bing.net/th/id/R-C.d4d2dcbdac458f6ebcb378234aa2b380?rik=Lt2dLBmokQasgQ&riu=http%3a%2f%2fimg.crcz.com%2fallimg%2f202002%2f11%2f1581397709140911.jpg&ehk=48jBE9Mja%2ffk5JHI2%2f3GP5ZbV%2fxxFGaKDaY8BHiB%2b1g%3d&risl=&pid=ImgRaw&r=0',
    'https://ts1.cn.mm.bing.net/th/id/R-C.1885186348072d83c2713b24f8f466c4?rik=hA6bGCZ9F2CSCA&riu=http%3a%2f%2fb-ssl.duitang.com%2fuploads%2fitem%2f201802%2f23%2f20180223130723_SHczB.jpeg&ehk=1%2biuxcaXGSroUI6MypLkxIULlMfzgAWfyMSPuHaUjYo%3d&risl=&pid=ImgRaw&r=0',
    'https://pic4.zhimg.com/v2-42824a8eb4998ea87850f6eed007cd39_r.jpg?source=1940ef5c',
    'https://ts1.cn.mm.bing.net/th/id/R-C.c7361e1912242c56128aae81a28fe353?rik=VZn5aUV7bBEfyg&riu=http%3a%2f%2fimg.crcz.com%2fallimg%2f201912%2f27%2f1577431299347309.jpg&ehk=S3SzklSRGOwf5zT%2fUVOtMObQ7JkUC60OKMK2M3aluw8%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
    'https://ts1.cn.mm.bing.net/th/id/R-C.7b4acb1405f374915c4a3e556be9d442?rik=PjmYQUztzcw1fw&riu=http%3a%2f%2fimg.2qqtouxiang.com%2fpic%2fTX9821_02.jpg&ehk=aw58gdgxh4hwd4h8CsTM3FwtrVcV4lD1AGckjAEvf7g%3d&risl=&pid=ImgRaw&r=0',
    'https://ts1.cn.mm.bing.net/th/id/R-C.e3fdf02fdec10f9baf3c001ba4001958?rik=gmZIL9PI7e6E0g&riu=http%3a%2f%2fimg.duoziwang.com%2f2017%2f09%2f1608131169911.jpg&ehk=n5IW3SNmTgp2pR%2fkZE97Zb6n4Cti4%2fdXiMT%2f0sD4cKw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
  ]
  // ? 通过lodash获取随机数据下标
  const index=_.random(0,5)
  return avatars[index]

}
module.exports={
  getRandomAvatar
}