import React, { Component, createRef } from "react";
import SearchPanel from './SearchPanel';

import SortPanel from './SortPanel';
import DataRows from './DataRows.js';

export default class Table extends Component {

    constructor(props) {
        super(props);
        let sortedData = props.data.sort((prev, next) => prev.s > next.s ? 1 : -1)
        let filteredData = sortedData;
        this.state = {
            sort: {
                prop: 's',
                order: true
            },
            filteredData,
            sortedData,
            display: {
                options: [{
                        name: 'change',
                        title: 'Change'
                    },
                    {
                        name: 'v',
                        title: 'Volume'
                    }
                ],
                selected: 0
            }
        };


        this.counter = null;
        this.sortTable = this.sortTable.bind(this);
        this.setDisplay = this.setDisplay.bind(this);
        this.searchInput = createRef();
    }


    //Decide what to display - change or volume
    setDisplay(displayIndex) {
        this.setState({
            display: {
            	...this.state.display,
            	selected: displayIndex

            }
        })
    }


    sortTable(prop = this.state.sort.prop, order = this.state.sort.order) {

        //Check what to sort - number or string values
        let sortedData = prop !== 's' ?
            this.props.data.sort((prev, next) => !!order ? prev[prop] - next[prop] : next[prop] - prev[prop]) :
            this.props.data.sort((prev, next) => prev[prop] > next[prop] && !!order ? 1 : -1);


        //Check out whether element is still/new favourite
        sortedData = sortedData.map(element => ({
        	...element,
        	fav: this.props.favs.includes(element.s)
        }))

        let filteredData = this.filterData(sortedData);

        this.setState({
            sortedData,
            filteredData,
            sort: {
                order,
                prop
            }
        })

    }

    componentDidUpdate(prevProps) {
        //A simple check - we pass the datastamp when props are coming from the parent 
        //to prevent loop
        this.props.updated !== prevProps.updated && this.sortTable()
    }


    //Filter the data by filter params (e.g. search input data)
    filterData(data) {
        let { value } = this.searchInput.current;
        let { favsShown } = this.props;

        let dataToFilter = value ? data.filter(element => element.b.includes(value.toUpperCase())) : data;

        //If only favourites are shown - filter again. Better idea is to do it in one function 
        dataToFilter = favsShown ? dataToFilter.filter(element => element.fav == true) : dataToFilter;

        return dataToFilter
        //.map(el => ({ ...el, fav: this.props.favs.includes(el.s) }));;
    }

    search() {
        //Clear timeout and start it again on key press, in order to start search only when user stopped typing
        clearTimeout(this.counter);
        this.counter = setTimeout(() => this.setState({ filteredData: this.filterData(this.state.sortedData) }), 500)
    }

    render() {
        return (
            <table className='table col-12 position-relative'>
    			<SearchPanel  search={() => this.search.call(this)} display={this.state.display} sort={this.state.sort} searchInput={this.searchInput} setDisplay={this.setDisplay}/>
    			<tbody>
    				<SortPanel sort={this.state.sort} sortTable={this.sortTable} display={this.state.display} />
    				<DataRows  data={this.state.filteredData}  display={this.state.display} favs={this.props.favs}/>
    			</tbody>
    		</table>
        )

    }
};