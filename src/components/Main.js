require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
// 引入imageData数据
var imagesData=require('../data/imgData.json');
// 将imgData数据转换成可以引用的图片格式
// 利用自执行函数将图片名信息转换为图片url信息
imagesData=(function genImageUrl(imagesDataArray){
    for(let i=0;i<imagesDataArray.length;i++){
      var singleImageData=imagesDataArray[i];
      console.log(singleImageData);
      singleImageData.imageURL=require('../images/'+singleImageData.fileName);
      imagesDataArray[i]=singleImageData;
    }
    return imagesDataArray;
})(imagesData);
// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
          <section className="img-sec"></section>
          <nav className="controller-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
