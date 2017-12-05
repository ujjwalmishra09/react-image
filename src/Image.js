import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showImage: false,
      shoErrorImage: false,
    };
    // bind this with event handlers
    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
  }

  getStyles() {
    const { styles } = this.props;

    return {
      root: {
        height: 100,
        width: 100,
        ...styles.root,
        position: 'relative'
      },
      image: {
        maxWidth: 100,
        ...styles.image,
        position: 'absolute',
        left: 0,
        top: 0
      },
      placeHolder: {
        width: 100,
        ...styles.placeHolder,
        position: 'absolute',
        left: 0,
        top: 0
      }
    };
  }

  onLoad(event) {
    const { props } = this;
    if (props.onLoad) this.props.onLoad(event);
    setTimeout(() => { this.setState({ showImage: true }); }, 500);
  }

  onError(event) {
    const { props } = this;
    if (props.onError) this.props.onError(event);
    this.showImage({ showErrorImage: true, showImage: false });
  }


  renderPlaceHolder() {
    const { classNames, errorImage, placeHolder } = this.props;
    const { showErrorImage, showImage } = this.state;
    const styles = this.getStyles();
    return (
      <img
        style={styles.placeHolder}
        className={classNames.placeHolder}
        src={placeHolder && errorImage && showErrorImage ? errorImage : placeHolder}j
        alt={showImage ? this.props.alt : 'loading'}
      />
    );
  }

  renderImage() {
    const { classNames, imageUrl } = this.props;
    const { showImage } = this.state;
    const styles = this.getStyles();
    return (
      <img
        style={{ ...styles.image, opacity: showImage ? 1 : 0 }}
        className={classNames.image}
        src={imageUrl}
        alt={showImage ? this.props.alt : 'loading'}
        onLoad={this.onLoad}
        onError={this.onError}
      />
    );
  }

  render() {
    const { classNames, imageUrl } = this.props;
    const styles = this.getStyles();

    if (!imageUrl) {
      console.warn('Image url is not defined.'); // eslint-disable-line
      return null;
    }

    return (
      <div
        className={classNames.root}
        style={styles.root}
      >
        {this.renderPlaceHolder()}
        {this.renderImage()}
      </div>
    );
  }
}

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  errorImage: PropTypes.string,
  classNames: PropTypes.object,
  styles: PropTypes.object,
  alt: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

Image.defaultProps = {
  classNames: {},
  styles: {
    root: {},
    image: {},
    placeHolder: {}
  }
};
