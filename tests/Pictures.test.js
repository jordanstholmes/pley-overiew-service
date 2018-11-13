import React from 'react';
import Pictures from '../client/components/Pictures.jsx';
import { shallow, mount, render } from 'enzyme';

const mockState = {
  show: false,
  currentModalUrl: '',
  currentModalId: 0,
  focused: 1,
  images: ["https://s3-us-west-1.amazonaws.com/yump-sf-overview/food/4.jpg",
    "https://s3-us-west-1.amazonaws.com/yump-sf-overview/drinks/1.jpg",
    "https://s3-us-west-1.amazonaws.com/yump-sf-overview/drinks/6.jpg",
    "https://s3-us-west-1.amazonaws.com/yump-sf-overview/food/9.jpg"],
  restaurant: {
    name: 'Christiansen Group',
    address: '71138 Crist Plains, Langoshstad, Oregon, 27302',
    phone: '999-377-4892',
    website: 'https://tad.net',
    cost: '$',
    googleMap: 'https://s3-us-west-1.amazonaws.com/yump-sf-overview/maps/5.png',
  },
};

const mockClickEvent = {
  target: {
    getAttribute() {
      return 'https://s3-us-west-1.amazonaws.com/yump-sf-overview/drinks/1.jpg';
    }
  }
}

const mockServerResponse = {
  images: [{
    category: "food",
    description: "Velit dolorem laboriosam iusto ratione beatae ipsam et sit. Quos qui minima fuga hic veritatis. Quia est molestias harum. Quas dolorum ullam.",
    id: 88,
    image: "https://s3-us-west-1.amazonaws.com/yump-sf-overview/food/4.jpg",
    posted: "2018-10-31T07:00:00.000Z",
    restaurant: 10,
    user: "Ms. Rosalia White",
  }, {
    category: "drinks",
    description: "Enim quo maiores quis omnis ea. Et harum ut. Corrupti enim illo voluptatem sunt quasi. Tempore soluta excepturi laborum quisquam adipisci iste. Laboriosam possimus omnis autem. Cumque reiciendis id commodi quod molestiae hic temporibus molestiae.",
    id: 168,
    image: "https://s3-us-west-1.amazonaws.com/yump-sf-overview/drinks/1.jpg",
    posted: "2018-11-01T07:00:00.000Z",
    restaurant: 10,
    user: "Lambert Weissnat",
  }, {
    category: "drinks",
    description: "Id qui fugiat eius voluptatum necessitatibus sit maiores ad omnis. Dolor ea ea commodi mollitia quibusdam accusamus. Perspiciatis et nam ratione ut voluptas eius quia.",
    id: 208,
    image: "https://s3-us-west-1.amazonaws.com/yump-sf-overview/drinks/6.jpg",
    posted: "2018-11-01T07:00:00.000Z",
    restaurant: 10,
    user: "Hillard Keebler",
  }, {
    category: "food",
    description: "Nostrum ea assumenda ea. Nulla necessitatibus ex et nihil ratione quis dolor eum ea.",
    id: 1653,
    image: "https://s3-us-west-1.amazonaws.com/yump-sf-overview/food/9.jpg",
    posted: "2018-10-31T07:00:00.000Z",
    restaurant: 10,
    user: "Larue Hyatt",
  }],
  restaurant: [{
    address: "71138 Crist Plains, Langoshstad, Oregon, 27302",
    cost: 1,
    googleMap: "https://s3-us-west-1.amazonaws.com/yump-sf-overview/maps/5.png",
    id: 10,
    name: "Christiansen Group",
    phone: "999-377-4892",
    website: "https://tad.net",
  }],
}

