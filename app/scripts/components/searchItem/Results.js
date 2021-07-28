import React, { Component } from "react";
import { Transform } from "stream";
import {FlexConfig} from './FlexConfig.js'

// var sass = require('sass'); // or require('node-sass');

// var result = sass.renderSync({file: "./styles.scss"});
// console.log(result);

const CardContainerStyle = {
  width: 300,
  margin: '32px auto',
  borderRadius: 5,
  display: 'flex',
}

const ImageStyle = {
  // border: '3px solid green',
  width: '50%',
  height: '50%',
  borderRadius: 15
}
// ImageStyle:hover {
//   transform: scale(1.1);
// }

const RightColumn = {
  flex: 1,
  marginLeft: 16
}

const NameAndDate = {
  display: 'flex',
  justifyContent: 'space-between',
}

const Message = {
  fontSize: 14,
}

const NameStyle = {
  margin: 0
}

const DateStyle = {
  margin: 0,
  color: 'grey',
  fontWeight: 'normal'
}

// export default function Results() {
//   return (
//     <div id="row">
//       <MessageWithFlex/>
//       <MessageWithFlex/>
//     </div>
//   );
// }

export default class Results extends Component {
  render () {
    return (
      <FlexConfig container width="300px" margin="32px auto">
        <img 
            className="productImg"
            style={ImageStyle} 
            src={this.props.imgu}
            alt="Profile"
        />
        <FlexConfig flex={1} margin="0 0 0 16px"> 
          <FlexConfig container justifyContent="space-between">
              <h4 style={NameStyle}> {this.props.name} </h4>
              <h5 style={DateStyle}> {this.props.price} </h5>
          </FlexConfig>
          <p style={Message}>
            {this.props.tags}
          </p>
        </FlexConfig>
      </FlexConfig>
    );
  }
}