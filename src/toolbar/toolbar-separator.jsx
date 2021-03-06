import React from 'react';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const ToolbarSeparator = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.toolbar;
  },

  getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles() {
    return {
      root: {
        backgroundColor: this.getTheme().separatorColor,
        display: 'inline-block',
        height: this.getSpacing().desktopGutterMore,
        marginLeft: this.getSpacing().desktopGutter,
        position: 'relative',
        top: ((this.getTheme().height - this.getSpacing().desktopGutterMore) / 2),
        width: 1,
      },
    };
  },

  render() {

    const {
      className,
      style,
      ...other,
    } = this.props;

    const styles = this.getStyles();

    return (
      <span {...other} className={className} style={this.prepareStyles(styles.root, style)}/>
    );
  },

});

export default ToolbarSeparator;
