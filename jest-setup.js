require('@shopify/flash-list/jestSetup');

jest.mock(
  'react-native/Libraries/Components/ScrollView/AndroidHorizontalScrollContentViewNativeComponent',
  () => 'AndroidHorizontalScrollContentViewNativeComponent',
);

jest.mock(
  'react-native/Libraries/Components/Switch/AndroidSwitchNativeComponent',
  () => 'AndroidSwitchNativeComponent',
);

jest.mock(
  'react-native/Libraries/Components/Switch/SwitchNativeComponent',
  () => ({
    __esModule: true,
    default: 'Switch',
  }),
);

jest.mock(
  'react-native/Libraries/Modal/RCTModalHostViewNativeComponent',
  () => 'RCTModalHostViewNativeComponent',
);
