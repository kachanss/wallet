import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../../store/redux';
import {Wallet} from '../../../types/wallets';

interface SystemState {
  wallets: Wallet[];
  selected: string | null;
}

const initialState: SystemState = {
  wallets: [],
  selected: null,
};

export const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    loadWallet: (state, action: PayloadAction<Wallet>) => {
      state.wallets.push(action.payload);
    },
    setSelectedWallet: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
  },
});

export const {loadWallet, setSelectedWallet} = walletsSlice.actions;

export const selectWallets = (
  state: RootState,
): (Wallet & {isSelected: boolean})[] => {
  const {wallets, selected} = state.wallets;
  return wallets.map(wallet => ({
    ...wallet,
    isSelected: wallet.id === selected,
  }));
};

export const selectSelectedWallet = (state: RootState) => {
  const {wallets, selected} = state.wallets;

  const current = wallets.find(wallet => wallet.id === selected);

  return current ? current : null;
};

export default walletsSlice.reducer;
