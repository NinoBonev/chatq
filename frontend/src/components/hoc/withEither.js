/**
 * Created by NinoB on 26.2.2019 г.
 */

import React from 'react';

const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) =>
    conditionalRenderingFn(props)
        ? <Component {...props} />
        : <EitherComponent {...props}/>;

export default withEither;