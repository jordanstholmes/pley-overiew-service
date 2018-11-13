import React from 'react';
import Address from '../client/components/Address.jsx';
import { shallow, mount, render } from 'enzyme';

const mockProps = { 
  address: "71138 Crist Plains, Langoshstad, Oregon, 27302",
  phone: "999-377-4892",
  website: "https://tad.net",
  googleMap: "https://s3-us-west-1.amazonaws.com/yump-sf-overview/maps/5.png",
}

describe('Address Component', () => {
  it('should render a google image', () => {
    const wrapper = shallow(<Address {...mockProps} />);
    const Image = wrapper.find('img');
    expect(Image.length).toEqual(1);
  });
});
