/*----------------------
    INPUT COMPONENT:
    text area inputs to be used in forms
------------------------*/


import React, { Component } from 'react';

class Input extends Component {
  onChange = (e) => {
    this.props.onChange(e.target.name, e.target.value);
  }
  render(){
    const data = Object.assign({}, this.props.data);
    switch (this.props.data.tag) {
      case ('textarea'):
        return (
          <div className="form-group">
            <label className="control-label" htmlFor={data.name}>{data.label}</label>
            <textarea
              id={data.name}
              name={data.name}
              type={data.type || 'text'}
              placeholder={data.placeholder}
              className="form-control input-md"
              value={data.value || ''}
              onChange={this.onChange}
              required={data.required} 
            />
          </div>
        );
      default: 
        return (
          <div className="form-group">
            <label className="control-label" htmlFor={data.name}>{data.label}</label>
            <input
              id={data.name}
              name={data.name}
              type={data.type || 'text'}
              placeholder={data.placeholder}
              className="form-control input-md"
              value={data.value || ''}
              onChange={this.onChange}
              required={data.required || false} 
            />
          </div>
        );        
    }
  }
}

export default Input;