describe('Pictures Component Tests', () => {

  it('should render modal component', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    const modal = wrapper.find('ModalView');
    expect(modal.length).toEqual(1);
  });
  it('should render Address component', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    const address = wrapper.find('Address');
    expect(address.length).toEqual(1);
  });
  it('should render 3 images', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    const images = wrapper.find('img');
    expect(images.length).toEqual(3);
  })
  it('should render 4 buttons', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    const buttons = wrapper.find('button');
    expect(buttons.length).toEqual(4);
  })
  it('should have a modal show state', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    const showState = wrapper.state().show;
    expect(showState).toEqual(false);
  });
  it('should open modal view on focused image click', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    const imageBtn = wrapper.find('img.focused');
    imageBtn.simulate('click', mockClickEvent);
    const showState = wrapper.state().show;
    expect(showState).toEqual(true);
  });
  it('should open modal view on regular image click', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    const imageBtn = wrapper.find('img').first();
    imageBtn.simulate('click', mockClickEvent);
    let showState = wrapper.state().show;
    expect(showState).toEqual(true);
  });
  it('should close modal view', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    wrapper.instance().hideModal();
    expect(wrapper.state().show).toEqual(false);
  });
  it('should add class when handlePictureEnter function is called', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    wrapper.instance().handlePictureEnter(null, 0);
    const imageBtn = wrapper.find('img').first();
    expect(imageBtn.hasClass('focused')).toEqual(true);
  });
  it('should re-add class when original picture is mouseEntered', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    const imageBtn = wrapper.find('img');
    expect(wrapper.state().focused).toBe(1);
    imageBtn.at(0).simulate('mouseEnter');
    imageBtn.at(0).simulate('mouseLeave');
    imageBtn.at(1).simulate('mouseEnter');
    expect(wrapper.state().focused).toBe(1);
  });
  it('should call handlePictureEnter on mouseEnter', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    const imageBtn = wrapper.find('img').first();
    expect(wrapper.state().focused).toBe(1);
    imageBtn.simulate('mouseEnter');
    expect(wrapper.state().focused).toBe(0);
  });
  it('should call handlePictureLeave on mouseLeave', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    const imageBtn = wrapper.find('img').first();
    expect(wrapper.state().focused).toBe(1);
    imageBtn.simulate('mouseEnter');
    expect(wrapper.state().focused).toBe(0);
    imageBtn.simulate('mouseLeave');
    expect(wrapper.state().focused).toBe(1);
  });
  it('should change image when handleNextButton/handleBackButtons are called', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    wrapper.instance().handleNextButton();
    expect(wrapper.state().currentModalUrl).toEqual('https://s3-us-west-1.amazonaws.com/yump-sf-overview/drinks/1.jpg');
    expect(wrapper.state().currentModalId).toEqual(1);
    wrapper.instance().handleBackButton();
    expect(wrapper.state().currentModalUrl).toEqual('https://s3-us-west-1.amazonaws.com/yump-sf-overview/food/4.jpg');
    expect(wrapper.state().currentModalId).toEqual(0);
  });
  it('should not go to next image when there are no more images', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    wrapper.setState({
      currentModalId: 3,
      currentModalUrl: 'https://s3-us-west-1.amazonaws.com/yump-sf-overview/food/9.jpg',
    })
    wrapper.instance().handleNextButton();
    expect(wrapper.state().currentModalUrl).toEqual('https://s3-us-west-1.amazonaws.com/yump-sf-overview/food/9.jpg');
    expect(wrapper.state().currentModalId).toEqual(3);
  });
  it('should not go to previous image when its the first image', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.setState(mockState);
    wrapper.setState({
      currentModalId: 0,
      currentModalUrl: 'https://s3-us-west-1.amazonaws.com/yump-sf-overview/food/4.jpg',
    })
    wrapper.instance().handleBackButton();
    expect(wrapper.state().currentModalUrl).toEqual('https://s3-us-west-1.amazonaws.com/yump-sf-overview/food/4.jpg');
    expect(wrapper.state().currentModalId).toEqual(0);
  });
  it('should parse server data correctly', () => {
    const wrapper = shallow(<Pictures />);
    wrapper.instance().parseData(mockServerResponse);
    expect(wrapper.state()).toEqual(mockState);
  });
})

// Pictures.prototype.handlePictureEnter = jest.fn()
// expect(Pictures.prototype.handlePictureEnter).toBeCalled();