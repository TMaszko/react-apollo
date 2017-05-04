import React, { Component } from 'react';
import Cart from './components/Cart';
import CustomerAuthWithMutation from './components/CustomerAuth';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo'
import PageState from './components/PageState' 
import {
  createCheckout,
  checkoutLineItemsAdd,
  checkoutLineItemsUpdate,
  checkoutLineItemsRemove,
  checkoutCustomerAssociate,
  addVariantToCart,
  updateLineItemInCart,
  removeLineItemInCart,
  associateCustomerCheckout
} from './checkout'


// const component =  () =>      <PageState 
//             products={this.props.data.shop.products.edges}
//             totalItemsCount={this.props.data.shop.products.edges.length}
//             checkout={this.state.checkout}
//             addVariantToCart={this.addVariantToCart.bind(this)}/>


class App2 extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      isCustomerAuthOpen: false,
      isNewCustomer: false,
      products: [],
      checkout: { lineItems: { edges: [] } }
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.handleCartOpen = this.handleCartOpen.bind(this);
    this.openCustomerAuth = this.openCustomerAuth.bind(this);
    this.closeCustomerAuth = this.closeCustomerAuth.bind(this);
    this.addVariantToCart = addVariantToCart.bind(this);
    this.updateLineItemInCart = updateLineItemInCart.bind(this);
    this.removeLineItemInCart = removeLineItemInCart.bind(this);
    this.showAccountVerificationMessage = this.showAccountVerificationMessage.bind(this);
    this.associateCustomerCheckout = associateCustomerCheckout.bind(this);
  }

  componentWillMount() {
    this.props.createCheckout(
      { variables: { input: {
        allowPartialAddresses: true,
        shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}
        }}
      }).then((res) => {
      this.setState({
        checkout: res.data.checkoutCreate.checkout
      });
    });
  }

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      shop: PropTypes.object,
    }).isRequired,
    createCheckout: PropTypes.func.isRequired,
    checkoutLineItemsAdd: PropTypes.func.isRequired,
    checkoutLineItemsUpdate: PropTypes.func.isRequired
  }

  handleCartOpen() {
    this.setState({
      isCartOpen: true,
    });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  openCustomerAuth(event) {
    if (event.target.getAttribute('data-customer-type') === "new-customer") {
      this.setState({
        isNewCustomer: true,
        isCustomerAuthOpen: true
      });
    } else {
      this.setState({
        isNewCustomer: false,
        isCustomerAuthOpen: true
      });
    }
  }

  showAccountVerificationMessage(){
    this.setState({ accountVerificationMessage: true });
    setTimeout(() => {
     this.setState({
       accountVerificationMessage: false
     })
   }, 5000);
  }

  closeCustomerAuth() {
    this.setState({
      isCustomerAuthOpen: false,
    });
  }

  render() {
    if (this.props.data.loading) {
      return <p>Loading ...</p>;
    }
    if (this.props.data.error) {
      return <p>{this.props.data.error.message}</p>;
    }
    return (

      <div className="App">
        <div className="Flash__message-wrapper">
          <p className={`Flash__message ${this.state.accountVerificationMessage ? 'Flash__message--open' : ''}`}>We have sent you an email, please click the link included to verify your email address</p>
        </div>
        <CustomerAuthWithMutation
          closeCustomerAuth={this.closeCustomerAuth}
          isCustomerAuthOpen={this.state.isCustomerAuthOpen}
          newCustomer={this.state.isNewCustomer}
          associateCustomerCheckout={this.associateCustomerCheckout}
          showAccountVerificationMessage={this.showAccountVerificationMessage}
        />
        <header className="App__header">
          <ul className="App__nav">
            <li className="button App__customer-actions" onClick={this.openCustomerAuth} data-customer-type="new-customer">Create an Account</li>
            <li className="login App__customer-actions" onClick={this.openCustomerAuth}>Log in</li>
          </ul>
          {!this.state.isCartOpen &&
            <div className="App__view-cart-wrapper">
              <button className="App__view-cart" onClick={()=> this.setState({isCartOpen: true})}>Cart</button>
            </div>
          }
          <div className="App__title">
            <h1>{this.props.data.shop.name}: React Example</h1>
            <h2>{this.props.data.shop.description}</h2>
          </div>
        </header>
        <PageState
          addVariantToCart={this.addVariantToCart}
          checkout={this.state.checkout}
          products={this.props.data.shop.products.edges}
          totalItemsCount={this.props.data.shop.products.edges.length}
          />
        <Cart
          removeLineItemInCart={this.removeLineItemInCart}
          updateLineItemInCart={this.updateLineItemInCart}
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          customerAccessToken={this.state.customerAccessToken}/>
      </div>
    );
  }
}

const query = gql`
  query {
    shop {
      name
      description
      products(first:100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }

        edges {
          node {
            id
            title
            tags
            options {
              id
              name
              values
            }
            description(truncateAt: 100)
            vendor
            variants(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    src
                  }
                  price
                }
              }
            }
            images(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

const AppWithDataAndMutation = compose(
  graphql(query),
  graphql(createCheckout, {name: "createCheckout"}),
  graphql(checkoutLineItemsAdd, {name: "checkoutLineItemsAdd"}),
  graphql(checkoutLineItemsUpdate, {name: "checkoutLineItemsUpdate"}),
  graphql(checkoutLineItemsRemove, {name: "checkoutLineItemsRemove"}),
  graphql(checkoutCustomerAssociate, {name: "checkoutCustomerAssociate"})
)(App2);

export default AppWithDataAndMutation;
