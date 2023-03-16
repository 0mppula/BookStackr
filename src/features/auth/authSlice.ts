import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

import { googleProvider, auth } from '../../config/firebase';

interface authStateType {
	user: any;
	loading: boolean;
	message: string;
}

const initialState: authStateType = {
	user: null,
	loading: false,
	message: '',
};

export const signIn = createAsyncThunk('auth/signIn', async () => {
	try {
		await signInWithPopup(auth, googleProvider);
		return auth.currentUser;
	} catch (error) {
		console.log(error);
	}
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
	try {
		await firebaseSignOut(auth);
	} catch (error) {
		console.log(error);
	}
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.loading = true;
				state.message = '';
			})
			.addCase(signIn.fulfilled, (state, action: any) => {
				state.loading = false;
				state.user = action.payload;
				state.message = 'Welcome!';
			})
			.addCase(signIn.rejected, (state, action) => {
				state.loading = false;
				state.message = 'Error';
			})
			.addCase(signOut.pending, (state) => {
				state.loading = true;
				state.message = '';
			})
			.addCase(signOut.fulfilled, (state, action) => {
				state.loading = false;
				state.user = null;
				state.message = 'Signed out!';
			})
			.addCase(signOut.rejected, (state, action) => {
				state.loading = false;
				state.message = 'Error';
				state.user = null;
			});
	},
});

export default authSlice.reducer;
