import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollectionList from './components/CollectionList.js';

Enzyme.configure({ adapter: new Adapter() })

const wrapper = Enzyme.shallow(<CollectionList />);

test('rendering labels', () => {
  var oneLabel = [{name: 'One Label'}];
  var firstList = wrapper.instance().renderLabels(oneLabel);
  expect(firstList).toEqual(<span>One Label</span>);

  var multipleSame = [{name: 'Same Label'}, {name: 'Same Label'}];
  var secondList = wrapper.instance().renderLabels(multipleSame);
  expect(secondList).toEqual(<span>Same Label</span>);

  var multipleDifferent = [{name: 'Label 1'}, {name: 'Label 2'}];
  var thirdList = wrapper.instance().renderLabels(multipleDifferent);
  expect(thirdList).toEqual(<span>Label 1, Label 2</span>);
});

test('rendering link to Discogs', () => {
  var info = {title: 'Album Title'};
  expect(wrapper.instance().renderLinkToDiscogs(info)).toEqual(<h3>Album Title</h3>);
});

test('rendering artist', () => {
  var singleArtist = [{name: 'Artist'}];
  expect(wrapper.instance().renderArtists(singleArtist)).toEqual(<h1>Artist</h1>);
});

test('number stripper', () => {
  expect(wrapper.instance().stripUniqueNumber('Artist')).toEqual('Artist');
  expect(wrapper.instance().stripUniqueNumber('Artist (2)')).toEqual('Artist');
  expect(wrapper.instance().stripUniqueNumber('Made Up Artist')).toEqual('Made Up Artist');
  expect(wrapper.instance().stripUniqueNumber('Made Up Artist (3)')).toEqual('Made Up Artist');
})
