const LocalStorageService = (function(){
    var _service;
    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }
    function _setToken(tokenObj) {
      localStorage.setItem('ACCESS_TOKEN', tokenObj.access_token);
      localStorage.setItem('REFRESH_TOKEN', tokenObj.refresh_token);
    }
    function _getAccessToken() {
      return localStorage.getItem('ACCESS_TOKEN');
    }
    function _getRefreshToken() {
      return localStorage.getItem('REFRESH_TOKEN');
    }
    function _clearToken() {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
    }
   return {
      getService : _getService,
      setToken : _setToken,
      getAccessToken : _getAccessToken,
      getRefreshToken : _getRefreshToken,
      clearToken : _clearToken
    }
   })();
   export default LocalStorageService;

   const localStorageService = LocalStorageService.getService();

   console.log(localStorageService)