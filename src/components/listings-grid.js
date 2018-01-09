import React, { Component } from 'react'
import contractService from '../services/contract-service'
import Pagination from 'react-js-pagination'

import ListingCard from './listing-card'

class ListingsGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listingIds: [],
      listingsPerPage: 10,
      activePage: 1
    }

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  componentWillMount() {
    // Get listings to hide if on demo
    const hideListPromise = new Promise((resolve, reject) => {
      if (process.env.HIDE_LIST_URL) {
        resolve (
          fetch(process.env.HIDE_LIST_URL).
          .then((response) => response.json())
        )
      } else {
        resolve([])
      }
    })
    // Get all listings from contract
    const allListingsPromise = contractService.getAllListingIds()
    .catch((error) => {
      if (error.message.indexOf("(network/artifact mismatch)") > 0) {
        console.log("The Origin Contract was not found on this network.\nYou may need to change networks, or deploy the contract.")
      }
    })
    // Wait for both to finish
    Promise.all([hideListPromise, allListingsPromise])
    .then(([hideList, ids]) => {
      const showIds = ids ? ids.filter((i)=>hideList.indexOf(i) < 0) : []
      this.setState({ listingIds: showIds })
    })
    .catch((error) => {
      console.log(error)
      alert(error.message)
    })
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`)
    this.setState({activePage: pageNumber})
  }

  render() {
    // Calc listings to show for given page
    const showListingsIds = this.state.listingIds.slice(
      this.state.listingsPerPage * (this.state.activePage-1),
      this.state.listingsPerPage * (this.state.activePage)).reverse()
    return (
      <div className="listings-grid">
        <h1>{this.state.listingIds.length} Listings</h1>
        <div className="row">
          {showListingsIds.map(listingId => (
            <ListingCard listingId={listingId} key={listingId}/>
          ))}
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.listingsPerPage}
          totalItemsCount={this.state.listingIds.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          hideDisabled="true"
        />
      </div>
    )
  }
}

export default ListingsGrid
