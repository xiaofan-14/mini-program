import { useCache } from '../hooks/useCache'

const { getCache }  = useCache();
const BASE_URL = 'http://192.168.249.220:3000/api/';

// 获取本地 token
function getToken() {
  return getCache('token') || '';
}

// 核心请求函数
function http<T = any>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
  showLoading = true
): Promise<T> {
  if (showLoading) wx.showLoading({ title: '加载中', mask: true });

  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      success(res) {
        if (showLoading) wx.hideLoading();

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T);
        } else {
          const message = (res.data as { error: unknown } ).error
          wx.showModal({
            title: '提示',
            content: message as string,
            showCancel: false,
          });
          reject(res.data);
        }
      },
      fail(err) {
        if (showLoading) wx.hideLoading();
        wx.showToast({ title: '网络错误', icon: 'error' });
        reject(err);
      },
    });
  });
}

export function get<T = any>(url: string, params?: Record<string, any>, showLoading = true) {
  const query = params
    ? '?' +
      Object.entries(params)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&')
    : '';
  return http<T>(url + query, 'GET', undefined, showLoading);
}

export function post<T = any>(url: string, data?: any, showLoading = true) {
  return http<T>(url, 'POST', data, showLoading);
}

export function put<T = any>(url: string, data?: any, showLoading = true) {
  return http<T>(url, 'PUT', data, showLoading);
}

export function del<T = any>(url: string, data?: any, showLoading = true) {
  return http<T>(url, 'DELETE', data, showLoading);
}
