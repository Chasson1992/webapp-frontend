import React from "react";
import PropTypes from "prop-types";

class HelloWorld extends React.Component {

    constructor(props) {
        super(props);
        this.state = {word: "nooooooo"}
    }

    static propTypes = {
        word: PropTypes.string
    }

    handleSubmit = (event) => {
        const array = document.getElementById("NameEntry").value.split(" ");
        fetch('/api/users/add', 
            { method: 'POST', 
              headers : {'Content-Type': 'application/json'}, 
              body: JSON.stringify({firstName: array[0], lastName: array[1]}) 
            });
    }

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({word: event.target.value});
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.text}. Click that button. {this.state.word} </p>
                <form>
                    <label>
                        Name: 
                        <input type="text" onChange={this.handleChange} id="NameEntry"/>
                    </label>
                    <input type="button" value="Button" onClick={this.handleSubmit}/>
                </form>
            </div> 
        );
    }
}

export default HelloWorld;