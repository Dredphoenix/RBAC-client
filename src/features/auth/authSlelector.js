import { createSelector } from 'reselect';
import { jwtDecode } from 'jwt-decode';


const selectToken = (state) => state.auth.token;

export const selectIsAuthenticated = createSelector(
  [selectToken],
  (token) => Boolean(token)
);

export const selectUser = createSelector(
  [selectToken],
  (token) => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }
);

export const selectUserRole = createSelector(
  [selectUser],
  (user) => user?.role || null
);