/*----------------------
    Search Box COMPONENT:
    text box that generates an array keywords from input
------------------------*/


import React, { Component } from 'react';

import '../../stylesheets/components/SearchBox.scss';

const wordBank = [
    "apple",
    "angular",
    "asphalt",
    "ahhhhhh!",
    "bear",
    "bull",
    "css",
    "deer",
    "elephant",
    "freeCodeCamp",
    "grunt",
    "html",
    "isle",
    "javascript",
    "knob",
  ];

class SearchBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
          tags: [],
          dropdown: null,
          selected: null,
          value: ""
        };
      }
      onInput = (e) => {
        let tags = [...this.state.tags]
        let value = e.target.value;
        let newTags = e.target.value.split(",");
        if (newTags.length > 1) {
          tags.push(newTags[0]);
          value = newTags[1];
        }
        if (value.length > 0) { this.updateDropdown(value); }
        this.setState({
          tags: tags,
          value: value
        });
      } 
      onKeyUp = (e) => {
        switch (e.keyCode) {
          case 13:
            // On enter, add tag "button" and reset input field
            this.updateTags(e.target.value);
            this.updateDropdown("");
            break;
          case 8:
            // Removes last tag if delete is pressed with empty input field
            if (e.target.value.length < 1) {
              let tags = [...this.state.tags];
              tags.splice(tags.length - 1, 1);
              this.setState({
                tags: tags
              });
            }
            break;
          default:
        }
      }
      onBlur = (e) => {
        this.setState({
          dropdown: null
        });
      }
      updateDropdown = (value) => {
        let regex = new RegExp('\\b' + value);
        let match = wordBank.filter(word => {
          return regex.test(word) && this.state.tags.indexOf(word) === -1;
        });
        if (match.length < 1 || value.length < 1) {
          match = null;
        }
        this.setState({
          dropdown: match
        });
      }
      updateTags = (id) => {
        // id is a string with the format "<method>_<tag>"
        let input = id.split("_");
        let tag = input[1];
        let method = input[0];
        let tags = [...this.state.tags];
        if (method === "add") {
          tags.push(tag);
          value = "";
        } else if (method === "del") {
          tags.splice(tags.indexOf(tag), 1);
        }
        this.setState({
          value: value,
          tags: tags
        })
      }
      handleClick = (e) => {
        const tag = e.target.id;
        if (tag && tag.length + 0) {
          this.updateTags(e.target.id);
        }
        this.setState({
          dropdown: false
        });
      }
      render() {
        return (
          <div>    
              <div className="row">
                {(this.state.tags) ? (
                  this.state.tags.map(tag => {
                    return (
                      <div key={tag} 
                        id={"del_" + tag}
                        className="tags"
                        onClick={this.handleClick}
                      >
                        <span id={"del_" + tag}>{tag}</span>
                      </div>
                    );
                  })
                ) : ( null )}
                <div className="input-area">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Enter your search words separated by commas."
                    onChange={this.onInput}
                    onKeyUp={this.onKeyUp}
                    onBlur={this.onBlur}
                    value={this.state.value}
                  >
                  </input>
                </div>
              </div>
              <div id="autocomplete" className="autocomplete">
                {(this.state.dropdown) ? (
                  this.state.dropdown.map(tag => {
                    return (
                      <button 
                        key={tag}
                        id={"add_" + tag}
                        className="autocomplete-item"
                        onMouseDown={this.handleClick}  
                      >
                        {tag}
                      </button>    
                    );
                  })
                ) : ( null )}
              </div>
            </div>
        );
      }
}

export default SearchBox;