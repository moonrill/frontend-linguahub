export class TokenUtil {
  static accessToken?: string;
  static refreshToken?: string;
  static loadToken() {
    if (typeof window === "undefined") {
      return;
    }

    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken) {
      TokenUtil.setAccessToken(accessToken);
    }

    if (refreshToken) {
      TokenUtil.setRefreshToken(refreshToken);
    }
  };

  static persistToken() {
    if (TokenUtil.accessToken != null) {
      localStorage.setItem('access_token', TokenUtil.accessToken);
    } else {
      localStorage.removeItem('access_token');
    }

    if (TokenUtil.refreshToken != null) {
      localStorage.setItem('refresh_token', TokenUtil.refreshToken);
    } else {
      localStorage.removeItem('refresh_token');
    }

  }

  static setAccessToken(accessToken: string) {
    TokenUtil.accessToken = accessToken;
  }

  static setRefreshToken(refreshToken: string) {
    TokenUtil.refreshToken = refreshToken;
  }

  static clearAccessToken() {
    TokenUtil.accessToken = undefined;
  }

  static clearRefreshToken() {
    TokenUtil.accessToken = undefined;
  }
}
