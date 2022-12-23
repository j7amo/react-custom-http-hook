import React from 'react';
import * as PropTypes from 'prop-types';
import classes from './Section.module.css';

function Section(props) {
  const { children } = props;

  return <section className={classes.section}>{children}</section>;
}

Section.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Section;
