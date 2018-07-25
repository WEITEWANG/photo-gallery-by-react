require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react'; 
// import ReactDom from 'react-dom';
import {findDOMNode} from 'react-dom';
// 引入imageData数据
var imagesData=require('../data/imgData.json');
// 将imgData数据转换成可以引用的图片格式
// 利用自执行函数将图片名信息转换为图片url信息
imagesData=(function genImageUrl(imagesDataArray){
    for(let i=0;i<imagesDataArray.length;i++){
      var singleImageData=imagesDataArray[i];
      // console.log(singleImageData);
      singleImageData.imageURL=require('../images/'+singleImageData.fileName);
      imagesDataArray[i]=singleImageData;
    }
    return imagesDataArray;
})(imagesData);
// let yeomanImage = require('../images/yeoman.png');
var ImgFigure=React.createClass({
  render(){   
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL} alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.desc}</h2>
        </figcaption>
      </figure>
    );
  }
});
class AppComponent extends React.Component {
  constructor(){
    super();
    this.state={
       // imgFigure取值范围初始化
  Constant:{
    centerPos:{
      left:0,
      right:0
    },
    hPosRange:{//水平方向取值范围
      leftSecX:[0,0],
      rightSecX:[0,0]
    },
    vPosPange:{
      x:[0,0],
      topY:[0,0]
    }
  }

    }
  }
//  组件加载之后，为每张图片计算位置的范围
componentDidMount(){
  // 通过this.refs索引到子组件
  var stageDOM=React.findDOMNode(this.refs.stage);
  console.log(stageDOM);
    
}




  render() {
    var ImageFigures=[],Controllers=[];
    imagesData.forEach(function(value){
      // console.log(value);
      ImageFigures.push(<ImgFigure data={value} key={value.fileName}/>);
    })
    // console.log(ImageFigures);
    return (
      <section className="stage" ref="stage">
          <section className="img-sec">{ImageFigures}</section>
          <nav className="controller-nav">{Controllers}</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
