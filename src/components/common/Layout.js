import React from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';

const Layout = ({className, children}) => {
    return ( 
        <div className={className}>
            <Navbar />
            <div className="main__content">
                {children}
            </div>
            
        </div>
     );
}
 
export default styled(Layout)`
`;