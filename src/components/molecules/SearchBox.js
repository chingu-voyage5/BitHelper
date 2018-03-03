/*----------------------
    Search Box COMPONENT:
    text box that generates an array keywords from input
------------------------*/


import React, { Component } from 'react';

import '../../stylesheets/components/SearchBox.css';

class SearchBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
          searchText: [],
          dropdown: null,
          selected: null,
          value: ""
        };
      }
      componentWillReceiveProps(newProps) {
        if (newProps.projects) {
            let text = [];
            newProps.projects.forEach(project => {
                let newWords = [...project.stack, project.title, project.category]
                newWords = newWords.filter((word, i) => {
                    return text.indexOf(word) === -1;
                });
                text = [...text, ...newWords];
            });

            this.setState({
                searchText: text
            })
        }
      }
      onInput = (e) => {
        let tags = [...this.props.filters]
        let value = e.target.value.replace(' ','');
        let newTags = value.split(",");
        if (newTags.length > 1) {
          if (newTags[0].length > 1 && tags.indexOf(newTags[0]) === -1) {
            tags.push(newTags[0]);
            value = newTags[1];
            this.submitTags(tags);
          } else if (newTags[0].length > 1) {
            // if new word already exist in tags
            value = newTags[1];
          } else {
            value = newTags.join('');
          }
        } 
        if (value.length > 0) { this.updateDropdown(value); }
        this.setState({
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
                let tags = [...this.props.filters];
                tags.splice(tags.length - 1, 1);
                this.submitTags(tags);
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
        let regex = new RegExp('\\b' + value, 'i');
        let match = this.state.searchText.filter(word => {
          return regex.test(word) && this.props.filters.indexOf(word) === -1;
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
        let tags = [...this.props.filters];
        let value = this.state.value;
        if (method === "add") {
          tags.push(tag);
          value = "";
        } else if (method === "del") {
          tags.splice(tags.indexOf(tag), 1);
        }
        this.setState({
          value: value
        });
        this.submitTags(tags);
      }
      submitTags = (newTags) => {
        this.props.onTagsUpdate(newTags);
        this.setState({
          dropdown: null
        })
      }
      handleClick = (e) => {
        const tag = e.target.id;
        if (tag && tag.length + 0) {
          this.updateTags(e.target.id);
        }
        this.setState({
          dropdown: null
        });
      }
      render() {
        console.log('search box', this.props.filters, this.state.tags);
        return (
          <div>    
              <div className="search-row">
                {(this.props.filters) ? (
                  this.props.filters.map(tag => {
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
                <div className="search-input-area">
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