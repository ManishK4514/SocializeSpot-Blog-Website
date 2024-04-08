"use client"

import React, { Component } from "react";

import { Crisp } from "crisp-sdk-web";

class CrispChat extends Component {
  componentDidMount () {
    Crisp.configure("7995cb10-2eec-4db5-b7ab-84fb0e75b7cb");
  }

  render () {
    return null;
  }
}
export default CrispChat