import { createSlice } from '@reduxjs/toolkit';

interface authStateType {
	user: any;
	loading: boolean;
}

const initialState: authStateType = {
	user: null,
	loading: true,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signIn: (state, action) => {
			state.loading = false;
			state.user = action.payload;
		},
		signOut: (state) => {
			state.user = null;
			state.loading = false;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { signIn, signOut, setLoading } = authSlice.actions;
export default authSlice.reducer;
