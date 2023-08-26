import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SpecificProduct from '../screens/specificProduct/SpecificProduct';
import { addItemToCart } from '../actions/productListAction'; // Eğer böyle bir import varsa

const mockStore = configureStore([]);

describe('SpecificProduct Screen', () => {
  it('Adds item to cart', () => {
    const item = {
      id: 1,
      name: 'Product 1',
      price: 10,
      description: 'Description for Product 1',
      image: 'https://example.com/product1.jpg',
    };

    const store = mockStore({});
    store.dispatch = jest.fn(); // mockStore'a dispatch işlevini ekliyoruz

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <SpecificProduct route={{ params: { item } }} />
      </Provider>
    );

    const addToCartButton = getByTestId('addToCartButton'); // testID ile butonu seçiyoruz
    fireEvent.press(addToCartButton);

    // Redux'a gönderilen eylemi kontrol ediyoruz
    expect(store.dispatch).toHaveBeenCalledWith(addItemToCart(item));
  });
});
