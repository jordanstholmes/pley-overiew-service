import React from 'react';
import ModalView from '../client/components/ModalView.jsx';
import { shallow, mount, render } from 'enzyme';

//{ handleBackButton, handleNextButton, picture }
const mockProps = { 
  handleBackButton: jest.fn(), 
  handleNextButton: jest.fn(), 
  picture: 'https://s3-us-west-1.amazonaws.com/yump-sf-overview/food/4.jpg' }

describe('Modal Component', () => {
  it('should render two anchor-buttons', () => {
    const wrapper = shallow(<ModalView {...mockProps} />);
    const buttons = wrapper.find('a');
    expect(buttons.length).toEqual(2);
  });
  it('should call handler functions on button click', () => {
    const wrapper = mount(<ModalView {...mockProps} />);
    const forwardButton = wrapper.find('a.right');
    const backwardButton = wrapper.find('a.left');
    forwardButton.simulate('click');
    backwardButton.simulate('click');
    expect(wrapper.props().handleBackButton).toBeCalled();
    expect(wrapper.props().handleNextButton).toBeCalled();
  });
})
// Pictures.prototype.handlePictureEnter = jest.fn()
// expect(Pictures.prototype.handlePictureEnter).toBeCalled();