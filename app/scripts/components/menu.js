/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import axios from 'axios';
import Results from './searchItem/Results.js';

class Menu extends React.Component {
    /////////////
    //VARIABLES//
    /////////////
    instance = axios.create({baseURL: 'http://localhost:3035'});

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        // this.test = false;
        super();
        this.state = {
            showingSearch: false,
            showingPassiveResults: false,
            searchingContent: "",
            passiveResults: [],
            pRElements: [],
            loading: false
        };
    }

    setPassiveResults = (pRes) => {
        this.setState(state => ({
            passiveResults: pRes,
            loading: false
        }))
        console.log('testE: '+this.state.passiveResults+' | '+pRes);
        this.renderPassive();
    }

    passiveSearch = async val => {
        let params = {
            search: val
        }
        this.setState({ loading: true });
        await this.instance.post(`/search/passive`, params).then(res => {
            let pResults = res.data.data;
            console.log('res: '+JSON.stringify(res.data.data));
      
            // this.setState({ passiveResults, loading: false });
            this.setPassiveResults(pResults)
        }).catch(error => {
            if (!error.response) {
                // network error
                this.errorStatus = 'Error: Network Error';
            } else {
                this.errorStatus = error.response.data.message;
            }
          });
          if(this.state.loading === false) console.log('passiveSearch(text) Ran('+!this.state.loading+'): '+this.state.passiveResults);
    };
        
    renderPassive = () => {
        if (this.state.passiveResults) {
            console.log('testdog: '+this.state.passiveResults.length)
            for(let i=0; i<this.state.passiveResults.length && i<4; i++) {
                console.log(this.state.passiveResults[i].picture);
                this.setState({
                    pRElements: [...this.state.pRElements, <Results
                        imgu={this.state.passiveResults[i].picture}
                        name={this.state.passiveResults[i].name}
                        price={'$'+this.state.passiveResults[i].price}
                        tags={this.state.passiveResults[i].tags.join(", ")} />]
                  })
            }
        }      
    }
    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }
    
    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch = async e => {
        this.setState({pRElements: []});
        this.setState({searchingContent: e.target.value});
        // Make Modal with passive search results visible at (3) typed characters
        if(e.target.value.length >= 3 && this.state.showingPassiveResults == false) {
            this.setState({showingPassiveResults: true});
            console.log('set TRUE');
        }else if(e.target.value.length < 3 && this.state.showingPassiveResults == true) {
            this.setState({showingPassiveResults: false});
            console.log('set FALSE');
        }
        console.log(e.target.value.length);
        console.log(this.state.showingPassiveResults);
        
        if(e.target.value.length >= 3) {
            this.passiveSearch(e.target.value);
        }
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
     render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input
                        type="text"
                        value={this.state.searchingContent}
                        onChange={(e) => this.onSearch(e)}
                    />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                        <div style={{display: 'flex', flexDirection: 'row'}} id="pResults" className={(this.state.showingPassiveResults ? "showing " : "") + "search-container"}>
                            {this.state.pRElements}
                        </div>
                </div>
            </header>
        );
    }
}

// Export out the React Component
module.exports = Menu;