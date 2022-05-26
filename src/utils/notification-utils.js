import React from 'react';
import {RNToasty} from 'react-native-toasty';

export const notification = (message, type) => {
  if (type === 'success') {
    RNToasty.Success({
      title: message,
      titleColor: '#FFFFFF',
    });
  } else if (type === 'error') {
    RNToasty.Error({
      title: message,
      titleColor: '#FFFFFF',
    });
  } else if (type === 'info') {
    RNToasty.Info({
      title: message,
      titleColor: '#FFFFFF',
    });
  } else if (type === 'warning') {
    RNToasty.Warn({
      title: message,
      titleColor: '#FFFFFF',
    });
  } else {
    RNToasty.Show({
      title: message,
    });
  }
};
