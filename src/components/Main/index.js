import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import callREST from './../../service/REST';
import initWS from './../../service/WS';
// import Sign from './../components/sign/Sign';
// import Header from './components/Header';

import SelectFilter from './../SelectFilter';
import Table from './../Table';
import ShowFavs from './../ShowFavs';

export default class Main extends Component {


    //The main component performing render and update

    constructor(props) {
        super(props);
        this.state = {
            WSParams: {

            },
            data: [],   
            markets: [{
                    name: 'BNB'
                },
                {
                    name: 'BTC'
                },
                {
                    name: 'ALTS',
                    categories: [{
                            name: 'ETH'
                        },
                        {
                            name: 'XRP'
                        },
                        {
                            name: 'TRX'
                        }
                    ]
                },
                {
                    name: 'USDⓈ',

                }
            ],
            selected: {
                filter: 'BTC',
                type: 'pm'
            },
            message: 'Fetching...'


        };

        this.updateData = this.updateData.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.selectFavs = this.selectFavs.bind(this);
    }

    filterData(name, value = this.state.selectedFilter, data = this.state.data) {
        //A simple filter for an array
        return data.filter(element => element[name] === value)

    }

    selectFavs(condition = false, data = this.state.data) {

        // Here we declare whether we show favourites only or no
        return this.setState({
            favsShown: condition
        })
    }

    selectFilter(name, value) {
         
        //Switch the filter and it's type
        // e.g. new filter type is market and name is BTC

        this.setState({
            selected: {
                filter: value,
                type: name,
            },
            selectedFilter: value,
            selectedFilterType: name,
            dataToShow: this.filterData(name, value)
        });


    }


    updateData(messageData) {
        let { data } = this.state;
        let change, existingIndex, existingElement;


        //We iterate over the array of received data

        messageData.map(fetchedEl => {

            //Find an existing elment with the same unique pair id e.g. 'BTCUSD'
            existingIndex = data.findIndex(existingEl => existingEl.s == fetchedEl.s);
            existingElement = data[existingIndex];

            //Calculate the percent diffence between the existing and the parsed element

            change = fetchedEl.c && Number((fetchedEl.c - existingElement.c) / (existingElement.c / 100));

            // Override the price, change and volume values
            data[existingIndex] = {
                ...existingElement,
                c: fetchedEl.c || existingElement.c,
                v: fetchedEl.v || existingElement.v,
                change: change || existingElement.change
            };
        });

        this.setState({
            data,
            message: null,
            dataToShow: this.filterData(this.state.selectedFilterType, this.state.selectedFilter, data)
        })
    }



    componentDidMount() {
        
        //First we call the proxy server to get data , 
        // set the default values for the favourite boolean and change
        // and then r̶e̶l̶e̶a̶s̶e̶ t̶h̶e̶ k̶r̶a̶k̶e̶n̶  open the websocket
          

        callREST()
            .then(data => this.setState({
                data: data && data.map(el => ({
                    ...el,
                    change: 0.00,
                    fav: this.props.favs.includes(el.s)
                })),
                message: !data && 'Fetching failed'
            }))
            .then(() => initWS.call(this))
    }


    render() {

        let { dataToShow, WSParams } = this.state;

        return (
            <div className='container pt-4 position-relative'>
                        {
                            /*Render a warning stripe on the top*/
                           this.state.message &&   <div className='position-fixed w-100 bg-light text-gray text-center main__warn'>{this.state.message}</div> 
                        }
                        {
                            /*Render a button resuming/stoping the websocket connection*/
                            dataToShow && (
                            <div className='btn btn-secondary position-fixed' onClick={() => WSParams.opened ? WSParams.close() : initWS.call(this) }>
                                {WSParams.opened ? 'Pause ' : 'Resume '} refresh
                            </div>)
                        }
						<div className='row'>
							{ dataToShow && 
								<div className='col-12 col-md-6 row mx-auto'>
    								
									  <div className='w-100 row mx-auto'>
				   			
					   					<div className='col-2 text-left'>
					   						<ShowFavs favsShown={this.state.favsShown} selectFavs={this.selectFavs}/>
					   					</div>
					   					{
					   						this.state.markets.map(market => (
					   							<SelectFilter 
					   								market={market} 
					   								selected={this.state.selected}
					   								selectFilter={this.selectFilter}
					   								favsShown={this.state.favsShown}
                                                    key={market.name}
					   							/>
					   						))
					   					}

										</div> 
										<Table 
											data={dataToShow} 
											updated={Date.now()} 
											favs={this.props.favs}
											favsShown={this.state.favsShown}

										/>
							</div>	
						 }
						</div>  
					</div>
        )

    }
}