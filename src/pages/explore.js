import React from 'react';
import Layout from '../components/common/Layout';
import ExploreContent from '../components/screens/Explore';
const Explore = () => {
    return ( 
        <Layout>
            <div className="explore__container">
                <ExploreContent />
            </div>
        </Layout>
     );
}
 
export default Explore;