import React from 'react';
import './App.css';
import marked from 'marked';
import 'bootstrap/dist/css/bootstrap.css';

/*
 -in react.js you create a component for every (repeatable) piece of your website.
 -each component should ideally only do one thing AKA single responsilbity principle.
 -components control 'state', which are called 'prop' when passed to other components.
 -component with state should have its respective function defined within it
 */
var MarkupArea = React.createClass({
    //do getInitialState to show what you want when page first loads
    getInitialState: function () {
        return (
        {value: 'Heading\n=======\n\nSub-heading\n--------\n\n### Another deeper heading\n\nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a \nline break\n\nText attributes *italic*, **bold**,\n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n* apples\n* oranges\n* pears\n\nNumbered list:\n\n1. apples\n1. oranges\n1. pears'}
        );
    },
    //this function updates the output section with the value change in the input section
    handleChange: function () {
        //refs allow you to access elements returned in the render function. ref.textarea is a way to access the text box on the page
        this.setState({value: this.refs.textarea.value});
    },
    rawMarkup: function (value) {
        //enables/starts extension 'Marked' library added as a script
        var md = marked(value);
        //returns HTML properly formatted
        return (
        {__html: md}
        )
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-md-6">
                    <h3 className="header">INPUT</h3>
                    {/*use form component 'textarea' because it provides a UI that can be manipulated and changed via user interactions*/}
                    <textarea className="inputArea" rows="26"
                        //whenever a form field is changed by user, the 'onChange' command
                              onChange={this.handleChange}
                              ref="textarea"
                              defaultValue={this.state.value}
                    />
                </div>
                <div className="col-md-6">
                    <h3 className="header">OUTPUT</h3>
                    <div
                        className="preview"
                        //called 'dangerously' to warn against possible web vulnerabilities, but used in instances of DOM manipulation such as this one
                        dangerouslySetInnerHTML={this.rawMarkup(this.state.value)}
                    />
                </div>
            </div>
        );
    }
});

export default MarkupArea;
