import React, {Component} from 'react';
import VariantSelector from './VariantSelector';
import Slider from './Slider'
import FormState from './FormState'






class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  componentWillMount() {
    this.props.product.options.forEach((selector) => {
      this.setState({
        selectedOptions: { [selector.name]: selector.values[0] }
      });
    });
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;
    const selectedVariant = this.props.product.variants.edges.find((variant) => {
      return variant.node.selectedOptions.every((selectedOption) => {
          console.log(variant.node.selectedOptions)
        return selectedOptions[selectedOption.name] === selectedOption.value; 
      });
    }).node;

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.image.src
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
    const variantImages = [
    {
        src:this.props.product.images.edges[0].node.src,
        alt: `${this.props.product.title} product shot1`
    },
    {
        src:this.props.product.images.edges[0].node.src,
        alt: `${this.props.product.title} product shot2`
    },
    {
        src:this.props.product.images.edges[0].node.src,
        alt: `${this.props.product.title} product shot3`
    }
]

    let variantImage = this.state.selectedVariantImage || this.props.product.images.edges[0].node.src
    let variant = this.state.selectedVariant || this.props.product.variants.edges[0].node
    let variant_selectors = this.props.product.options.map((option) => {
      return (
        option.values.length > 1?
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
        : <div key={ option.id.toString() }>{option.values[0]}</div>
      );
    })


    return (
      
        <div className="col-md-4">
          <div className="col-md-4">
            {this.props.product.images.edges.length ? <img className="img-responsive" src={variantImage} alt={`${this.props.product.title} product shot`}/> : null}
          </div>
          <div className="col-md-offset-2 Details__product container col-md-6">
            <h5 className="text-left ProductCard__title">{this.props.product.title}</h5>
            <h6 className="text-left ProductCard__title">{this.props.product.vendor}</h6>
              <span className="ProductCard_price">${variant.price}</span>
              {variant_selectors}
              <label className="ProductCard__option">
                Quantity
              </label>
              <FormState onAddingCart={this.props.addVariantToCart.bind(this)} variant={variant} />
          </div>
           <Slider images={variantImages} />
           <div className="col-md-6">{this.props.product.description}</div>
        </div>
    );
  }
}

export default ProductCard;
