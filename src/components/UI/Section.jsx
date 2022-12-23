import React from 'react';
import * as PropTypes from 'prop-types';
import classes from './Section.module.css';

function Section(props) {
  const { children } = props;

  return <section className={classes.section}>{children}</section>;
}

Section.defaultProps = {
  children: '',
};

Section.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default Section;
