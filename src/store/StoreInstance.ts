import { AxiosInstance } from "axios";
import { toast as reactToast } from "react-toastify";

type ToastType = () => typeof reactToast;
type ApiInstanceProvider = () => AxiosInstance;

export default class StoreInstance {
  private static _api: ApiInstanceProvider;
  private static _toast: ToastType;

  static get api() {
    return this._api;
  }

  static get toast() {
    return this._toast;
  }

  static setApi(api: ApiInstanceProvider) {
    this._api = api;
  }

  static setToast(toast: ToastType) {
    this._toast = toast;
  }
}
