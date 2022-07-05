import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    //constructor runs before anything before any class

    constructor() {
        super();
    //the only thing you're really going to do in the constructor is to initialize the state and its values
    //it's the only thing you're really going to use the constructor for
        this.state = {
            entities: [],
            searchField: ''
        };
    }

    //After the render, the componentDidMount() will run
    //componentDidMount() is for things that happen the first and only time each component mounts
    //.then() happens after the fetch and makes things happen
    //.then( (response) => response.json()) takes the response from the API and puts it in a .json format
    //The response.json file is passed into the next .then() function as 'users'

    //.then( (users) => this.setState( () => {} ) passes users into this function so we can use a return statement
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then( (response) => response.json())
            .then((users) => this.setState(
                () => {
                return {entities: users};
            },
                () => {
                console.log(this.state);
            }));
    }

    onSearchChange = (typed_letters) => {
        // takes our search string and makes it all lowercase
        const searchField = typed_letters.target.value.toLocaleLowerCase();
        this.setState(
            () => {
                return { searchField };
        });
    };

    //After the constructor, the render runs next
    //It just determines what to show
    //onChange = { () => {} } is a 'callback function' and in this case an 'event' is being called back from the {} function
    render() {

        const { entities, searchField } = this.state;
        const { onSearchChange } = this;
      //takes the names of all the entities and makes the monster names lowercase
      //creates a new array called 'filtered entities' and filters the original monster array with
      //the filter() method using a call back '() => {}'
        const filteredEntities = entities.filter( (monster_with_event) => {
          //need a return statement that returns the entities with searchString
          //to the callback function
          //returns a new array
            return monster_with_event.name.toLocaleLowerCase().includes(this.state.searchField);
        });

        return (
            <div className="App">

                <input className='search-box'
                    type='search'
                    placeholder='search entities'
                    onChange={onSearchChange}
                />
                <h1>{filteredEntities.map(
                    (entities) => {
                        return(
                            <div key={entities.id}>
                                <h1>{entities.name}</h1>
                            </div>
                        )
                    }
                )}</h1>
            </div>
        );

    }
}

export default App;
