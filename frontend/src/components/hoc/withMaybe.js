/**
 * Created by NinoB on 26.2.2019 г.
 */

import React from 'react';

const withMaybe = (conditionalRenderingFn) => (Component) => (props) =>
    conditionalRenderingFn(props)
        ? <Component {...props} />
        : null;

export default withMaybe;