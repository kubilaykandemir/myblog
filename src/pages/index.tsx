import React from 'react';
import Layout from '../components/Layout';

const Home:React.FC = () => {
  const title:String = "index page"
  return (<Layout>
    <p>{title}</p>
  </Layout>);
}
export default Home;
